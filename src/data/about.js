const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`;

export const initialAboutContent = {
  parish: {
    heroTitle: 'Our Parish',
    contentHeading: 'Welcome to {churchName} Parish',
    image: asset('church-exterior.jpg'),
    imageCaption: '{churchName} - Loretto, Mangalore',
    introduction: "{churchName}, situated in Loretto, Mangalore, is a sacred home of faith, hope and Christian service. Our parish community is dedicated to worshipping God, growing in communion, and spreading Christ's love across the region.",
    missionHeading: 'Our Parish Mission',
    mission: 'To build a vibrant, prayerful Catholic community rooted in the Word of God and the Eucharist, actively engaged in pastoral care, catechism, youth formation, and charitable outreach under the patronage of Our Lady of Loretto.',
  },
  history: {
    heroTitle: 'Church History',
    sectionHeading: 'Historical Milestones',
    sectionSubtitle: 'Journey through the rich foundation and growth of Our Lady of Loretto Parish',
    image: asset('church-exterior.jpg'),
    imageAlt: 'Our Lady of Loretto Church - historical landmark',
  },
  patroness: {
    heroTitle: 'Our Lady of Loreto',
    image: asset('patroness-mary.jpg'),
    imageAlt: 'Our Lady of Loreto',
    devotionalTitle: 'Our Lady of Loreto, Pray For Us',
    feastLabel: 'Annual Feast Day',
    feastDate: 'December 10',
    significanceHeading: 'The Significance of Our Lady of Loreto',
    significanceParagraphOne: 'The title Our Lady of Loretto refers to the Holy House of Loreto, the sacred dwelling in Nazareth where the Virgin Mary was born, received the Annunciation from the Angel Gabriel, and raised Jesus Christ with St. Joseph.',
    significanceParagraphTwo: 'Our parish in Loretto, Mangalore invokes Mother Mary under this cherished Marian title, seeking her guidance, peace, and maternal intercession for all families in our community.',
    prayerHeading: 'Prayer to Our Lady of Loreto',
    prayer: 'O Holy Mother of God, Queen of Heaven and Patroness of Our Parish, look with love upon your children gathered under your mantle. Intercede for our families, protect our youth, comfort the sick, and guide our parish community in faithful witness to your Divine Son. Amen.',
  },
  diocese: {
    heroTitle: 'Diocese of Mangalore',
    sectionHeading: 'Diocese of Mangalore',
    introduction: 'Our Lady of Loretto Church operates under the spiritual jurisdiction of the Roman Catholic Diocese of Mangalore, a historic Latin Rite diocese established in 1886.',
    regionTitle: 'Ecclesiastical Region',
    regionDescription: 'Covering Dakshina Kannada and Udupi districts of Karnataka, with centuries of rich Catholic tradition.',
    governanceTitle: 'Pastoral Governance',
    governanceDescription: 'Guided by the Bishop of Mangalore, fostering pastoral care, education, and social service initiatives.',
  },
};
