const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6422d9fb627dc9e094197815',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, blanditiis repellendus quos iusto, iste id voluptate illum, et quae distinctio saepe aliquid dolor mollitia obcaecati? Corrupti alias ex velit amet.',
            price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dko2muub4/image/upload/v1680099871/kocdewp3z5spxrnavusd.jpg',
                    filename: 'kocdewp3z5spxrnavusd',
                },
                {
                    url: 'https://res.cloudinary.com/dko2muub4/image/upload/v1680094438/jeubjbtjcrmpsgc9z9sq.jpg',
                    filename: 'jeubjbtjcrmpsgc9z9sq',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})