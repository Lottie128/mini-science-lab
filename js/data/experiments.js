// Mini Science Lab - Comprehensive Experiments Catalogue
// Safe, child-friendly, age-appropriate experiments with detailed steps, safety checklists & scientific explanations.

const EXPERIMENTS_DATA = [
  {
    id: 'magnet_magic',
    title: 'Magnet Magic',
    category: 'Physics',
    difficulty: 'Easy',
    duration: '10 mins',
    icon: '🧲',
    color: '#38bdf8',
    summary: 'Explore the invisible magnetic force and test which materials are attracted to a magnet!',
    learningOutcomes: [
      'Understand magnetic attraction and invisible magnetic fields',
      'Differentiate between magnetic (ferromagnetic) and non-magnetic materials',
      'Learn how magnetism passes through objects'
    ],
    materials: [
      { name: 'Bar Magnet', icon: '🧲', required: true },
      { name: 'Paper Clips', icon: '📎', required: true },
      { name: 'Steel Coin', icon: '🪙', required: true },
      { name: 'Plastic Spoon', icon: '🥄', required: true },
      { name: 'Eraser', icon: '🧼', required: true },
      { name: 'Paper Sheet', icon: '📄', required: true }
    ],
    safetyRules: [
      'Keep magnets away from computer screens, phones, and credit cards.',
      'Do not put small magnets or paper clips in your mouth.',
      'Conduct the experiment on a flat, clean tabletop.',
      'Always have adult supervision when handling small metal parts.'
    ],
    steps: [
      {
        step: 1,
        title: 'Gather Your Materials',
        text: 'Arrange your paper clips, plastic spoon, coin, eraser, and paper on a clear, flat table.',
        tip: 'Check that your magnet is clean and free of metal dust.'
      },
      {
        step: 2,
        title: 'Test Paper Clips',
        text: 'Slowly bring your magnet close to the paper clips. Watch as they leap and snap onto the magnet from a distance!',
        tip: 'Notice how the magnet pulls even before it touches the clip!'
      },
      {
        step: 3,
        title: 'Test Other Household Objects',
        text: 'Touch the magnet to the plastic spoon, the rubber eraser, and the paper. Do any of these stick to the magnet?',
        tip: 'Plastics and rubber have no magnetic iron, so they do not attract.'
      },
      {
        step: 4,
        title: 'Build a Magnetic Chain',
        text: 'Hang one paper clip from the magnet. Now touch a second paper clip to the bottom of the first clip. The first clip has become a temporary magnet!',
        tip: 'Can you make a chain of 3 or 4 paper clips?'
      }
    ],
    result: {
      headline: 'Magnetism Discovered!',
      whatHappened: 'Only the paper clips and steel coins were pulled towards the magnet. The plastic spoon, rubber eraser, and paper did not stick.',
      scienceExplanation: 'Magnets create an invisible force field called a magnetic field. This field pulls on materials containing ferromagnetic metals like iron, nickel, and cobalt. Plastics and rubber do not contain these metals.',
      xp: 50
    }
  },
  {
    id: 'simple_circuit',
    title: 'Build a Simple Circuit',
    category: 'Physics',
    difficulty: 'Easy',
    duration: '15 mins',
    icon: '⚡',
    color: '#fbbf24',
    summary: 'Connect a battery, wires, and a bulb to make electricity flow and light up your own lamp!',
    learningOutcomes: [
      'Understand what makes an electric circuit complete (closed loop)',
      'Learn the difference between conductors and insulators',
      'Discover how a switch opens and closes an electric pathway'
    ],
    materials: [
      { name: '1.5V AA Battery', icon: '🔋', required: true },
      { name: 'Mini 1.5V Bulb / LED', icon: '💡', required: true },
      { name: '2 Insulated Wires', icon: '🔌', required: true },
      { name: 'Paper Clip Switch', icon: '📎', required: true },
      { name: 'Sticky Tape', icon: '🩹', required: false }
    ],
    safetyRules: [
      'Use only small 1.5V batteries. NEVER connect wires to wall outlets!',
      'If the wires or battery feel warm, disconnect them immediately.',
      'Have an adult assist with stripping wire ends.'
    ],
    steps: [
      {
        step: 1,
        title: 'Prepare the Battery',
        text: 'Identify the positive (+) terminal with the little bump and the flat negative (-) terminal of your AA battery.',
        tip: 'Electricity travels from one terminal, through the circuit, and back to the other.'
      },
      {
        step: 2,
        title: 'Connect the First Wire',
        text: 'Tape or hold one bare end of wire 1 firmly against the negative (-) terminal of the battery.',
        tip: 'Ensure the metal wire directly touches the battery terminal.'
      },
      {
        step: 3,
        title: 'Connect to the Light Bulb',
        text: 'Connect the other end of wire 1 to the side contact of your mini bulb base.',
        tip: 'Mini bulbs have two contacts: one on the side metal and one on the bottom dot.'
      },
      {
        step: 4,
        title: 'Complete the Circuit',
        text: 'Connect wire 2 between the positive (+) terminal and the bottom contact of the bulb. The bulb immediately lights up brightly!',
        tip: 'If you lift the wire, the circuit breaks and the light turns off!'
      }
    ],
    result: {
      headline: 'Let There Be Light!',
      whatHappened: 'When all wires were connected, electrical current flowed in an unbroken circle from the battery through the bulb filament, producing light.',
      scienceExplanation: 'An electric circuit requires a continuous loop of conductive material. The battery provides electrical pressure (voltage) that pushes electrons through the tiny tungsten filament in the bulb, heating it up until it glows!',
      xp: 50
    }
  },
  {
    id: 'magic_milk',
    title: 'Magic Milk & Surface Tension',
    category: 'Chemistry',
    difficulty: 'Easy',
    duration: '10 mins',
    icon: '🥛',
    color: '#a855f7',
    summary: 'Watch swirling fireworks of color erupt when soap touches drops of food dye in whole milk!',
    learningOutcomes: [
      'Learn how surface tension holds liquids together',
      'Discover how soap molecules interact with fats and liquids',
      'Observe molecular motion in action'
    ],
    materials: [
      { name: 'Whole Milk (1 cup)', icon: '🥛', required: true },
      { name: 'Food Colors (Assorted)', icon: '🎨', required: true },
      { name: 'Liquid Dish Soap', icon: '🧴', required: true },
      { name: 'Cotton Buds (Q-tips)', icon: '🥢', required: true },
      { name: 'Shallow Dinner Plate', icon: '🍽️', required: true }
    ],
    safetyRules: [
      'Use only food-safe materials.',
      'Do not drink the soapy milk mixture.',
      'Wash your hands thoroughly after finishing the experiment.',
      'Wipe up any spilled milk or dye right away.'
    ],
    steps: [
      {
        step: 1,
        title: 'Pour the Milk',
        text: 'Pour room-temperature whole milk into the shallow plate until the bottom is covered with a 1 cm layer.',
        tip: 'Whole milk works best because it contains higher natural fat content!'
      },
      {
        step: 2,
        title: 'Add Color Drops',
        text: 'Carefully place 2-3 drops of different food colors (red, yellow, blue, green) near the center of the milk.',
        tip: 'Keep the drops close together, but do not stir them!'
      },
      {
        step: 3,
        title: 'Prepare the Soap Wand',
        text: 'Dip one tip of a cotton bud into liquid dish soap until lightly coated.',
        tip: 'A small drop of soap on the cotton tip is plenty!'
      },
      {
        step: 4,
        title: 'Touch the Color Center',
        text: 'Gently touch the soapy cotton tip right into the center of the food coloring drops. Hold it steady without stirring!',
        tip: 'Watch as the colors explode outwards in dancing, swirling ribbons!'
      }
    ],
    result: {
      headline: 'Swirling Liquid Fireworks!',
      whatHappened: 'The instant the soapy cotton bud touched the milk, colors rushed away towards the rim and rolled into beautiful swirling patterns for minutes!',
      scienceExplanation: 'Milk is mostly water with dissolved proteins and fat globules. Dish soap molecules have two ends: water-loving (hydrophilic) and fat-loving (lipophilic). The soap breaks the surface tension of the milk and races around bonding with the fats, creating dynamic invisible currents that drag the food coloring along!',
      xp: 50
    }
  },
  {
    id: 'floating_egg',
    title: 'Floating Egg (Density Challenge)',
    category: 'Physics',
    difficulty: 'Easy',
    duration: '10 mins',
    icon: '🥚',
    color: '#06b6d4',
    summary: 'Can you make a heavy fresh egg float in mid-air inside a glass of clear water?',
    learningOutcomes: [
      'Learn about liquid density and buoyancy',
      'Discover why it is easier to float in saltwater than freshwater',
      'Understand Archimedes principle'
    ],
    materials: [
      { name: 'Fresh Raw Egg', icon: '🥚', required: true },
      { name: '2 Clear Drinking Glasses', icon: '🥛', required: true },
      { name: 'Tap Water', icon: '💧', required: true },
      { name: 'Table Salt (4 tbsp)', icon: '🧂', required: true },
      { name: 'Stirring Spoon', icon: '🥄', required: true }
    ],
    safetyRules: [
      'Handle raw eggs gently to avoid cracking them.',
      'Always wash your hands after handling raw eggs.',
      'Ask an adult to assist with glass cups.'
    ],
    steps: [
      {
        step: 1,
        title: 'Fill Glasses with Water',
        text: 'Fill both clear glasses about two-thirds full with normal tap water.',
        tip: 'Clear glass lets you see the egg position clearly.'
      },
      {
        step: 2,
        title: 'The Freshwater Test',
        text: 'Carefully lower the fresh egg into Glass 1. Notice how it sinks straight to the very bottom.',
        tip: 'The egg sinks because it is denser than freshwater.'
      },
      {
        step: 3,
        title: 'Create Saltwater',
        text: 'In Glass 2, stir in 4 generous tablespoons of table salt until it fully dissolves and the water turns slightly cloudy.',
        tip: 'Stir well so all salt crystals dissolve into solution.'
      },
      {
        step: 4,
        title: 'Float the Egg!',
        text: 'Remove the egg from Glass 1 and gently lower it into Glass 2 (the saltwater). The egg bobs up and floats on top!',
        tip: 'Try gently adding a bit of freshwater on top to see the egg hover in the middle!'
      }
    ],
    result: {
      headline: 'The Egg Floats!',
      whatHappened: 'The egg sank to the bottom of the freshwater glass, but floated easily at the surface of the saltwater glass.',
      scienceExplanation: 'Density is how tightly packed matter is inside a given space. A fresh egg is denser than freshwater, so it sinks. Dissolving lots of salt increases the density of the water. When the saltwater becomes denser than the egg, the buoyant upward force lifts the egg to the surface!',
      xp: 50
    }
  },
  {
    id: 'acids_bases',
    title: 'Acids & Bases with Turmeric Indicator',
    category: 'Chemistry',
    difficulty: 'Medium',
    duration: '15 mins',
    icon: '🧪',
    color: '#eab308',
    summary: 'Use kitchen turmeric powder as a secret pH indicator that changes color from bright yellow to ruby red!',
    learningOutcomes: [
      'Learn about acids, bases, and neutral substances',
      'Discover how natural indicators reveal chemical properties',
      'Observe neutralization reactions'
    ],
    materials: [
      { name: 'Turmeric Powder (1 tsp)', icon: '🌾', required: true },
      { name: 'Warm Water', icon: '💧', required: true },
      { name: 'Lemon Juice (Acid)', icon: '🍋', required: true },
      { name: 'Detergent Soap Water (Base)', icon: '🧼', required: true },
      { name: 'Vinegar', icon: '🍶', required: false },
      { name: 'Spoon & Dropper', icon: '🥄', required: true }
    ],
    safetyRules: [
      'Turmeric can stain clothes yellow; wear an apron or old shirt!',
      'Do not get lemon juice or soap in your eyes.',
      'Never taste chemical solutions even if made with spices.'
    ],
    steps: [
      {
        step: 1,
        title: 'Make Turmeric Indicator',
        text: 'Mix 1 teaspoon of turmeric powder in 4 tablespoons of warm water in a clear cup. Stir until you have a golden yellow liquid.',
        tip: 'Turmeric contains a natural pigment called curcumin.'
      },
      {
        step: 2,
        title: 'Prepare Test Liquids',
        text: 'Prepare two small cups: Cup A with fresh lemon juice (an acid) and Cup B with soapy laundry water (a base).',
        tip: 'Label the cups so you know which is which.'
      },
      {
        step: 3,
        title: 'Test the Base',
        text: 'Use a dropper or spoon to add a few drops of yellow turmeric solution into Cup B (soap). Watch it turn bright blood red!',
        tip: 'Bases react with curcumin to change its molecular shape and light reflection.'
      },
      {
        step: 4,
        title: 'Reverse with Acid (Neutralize)',
        text: 'Now add spoonfuls of lemon juice into the red mixture and stir. The red color magically turns back into bright yellow!',
        tip: 'The acid neutralizes the base, resetting the indicator!'
      }
    ],
    result: {
      headline: 'Chameleon Chemical Reaction!',
      whatHappened: 'Turmeric remained bright yellow in acid (lemon juice), turned deep crimson red in base (soap), and reversed back to yellow when neutralized.',
      scienceExplanation: 'Curcumin in turmeric is a natural acid-base indicator. In basic (alkaline) environments with a pH above 7.8, curcumin loses hydrogen ions and changes its light absorption to deep red. When acidic hydrogen ions are reintroduced from lemon juice, it reverts to yellow!',
      xp: 50
    }
  },
  {
    id: 'balloon_rocket',
    title: 'Balloon Rocket (Action & Reaction)',
    category: 'Physics',
    difficulty: 'Easy',
    duration: '12 mins',
    icon: '🎈',
    color: '#ef4444',
    summary: 'Build a jet-powered balloon rocket that zips across your living room on a string highway!',
    learningOutcomes: [
      'Explore Newtons Third Law of Motion (Action and Reaction)',
      'Learn about thrust, air pressure, and friction',
      'Discover how real rocket engines propel spacecraft into orbit'
    ],
    materials: [
      { name: 'Party Balloon', icon: '🎈', required: true },
      { name: 'Drinking Straw', icon: '🥤', required: true },
      { name: 'Long String (4-5 meters)', icon: '🧵', required: true },
      { name: 'Tape', icon: '🩹', required: true },
      { name: '2 Chairs or Door handles', icon: '🪑', required: true }
    ],
    safetyRules: [
      'Ensure the path between the two chairs is clear of pets and obstacles.',
      'Do not over-inflate balloons to prevent loud popping.',
      'Adult supervision when tying tight string across rooms.'
    ],
    steps: [
      {
        step: 1,
        title: 'Set up the String Runway',
        text: 'Thread your piece of string through the plastic drinking straw. Then tie both ends tightly between two sturdy chairs across the room.',
        tip: 'Keep the string as straight and taut as possible for maximum rocket speed!'
      },
      {
        step: 2,
        title: 'Inflate the Rocket Engine',
        text: 'Blow up your party balloon and pinch the opening tightly between your fingers. Do NOT tie a knot!',
        tip: 'A bigger balloon holds more compressed air and thrust.'
      },
      {
        step: 3,
        title: 'Mount the Balloon to the Straw',
        text: 'While holding the balloon neck pinched, use two pieces of tape to attach the balloon firmly along the side of the straw.',
        tip: 'Make sure the balloon opening points backwards towards the launch chair.'
      },
      {
        step: 4,
        title: 'Countdown and Launch!',
        text: 'Pull the straw and balloon to the starting end of the string. Count down 3, 2, 1, and release your fingers from the nozzle!',
        tip: 'Whoooosh! The balloon zooms across the room like a jet rocket!'
      }
    ],
    result: {
      headline: 'Rocket Lift-Off Successful!',
      whatHappened: 'The balloon rocket shot rapidly down the string line as escaping air rushed out behind it.',
      scienceExplanation: 'This demonstrates Sir Isaac Newtons Third Law of Motion: For every action, there is an equal and opposite reaction. The stretched rubber walls of the balloon push air backward with high pressure (action); in response, the rushing air pushes the balloon forward with equal force (reaction/thrust)!',
      xp: 50
    }
  },
  {
    id: 'homemade_volcano',
    title: 'Homemade Foaming Volcano',
    category: 'Chemistry',
    difficulty: 'Medium',
    duration: '20 mins',
    icon: '🌋',
    color: '#f97316',
    summary: 'Mix kitchen ingredients to create a bubbling, foaming volcanic eruption of carbon dioxide lava!',
    learningOutcomes: [
      'Witness an active chemical reaction producing gas',
      'Learn about carbon dioxide (CO2) formation',
      'Understand how pressure builds inside geological volcanoes'
    ],
    materials: [
      { name: 'Baking Soda (3 tbsp)', icon: '🍚', required: true },
      { name: 'White Vinegar (1/2 cup)', icon: '🍶', required: true },
      { name: 'Liquid Dish Soap (1 squirt)', icon: '🧴', required: true },
      { name: 'Red/Orange Food Color', icon: '🎨', required: true },
      { name: 'Small Plastic Bottle', icon: '🍾', required: true },
      { name: 'Baking Tray or Pan', icon: '📥', required: true }
    ],
    safetyRules: [
      'Place the experiment tray on a wipeable table or outdoors.',
      'Do not lean directly over the bottle opening during eruption.',
      'Wear safety glasses if available to protect eyes from vinegar splashes.'
    ],
    steps: [
      {
        step: 1,
        title: 'Set the Volcano Base',
        text: 'Place the small plastic bottle securely in the middle of a large baking tray or deep pan to catch the bubbling lava.',
        tip: 'You can build clay or playdough around the bottle to look like a mountain!'
      },
      {
        step: 2,
        title: 'Load the Volcano Core',
        text: 'Use a funnel or paper roll to pour 3 tablespoons of baking soda into the bottle.',
        tip: 'Make sure the inside of the bottle is dry so the powder drops to the bottom.'
      },
      {
        step: 3,
        title: 'Add Soap and Color',
        text: 'Add a squirt of liquid dish soap, 4 drops of red food coloring, and 2 tablespoons of warm water into the bottle.',
        tip: 'The dish soap traps the expanding gas into millions of bubbly lava mounds!'
      },
      {
        step: 4,
        title: 'Trigger Eruption!',
        text: 'Quickly pour 1/2 cup of vinegar into the bottle and step back! Watch foaming red lava erupt over the top of the volcano!',
        tip: 'Hear the loud fizzing sound as thousands of gas bubbles form!'
      }
    ],
    result: {
      headline: 'Volcanic Eruption!',
      whatHappened: 'A thick, frothy red foam exploded out of the bottle mouth and poured down the sides of the volcano base.',
      scienceExplanation: 'When sodium bicarbonate (baking soda) mixes with acetic acid (vinegar), they react vigorously to create carbonic acid, which instantly breaks down into water and carbon dioxide gas (CO2). The rapidly expanding gas gets trapped by the liquid soap, creating tons of foam that overflows under pressure!',
      xp: 50
    }
  },
  {
    id: 'plant_capillary',
    title: 'Plant Water Journey (Capillary Action)',
    category: 'Biology',
    difficulty: 'Easy',
    duration: '15 mins',
    icon: '🌿',
    color: '#10b981',
    summary: 'Discover how plants drink water through tiny hidden straw-like tubes and dye celery leaves red and blue!',
    learningOutcomes: [
      'Learn how plants transport water from roots to leaves',
      'Understand capillary action, cohesion, and adhesion',
      'Discover xylem vessels inside plant stems'
    ],
    materials: [
      { name: 'Fresh Celery with Leaves', icon: '🥬', required: true },
      { name: '2 Clear Cups of Water', icon: '🥛', required: true },
      { name: 'Red and Blue Food Coloring', icon: '🎨', required: true },
      { name: 'Blunt Scissors / Table Knife', icon: '✂️', required: true }
    ],
    safetyRules: [
      'Ask an adult to help cut the celery stalks with kitchen scissors.',
      'Be careful with concentrated food dye to avoid staining surfaces.'
    ],
    steps: [
      {
        step: 1,
        title: 'Prepare Colored Water',
        text: 'Fill two clear drinking cups halfway with water. Add 10 drops of red dye to one cup and 10 drops of blue dye to the other.',
        tip: 'Vibrant dark colors produce the most visible results!'
      },
      {
        step: 2,
        title: 'Trim the Celery Stalks',
        text: 'With adult help, trim 1-2 cm off the bottom of two fresh celery stalks that have leafy green tops.',
        tip: 'Freshly trimmed stems allow open plant tubes to absorb water immediately.'
      },
      {
        step: 3,
        title: 'Place Stalks in Water',
        text: 'Put one celery stalk into the red water cup and the second stalk into the blue water cup. Place them in a sunny room.',
        tip: 'You can even split a single celery stalk down the middle and put each half in a different color!'
      },
      {
        step: 4,
        title: 'Observe the Transformation',
        text: 'Check on your celery after 2 hours and again the next morning. Watch as the green leaves turn bright red and blue!',
        tip: 'Slice across the bottom of the stalk: look at the tiny colored dots!'
      }
    ],
    result: {
      headline: 'Colored Plant Veins!',
      whatHappened: 'The food coloring traveled all the way up the tall celery stalk, tinting the veins and leaf tips bright red and blue.',
      scienceExplanation: 'Plants do not have hearts to pump water! Instead, they use capillary action. Water molecules love sticking to each other (cohesion) and to the walls of the plants microscopic transport tubes called xylem (adhesion). As water evaporates from leaves (transpiration), it sucks up more water from the bottom like a drinking straw!',
      xp: 50
    }
  },
  {
    id: 'rain_cloud_jar',
    title: 'Rain Cloud in a Jar',
    category: 'Earth Science',
    difficulty: 'Easy',
    duration: '10 mins',
    icon: '🌧️',
    color: '#60a5fa',
    summary: 'Create a miniature weather system and watch colorful rain shower down through fluffy cloud layers!',
    learningOutcomes: [
      'Understand how clouds form and become saturated with moisture',
      'Discover precipitation and gravitys role in weather',
      'Model the atmospheric water cycle'
    ],
    materials: [
      { name: 'Clear Glass Jar', icon: '🫙', required: true },
      { name: 'Tap Water', icon: '💧', required: true },
      { name: 'White Shaving Foam', icon: '☁️', required: true },
      { name: 'Blue Food Coloring', icon: '🎨', required: true },
      { name: 'Pipette or Small Spoon', icon: '🥄', required: true }
    ],
    safetyRules: [
      'Do not spray shaving foam near eyes or mouth.',
      'Clean hands with soap and water after playing.'
    ],
    steps: [
      {
        step: 1,
        title: 'Fill the Atmosphere',
        text: 'Fill your clear glass jar about three-quarters full with room temperature tap water. The water represents air in our atmosphere.',
        tip: 'Leave 2-3 inches of space at the top of the jar.'
      },
      {
        step: 2,
        title: 'Create the Cloud',
        text: 'Carefully spray a generous mound of white shaving foam directly on top of the water until it floats like a fluffy cumulus cloud.',
        tip: 'Smooth the top of the foam with a spoon so it is flat.'
      },
      {
        step: 3,
        title: 'Prepare the Rain Drops',
        text: 'In a small cup, mix 10 drops of blue food coloring with 3 tablespoons of water to create rain solution.',
        tip: 'Using diluted dye helps the drops sink gently through the foam.'
      },
      {
        step: 4,
        title: 'Make It Rain!',
        text: 'Use your dropper to drip the blue water slowly onto the shaving foam cloud. Watch as the cloud gets heavy and blue rain streams burst into the clear water below!',
        tip: 'Notice how the rain only falls once the cloud is completely saturated!'
      }
    ],
    result: {
      headline: 'Precipitation in a Jar!',
      whatHappened: 'After adding several drops, the blue color seeped through the thick foam and showered down through the water in stunning cascading streams.',
      scienceExplanation: 'Real clouds are made of tiny water droplets floating in the air. When billions of droplets merge together, the cloud becomes heavy and saturated. Gravity then overcomes the upward air currents, pulling the water down to earth as rain (precipitation)!',
      xp: 50
    }
  },
  {
    id: 'salt_crystals',
    title: 'Grow Sparkly Salt Crystal Gardens',
    category: 'Chemistry',
    difficulty: 'Hard',
    duration: '25 mins',
    icon: '💎',
    color: '#ec4899',
    summary: 'Grow real, sparkling geometric crystal gems right on a cotton string over a few days!',
    learningOutcomes: [
      'Understand supersaturated solutions and solubility',
      'Learn how atoms and molecules align into crystal lattices',
      'Discover how evaporation triggers mineral crystal growth'
    ],
    materials: [
      { name: 'Table Salt or Epsom Salt (1 cup)', icon: '🧂', required: true },
      { name: 'Hot Water (1 cup)', icon: '♨️', required: true },
      { name: 'Clean Glass Jar', icon: '🫙', required: true },
      { name: 'Pencil or Craft Stick', icon: '✏️', required: true },
      { name: 'Cotton String', icon: '🧵', required: true },
      { name: 'Paper Clip (Weight)', icon: '📎', required: true }
    ],
    safetyRules: [
      'STRICT ADULT SUPERVISION: Boiling or hot water can cause burns.',
      'Allow the jar to cool safely before children handle it.',
      'Do not drink or consume the crystal solution.'
    ],
    steps: [
      {
        step: 1,
        title: 'Dissolve Salt to Saturation',
        text: 'With adult help, stir salt spoon by spoon into 1 cup of very hot water until no more salt will dissolve and crystals settle at the bottom.',
        tip: 'Hot water holds far more dissolved salt than cold water. This creates a supersaturated solution!'
      },
      {
        step: 2,
        title: 'Pour into Clear Jar',
        text: 'Carefully pour the clear liquid into your clean glass jar, leaving the undissolved salt behind at the bottom of the pot.',
        tip: 'Filtering through a coffee filter makes even clearer crystals!'
      },
      {
        step: 3,
        title: 'Prepare the Seed String',
        text: 'Tie a paper clip to the end of a cotton string for weight, and tie the top of the string around a pencil.',
        tip: 'Wet the string and roll it in a little dry salt to provide seed points for crystal growth!'
      },
      {
        step: 4,
        title: 'Rest and Grow',
        text: 'Rest the pencil across the top of the jar so the string hangs straight down into the saltwater without touching the glass bottom. Place in a warm, quiet spot.',
        tip: 'Over 2-4 days, water slowly evaporates, forcing salt ions to lock into sparkling cubic crystals!'
      }
    ],
    result: {
      headline: 'Glittering Crystal Garden!',
      whatHappened: 'Over several days, dazzling square geometric salt crystals grew along the string like diamond icicles!',
      scienceExplanation: 'Table salt is sodium chloride (NaCl). In hot water, the sodium and chloride ions drift apart. As water cools and evaporates, the remaining water cannot hold all the salt molecules. The ions lock into their natural repeating 3D cubic lattice pattern, growing larger and larger crystal faces!',
      xp: 60
    }
  }
];

window.EXPERIMENTS_DATA = EXPERIMENTS_DATA;
