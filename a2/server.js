/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Marc Nicolas Oliva Student ID: 130943202 Date: 09/16/2021
*  Heroku Link: _______________________________________________________________
*
********************************************************************************/
//web422user - senec1234

const express = require('express');
const cors = require('cors');
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB();
const app = express();
const PORT_HTTP = process.env.PORT || 8080;
const URLdb = "mongodb+srv://web422user:senec1234@cluster0.xn7cs.mongodb.net/sample_restaurants?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json());

db.initialize(URLdb).then(() => {
    app.listen(PORT_HTTP, () => {
        console.log(`APP listening in port: ${PORT_HTTP}`);
    });
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send({ message: "API Listening" });
});

app.post("/api/restaurants", (req, res) => {
    db.addNewRestaurant(req.body)
        .then(() => {
            res.status(201).json({ message: "Success adding restaurant." });
        }).catch((err) => {
            res.status(500).json({ message: "Error adding restaurant. " + err.message });
        });
});
app.get("/api/restaurants", (req, res) => {
    let parsedPage = parseInt(req.query.page, 10);
    let parsedPerPage = parseInt(req.query.perPage, 10);

    db.getAllRestaurants(parsedPage, parsedPerPage, req.query.borough)
        .then((restaurants) => {
            if (!restaurants) {
                res.status(404).json({ message: 'No restaurants found.' })
            } else {
                res.status(200).json(restaurants);
            }
        }).catch((err) => {
            res.status(500).json({ message: "Error. " + err.message });
        });
})

app.get("/api/restaurants/:id", (req, res) => {
    db.getRestaurantById(req.params.id)
        .then((rest) => {
            if (!rest) {
                res.status(404).json({ message: 'No restaurant was found for id ' + rest.id });
            } else {
                res.status(200).json(rest);
            }
        }).catch((err) => {
            res.status(500).json({ message: "Internal error. " + err.message });
        })
});

app.put("/api/restaurants/:id", (req, res) => {
    console.log(req.body._id)
    if (req.params.id != req.body._id) {
        res.status(404).json({ message: "Resource not found" });
    }
    else {
        let result = db.updateRestaurantById(req.body, req.params.id);
        if (result)
            res.status(201).json(result)
        else
            res.status(404).json({ message: "Resource not found" });
    }
});

app.delete("/api/restaurants/:id", (req, res) => {
    if (req.params.id == req.body._id) {
        db.deleteRestaurantById(req.params.id)
            .then(() => {
                res.status(201).json({ message: "Restaurant deleted." });
            }).catch((err) => {
                res.status(500).json({ message: "Server error. " + err.message });
            });
    }
    res.status(204).json({ message: "Restaurant not found." });
})