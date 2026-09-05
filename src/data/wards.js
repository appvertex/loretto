// Wards (Small Christian Communities / ವಾಡೆ) Data for Our Lady of Loretto Church
// Reference Structure inspired by Sacred Heart Church, Thodambila (thodambilachurch.in)

export const wards = [
  {
    id: 1,
    slug: 'kuprady-ward',
    name: 'Kuprady Ward',
    konkaniName: 'ಕುಪ್ರಡ್ಡಿ ವಾಡೊ',
    patronSaint: 'St. Joseph the Worker',
    konkaniPatron: 'ಸಾಂ ಜುಜೆ ಕಾಮ್ಗಾರ್',
    feastDate: 'May 1',
    area: 'Kuprady, Near Loretto High School Road & Surrounding Valley',
    landmark: 'Loretto High School Junction to Kuprady Hills',
    householdsCount: 28,
    meetingSchedule: '1st Sunday of every month at 4:00 PM',
    meetingDay: '1st Sunday at 4:00 PM',
    venue: 'Rotating member residences (ಮಯ್ನ್ಯಾಚಿ ಜಮಾತ್)',
    motto: 'ವಾವ್ರ್ ಆನಿ ಮಾಗ್ಣೆಂ ಮುಖಾಂತ್ರ್ ಕ್ರಿಸ್ತಾಂವ್ ಜಿವಿತ್ (Work and Prayer in Christ)',
    description: 'Kuprady Ward is a close-knit, devout Small Christian Community situated in the scenic valley of Kuprady. Known for active youth involvement, liturgical animation, and mutual support during family milestones.',
    fullDescription: 'Kuprady Ward (ಕುಪ್ರಡ್ಡಿ ವಾಡೊ) comprises 28 vibrant Catholic families dedicated to living out the Gospel in daily communion. Under the heavenly patronage of St. Joseph the Worker, parishioners actively conduct monthly SCC gospel-sharing gatherings (ಸಾತ್ ಮೇಟಾಂ), organize an annual ward feast with solemn liturgical offerings, and run mutual solidarity funds to support sick and elderly ward members.',
    image: `${import.meta.env.BASE_URL}images/gallery-2.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Ligory Norbert Monteiro',
      konkaniName: 'ಮಾನೇಸ್ತ್ ಲಿಗೋರಿ ನೊರ್ಬರ್ಟ್ ಮೊಂತೇರೊ',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 98450 12345',
      address: 'Kuprady Cross, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Jason Monteiro',
        konkaniName: 'ಮಾನೇಸ್ತ್ ಜೇಸನ್ ಮೊಂತೇರೊ',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 94480 23456',
        photo: ''
      },
      {
        name: 'Mrs. Hilda Monteiro',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ಹಿಲ್ಡಾ ಮೊಂತೇರೊ',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97410 34567',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'Liturgy Coordinator', name: 'Mrs. Cynthia D\'Souza', konkaniRole: 'ಲಿಟರ್ಜಿ ಸಂಯೋಜಕಿ' },
      { role: 'Youth Representative', name: 'Alwyn Rodriguez', konkaniRole: 'ಯುವಜಣ್ ಪ್ರತಿನಿಧಿ' },
      { role: 'SCC Animator', name: 'Mrs. Benedicta Pinto', konkaniRole: 'ಸಣ್ಣ ಕ್ರಿಸ್ತಾಂವ್ ಸಮುದಾಯ್ ಪ್ರೇರಕಿ' }
    ],
    activities: [
      'Monthly Small Christian Community (SCC) Gospel Sharing and family rosary meetings.',
      'Solemn animation of Sunday Parish Holy Mass and liturgical singing on assigned turns.',
      'Annual Ward Feast (ವಾಡ್ಯಾ ಫೆಸ್ತ್) Holy Mass, fellowship meal, and family cultural talent evening.',
      'Visiting and praying with sick, homebound, and elderly ward members with Holy Communion assistance.',
      'Ward-level collection and distribution of grocery hampers during Christmas and Easter for underprivileged families.',
      'Active participation in inter-ward sports, Bible quiz, and cultural tournaments.'
    ],
    feastCelebration: {
      title: 'St. Joseph the Worker Ward Feast (ವಾಡ್ಯಾ ಫೆಸ್ತ್)',
      date: 'First Sunday of May',
      description: 'The ward begins festivities with a nine-day family novena recited in turns at member homes. On the feast day, members offer solemn thanksgiving Mass at Loretto Church, followed by an evening fellowship banquet featuring games, awards for children, and cultural singing.'
    },
    families: [
      { id: 1, head: 'Albert D\'Souza & Family', konkaniHead: 'ಆಲ್ಬರ್ಟ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಮ್', members: 4, address: 'Kuprady Cross', houseName: 'St. Joseph Nilaya' },
      { id: 2, head: 'Antony Pinto & Family', konkaniHead: 'ಆಂಟೋನಿ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Kuprady Main Road', houseName: 'Pinto Compound' },
      { id: 3, head: 'Arun Monteiro & Family', konkaniHead: 'ಅರುಣ್ ಮೊಂತೇರೊ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Hill View, Kuprady', houseName: 'Monteiro Villa' },
      { id: 4, head: 'Benedicta Pinto & Family', konkaniHead: 'ಬೆನಡಿಕ್ಟಾ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Near School Road', houseName: 'Grace Cottage' },
      { id: 5, head: 'Bonaventure D\'Souza & Family', konkaniHead: 'ಬೊನಾವೆಂಚರ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Valley View', houseName: 'Bethel' },
      { id: 6, head: 'Cyprian Rodrigues & Family', konkaniHead: 'ಸಿಪ್ರಿಯನ್ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Kuprady Hilltop', houseName: 'Rodrigues Manor' },
      { id: 7, head: 'Edward Fernandes & Family', konkaniHead: 'ಎಡ್ವರ್ಡ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Church By-lane', houseName: 'Ave Maria' },
      { id: 8, head: 'Francis Rodrigues & Family', konkaniHead: 'ಫ್ರಾನ್ಸಿಸ್ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 6, address: 'Kuprady East', houseName: 'Francis Villa' },
      { id: 9, head: 'Henry Monteiro & Family', konkaniHead: 'ಹೆನ್ರಿ ಮೊಂತೇರೊ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Kuprady Junction', houseName: 'Carmel House' },
      { id: 10, head: 'Lancy D\'Souza & Family', konkaniHead: 'ಲಾನ್ಸಿ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Kuprady Lower Valley', houseName: 'D\'Souza Heritage' },
      { id: 11, head: 'Lancy Rodrigues & Family', konkaniHead: 'ಲ್ಯಾನ್ಸಿ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Hill Road', houseName: 'Rosary Nilaya' },
      { id: 12, head: 'Magdeline Rodrigues & Family', konkaniHead: 'ಮಗ್ಧಲಿನ್ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 2, address: 'Kuprady Valley', houseName: 'Peace Cottage' },
      { id: 13, head: 'Melwyn Rodrigues & Family', konkaniHead: 'ಮೆಲ್ವಿನ್ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Near Temple Road', houseName: 'Tabor' },
      { id: 14, head: 'Marceline Pinto & Family', konkaniHead: 'ಮರ್ಸೆಲಿನ್ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Kuprady Cross', houseName: 'Nazareth' },
      { id: 15, head: 'Lilly (Norbert) Fernandes & Family', konkaniHead: 'ಲಿಲ್ಲಿ (ನೋರ್ಬರ್ಟ್) ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'School Road', houseName: 'Ferns Nest' },
      { id: 16, head: 'Oswald D\'Cunha & Family', konkaniHead: 'ಓಜ್ವಾಲ್ಡ್ ಡಿಕುನ್ಹಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Valley View', houseName: 'D\'Cunha House' },
      { id: 17, head: 'Prakash Coutinho & Family', konkaniHead: 'ಪ್ರಕಾಶ್ ಕುಟಿನ್ಹೊ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Kuprady Hills', houseName: 'Coutinho Nivas' },
      { id: 18, head: 'Rajesh Coutinho & Family', konkaniHead: 'ರಾಜೇಶ್ ಕುಟಿನ್ಹೊ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Kuprady Cross', houseName: 'Shanti Nivas' },
      { id: 19, head: 'Reshma Monteiro & Family', konkaniHead: 'ರೇಷ್ಮಾ ಮೊಂತೇರೊ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Kuprady Main Road', houseName: 'Monteiro Cottage' },
      { id: 20, head: 'Robert D\'Souza & Family', konkaniHead: 'ರೋಬರ್ಟ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Kuprady West', houseName: 'St. Anne\'s' },
      { id: 21, head: 'Ronald D\'Souza & Family', konkaniHead: 'ರೊನಾಲ್ಡ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Near Loretto Boundary', houseName: 'Joy Villa' },
      { id: 22, head: 'Rudolph Fernandes & Family', konkaniHead: 'ರುಡೊಲ್ಫ್ಹ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Kuprady Road', houseName: 'Fatima Nivas' },
      { id: 23, head: 'Santosh D\'Souza & Family', konkaniHead: 'ಸಂತೋಶ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Kuprady Valley', houseName: 'Holy Family' },
      { id: 24, head: 'Stella D\'Souza & Family', konkaniHead: 'ಸ್ಟೆಲ್ಲಾ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 2, address: 'Kuprady Upper Hill', houseName: 'Lourdes House' },
      { id: 25, head: 'Thomas D\'Souza & Family', konkaniHead: 'ಥೋಮಸ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'School Boundary', houseName: 'Faith Haven' },
      { id: 26, head: 'Vineeth Lobo & Family', konkaniHead: 'ವಿನೀತ್ ಲೋಬೊ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Kuprady Junction', houseName: 'Lobo Villa' },
      { id: 27, head: 'Wilfred Fernandes & Family', konkaniHead: 'ವಿಲ್ಫ್ರೆಡ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Kuprady Cross', houseName: 'Fernandes Abode' },
      { id: 28, head: 'Valerian Sequeira & Family', konkaniHead: 'ವಲೇರಿಯನ್ ಸಿಕ್ವೇರಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Kuprady East', houseName: 'Sequeira Villa' }
    ]
  },
  {
    id: 2,
    slug: 'pompei-ward',
    name: 'Pompei Ward',
    konkaniName: 'ಪೊಂಪೈ ವಾಡೊ',
    patronSaint: 'Our Lady of the Rosary of Pompei',
    konkaniPatron: 'ಪೊಂಪೈ ಮಾಂಯ್',
    feastDate: 'October 7',
    area: 'Pompei Nagar, Loretto Church Approach Road & Surrounds',
    landmark: 'From Main Archway to Church Presbytery Junction',
    householdsCount: 32,
    meetingSchedule: '2nd Sunday of every month at 4:30 PM',
    meetingDay: '2nd Sunday at 4:30 PM',
    venue: 'Rotating member residences (ವಾಡ್ಯಾ ಜಮಾತ್)',
    motto: 'ತೆರ್ಸಾಚ್ಯಾ ಮಾಗ್ಣ್ಯಾನ್ ಎಕ್ವಟ್ ಆನಿ ಶಾಂತಿ (Unity and Peace through the Holy Rosary)',
    description: 'Pompei Ward is located around the central church approach road, distinguished by daily family rosaries, strong choir representation, and enthusiastic participation in parish solemnities.',
    fullDescription: 'Dedicated to Our Lady of Pompei, this ward represents 32 devoted families in the immediate vicinity of the parish campus. The ward is renowned for traditional Konkani Marian hymnody during October Rosary devotions, exemplary catechism participation of its youth, and regular welfare visits to elderly and sick parishioners.',
    image: `${import.meta.env.BASE_URL}images/gallery-3.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Ronald Alvares',
      konkaniName: 'ಮಾನೇಸ್ತ್ ರೊನಾಲ್ಡ್ ಆಲ್ವಾರಿಸ್',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 94812 34567',
      address: 'Pompei Nagar, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Denis Fernandes',
        konkaniName: 'ಮಾನೇಸ್ತ್ ಡೆನಿಸ್ ಫೆರ್ನಾಂಡಿಸ್',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 98451 45678',
        photo: ''
      },
      {
        name: 'Mrs. Jacintha Moras',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ಜಸಿಂತಾ ಮೊರಾಸ್',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97412 56789',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'Liturgy In-Charge', name: 'Mr. Ronald D\'Silva', konkaniRole: 'ಲಿಟರ್ಜಿ ಮುಖೆಲಿ' },
      { role: 'Stree Sanghatan Rep', name: 'Mrs. Philomena D\'Souza', konkaniRole: 'ಸ್ತ್ರೀ ಸಂಘಟನ್ ಪ್ರತಿನಿಧಿ' },
      { role: 'Youth Animator', name: 'Kevin Fernandes', konkaniRole: 'ಯುವಜಣ್ ಪ್ರೇರಕ್' }
    ],
    activities: [
      'Grand daily family Rosary procession and devotions throughout the month of October.',
      'Coordinating altar decorations, liturgy animation, and choir for Feast of Nativity (Monti Fest).',
      'Regular monthly SCC meetings featuring Scriptural meditation and youth sharing.',
      'Emergency blood donation registry and hospital assistance for parishioners in need.',
      'Educational sponsorship for needy school students in the ward.'
    ],
    feastCelebration: {
      title: 'Our Lady of Pompei Ward Feast (ಪೊಂಪೈ ಮಾಂಯ್ಚೆಂ ಫೆಸ್ತ್)',
      date: 'First Sunday of October',
      description: 'The celebration includes solemn High Mass, candlelight Rosary procession around the ward boundaries, and a community cultural evening with traditional Konkani dinner.'
    },
    families: [
      { id: 1, head: 'Ronald Alvares & Family', konkaniHead: 'ರೊನಾಲ್ಡ್ ಆಲ್ವಾರಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Pompei Nagar', houseName: 'Rosary Haven' },
      { id: 2, head: 'Denis Fernandes & Family', konkaniHead: 'ಡೆನಿಸ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Church Approach Rd', houseName: 'St. Joseph Villa' },
      { id: 3, head: 'Jacintha Moras & Family', konkaniHead: 'ಜಸಿಂತಾ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Pompei Cross', houseName: 'Moras Nivas' },
      { id: 4, head: 'Cyril D\'Souza & Family', konkaniHead: 'ಸಿರಿಲ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Archway Road', houseName: 'Holy Family' },
      { id: 5, head: 'Elias Pinto & Family', konkaniHead: 'ಎಲಿಯಾಸ್ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Pompei Nagar', houseName: 'Pinto Abode' },
      { id: 6, head: 'Felix Rodrigues & Family', konkaniHead: 'ಫೆಲಿಕ್ಸ್ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Main Road', houseName: 'Peace Haven' },
      { id: 7, head: 'Gilbert D\'Silva & Family', konkaniHead: 'ಗಿಲ್ಬರ್ಟ್ ಡಿಸಿಲ್ವಾ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Pompei By-lane', houseName: 'Silva Crest' },
      { id: 8, head: 'Henry Cutinha & Family', konkaniHead: 'ಹೆನ್ರಿ ಕುಟಿನ್ಹಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Church Boundary', houseName: 'Ave Maria' },
      { id: 9, head: 'Ivan Lobo & Family', konkaniHead: 'ಐವನ್ ಲೋಬೊ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Pompei Nagar', houseName: 'Lobo Nivas' },
      { id: 10, head: 'Jerome Sequeira & Family', konkaniHead: 'ಜೆರೋಮ್ ಸಿಕ್ವೇರಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Near Convent', houseName: 'Grace Villa' },
      { id: 11, head: 'Lawrence Mascarenhas & Family', konkaniHead: 'ಲಾರೆನ್ಸ್ ಮಸ್ಕರೇನ್ಹಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Pompei 2nd Cross', houseName: 'Marian Manor' },
      { id: 12, head: 'Michael Crasta & Family', konkaniHead: 'ಮೈಕಲ್ ಕ್ರಾಸ್ತಾ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Main Road', houseName: 'Crasta Compound' },
      { id: 13, head: 'Norbert D\'Souza & Family', konkaniHead: 'ನೊರ್ಬರ್ಟ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Pompei Nagar', houseName: 'Bethel Nivas' },
      { id: 14, head: 'Patrick Fernandes & Family', konkaniHead: 'ಪ್ಯಾಟ್ರಿಕ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Pompei Heights', houseName: 'St. Antony\'s' },
      { id: 15, head: 'Richard D\'Almeida & Family', konkaniHead: 'ರಿಚರ್ಡ್ ಡಿ\'ಅಲ್ಮೇಡಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'School Road', houseName: 'Almeida House' },
      { id: 16, head: 'Simon Quadros & Family', konkaniHead: 'ಸೈಮನ್ ಕ್ವಾಡ್ರಸ್ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Pompei Cross', houseName: 'Quadros Villa' }
    ]
  },
  {
    id: 3,
    slug: 'arla-i-ward',
    name: 'Arla Ward I',
    konkaniName: 'ಆರ್ಲ 1 ವಾಡೊ',
    patronSaint: 'Sacred Heart of Jesus',
    konkaniPatron: 'ಜೆಜುಚೆಂ ಪವಿತ್ರ್ ಕಾಳಿಜ್',
    feastDate: 'June 19 (Solemnity of the Sacred Heart)',
    area: 'Arla Main Road, Bridge Junction & South Greenfields',
    landmark: 'Arla Stream Bridge to Lower Coconut Groves',
    householdsCount: 30,
    meetingSchedule: '3rd Sunday of every month at 4:00 PM',
    meetingDay: '3rd Sunday at 4:00 PM',
    venue: 'Rotating member residences (ವಾಡ್ಯಾ ಜಮಾತ್)',
    motto: 'ಜೆಜುಚ್ಯಾ ಕಾಳ್ಜಾಂತ್ ಎಕ್ವಟ್ ಆನಿ ಕಾಕೂತ್ (Unity and Mercy in Jesus’ Sacred Heart)',
    description: 'Arla Ward I is an active agricultural and residential ward characterized by deep Sacred Heart devotions, First Friday Holy Hours, and vibrant community service.',
    fullDescription: 'Embracing 30 families along the scenic Arla riverside, Arla I Ward is animated by the love of the Sacred Heart of Jesus. Ward members regularly assist bereaved families, lead month-long First Friday Eucharistic adoration hours, and run inter-ward cultural outreach programs.',
    image: `${import.meta.env.BASE_URL}images/gallery-1.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Valerian D\'Souza',
      konkaniName: 'ಮಾನೇಸ್ತ್ ವಲೇರಿಯನ್ ಡಿಸೋಜಾ',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 94490 56789',
      address: 'Arla Junction, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Melwyn Pinto',
        konkaniName: 'ಮಾನೇಸ್ತ್ ಮೆಲ್ವಿನ್ ಪಿಂಟೊ',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 98801 67890',
        photo: ''
      },
      {
        name: 'Mrs. Stella Rodrigues',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ಸ್ಟೆಲ್ಲಾ ರೊಡ್ರಿಗಸ್',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97312 78901',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'Liturgy Coordinator', name: 'Mrs. Irene Lobo', konkaniRole: 'ಲಿಟರ್ಜಿ ಸಂಯೋಜಕಿ' },
      { role: 'Youth Leader', name: 'Roshan D\'Souza', konkaniRole: 'ಯುವಜಣ್ ಮುಖೆಲಿ' },
      { role: 'Charity Cell In-charge', name: 'Mr. Joseph Fernandes', konkaniRole: 'ಸೇವಾ ವಿಭಾಗ್ ಮುಖೆಲಿ' }
    ],
    activities: [
      'First Friday home enthronement of the Sacred Heart for newly married and established families.',
      'Monthly SCC prayer meetings focusing on Gospel sharing, mutual reflection, and social concerns.',
      'Assisting farming families during monsoon sowing and harvest seasons through voluntary labor.',
      'Conducting annual ward picnic and games for children and senior citizens.'
    ],
    feastCelebration: {
      title: 'Sacred Heart Ward Feast (ಜೆಜುಚ್ಯಾ ಕಾಳ್ಜಾಚೆಂ ಫೆಸ್ತ್)',
      date: 'Late June (Feast of Sacred Heart)',
      description: 'Marked by a Solemn Eucharistic Holy Hour, community thanksgiving Mass at church, and an evening cultural get-together with Konkani drama skits and dinner.'
    },
    families: [
      { id: 1, head: 'Valerian D\'Souza & Family', konkaniHead: 'ವಲೇರಿಯನ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Arla Main Rd', houseName: 'Sacred Heart Villa' },
      { id: 2, head: 'Melwyn Pinto & Family', konkaniHead: 'ಮೆಲ್ವಿನ್ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Riverside View', houseName: 'Pinto Heritage' },
      { id: 3, head: 'Stella Rodrigues & Family', konkaniHead: 'ಸ್ಟೆಲ್ಲಾ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Bridge Cross', houseName: 'Grace Abode' },
      { id: 4, head: 'Anthony Pais & Family', konkaniHead: 'ಆಂಟನಿ ಪಾಯ್ಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Arla Greenfields', houseName: 'Pais Nivas' },
      { id: 5, head: 'Benedict D\'Silva & Family', konkaniHead: 'ಬೆನೆಡಿಕ್ಟ್ ಡಿಸಿಲ್ವಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Arla Lower Rd', houseName: 'Silver Valley' },
      { id: 6, head: 'Charles Moras & Family', konkaniHead: 'ಚಾರ್ಲ್ಸ್ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Arla Hills', houseName: 'Moras Manor' }
    ]
  },
  {
    id: 4,
    slug: 'arla-ii-ward',
    name: 'Arla Ward II',
    konkaniName: 'ಆರ್ಲ 2 ವಾಡೊ',
    patronSaint: 'St. Antony of Padua',
    konkaniPatron: 'ಸಾಂ ಅಂತೊನ್ ಪಾದುವಾ',
    feastDate: 'June 13',
    area: 'Arla Upper Hills, Forest Border & Eastern Settlements',
    landmark: 'Arla Hilltop Cross to Eastern Parish Boundary',
    householdsCount: 26,
    meetingSchedule: '2nd Sunday of every month at 3:30 PM',
    meetingDay: '2nd Sunday at 3:30 PM',
    venue: 'Rotating member residences (ವಾಡ್ಯಾ ಜಮಾತ್)',
    motto: 'ಅಂತೊನಿಚಿ ಭಕ್ತಿ ಆನಿ ದುಬ್ಳ್ಯಾಂಚಿ ಸೆವಾ (Devotion to St. Antony and Service to the Poor)',
    description: 'Arla Ward II is a serene hill-bound community known for Tuesday St. Antony Tredecima novenas, charitable grain distribution, and strong youth ministry leadership.',
    fullDescription: 'Home to 26 families under the celestial patronage of the Miracle Worker St. Antony of Padua, Arla II Ward actively carries forward Mangalore\'s cherished traditions of bread sharing (ಸಾಂ ಅಂತೊನಿಚೊ ಉಂದೊ), communal praying for lost intentions, and supporting sick parishioners with home visits.',
    image: `${import.meta.env.BASE_URL}images/gallery-4.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Cyprian Moras',
      konkaniName: 'ಮಾನೇಸ್ತ್ ಸಿಪ್ರಿಯನ್ ಮೊರಾಸ್',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 94801 89012',
      address: 'Arla Hills, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Naveen Fernandes',
        konkaniName: 'ಮಾನೇಸ್ತ್ ನವೀನ್ ಫೆರ್ನಾಂಡಿಸ್',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 98452 90123',
        photo: ''
      },
      {
        name: 'Mrs. Lavina D\'Souza',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ಲವೀನಾ ಡಿಸೋಜಾ',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97413 01234',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'Liturgy In-Charge', name: 'Mrs. Sunitha Pinto', konkaniRole: 'ಲಿಟರ್ಜಿ ಮುಖೆಲಿ' },
      { role: 'Youth Representative', name: 'Praveen Moras', konkaniRole: 'ಯುವಜಣ್ ಪ್ರತಿನಿಧಿ' }
    ],
    activities: [
      'Tuesday St. Antony bread distribution (ಸಾಂ ಅಂತೊನಿಚೊ ಉಂದೊ) to needy families.',
      'Monthly SCC prayer meetings rotating through family houses.',
      'Organizing inter-ward sports cheer squads and summer games for kids.',
      'Home visits and assistance to elderly parishioners living alone.'
    ],
    feastCelebration: {
      title: 'St. Antony Ward Feast (ಸಾಂ ಅಂತೊನಿಚೆಂ ಫೆಸ್ತ್)',
      date: 'Second Sunday of June',
      description: 'The feast begins with the 13-day St. Antony novena, culminating in concelebrated Holy Mass and distribution of blessed bread, followed by a fellowship banquet.'
    },
    families: [
      { id: 1, head: 'Cyprian Moras & Family', konkaniHead: 'ಸಿಪ್ರಿಯನ್ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Arla Hilltop', houseName: 'St. Antony Nivas' },
      { id: 2, head: 'Naveen Fernandes & Family', konkaniHead: 'ನವೀನ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Upper Arla', houseName: 'Fernandes Villa' },
      { id: 3, head: 'Lavina D\'Souza & Family', konkaniHead: 'ಲವೀನಾ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Hill Road', houseName: 'Lourdes Cottage' },
      { id: 4, head: 'Joseph Lobo & Family', konkaniHead: 'ಜೋಸೆಫ್ ಲೋಬೊ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Forest Road', houseName: 'Lobo Nest' },
      { id: 5, head: 'Antony Moras & Family', konkaniHead: 'ಆಂಟೊನಿ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Arla Cross', houseName: 'Padua Villa' },
      { id: 6, head: 'Benedicta D\'Souza & Family', konkaniHead: 'ಬೆನಡಿಕ್ಟಾ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Upper Hills', houseName: 'Grace Abode' },
      { id: 7, head: 'Clement Pinto & Family', konkaniHead: 'ಕ್ಲೆಮೆಂಟ್ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Arla Border', houseName: 'Pinto Haven' },
      { id: 8, head: 'Denis Sequeira & Family', konkaniHead: 'ಡೆನಿಸ್ ಸಿಕ್ವೇರಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'East Hill Road', houseName: 'Sequeira Nivas' },
      { id: 9, head: 'Francis D\'Almeida & Family', konkaniHead: 'ಫ್ರಾನ್ಸಿಸ್ ಡಿ\'ಅಲ್ಮೇಡಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Arla Terrace', houseName: 'Almeida House' },
      { id: 10, head: 'Gilbert Fernandes & Family', konkaniHead: 'ಗಿಲ್ಬರ್ಟ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Hilltop Lane', houseName: 'Fatima Villa' }
    ]
  },
  {
    id: 5,
    slug: 'sornad-ward',
    name: 'Sornad Ward',
    konkaniName: 'ಸೊರ್ನಾಡ್ ವಾಡೊ',
    patronSaint: 'St. Therese of the Child Jesus (Little Flower)',
    konkaniPatron: 'ಸಾಂ ತೆರೆಜ್ (ಲ್ಹಾನ್ ಫುಲ್)',
    feastDate: 'October 1',
    area: 'Sornad Cross Road, Agricultural Valley & Eastern Terraces',
    landmark: 'Sornad Bus Stop to Valley Streams',
    householdsCount: 31,
    meetingSchedule: '4th Sunday of every month at 4:00 PM',
    meetingDay: '4th Sunday at 4:00 PM',
    venue: 'Rotating member residences (ವಾಡ್ಯಾ ಜಮಾತ್)',
    motto: 'ಲ್ಹಾನ್ ಕಾರ್ಯಾಂ ವ್ಹಡ್ ಮೊಗಾನ್ ಕರ್ಯಾಂ (Do Small Things with Great Love)',
    description: 'Sornad Ward is an energetic and devout community animated by the "Little Way" of St. Therese, excelling in parish youth programs, catechism, and choir.',
    fullDescription: 'Comprising 31 faithful families, Sornad Ward models the spiritual simplicity and boundless charity of St. Therese of Lisieux. The ward takes immense pride in training altar servers, animating vibrant choir singing, and cultivating community organic gardens to share produce with destitute families.',
    image: `${import.meta.env.BASE_URL}images/gallery-5.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Godwin D\'Almeida',
      konkaniName: 'ಮಾನೇಸ್ತ್ ಗಾಡ್ವಿನ್ ಡಿ\'ಅಲ್ಮೇಡಾ',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 94481 01234',
      address: 'Sornad Junction, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Roshan Pinto',
        konkaniName: 'ಮಾನೇಸ್ತ್ ರೋಷನ್ ಪಿಂಟೊ',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 98802 12345',
        photo: ''
      },
      {
        name: 'Mrs. Marina Sequeira',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ಮರೀನಾ ಸಿಕ್ವೇರಾ',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97314 23456',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'Choir Leader', name: 'Mr. Avil D\'Souza', konkaniRole: 'ಗಾಯನ್ ಮಂಡಳಿ ಮುಖೆಲಿ' },
      { role: 'Catechism Animator', name: 'Mrs. Jacintha Fernandes', konkaniRole: 'ದೇವ್ ಸತ್ ಪ್ರೇರಕಿ' }
    ],
    activities: [
      'Distribution of rose petals and prayers for missionary vocations on Little Flower feast.',
      'Monthly SCC meetings with Bible quiz and youth testimonies.',
      'Organizing annual ward drama, Konkani jokes, and family cultural nights.',
      'Helping ward students with scholarship guidance and coaching.'
    ],
    feastCelebration: {
      title: 'St. Therese Ward Feast (ಸಾಂ ತೆರೆಜ್ ಫೆಸ್ತ್)',
      date: 'First Sunday of October',
      description: 'Solemn Thanksgiving Mass with blessing of roses, followed by family get-together, traditional Konkani lunch, and honoring senior citizens of Sornad.'
    },
    families: [
      { id: 1, head: 'Godwin D\'Almeida & Family', konkaniHead: 'ಗಾಡ್ವಿನ್ ಡಿ\'ಅಲ್ಮೇಡಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Sornad Cross', houseName: 'Little Flower Villa' },
      { id: 2, head: 'Roshan Pinto & Family', konkaniHead: 'ರೋಷನ್ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Sornad Main Road', houseName: 'Pinto Haven' },
      { id: 3, head: 'Marina Sequeira & Family', konkaniHead: 'ಮರೀನಾ ಸಿಕ್ವೇರಾ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Valley View', houseName: 'Sequeira Abode' },
      { id: 4, head: 'Walter D\'Souza & Family', konkaniHead: 'ವಾಲ್ಟರ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Sornad Terraces', houseName: 'Carmel Cottage' },
      { id: 5, head: 'Alexander Cutinha & Family', konkaniHead: 'ಅಲೆಕ್ಸಾಂಡರ್ ಕುಟಿನ್ಹಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Sornad Junction', houseName: 'Cutinha Nivas' },
      { id: 6, head: 'Benedict Fernandes & Family', konkaniHead: 'ಬೆನೆಡಿಕ್ಟ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Valley Stream Rd', houseName: 'Ferns Nest' },
      { id: 7, head: 'Cyril Moras & Family', konkaniHead: 'ಸಿರಿಲ್ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Sornad Hill', houseName: 'Moras Cottage' },
      { id: 8, head: 'Daniel Lobo & Family', konkaniHead: 'ಡೇನಿಯಲ್ ಲೋಬೊ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Sornad Cross', houseName: 'Peace Haven' },
      { id: 9, head: 'Elias Rodrigues & Family', konkaniHead: 'ಎಲಿಯಾಸ್ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Green View', houseName: 'Rodrigues Manor' },
      { id: 10, head: 'Francis D\'Silva & Family', konkaniHead: 'ಫ್ರಾನ್ಸಿಸ್ ಡಿಸಿಲ್ವಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Sornad Main Rd', houseName: 'Silva Villa' }
    ]
  },
  {
    id: 6,
    slug: 'nithyadar-ward',
    name: 'Nithyadar Ward',
    konkaniName: 'ನಿತ್ಯಾದರ್ ವಾಡೊ',
    patronSaint: 'Our Lady of Perpetual Succour',
    konkaniPatron: 'ನಿತ್ಯಾದರ್ ಮಾಂಯ್',
    feastDate: 'June 27',
    area: 'Nithyadar Nagar, Western Approach & Farm Estates',
    landmark: 'From Western Arch to Nithyadar Shrine',
    householdsCount: 29,
    meetingSchedule: '1st Sunday of every month at 4:30 PM',
    meetingDay: '1st Sunday at 4:30 PM',
    venue: 'Rotating member residences (ವಾಡ್ಯಾ ಜಮಾತ್)',
    motto: 'ನಿತ್ಯಾದರ್ ಮಾಂಯ್ಚ್ಯಾ ಆಸ್ರ್ಯಾಂತ್ ಭಾವಾರ್ಥಾಚಿ ವಾಡಾವಳ್ (Growing in Faith under Mother of Perpetual Help)',
    description: 'Nithyadar Ward is a warm community marked by Wednesday Perpetual Succour novenas, dedicated rosary groups, and active participation in St. Vincent de Paul Society.',
    fullDescription: 'Nithyadar Ward unites 29 Catholic households under the protective care of Our Lady of Perpetual Succour. The ward maintains a vibrant Small Christian Community culture with high attendance at Bible sharing sessions, regular health-check camps for parishioners, and dedicated support for the church parish hall initiatives.',
    image: `${import.meta.env.BASE_URL}images/gallery-6.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Lancy Moras',
      konkaniName: 'ಮಾನೇಸ್ತ್ ಲಾನ್ಸಿ ಮೊರಾಸ್',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 94813 45678',
      address: 'Nithyadar Nagar, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Santhosh D\'Souza',
        konkaniName: 'ಮಾನೇಸ್ತ್ ಸಂತೋಷ್ ಡಿಸೋಜಾ',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 98453 56789',
        photo: ''
      },
      {
        name: 'Mrs. Flavia Fernandes',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ಫ್ಲೇವಿಯಾ ಫೆರ್ನಾಂಡಿಸ್',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97414 67890',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'SCC Animator', name: 'Mrs. Veronica Pinto', konkaniRole: 'ಸಣ್ಣ ಸಮುದಾಯ್ ಪ್ರೇರಕಿ' },
      { role: 'Youth In-Charge', name: 'Ritesh Moras', konkaniRole: 'ಯುವಜಣ್ ಸಂಚಾಲಕ್' }
    ],
    activities: [
      'Weekly Wednesday family devotions to Our Lady of Perpetual Succour.',
      'Monthly SCC prayer meetings with reflective Scripture readings and shared meals.',
      'Distribution of medical aid and provisions to needy elderly ward members.',
      'Organizing annual ward pilgrimage to neighboring Marian shrines.'
    ],
    feastCelebration: {
      title: 'Our Lady of Perpetual Succour Ward Feast (ನಿತ್ಯಾದರ್ ಮಾಂಯ್ಚೆಂ ಫೆಸ್ತ್)',
      date: 'Last Sunday of June',
      description: 'Grand thanksgiving Mass, floral offering at the Mother Mary statue, and a community gala dinner with Konkani cultural dances.'
    },
    families: [
      { id: 1, head: 'Lancy Moras & Family', konkaniHead: 'ಲಾನ್ಸಿ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Nithyadar Nagar', houseName: 'Moras Villa' },
      { id: 2, head: 'Santhosh D\'Souza & Family', konkaniHead: 'ಸಂತೋಷ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Nithyadar Cross', houseName: 'Perpetual Help' },
      { id: 3, head: 'Flavia Fernandes & Family', konkaniHead: 'ಫ್ಲೇವಿಯಾ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Shrine Road', houseName: 'Ave Maria' },
      { id: 4, head: 'Clifford Pinto & Family', konkaniHead: 'ಕ್ಲಿಫರ್ಡ್ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Nithyadar West', houseName: 'Pinto Nest' },
      { id: 5, head: 'Albert Sequeira & Family', konkaniHead: 'ಆಲ್ಬರ್ಟ್ ಸಿಕ್ವೇರಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Nithyadar East', houseName: 'Sequeira House' },
      { id: 6, head: 'Bernard D\'Souza & Family', konkaniHead: 'ಬೆರ್ನಾರ್ಡ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Nagar Cross', houseName: 'Bethel' },
      { id: 7, head: 'Charles Cutinha & Family', konkaniHead: 'ಚಾರ್ಲ್ಸ್ ಕುಟಿನ್ಹಾ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Farm Estates', houseName: 'Grace Villa' },
      { id: 8, head: 'Denzil Moras & Family', konkaniHead: 'ಡೆನ್ಜಿಲ್ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Western By-lane', houseName: 'Moras Nivas' }
    ]
  },
  {
    id: 7,
    slug: 'loretto-church-ward',
    name: 'Loretto Church Ward',
    konkaniName: 'ಲೊರೆಟ್ಟೊ ವಾಡೊ',
    patronSaint: 'Our Lady of Loretto',
    konkaniPatron: 'ಲೊರೆಟ್ಟೊ ಮಾಂಯ್',
    feastDate: 'December 10',
    area: 'Central Loretto, Church Presbytery & Convent Campus',
    landmark: 'Parish Church Campus, Higher Primary School & Convent',
    householdsCount: 35,
    meetingSchedule: '2nd Sunday of every month at 4:00 PM',
    meetingDay: '2nd Sunday at 4:00 PM',
    venue: 'Rotating member residences (ವಾಡ್ಯಾ ಜಮಾತ್)',
    motto: 'ಲೊರೆಟ್ಟೊ ಮಾಂಯ್ಚ್ಯಾ ಪಾವ್ಲಾಂನಿ ಭಾವಾರ್ಥ್ ಆನಿ ಸೆವಾ (Faith and Service in the Footsteps of Our Lady of Loretto)',
    description: 'The historic mother ward surrounding the church grounds, actively driving major parish festivals, liturgical animations, and volunteer works.',
    fullDescription: 'Encompassing 35 households at the very heart of the parish, Loretto Church Ward shares a historic bond with Our Lady of Loretto Church. Its parishioners assist in parish council initiatives, organize church campus upkeep drives, animate solemn High Masses, and lead diocesan social communication efforts.',
    image: `${import.meta.env.BASE_URL}images/gallery-3.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Francis D\'Souza',
      konkaniName: 'ಮಾನೇಸ್ತ್ ಫ್ರಾನ್ಸಿಸ್ ಡಿಸೋಜಾ',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 94482 67890',
      address: 'Near Church Grounds, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Maxim Pinto',
        konkaniName: 'ಮಾನೇಸ್ತ್ ಮ್ಯಾಕ್ಸಿಮ್ ಪಿಂಟೊ',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 98803 78901',
        photo: ''
      },
      {
        name: 'Mrs. Pramila Rodrigues',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ಪ್ರಮಿಳಾ ರೊಡ್ರಿಗಸ್',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97315 89012',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'Liturgy Coordinator', name: 'Mrs. Rita D\'Souza', konkaniRole: 'ಲಿಟರ್ಜಿ ಸಂಯೋಜಕಿ' },
      { role: 'Parish Volunteers Lead', name: 'Mr. Jeevan Fernandes', konkaniRole: 'ಸ್ವಯಂಸೇವಕ್ ಮುಖೆಲಿ' }
    ],
    activities: [
      'Leading overall parish decorations and volunteer corps for the annual December Parish Feast.',
      'Active participation in the Sunday 7-Step SCC Bible meditation gatherings.',
      'Assisting the Parish Office in distributing monthly parish bulletins and notifications.',
      'Hosting welcome receptions for newly ordained priests and visiting clergy.'
    ],
    feastCelebration: {
      title: 'Our Lady of Loretto Ward Feast (ಲೊರೆಟ್ಟೊ ಮಾಂಯ್ಚೆಂ ಫೆಸ್ತ್)',
      date: 'Second Sunday of December',
      description: 'Celebrated alongside the grand annual Parish Feast of Our Lady of Loretto with candlelight procession, high solemnity, and a grand parish-wide fellowship meal.'
    },
    families: [
      { id: 1, head: 'Francis D\'Souza & Family', konkaniHead: 'ಫ್ರಾನ್ಸಿಸ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Church Road', houseName: 'Loretto Villa' },
      { id: 2, head: 'Maxim Pinto & Family', konkaniHead: 'ಮ್ಯಾಕ್ಸಿಮ್ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Presbytery Lane', houseName: 'Pinto Mansion' },
      { id: 3, head: 'Pramila Rodrigues & Family', konkaniHead: 'ಪ್ರಮಿಳಾ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Convent Road', houseName: 'Rodrigues Manor' },
      { id: 4, head: 'Herald Cutinha & Family', konkaniHead: 'ಹೆರಾಲ್ಡ್ ಕುಟಿನ್ಹಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'School Junction', houseName: 'Cutinha Nivas' },
      { id: 5, head: 'Joseph Sequeira & Family', konkaniHead: 'ಜೋಸೆಫ್ ಸಿಕ್ವೇರಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Main Gate Road', houseName: 'St. Mary’s' },
      { id: 6, head: 'Lawrence Lobo & Family', konkaniHead: 'ಲಾರೆನ್ಸ್ ಲೋಬೊ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Church Cross', houseName: 'Lobo Villa' },
      { id: 7, head: 'Martin Fernandes & Family', konkaniHead: 'ಮಾರ್ಟಿನ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Presbytery Road', houseName: 'Fernandes Abode' },
      { id: 8, head: 'Norbert D\'Silva & Family', konkaniHead: 'ನೊರ್ಬರ್ಟ್ ಡಿಸಿಲ್ವಾ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Church Grounds', houseName: 'Silva Cottage' }
    ]
  },
  {
    id: 8,
    slug: 'st-francis-xavier-ward',
    name: 'St. Francis Xavier Ward',
    konkaniName: 'ಸಾಂ ಫ್ರಾನ್ಸಿಸ್ ಕ್ಷೇವಿಯರ್ ವಾಡೊ',
    patronSaint: 'St. Francis Xavier',
    konkaniPatron: 'ಸಾಂ ಫ್ರಾನ್ಸಿಸ್ ಕ್ಷೇವಿಯರ್ (ಗೋಂಯ್ಚೊ ಸಾಯ್ಬ್)',
    feastDate: 'December 3',
    area: 'Xavier Nagar, North-Eastern Slopes & Plantations',
    landmark: 'North Hill Road to Plantation Valley',
    householdsCount: 27,
    meetingSchedule: '3rd Sunday of every month at 4:00 PM',
    meetingDay: '3rd Sunday at 4:00 PM',
    venue: 'Rotating member residences (ವಾಡ್ಯಾ ಜಮಾತ್)',
    motto: 'ಮಿಶನ್ ಆನಿ ಸುಸಮಾಚಾರ್ ಪರ್ಗಟ್ಣಿ (Mission and Gospel Proclamation)',
    description: 'A devoted community inspired by the Patron of the Missions, known for mission Sunday sales, parish catechism teachers, and social charity.',
    fullDescription: 'Under the heavenly patron Saint Francis Xavier (Goyncho Saib), this ward of 27 households exemplifies vibrant missionary zeal. Ward members actively volunteer in teaching catechism to parish children, organizing Mission Sunday food stalls, and fostering prayerful unity among neighbors.',
    image: `${import.meta.env.BASE_URL}images/gallery-2.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Baptist Rodrigues',
      konkaniName: 'ಮಾನೇಸ್ತ್ ಬಾಪ್ತಿಸ್ಟ್ ರೊಡ್ರಿಗಸ್',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 94814 78901',
      address: 'Xavier Nagar, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Vincent D\'Cunha',
        konkaniName: 'ಮಾನೇಸ್ತ್ ವಿನ್ಸೆಂಟ್ ಡಿಕುನ್ಹಾ',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 98454 89012',
        photo: ''
      },
      {
        name: 'Mrs. Nancy Lobo',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ನ್ಯಾನ್ಸಿ ಲೋಬೊ',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97415 90123',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'Mission Sunday Cell', name: 'Mr. Richard Pinto', konkaniRole: 'ಮಿಶನ್ ಸೆವಾ ಮುಖೆಲಿ' },
      { role: 'SCC In-Charge', name: 'Mrs. Janet Fernandes', konkaniRole: 'ಸಮುದಾಯ್ ಸಂಯೋಜಕಿ' }
    ],
    activities: [
      'Mission Sunday stall setup and charity collections for diocesan missions.',
      'Monthly SCC prayer meetings with meditation on apostolic mission.',
      'Sponsoring textbooks and school supplies for economically weak students.',
      'Visiting bereaved families to offer rosaries and emotional support.'
    ],
    feastCelebration: {
      title: 'St. Francis Xavier Ward Feast (ಸಾಂ ಫ್ರಾನ್ಸಿಸ್ ಕ್ಷೇವಿಯರ್ ಫೆಸ್ತ್)',
      date: 'First Sunday of December',
      description: 'Concelebrated thanksgiving Mass, novena prayers to Goyncho Saib, and a cheerful evening family fellowship with music and games.'
    },
    families: [
      { id: 1, head: 'Baptist Rodrigues & Family', konkaniHead: 'ಬಾಪ್ತಿಸ್ಟ್ ರೊಡ್ರಿಗಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Xavier Nagar', houseName: 'Xavier Villa' },
      { id: 2, head: 'Vincent D\'Cunha & Family', konkaniHead: 'ವಿನ್ಸೆಂಟ್ ಡಿಕುನ್ಹಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Plantation Road', houseName: 'D\'Cunha Abode' },
      { id: 3, head: 'Nancy Lobo & Family', konkaniHead: 'ನ್ಯಾನ್ಸಿ ಲೋಬೊ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'North Slope', houseName: 'Lobo Heritage' },
      { id: 4, head: 'Anthony D\'Souza & Family', konkaniHead: 'ಆಂಟನಿ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Xavier Hill', houseName: 'St. Francis House' },
      { id: 5, head: 'Benedict Moras & Family', konkaniHead: 'ಬೆನೆಡಿಕ್ಟ್ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'North Cross', houseName: 'Moras Nivas' },
      { id: 6, head: 'Clarence Pinto & Family', konkaniHead: 'ಕ್ಲಾರೆನ್ಸ್ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Plantation Lane', houseName: 'Pinto Villa' }
    ]
  },
  {
    id: 9,
    slug: 'vailankanni-ward',
    name: 'Vailankanni Ward',
    konkaniName: 'ವೆಲಂಕಣಿ ವಾಡೊ',
    patronSaint: 'Our Lady of Good Health, Vailankanni',
    konkaniPatron: 'ವೆಲಂಕಣಿ ಸಾಯ್ಬಿಣ್ (ಭಲಾಯ್ಕೆಚಿ ಮಾತಾ)',
    feastDate: 'September 8 (Nativity of Blessed Virgin Mary)',
    area: 'Vailankanni Nagar, South-West Estates & Green Valleys',
    landmark: 'From South Valley Cross to Stream Border',
    householdsCount: 30,
    meetingSchedule: '2nd Sunday of every month at 4:30 PM',
    meetingDay: '2nd Sunday at 4:30 PM',
    venue: 'Rotating member residences (ವಾಡ್ಯಾ ಜಮಾತ್)',
    motto: 'ಭಲಾಯ್ಕಿ ಆನಿ ಕೃಪೆಚಿ ಮಾತಾ ಆಮ್ಕಾಂ ಪಾವ್ (Mother of Health and Grace, Pray for Us)',
    description: 'A vibrant ward known for active family rosary chains, grand Monti Fest sugarcane and floral preparations, and compassionate healthcare outreach.',
    fullDescription: 'Dedicated to Mother Mary under the title of Our Lady of Vailankanni, this community of 30 families is active in promoting health awareness, providing ambulance assistance coordination for parish elders, and leading festive Konkani singing during the 9 days of Monti Fest novenas.',
    image: `${import.meta.env.BASE_URL}images/gallery-1.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Jossy Fernandes',
      konkaniName: 'ಮಾನೇಸ್ತ್ ಜೋಸಿ ಫೆರ್ನಾಂಡಿಸ್',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 94483 89012',
      address: 'Vailankanni Nagar, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Anil D\'Souza',
        konkaniName: 'ಮಾನೇಸ್ತ್ ಅನಿಲ್ ಡಿಸೋಜಾ',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 98804 90123',
        photo: ''
      },
      {
        name: 'Mrs. Shanthi Pinto',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ಶಾಂತಿ ಪಿಂಟೊ',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97316 01234',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'Health & Charity Lead', name: 'Mrs. Philomena Moras', konkaniRole: 'ಆರೋಗ್ಯ್ ಆನಿ ಸೆವಾ ಮುಖೆಲಿ' },
      { role: 'Youth Coordinator', name: 'Preetham Fernandes', konkaniRole: 'ಯುವಜಣ್ ಸಂಯೋಜಕ್' }
    ],
    activities: [
      'Flower preparation and leading children in Monti Fest (ಮೊಂತಿ ಫೆಸ್ತ್) floral offerings.',
      'Monthly SCC meetings rotated among member families.',
      'Organizing health and eye checkup camps for parish community members.',
      'Support fund for terminal medical care of poor families.'
    ],
    feastCelebration: {
      title: 'Our Lady of Vailankanni Ward Feast (ವೆಲಂಕಣಿ ಸಾಯ್ಬಿಣಿಚೆಂ ಫೆಸ್ತ್)',
      date: 'Second Sunday of September',
      description: 'Solemn thanksgiving Mass celebrating the Nativity of Mother Mary, sharing of blessed new corn (ನೊವೆಂ ಜೆವಣ್), and cultural fellowship banquet.'
    },
    families: [
      { id: 1, head: 'Jossy Fernandes & Family', konkaniHead: 'ಜೋಸಿ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Vailankanni Nagar', houseName: 'Vailankanni Nivas' },
      { id: 2, head: 'Anil D\'Souza & Family', konkaniHead: 'ಅನಿಲ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'South Valley', houseName: 'D\'Souza Villa' },
      { id: 3, head: 'Shanthi Pinto & Family', konkaniHead: 'ಶಾಂತಿ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Green View', houseName: 'Grace Abode' },
      { id: 4, head: 'Cyril Sequeira & Family', konkaniHead: 'ಸಿರಿಲ್ ಸಿಕ್ವೇರಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Stream Road', houseName: 'Sequeira Cottage' },
      { id: 5, head: 'Edward Moras & Family', konkaniHead: 'ಎಡ್ವರ್ಡ್ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'South Cross', houseName: 'Moras Nivas' },
      { id: 6, head: 'Francis Lobo & Family', konkaniHead: 'ಫ್ರಾನ್ಸಿಸ್ ಲೋಬೊ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Vailankanni By-lane', houseName: 'Lobo Haven' },
      { id: 7, head: 'George D\'Almeida & Family', konkaniHead: 'ಜಾರ್ಜ್ ಡಿ\'ಅಲ್ಮೇಡಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Valley Border', houseName: 'Almeida House' }
    ]
  },
  {
    id: 10,
    slug: 'infant-jesus-ward',
    name: 'Infant Jesus Ward',
    konkaniName: 'ಬಾಳೊಕ್ ಜೆಜು ವಾಡೊ',
    patronSaint: 'Infant Jesus of Prague',
    konkaniPatron: 'ಬಾಳೊಕ್ ಜೆಜು',
    feastDate: 'January 14',
    area: 'Balok Jezu Nagar, Western Heights & Valley Borders',
    landmark: 'From Western Hilltop Shrine to Outer Parish Border',
    householdsCount: 27,
    meetingSchedule: '1st Sunday of every month at 3:30 PM',
    meetingDay: '1st Sunday at 3:30 PM',
    venue: 'Rotating member residences (ವಾಡ್ಯಾ ಜಮಾತ್)',
    motto: 'ಜೆಜುಚ್ಯಾ ಬಾಳ್ಪಣಾಚೊ ಮೊಗ್ ಆನಿ ನಿರ್ಮಳ್ ಜಿವಿತ್ (Love and Purity in Infant Jesus)',
    description: 'An enthusiastic ward noted for Thursday Infant Jesus novenas, vibrant children\'s ministry, Christmas crib building, and parish sports participation.',
    fullDescription: 'Infant Jesus Ward brings together 27 Catholic families under the beloved patronage of Infant Jesus of Prague. Known for high energy and devotion, the ward leads the parish in annual Christmas crib displays, children\'s choir, and charitable drives during Advent.',
    image: `${import.meta.env.BASE_URL}images/gallery-4.jpg`,
    spiritualDirector: 'Rev. Fr. Parish Priest',
    gurkar: {
      name: 'Mr. Sylvester D\'Souza',
      konkaniName: 'ಮಾನೇಸ್ತ್ ಸಿಲ್ವೆಸ್ಟರ್ ಡಿಸೋಜಾ',
      role: 'Gurkar (Ward Leader)',
      konkaniRole: 'ಗುರ್ಕಾರ್',
      phone: '+91 94815 90123',
      address: 'Balok Jezu Nagar, Loretto',
      photo: ''
    },
    representatives: [
      {
        name: 'Mr. Praveen Moras',
        konkaniName: 'ಮಾನೇಸ್ತ್ ಪ್ರವೀಣ್ ಮೊರಾಸ್',
        role: 'Male Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ದಾಡ್ಲೊ)',
        phone: '+91 98455 01234',
        photo: ''
      },
      {
        name: 'Mrs. Leena Sequeira',
        konkaniName: 'ಮಾನೇಸ್ತಿನ್ ಲೀನಾ ಸಿಕ್ವೇರಾ',
        role: 'Female Representative (Council Member)',
        konkaniRole: 'ಪ್ರತಿನಿದಿ (ಸ್ತ್ರೀ)',
        phone: '+91 97416 12345',
        photo: ''
      }
    ],
    president: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    vicePresident: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    secretary: { name: '', konkaniName: '', phone: '', address: '', photo: '' },
    committee: [
      { role: 'Children Ministry Lead', name: 'Mrs. Veena Pinto', konkaniRole: 'ಭುರ್ಗ್ಯಾಂಚೊ ವಿಭಾಗ್ ಮುಖೆಲಿ' },
      { role: 'Youth Leader', name: 'Joywin D\'Souza', konkaniRole: 'ಯುವಜಣ್ ಮುಖೆಲಿ' }
    ],
    activities: [
      'Thursday family novena to Infant Jesus of Prague.',
      'Monthly SCC Gospel reflection and family fellowship.',
      'Organizing the ward\'s famous Christmas Crib and caroling rounds to every household.',
      'Summer sports camps and spiritual orientation for ward children.'
    ],
    feastCelebration: {
      title: 'Infant Jesus Ward Feast (ಬಾಳೊಕ್ ಜೆಜು ಫೆಸ್ತ್)',
      date: 'Second Sunday of January',
      description: 'Solemn thanksgiving Holy Mass, blessing of children, followed by a festive community banquet with cultural performances and games.'
    },
    families: [
      { id: 1, head: 'Sylvester D\'Souza & Family', konkaniHead: 'ಸಿಲ್ವೆಸ್ಟರ್ ಡಿಸೋಜಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Balok Jezu Nagar', houseName: 'Prague Nivas' },
      { id: 2, head: 'Praveen Moras & Family', konkaniHead: 'ಪ್ರವೀಣ್ ಮೊರಾಸ್ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Western Heights', houseName: 'Moras Villa' },
      { id: 3, head: 'Leena Sequeira & Family', konkaniHead: 'ಲೀನಾ ಸಿಕ್ವೇರಾ ಆನಿ ಕುಟಾಮ್', members: 3, address: 'Valley Border', houseName: 'Holy Infant House' },
      { id: 4, head: 'Anthony Pinto & Family', konkaniHead: 'ಆಂಟನಿ ಪಿಂಟೊ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Shrine View', houseName: 'Pinto Haven' },
      { id: 5, head: 'Benedict Lobo & Family', konkaniHead: 'ಬೆನೆಡಿಕ್ಟ್ ಲೋಬೊ ಆನಿ ಕುಟಾಮ್', members: 5, address: 'Hilltop Cross', houseName: 'Lobo Nest' },
      { id: 6, head: 'Charles D\'Cunha & Family', konkaniHead: 'ಚಾರ್ಲ್ಸ್ ಡಿಕುನ್ಹಾ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Western By-lane', houseName: 'D\'Cunha Villa' },
      { id: 7, head: 'Denis Fernandes & Family', konkaniHead: 'ಡೆನಿಸ್ ಫೆರ್ನಾಂಡಿಸ್ ಆನಿ ಕುಟಾಮ್', members: 4, address: 'Balok Jezu Nagar', houseName: 'Grace Abode' }
    ]
  }
];
