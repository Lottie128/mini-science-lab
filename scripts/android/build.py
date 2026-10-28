#!/usr/bin/env python3
"""Build and sign the Mini Science Lab APK on macOS.

Ports the original Windows-only build_apk.py to this machine. Uses the
project-local Android SDK symlink (.local/android/sdk -> the shared SDK
cached at /Users/lottie/Code/lhukno/.local/android/sdk) instead of
installing a fresh SDK, and the system JDK instead of Android Studio's
bundled JBR.

No Gradle involved: this app is a plain WebView wrapper (see
android/app/src/main/java/.../MainActivity.java), so resources are compiled
and linked directly with aapt2, Java is compiled with javac, dexed with d8,
then zipaligned and signed with apksigner.
"""
import os
import shutil
import subprocess
import sys
import zipfile

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ANDROID_DIR = os.path.join(PROJECT_DIR, "android")
APP_DIR = os.path.join(ANDROID_DIR, "app")
SRC_MAIN = os.path.join(APP_DIR, "src", "main")
RES_DIR = os.path.join(SRC_MAIN, "res")
ASSETS_DIR = os.path.join(SRC_MAIN, "assets")
BUILD_DIR = os.path.join(PROJECT_DIR, "build_out")

SDK_DIR = os.path.join(PROJECT_DIR, ".local", "android", "sdk")
BUILD_TOOLS_DIR = os.path.join(SDK_DIR, "build-tools", "35.0.0")
AAPT2 = os.path.join(BUILD_TOOLS_DIR, "aapt2")
D8 = os.path.join(BUILD_TOOLS_DIR, "d8")
ZIPALIGN = os.path.join(BUILD_TOOLS_DIR, "zipalign")
APKSIGNER = os.path.join(BUILD_TOOLS_DIR, "apksigner")
ANDROID_JAR = os.path.join(SDK_DIR, "platforms", "android-34", "android.jar")

KEYSTORE_PATH = os.path.join(PROJECT_DIR, "release.keystore")
KEYSTORE_PASS = "science123"
KEYSTORE_ALIAS = "sciencekey"


def run_cmd(cmd, desc):
    print(f"--- {desc} ---")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"FAILED: {desc}")
        print("STDOUT:", res.stdout)
        print("STDERR:", res.stderr)
        sys.exit(1)
    if res.stdout.strip():
        print(res.stdout.strip())
    return res


def main():
    for tool in (AAPT2, D8, ZIPALIGN, APKSIGNER, ANDROID_JAR):
        if not os.path.exists(tool):
            print(f"Missing required SDK tool: {tool}")
            sys.exit(1)

    print("Starting Mini Science Lab APK build (macOS)...")
    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR)
    os.makedirs(BUILD_DIR, exist_ok=True)

    # 1. Package web assets
    print("Packaging web assets...")
    if os.path.exists(ASSETS_DIR):
        shutil.rmtree(ASSETS_DIR)
    os.makedirs(ASSETS_DIR, exist_ok=True)

    for item in ["index.html", "manifest.json", "sw.js"]:
        src = os.path.join(PROJECT_DIR, item)
        if os.path.exists(src):
            shutil.copy2(src, ASSETS_DIR)

    for folder in ["js", "styles", "assets", "audio"]:
        src = os.path.join(PROJECT_DIR, folder)
        dst = os.path.join(ASSETS_DIR, folder)
        if os.path.exists(src):
            shutil.copytree(src, dst)

    build_assets = os.path.join(BUILD_DIR, "assets")
    shutil.copytree(ASSETS_DIR, build_assets)

    # 2. Launcher icons (mipmap set already in res/; left untouched here)

    # 3. Compile resources
    compiled_res = os.path.join(BUILD_DIR, "compiled_res.zip")
    run_cmd([AAPT2, "compile", "--dir", RES_DIR, "-o", compiled_res], "aapt2 compile resources")

    # 4. Link resources + assets + manifest
    manifest_xml = os.path.join(SRC_MAIN, "AndroidManifest.xml")
    unaligned_apk = os.path.join(BUILD_DIR, "unaligned.apk")
    run_cmd(
        [
            AAPT2, "link",
            "-I", ANDROID_JAR,
            "--manifest", manifest_xml,
            "-o", unaligned_apk,
            compiled_res,
            "-A", build_assets,
            "--auto-add-overlay",
        ],
        "aapt2 link",
    )

    # 5. Compile Java
    classes_dir = os.path.join(BUILD_DIR, "classes")
    os.makedirs(classes_dir, exist_ok=True)
    java_files = []
    for root, _, files in os.walk(os.path.join(SRC_MAIN, "java")):
        for f in files:
            if f.endswith(".java"):
                java_files.append(os.path.join(root, f))

    run_cmd(
        ["javac", "-source", "17", "-target", "17", "-cp", ANDROID_JAR, "-d", classes_dir, *java_files],
        "javac compile",
    )

    # 6. Dex
    dex_dir = os.path.join(BUILD_DIR, "dex")
    os.makedirs(dex_dir, exist_ok=True)
    class_files = []
    for root, _, files in os.walk(classes_dir):
        for f in files:
            if f.endswith(".class"):
                class_files.append(os.path.join(root, f))

    run_cmd(
        [D8, "--output", dex_dir, "--lib", ANDROID_JAR, *class_files],
        "d8 dexing",
    )

    # 7. Inject classes.dex into the APK
    dex_file = os.path.join(dex_dir, "classes.dex")
    print(f"Adding classes.dex ({os.path.getsize(dex_file)} bytes) to APK...")
    with zipfile.ZipFile(unaligned_apk, "a", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.write(dex_file, "classes.dex")

    # 8. zipalign
    aligned_apk = os.path.join(BUILD_DIR, "aligned.apk")
    run_cmd([ZIPALIGN, "-f", "-p", "4", unaligned_apk, aligned_apk], "zipalign")

    # 9. Keystore (generate once, reuse after)
    if not os.path.exists(KEYSTORE_PATH):
        run_cmd(
            [
                "keytool", "-genkey", "-v",
                "-keystore", KEYSTORE_PATH,
                "-storepass", KEYSTORE_PASS,
                "-alias", KEYSTORE_ALIAS,
                "-keypass", KEYSTORE_PASS,
                "-keyalg", "RSA", "-keysize", "2048", "-validity", "10000",
                "-dname", "CN=Lottie Mukuka,O=ZeroAI Technologies,C=ZM",
            ],
            "generate signing keystore",
        )

    # 10. Sign
    final_apk = os.path.join(PROJECT_DIR, "MiniScienceLab.apk")
    run_cmd(
        [
            APKSIGNER, "sign",
            "--ks", KEYSTORE_PATH,
            "--ks-pass", f"pass:{KEYSTORE_PASS}",
            "--ks-key-alias", KEYSTORE_ALIAS,
            "--key-pass", f"pass:{KEYSTORE_PASS}",
            "--out", final_apk,
            aligned_apk,
        ],
        "apksigner sign",
    )

    # 11. Verify
    run_cmd([APKSIGNER, "verify", final_apk], "apksigner verify")

    out_dir = os.path.join(APP_DIR, "build", "outputs", "apk", "release")
    os.makedirs(out_dir, exist_ok=True)
    shutil.copy2(final_apk, os.path.join(out_dir, "app-release.apk"))

    apk_size_mb = os.path.getsize(final_apk) / (1024 * 1024)
    print("========================================")
    print("SUCCESS! APK built and signed.")
    print(f"Path: {final_apk}")
    print(f"Size: {apk_size_mb:.2f} MB")
    print("========================================")


if __name__ == "__main__":
    main()
