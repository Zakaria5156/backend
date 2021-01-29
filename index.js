const express = require('express'),
    bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
//Connection string from mongodb
const uri = "mongodb+srv://coursework:Coursework2@cluster0.vaitt.mongodb.net/test?retryWrites=true&w=majority";

//connecting to MongoDB Atlas using Node JS driver
MongoClient.connect(uri, {
        useUnifiedTopology: true
    })
    .then(client => {
        //Select the database and the collection
        const db = client.db('coursework2')
        const lessonsCollection = db.collection('lessons');
        const orderCollection = db.collection("orders");

        //Defining Base route
        app.get('/', (req, res) => {
            res.json({
                'success': true,
            })
        });

        //Defining the route to retreive the lessons from the collection
        app.get('/lessons', (req, res) => {
            const cursor = lessonsCollection.find().toArray()
                .then(lessons => {
                    //return the lessons data as response
                    res.json({
                        'success': true,
                        'data': lessons
                    })
                })
        });

        //Defining route to post order
        app.post('/order', (req, res) => {
            //Save a new order
            const result = orderCollection.insertOne(req.body);
            res.json({
                'success': true
            });
        });

        //Start the server
        app.listen( process.env.PORT || 8000, () => {
            console.log('Example app listening on port ' + process.env.PORT)
        });

    })
    .catch(error => console.error(error))