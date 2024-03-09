/*********************************************************************************
*  WEB322 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Mohammed Abbas Ali   Student ID: 123603219     Date: 
*
*  Online (Cyclic) Link: 
*
********************************************************************************/

const unCountriesData = require("./modules/unCountries");

const express = require("express");
const app = express();
const path = require("path");

app.set('view engine', 'ejs');

//Initializing the server
unCountriesData.initialize().then(() => {
    app.listen(8080, () => {
        console.log("Server is running on port 8080");
    });
}).catch(error => {
    console.log("Failed to initialize data: ", error);
});

// Define the public directory like STATIC
app.use(express.static('public'));

// Setting the routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});


app.get("/un/countries", (req, res) => {
    const { region } = req.query;
    if (region) {
        unCountriesData.getCountriesByRegion(region)
            .then(countries => res.render("countries", {countries}))
            .catch(error => res.status(500).send(error));
    } else {
        unCountriesData.getAllCountries()
            .then(countries => res.render("countries",{countries}))
            .catch(error => res.status(500).send(error));
    }
});

app.get("/un/countries/:countryCode", (req, res) => {
    const countryCode = req.params.countryCode;
    unCountriesData.getCountryByCode(countryCode)
    .then(country => {
        if (!country) {
            return res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"});;
        }
        res.render("country",{country});
    })
    .catch(error => res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"}));
});



app.use((req, res) => {
    res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"});;
});




//http://localhost:8080