const express = require('express'),
    bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
//Connection string from mongodb
const uri = "mongodb+srv://coursework2:Coursework2@cluster0.fgnyf.mongodb.net/test?retryWrites=true&w=majority";

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
            const cursor = lessonsCollection.find().toArray()
                .then(lessons => {
                    //return the lessons data as response
                    res.json({
                        'success': true,
                        'data': lessons
                    })
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

        //Update a lesson's space when added to cart or removed
        app.put("/update-lesson",(req,res)=>{
            lessonsCollection.updateOne(
                { "id" : req.body.id }, 
                { $set: {"spaces" : req.body.spaces } },
                { upsert: true }
            ).then(data =>{
                res.json({
                    'success': true
                });
            })
        });
        

        //Start the server
        app.listen(process.env.PORT || 8000, () => {
            console.log('Example app listening on port ' + process.env.PORT)
        });

    })
    .catch(error => console.error(error))