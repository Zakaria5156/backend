const express = require('express')
const app = express();


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://coursework:Coursework2@cluster0.vaitt.mongodb.net/test?retryWrites=true&w=majority";

//connecting to MongoDB Atlas using Node JS driver
MongoClient.connect(uri, {
        useUnifiedTopology: true
    })
    .then(client => {
        //Select the database and the collection
        const db = client.db('coursework2')
        const lessonsCollection = db.collection('lessons')

        //Defining the route to retreive the lessons from the collection
        app.get('/', (req, res) => {
            const cursor = lessonsCollection.find().toArray()
                .then(lessons => {
                    res.json({
                        'success': true,
                        'data': lessons
                    })
                })
        });
        app.get('/lessons', (req, res) => {
            const cursor = lessonsCollection.find().toArray()
                .then(lessons => {
                    res.json({
                        'success': true,
                        'data': lessons
                    })
                })
        });

        app.listen(process.env.PORT || 3000, () => {
            console.log('Example app listening on port 8000!')
        });

    })
    .catch(error => console.error(error))