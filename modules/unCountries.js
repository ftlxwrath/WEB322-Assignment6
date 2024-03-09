
/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Mohammed Abbas Ali   Student ID: 123603219     Date: 8th March,2024
*
*  Published URL:  https://crabby-crow-long-johns.cyclic.app
*
********************************************************************************/

const countryData = require("../data/countryData.json");
const regionData = require("../data/regionData.json");

let countries = [];

let initialize = () => {
    return new Promise((resolve, reject) => {
        try {
            let region;
            countries = countryData.map((country) => {
                region = regionData.find((x) => x.id === country.regionId);
                return { ...country, region };
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

let getAllCountries = () => {
    return new Promise((resolve, reject) =>{
        try{
            resolve(countries);
        }catch(error){
            reject(error);
        }
    });
};

let getCountryByCode = (countryCode) => {
    return new Promise((resolve, reject) => {
        try{
            let country = countries.find(country => country.a2code.toUpperCase() === countryCode.toUpperCase());
            if(country){
                resolve(country);
            }else{
                reject("Unable to find the requested country");
            }
        }catch(error){
            reject(error);
        }
    });
};

let getCountriesByRegion = (region) => {
    return new Promise((resolve, reject) => {
        try{
            let countriesInRegion = countries.filter(country => country.region.name.toUpperCase().includes(region.toUpperCase()));
            if(countriesInRegion.length > 0){
                resolve(countriesInRegion);
            }else{
                reject("Unable to find the requested countries in the region");
            }
        }catch (error){
            reject(error);
        }
    });
};

module.exports = { initialize, getAllCountries, getCountryByCode, getCountriesByRegion };

// Testing code

// initialize();
//console.log(getAllCountries());
// console.log(getCountryByCode("ca"));
// console.log(getCountriesByRegion("oceania"));

// NOTE: You should be able to run this file using the command "node modules/unCountries.js"