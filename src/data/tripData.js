export const districts = [
  'Central Delhi',
  'East Delhi',
  'New Delhi',
  'North Delhi',
  'North East Delhi',
  'North West Delhi',
  'Shahdara',
  'South Delhi',
  'South East Delhi',
  'South West Delhi',
  'West Delhi',
];

const distances = [
  [0, 14, 9, 18, 10, 20, 6, 10000, 18, 10000, 19],
  [14, 0, 10000, 10000, 10000, 10000, 9, 10000, 13, 10000, 10000],
  [9, 10000, 0, 10000, 10000, 10000, 10000, 16, 10, 22, 20],
  [18, 10000, 10000, 0, 21, 22, 10000, 10000, 10000, 10000, 10000],
  [10, 10000, 10000, 21, 0, 10000, 7, 10000, 10000, 10000, 10000],
  [20, 10000, 10000, 22, 10000, 0, 10000, 10000, 10000, 10000, 9],
  [6, 9, 10000, 10000, 7, 10000, 0, 10000, 10000, 10000, 10000],
  [10000, 10000, 16, 10000, 10000, 10000, 10000, 0, 16, 10000, 10000],
  [18, 13, 10, 10000, 10000, 10000, 10000, 16, 0, 10000, 10000],
  [10000, 10000, 22, 10000, 10000, 10000, 10000, 10000, 10000, 0, 14],
  [19, 10000, 20, 10000, 10000, 9, 10000, 10000, 10000, 14, 0],
];

const trafficLevels = ['LOW', 'NORMAL', 'HIGH'];
const trafficByEdge = {
  '0-1': 1,
  '0-2': 0,
  '0-3': 2,
  '0-4': 0,
  '0-5': 1,
  '0-6': 0,
  '0-8': 2,
  '0-10': 1,
  '1-6': 0,
  '1-8': 1,
  '2-7': 1,
  '2-8': 0,
  '2-9': 2,
  '2-10': 1,
  '3-4': 2,
  '3-5': 1,
  '4-6': 0,
  '5-10': 0,
  '7-8': 1,
  '9-10': 2,
};

export const roads = distances.flatMap((row, source) =>
  row.flatMap((distance, target) => {
    if (target <= source || distance >= 10000 || distance === 0) return [];
    const key = `${source}-${target}`;
    const trafficIndex = trafficByEdge[key] ?? (distance % 3);
    const traffic = trafficLevels[trafficIndex];
    const speedMultiplier = [1, 0.7, 0.4][trafficIndex];
    const time = Math.max(0.08, Math.min(2, distance / (25 * speedMultiplier)));
    return [{ source: districts[source], target: districts[target], distance, traffic, time: Number(time.toFixed(2)) }];
  }),
);

export const activities = [
  { id: 0, name: 'AB Exhibition', start: 10, end: 12, cost: 250, description: "Art and culture exhibition showcasing Delhi's heritage" },
  { id: 1, name: 'Heritage Walk', start: 6, end: 9, cost: 150, description: "Guided morning walk through Old Delhi's historic lanes" },
  { id: 2, name: 'Fireworks Show', start: 21, end: 22, cost: 300, description: 'Evening fireworks display at India Gate' },
  { id: 3, name: 'Light Show', start: 17, end: 18, cost: 200, description: 'Sound and light show at Red Fort' },
  { id: 4, name: 'CD Exhibition', start: 14, end: 16, cost: 180, description: 'Contemporary design exhibition at National Gallery' },
  { id: 5, name: 'Monuments Tour', start: 11, end: 14, cost: 400, description: "Half-day tour covering Qutub Minar and Humayun's Tomb" },
  { id: 6, name: 'PQ Show', start: 13, end: 15, cost: 350, description: 'Performing arts show at Kamani Auditorium' },
  { id: 7, name: 'Water Show', start: 10, end: 11, cost: 100, description: 'Musical fountain show at Nehru Park' },
  { id: 8, name: 'Birdwatching', start: 5, end: 7, cost: 120, description: 'Early morning birdwatching at Yamuna Biodiversity Park' },
  { id: 9, name: 'Art Gallery', start: 16, end: 17, cost: 150, description: 'Visit to National Gallery of Modern Art' },
  { id: 10, name: 'Food Tour', start: 19, end: 22, cost: 500, description: 'Evening street food tour in Chandni Chowk' },
  { id: 11, name: 'Museum Visit', start: 10, end: 13, cost: 200, description: 'Tour of National Museum with expert guide' },
  { id: 12, name: 'Yoga Session', start: 7, end: 8, cost: 80, description: 'Morning yoga at Lodhi Gardens' },
  { id: 13, name: 'Shopping Tour', start: 14, end: 18, cost: 0, description: 'Guided shopping tour in Connaught Place' },
  { id: 14, name: 'Cultural Dance', start: 20, end: 21, cost: 250, description: 'Traditional dance performance at Kingdom of Dreams' },
];

const activityMap = [
  [0, 1, 2, 3, 4],
  [0, 5, 7, 8, 9],
  [1, 3, 6, 7, 9],
  [2, 4, 5, 6, 8],
  [0, 1, 4, 8, 9],
  [0, 4, 5, 6, 7],
  [2, 3, 4, 7, 8],
  [1, 2, 4, 6, 9],
  [0, 1, 3, 5, 7],
  [5, 6, 7, 8, 9],
  [3, 4, 6, 8, 9],
];

export const activitiesByDistrict = Object.fromEntries(
  districts.map((district, index) => [district, activityMap[index].map((id) => activities.find((activity) => activity.id === id))]),
);

const sharedAmenities = ['Free WiFi', 'Breakfast', 'AC', 'Metro access'];
export const hotelsByDistrict = Object.fromEntries(
  districts.map((district, index) => [
    district,
    [
      ...(district === 'Central Delhi'
        ? [
            { name: 'The Imperial', price: 8500, rating: 4.8, amenities: ['Pool', 'Spa', 'Free WiFi', 'Restaurant'] },
            { name: 'Hotel Palace Heights', price: 4500, rating: 4.2, amenities: ['Free WiFi', 'Restaurant', 'AC'] },
            { name: 'Bloomrooms @ Janpath', price: 3200, rating: 3.9, amenities: ['Free WiFi', 'Breakfast'] },
          ]
        : district === 'New Delhi'
          ? [
              { name: 'The Lalit', price: 7500, rating: 4.7, amenities: ['Pool', 'Spa', '3 Restaurants', 'Bar'] },
              { name: 'Hotel Palace Heights', price: 4500, rating: 4.2, amenities: ['Free WiFi', 'Restaurant'] },
              { name: 'Hotel Grand Park Inn', price: 3800, rating: 4.0, amenities: ['Free WiFi', 'Breakfast'] },
            ]
          : district === 'South Delhi'
            ? [
                { name: 'The Oberoi', price: 12000, rating: 4.9, amenities: ['Luxury Spa', 'Pool', 'Fine Dining'] },
                { name: 'The Lodhi', price: 15000, rating: 4.9, amenities: ['Luxury', 'Pool', 'Private Terraces'] },
                { name: 'Hotel Suryaa', price: 5500, rating: 4.3, amenities: ['Pool', 'Restaurant', 'Free WiFi'] },
              ]
            : [
                { name: `${district} Sky Stay`, price: 2800 + index * 210, rating: 4.1, amenities: sharedAmenities.slice(0, 3) },
                { name: `${district} Comfort Inn`, price: 1900 + index * 160, rating: 3.9, amenities: ['Free WiFi', 'Breakfast', 'Cab desk'] },
                { name: `${district} Metro Residency`, price: 3400 + index * 180, rating: 4.3, amenities: ['Restaurant', 'Parking', '24x7 desk'] },
              ]),
    ],
  ]),
);

export const emergencyContacts = [
  { label: 'Police', value: '100' },
  { label: 'Ambulance', value: '102' },
  { label: 'Fire Brigade', value: '101' },
  { label: 'Delhi Tourism Helpline', value: '1800-111-363' },
  { label: "Women's Helpline", value: '1091' },
  { label: 'Tourist Police', value: '+91-11-23239730' },
];

export const weatherCards = [
  { season: 'Summer', months: 'April-June', temp: '25C to 45C', advice: 'Carry sunscreen, a cap, and drink water often.' },
  { season: 'Monsoon', months: 'July-September', temp: '27C to 35C', advice: 'Pack a compact umbrella and waterproof footwear.' },
  { season: 'Winter', months: 'December-February', temp: '5C to 22C', advice: 'Layer clothing for cold mornings and pleasant afternoons.' },
  { season: 'Spring/Autumn', months: 'March, October-November', temp: '18C to 32C', advice: 'Best sightseeing window with breathable daywear.' },
];

export const budgetDestinations = [
  { name: 'Old Delhi Heritage Tour', travelCost: 500, foodCost: 300, ticketCost: 200, bestTime: 'Oct-Mar', description: 'Explore Red Fort, Chandni Chowk and Jama Masjid' },
  { name: 'New Delhi Modern Tour', travelCost: 400, foodCost: 500, ticketCost: 300, bestTime: 'All Year', description: 'Visit India Gate, Rashtrapati Bhavan and Parliament' },
  { name: 'South Delhi Cultural Tour', travelCost: 600, foodCost: 400, ticketCost: 350, bestTime: 'Nov-Feb', description: 'Qutub Minar, Lotus Temple and Hauz Khas Village' },
  { name: 'Delhi Food Crawl', travelCost: 300, foodCost: 800, ticketCost: 0, bestTime: 'All Year', description: "Street food tour across Delhi's best eateries" },
  { name: 'Delhi Shopping Spree', travelCost: 200, foodCost: 200, ticketCost: 0, bestTime: 'Oct-Mar', description: 'Shopping in Sarojini, Janpath and Connaught Place' },
];
