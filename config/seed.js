require('dotenv').config();

require('./connection');

const {faker} = require('@faker-js/faker');
const {User} = require('../models')

const userData = [];
let userCount = 50;

while(userCount--){
    const username = faker.internet.userName()
    userData.push({
        username,
        email: `${username}@email.com`,
        password:'password1234'
    })
}


User.deleteMany({}) // deletes everything  
    .then(() => {
        console.log('Users deleted');
        User.insertMany(userData)
            .then(() => {
            console.log('Users Seeded successfuly')
            process.exit()
        })
    })