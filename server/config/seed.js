const pool = require('./database');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS landmarks (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(100),
    location VARCHAR(150),
    year_completed INTEGER,
    primary_material VARCHAR(150),
    span VARCHAR(150),
    description TEXT,
    engineering_lesson TEXT,
    image VARCHAR(255)
  );
`

const landmarks = [
  {
    slug: 'golden-gate-bridge',
    name: 'Golden Gate Bridge',
    type: 'Suspension Bridge',
    location: 'San Francisco, California',
    yearCompleted: 1937,
    primaryMaterial: 'Steel',
    span: '4,200 ft main span',
    description:
      'A landmark suspension bridge known for its long main span, tall towers, and efficient cable-supported structural system.',
    engineeringLesson:
      'It is a clear example of how tension in the main cables, compression in the towers, and aerodynamic considerations work together in long-span bridge design.',
    image: '/images/golden-gate.svg'
  },
  {
    slug: 'burj-khalifa',
    name: 'Burj Khalifa',
    type: 'Skyscraper',
    location: 'Dubai, United Arab Emirates',
    yearCompleted: 2010,
    primaryMaterial: 'Reinforced Concrete and Steel',
    span: '2,717 ft tall',
    description:
      'The world-famous supertall tower uses a buttressed-core system to achieve exceptional height while controlling wind-induced movement.',
    engineeringLesson:
      'Its structural form shows how geometry, stiffness, material strength, and wind engineering influence the design of supertall buildings.',
    image: '/images/burj-khalifa.svg'
  },
  {
    slug: 'sydney-opera-house',
    name: 'Sydney Opera House',
    type: 'Performing Arts Structure',
    location: 'Sydney, Australia',
    yearCompleted: 1973,
    primaryMaterial: 'Reinforced Concrete',
    span: 'Precast concrete shell roofs',
    description:
      'Its iconic roof is formed by repeated shell segments that combine architecture and structural engineering in a highly recognizable way.',
    engineeringLesson:
      'It demonstrates how complex architectural forms can be rationalized into repeatable structural components for analysis and construction.',
    image: '/images/sydney-opera-house.svg'
  },
  {
    slug: 'millau-viaduct',
    name: 'Millau Viaduct',
    type: 'Cable-Stayed Bridge',
    location: 'Millau, France',
    yearCompleted: 2004,
    primaryMaterial: 'Steel and Concrete',
    span: '1,122 ft typical main spans',
    description:
      'A multi-span cable-stayed bridge crossing the Tarn Valley, recognized for its extremely tall piers and slender deck.',
    engineeringLesson:
      'It highlights the relationship between pier stiffness, cable forces, deck weight, construction sequencing, and long-span efficiency.',
    image: '/images/millau-viaduct.svg'
  },
  {
    slug: 'hoover-dam',
    name: 'Hoover Dam',
    type: 'Arch-Gravity Dam',
    location: 'Nevada–Arizona Border, USA',
    yearCompleted: 1936,
    primaryMaterial: 'Mass Concrete',
    span: '726 ft high',
    description:
      'A massive concrete dam that resists water pressure through both its curved arch action and the self-weight of the structure.',
    engineeringLesson:
      'It provides a strong example of hydrostatic loading, gravity resistance, arch action, concrete massing, and large-scale civil construction.',
    image: '/images/hoover-dam.svg'
  }
]

const seedDatabase = async () => {
  try {
    await pool.query(createTableQuery)

    await pool.query('DELETE FROM landmarks')

    for (const landmark of landmarks) {
      await pool.query(
        `
        INSERT INTO landmarks (
          slug,
          name,
          type,
          location,
          year_completed,
          primary_material,
          span,
          description,
          engineering_lesson,
          image
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        `,
        [
          landmark.slug,
          landmark.name,
          landmark.type,
          landmark.location,
          landmark.yearCompleted,
          landmark.primaryMaterial,
          landmark.span,
          landmark.description,
          landmark.engineeringLesson,
          landmark.image
        ]
      )
    }

    console.log('Landmarks database seeded successfully.')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await pool.end()
  }
}

seedDatabase()