// Mini Science Lab - Comprehensive Science Quizzes
// Safe, child-friendly questions across 6 exciting domains with immediate answer validation & explanations.

const QUIZZES_DATA = [
  {
    id: 'science_basics',
    title: 'Science Basics',
    description: 'Everyday science wonders from light and shadows to water and air!',
    icon: '🧪',
    color: '#0284c7',
    badgeIcon: '🌟',
    questions: [
      {
        id: 'sb_1',
        question: 'Which of these is our primary natural source of light on Earth?',
        options: ['The Moon', 'The Sun', 'Campfire', 'Street Lamp'],
        correctIndex: 1,
        explanation: 'The Sun is a massive star that generates immense light and heat through nuclear fusion at its core!'
      },
      {
        id: 'sb_2',
        question: 'What state of matter is water when it freezes into ice?',
        options: ['Gas', 'Liquid', 'Solid', 'Plasma'],
        correctIndex: 2,
        explanation: 'Ice is water in its solid state, where water molecules lock into a sturdy crystal lattice.'
      },
      {
        id: 'sb_3',
        question: 'What invisible force pulls all objects towards the center of the Earth?',
        options: ['Magnetism', 'Friction', 'Gravity', 'Wind'],
        correctIndex: 2,
        explanation: 'Gravity is the invisible attractive force that keeps our feet on the ground and planets in orbit!'
      },
      {
        id: 'sb_4',
        question: 'Which sense organ do humans use to hear sound waves?',
        options: ['Eyes', 'Nose', 'Tongue', 'Ears'],
        correctIndex: 3,
        explanation: 'Ears contain tiny eardrums that vibrate when struck by invisible sound waves in the air.'
      },
      {
        id: 'sb_5',
        question: 'What do green plants need in order to make their own food through photosynthesis?',
        options: ['Sunlight, Water & Carbon Dioxide', 'Milk and Bread', 'Sugar and Salt', 'Darkness and Cold'],
        correctIndex: 0,
        explanation: 'Plants use sunlight, water from their roots, and carbon dioxide from the air to make glucose food!'
      },
      {
        id: 'sb_6',
        question: 'Which instrument is used to look at tiny microorganisms too small to see with your eyes?',
        options: ['Telescope', 'Microscope', 'Thermometer', 'Barometer'],
        correctIndex: 1,
        explanation: 'Microscopes use powerful magnifying lenses to let us observe bacteria, plant cells, and tiny microbes.'
      },
      {
        id: 'sb_7',
        question: 'What gas do humans need to breathe in to survive?',
        options: ['Helium', 'Oxygen', 'Carbon Dioxide', 'Argon'],
        correctIndex: 1,
        explanation: 'Our lungs absorb oxygen from the air, which our blood carries to every cell in our body.'
      },
      {
        id: 'sb_8',
        question: 'What color is formed when you mix red and yellow light or paint?',
        options: ['Blue', 'Purple', 'Orange', 'Green'],
        correctIndex: 2,
        explanation: 'Mixing red and yellow pigments yields bright orange!'
      },
      {
        id: 'sb_9',
        question: 'At what temperature in Celsius does pure water begin to boil at sea level?',
        options: ['50°C', '80°C', '100°C', '200°C'],
        correctIndex: 2,
        explanation: 'Pure water boils at 100°C (212°F), rapidly turning from liquid into steam gas.'
      },
      {
        id: 'sb_10',
        question: 'How many planets orbit the Sun in our Solar System?',
        options: ['5', '8', '10', '12'],
        correctIndex: 1,
        explanation: 'There are 8 official planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune!'
      }
    ]
  },
  {
    id: 'physics_fun',
    title: 'Physics Fun',
    description: 'Discover how forces, electricity, magnets, and energy shape our universe!',
    icon: '⚡',
    color: '#eab308',
    badgeIcon: '⚡',
    questions: [
      {
        id: 'pf_1',
        question: 'What happens when you bring two North poles of two magnets close to each other?',
        options: ['They attract and stick', 'They repel and push apart', 'They generate sparks', 'Nothing happens'],
        correctIndex: 1,
        explanation: 'Opposite magnetic poles attract (North and South), but like poles (North & North) strongly repel each other!'
      },
      {
        id: 'pf_2',
        question: 'Which of the following is an electrical conductor that lets electricity flow easily?',
        options: ['Rubber band', 'Plastic ruler', 'Copper wire', 'Wooden stick'],
        correctIndex: 2,
        explanation: 'Metals like copper, silver, and aluminum are excellent conductors of electrical current.'
      },
      {
        id: 'pf_3',
        question: 'What type of energy does a rolling bowling ball possess?',
        options: ['Kinetic Energy', 'Nuclear Energy', 'Chemical Energy', 'Sound Energy only'],
        correctIndex: 0,
        explanation: 'Kinetic energy is the energy of moving objects. Anything in motion has kinetic energy!'
      },
      {
        id: 'pf_4',
        question: 'Why do bicycle brakes stop your bike when squeezed?',
        options: ['Magnetism', 'Friction', 'Gravity', 'Air pressure'],
        correctIndex: 1,
        explanation: 'Rubber brake pads rub against the wheel rim, creating friction that slows down rotation.'
      },
      {
        id: 'pf_5',
        question: 'What travels faster than anything else in the entire universe?',
        options: ['Sound waves', 'A jet plane', 'Light', 'A high-speed train'],
        correctIndex: 2,
        explanation: 'Light travels at nearly 300,000 kilometers per second (186,000 miles per second) in a vacuum!'
      },
      {
        id: 'pf_6',
        question: 'What is the device called that allows you to turn an electric circuit on and off?',
        options: ['Battery', 'Switch', 'Resistor', 'Generator'],
        correctIndex: 1,
        explanation: 'A switch breaks the circuit loop when opened and completes it when closed.'
      },
      {
        id: 'pf_7',
        question: 'Which simple machine is a ramp or slanted surface that makes lifting heavy items easier?',
        options: ['Lever', 'Pulley', 'Inclined Plane', 'Wheel and Axle'],
        correctIndex: 2,
        explanation: 'An inclined plane spreads work over a longer distance, requiring less upward effort.'
      },
      {
        id: 'pf_8',
        question: 'Can sound travel through empty outer space (vacuum)?',
        options: ['Yes, very easily', 'No, sound needs a medium like air or water', 'Only during daytime', 'Only near the Moon'],
        correctIndex: 1,
        explanation: 'Sound is a mechanical vibration of particles. Without air or matter particles to bump into, sound cannot travel in space!'
      },
      {
        id: 'pf_9',
        question: 'Why do you see lightning before you hear the thunder clap?',
        options: ['Thunder happens hours later', 'Light travels far faster than sound', 'Clouds block the sound', 'Our eyes are faster than ears'],
        correctIndex: 1,
        explanation: 'Light reaches your eyes almost instantaneously, while sound travels at about 343 meters per second in air.'
      },
      {
        id: 'pf_10',
        question: 'What is the unit used to measure electrical voltage (pressure)?',
        options: ['Volts', 'Kilograms', 'Meters', 'Watts'],
        correctIndex: 0,
        explanation: 'Voltage is measured in Volts (V), named after Italian physicist Alessandro Volta!'
      }
    ]
  },
  {
    id: 'chemistry_sparks',
    title: 'Chemistry Sparks',
    description: 'Explore the building blocks of matter, bubbling chemical reactions, and atoms!',
    icon: '⚗️',
    color: '#8b5cf6',
    badgeIcon: '🔬',
    questions: [
      {
        id: 'cs_1',
        question: 'What are the tiny building blocks that make up all matter in the universe?',
        options: ['Cells', 'Atoms', 'Grains', 'Drops'],
        correctIndex: 1,
        explanation: 'Atoms are the fundamental building blocks of all chemicals, elements, and physical objects!'
      },
      {
        id: 'cs_2',
        question: 'What chemical formula represents a molecule of water?',
        options: ['CO2', 'NaCl', 'H2O', 'O2'],
        correctIndex: 2,
        explanation: 'Water is H2O: two Hydrogen atoms bonded to one Oxygen atom.'
      },
      {
        id: 'cs_3',
        question: 'Which gas causes the bubbling and foaming when baking soda is mixed with vinegar?',
        options: ['Oxygen', 'Hydrogen', 'Carbon Dioxide (CO2)', 'Helium'],
        correctIndex: 2,
        explanation: 'The acid-base reaction releases carbon dioxide gas, producing vigorous effervescence!'
      },
      {
        id: 'cs_4',
        question: 'Is lemon juice an acid or a base?',
        options: ['Acid', 'Base', 'Neutral', 'Metal'],
        correctIndex: 0,
        explanation: 'Lemon juice contains citric acid, giving it a sour taste and a low pH of around 2.'
      },
      {
        id: 'cs_5',
        question: 'What happens to the molecules of water when water is heated into steam?',
        options: ['They disappear', 'They move faster and spread far apart', 'They lock together', 'They shrink into dots'],
        correctIndex: 1,
        explanation: 'Thermal heat gives water molecules kinetic energy to break liquid bonds and fly freely as gas particles.'
      },
      {
        id: 'cs_6',
        question: 'What common kitchen substance has the chemical name Sodium Chloride (NaCl)?',
        options: ['Sugar', 'Table Salt', 'Baking Powder', 'Black Pepper'],
        correctIndex: 1,
        explanation: 'Table salt is formed from positive sodium (Na+) and negative chloride (Cl-) ions in a crystalline grid.'
      },
      {
        id: 'cs_7',
        question: 'What is a solution called when water has dissolved so much salt that no more can dissolve?',
        options: ['Dilute', 'Supersaturated / Saturated', 'Boiling', 'Frozen'],
        correctIndex: 1,
        explanation: 'A saturated solution holds the maximum amount of dissolved solute at a given temperature.'
      },
      {
        id: 'cs_8',
        question: 'Which of the following is an example of a chemical change (not just physical)?',
        options: ['Melting an ice cube', 'Baking a cake', 'Cutting paper', 'Crushing a can'],
        correctIndex: 1,
        explanation: 'Baking a cake chemically alters ingredients with heat, forming new compounds that cannot be undone!'
      },
      {
        id: 'cs_9',
        question: 'On the pH scale (0 to 14), what number represents a completely neutral liquid like pure water?',
        options: ['0', '7', '10', '14'],
        correctIndex: 1,
        explanation: 'A pH of 7 is pure neutral. Values below 7 are acidic; values above 7 are basic/alkaline.'
      },
      {
        id: 'cs_10',
        question: 'What subatomic particles have a positive electrical charge and live inside the atomic nucleus?',
        options: ['Electrons', 'Protons', 'Neutrons', 'Photons'],
        correctIndex: 1,
        explanation: 'Protons carry positive charge (+), neutrons are neutral, and electrons carry negative charge (-).'
      }
    ]
  },
  {
    id: 'biology_nature',
    title: 'Biology & Living Things',
    description: 'Investigate animals, the human body, plant life, and healthy ecosystems!',
    icon: '🌿',
    color: '#10b981',
    badgeIcon: '🌱',
    questions: [
      {
        id: 'bn_1',
        question: 'Which human organ acts as an automatic pump to circulate blood throughout the body?',
        options: ['Brain', 'Lungs', 'Heart', 'Stomach'],
        correctIndex: 2,
        explanation: 'The human heart beats about 100,000 times each day, pumping blood through thousands of miles of vessels!'
      },
      {
        id: 'bn_2',
        question: 'What green pigment in plant leaves captures sunlight for photosynthesis?',
        options: ['Chlorophyll', 'Melanin', 'Hemoglobin', 'Keratin'],
        correctIndex: 0,
        explanation: 'Chlorophyll absorbs red and blue light waves while reflecting green, giving plants their vibrant color.'
      },
      {
        id: 'bn_3',
        question: 'Which gas do animals breathe in and plants release during daytime photosynthesis?',
        options: ['Methane', 'Oxygen', 'Carbon Dioxide', 'Nitrogen'],
        correctIndex: 1,
        explanation: 'Plants produce oxygen as a byproduct of photosynthesis, which powers life on our planet!'
      },
      {
        id: 'bn_4',
        question: 'What is the largest organ of the human body that protects us from germs and weather?',
        options: ['Liver', 'Skin', 'Heart', 'Brain'],
        correctIndex: 1,
        explanation: 'The skin is our largest organ, acting as a waterproof shield and temperature regulator.'
      },
      {
        id: 'bn_5',
        question: 'What do caterpillars turn into after their chrysalis metamorphosis stage?',
        options: ['Dragonflies', 'Butterflies or Moths', 'Beetles', 'Frogs'],
        correctIndex: 1,
        explanation: 'Through metamorphosis, a caterpillar transforms completely into an adult winged butterfly or moth!'
      },
      {
        id: 'bn_6',
        question: 'Which of the following animals is a warm-blooded mammal that lives in the ocean?',
        options: ['Great White Shark', 'Blue Whale', 'Jellyfish', 'Octopus'],
        correctIndex: 1,
        explanation: 'Whales are mammals: they breathe air with lungs, give birth to live calves, and nurse them with milk.'
      },
      {
        id: 'bn_7',
        question: 'What are the tiny microscopic veins in plant stems that transport water upward called?',
        options: ['Xylem', 'Arteries', 'Neurons', 'Pores'],
        correctIndex: 0,
        explanation: 'Xylem vessels are microscopic straw-like tubes that pull water from roots up to leaves via capillary action.'
      },
      {
        id: 'bn_8',
        question: 'How many chambers does a normal human heart have?',
        options: ['2', '3', '4', '6'],
        correctIndex: 2,
        explanation: 'The human heart has 4 chambers: right atrium, right ventricle, left atrium, and left ventricle.'
      },
      {
        id: 'bn_9',
        question: 'What part of the plant anchors it securely in soil and absorbs water and minerals?',
        options: ['Flower', 'Stem', 'Roots', 'Leaves'],
        correctIndex: 2,
        explanation: 'Roots branch deeply into the ground, anchoring the plant and absorbing moisture and minerals.'
      },
      {
        id: 'bn_10',
        question: 'Which bodily system uses electrical signals to send messages between brain and limbs?',
        options: ['Digestive System', 'Nervous System', 'Skeletal System', 'Respiratory System'],
        correctIndex: 1,
        explanation: 'The nervous system consists of the brain, spinal cord, and nerves firing electrical impulses at over 250 mph!'
      }
    ]
  },
  {
    id: 'space_planets',
    title: 'Space & Planets',
    description: 'Travel through the cosmos, explore rocky planets, gas giants, and distant stars!',
    icon: '🪐',
    color: '#3b82f6',
    badgeIcon: '🚀',
    questions: [
      {
        id: 'sp_1',
        question: 'Which planet is famous for being called the "Red Planet"?',
        options: ['Mercury', 'Mars', 'Jupiter', 'Venus'],
        correctIndex: 1,
        explanation: 'Mars appears rusty red because its surface rocks are rich in iron oxide (rust)!'
      },
      {
        id: 'sp_2',
        question: 'What is the largest planet in our solar system, with a Great Red Spot storm?',
        options: ['Saturn', 'Jupiter', 'Neptune', 'Earth'],
        correctIndex: 1,
        explanation: 'Jupiter is so immense that more than 1,300 Earths could fit inside it!'
      },
      {
        id: 'sp_3',
        question: 'What planet is closest to the Sun?',
        options: ['Venus', 'Mercury', 'Earth', 'Mars'],
        correctIndex: 1,
        explanation: 'Mercury orbits closest to the Sun, completing a full year in just 88 Earth days!'
      },
      {
        id: 'sp_4',
        question: 'What are Saturns dazzling rings mostly made of?',
        options: ['Solid Gold', 'Chunks of Ice, Rock, and Dust', 'Hot Lava', 'Glow-in-the-dark gas'],
        correctIndex: 1,
        explanation: 'Saturns rings are made of billions of chunks of water ice and rocky debris, ranging from tiny specks to house-sized boulders.'
      },
      {
        id: 'sp_5',
        question: 'How long does it take for Earth to complete one full orbit around the Sun?',
        options: ['24 Hours', '30 Days', '365.25 Days (1 Year)', '10 Years'],
        correctIndex: 2,
        explanation: 'It takes Earth approximately 365.25 days to complete its journey around the Sun, giving us our year!'
      },
      {
        id: 'sp_6',
        question: 'What is the hottest planet in our solar system due to a runaway greenhouse effect?',
        options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
        correctIndex: 1,
        explanation: 'Even though Mercury is closer to the Sun, Venus has a thick carbon dioxide atmosphere that traps heat up to 465°C (869°F)!'
      },
      {
        id: 'sp_7',
        question: 'Does our Moon produce its own light?',
        options: ['Yes, like a lightbulb', 'No, it reflects sunlight like a mirror', 'Only during a full moon', 'It burns natural gas'],
        correctIndex: 1,
        explanation: 'The Moon has no light of its own; moonlight is reflected light from the Sun hitting the Moons rocky surface.'
      },
      {
        id: 'sp_8',
        question: 'What celestial object was reclassified as a "dwarf planet" in 2006?',
        options: ['Ceres', 'Pluto', 'Titan', 'Europa'],
        correctIndex: 1,
        explanation: 'Pluto was reclassified by astronomers as a dwarf planet because it shares its orbit with many Kuiper belt objects.'
      },
      {
        id: 'sp_9',
        question: 'What galaxy is our home solar system located in?',
        options: ['Andromeda', 'The Milky Way', 'Whirlpool', 'Sombrero'],
        correctIndex: 1,
        explanation: 'Our solar system resides inside a spiral arm of the Milky Way galaxy, containing over 100 billion stars!'
      },
      {
        id: 'sp_10',
        question: 'Who was the first human astronaut to step onto the surface of the Moon in 1969?',
        options: ['Buzz Lightyear', 'Neil Armstrong', 'Yuri Gagarin', 'Alan Shepard'],
        correctIndex: 1,
        explanation: 'Neil Armstrong stepped onto the lunar surface on July 20, 1969, saying: "That is one small step for man, one giant leap for mankind."'
      }
    ]
  },
  {
    id: 'mixed_challenge',
    title: 'Science Champion Mixed Challenge',
    description: 'Test your all-around scientific expertise with a grand mixture of questions!',
    icon: '🏆',
    color: '#ec4899',
    badgeIcon: '👑',
    questions: [
      {
        id: 'mc_1',
        question: 'What is the freezing point of pure water in degrees Celsius?',
        options: ['-10°C', '0°C', '10°C', '32°C'],
        correctIndex: 1,
        explanation: 'Pure water freezes into ice at 0°C (32°F).'
      },
      {
        id: 'mc_2',
        question: 'What is the center part of an atom called where protons and neutrons reside?',
        options: ['Electron shell', 'Nucleus', 'Membrane', 'Core cell'],
        correctIndex: 1,
        explanation: 'The atomic nucleus is the dense central core holding positively charged protons and neutral neutrons.'
      },
      {
        id: 'mc_3',
        question: 'Which planet has the strongest magnetic field and 95 known moons?',
        options: ['Mars', 'Venus', 'Jupiter', 'Neptune'],
        correctIndex: 2,
        explanation: 'Jupiter possesses a massive magnetosphere and an impressive family of 95 known moons!'
      },
      {
        id: 'mc_4',
        question: 'What force slows down an open parachute falling through the sky?',
        options: ['Magnetic field', 'Air resistance (drag)', 'Centrifugal force', 'Static electricity'],
        correctIndex: 1,
        explanation: 'Air resistance or aerodynamic drag pushes up against the large parachute canopy, slowing the fall.'
      },
      {
        id: 'mc_5',
        question: 'What are animals that eat both plants and other animals called?',
        options: ['Herbivores', 'Carnivores', 'Omnivores', 'Insectivores'],
        correctIndex: 2,
        explanation: 'Omnivores (like bears, humans, and crows) consume both plant-based and animal foods.'
      },
      {
        id: 'mc_6',
        question: 'Which metal is liquid at ordinary room temperature?',
        options: ['Iron', 'Mercury', 'Copper', 'Lead'],
        correctIndex: 1,
        explanation: 'Mercury is the only elemental metal that remains liquid at standard room temperature and pressure.'
      },
      {
        id: 'mc_7',
        question: 'What layer of Earths atmosphere absorbs harmful ultraviolet (UV) solar radiation?',
        options: ['Troposphere', 'Ozone Layer', 'Mesosphere', 'Exosphere'],
        correctIndex: 1,
        explanation: 'The ozone layer ($O_3$) in the stratosphere acts as a planetary sunscreen shielding life on Earth.'
      },
      {
        id: 'mc_8',
        question: 'How many bones are there in the adult human skeleton?',
        options: ['106', '206', '306', '406'],
        correctIndex: 1,
        explanation: 'Adults have 206 bones; babies are born with around 300 bones, many of which fuse together as they grow!'
      },
      {
        id: 'mc_9',
        question: 'Which particle in an atom carries a negative (-) electric charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Photon'],
        correctIndex: 2,
        explanation: 'Electrons orbit the nucleus and carry a negative charge. Their flow creates electrical currents!'
      },
      {
        id: 'mc_10',
        question: 'What is the scientific term for the water cycle?',
        options: ['Carbon cycle', 'Hydrologic cycle', 'Nitrogen cycle', 'Lunar cycle'],
        correctIndex: 1,
        explanation: 'The hydrologic cycle describes the continuous movement of water on, above, and below the surface of Earth.'
      }
    ]
  }
];

window.QUIZZES_DATA = QUIZZES_DATA;
