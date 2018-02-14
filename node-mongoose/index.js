const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017';
const connect = mongoose.connect(url, {});

connect.then((client) => {

    console.log('Connected correctly to server');
    var db = client.db('conFusion');

    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log(dishes);

            return db.collection('dishes').drop();
        })
        .then(() => {
            return client.close();
        })
        .catch((err) => {
            console.log(err);
        });

});
