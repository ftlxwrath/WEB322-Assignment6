
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
require('dotenv').config();

const Sequelize = require('sequelize');

let countries = [];

const sequelize = new Sequelize('neondb', 'neondb_owner','mD6UgspL9OFR', {
    host: 'ep-dark-meadow-a51kqll9.us-east-2.aws.neon.tech',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  });
  
  sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    }).catch((err) => {
      console.log('Unable to connect to the database:', err);
    });
  
  
  
  
  // Model REGION
  const Region = sequelize.define(
      'Region',
      {
          id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          },
          name: Sequelize.STRING,
          subs: Sequelize.STRING,
      },
  );
  
  // Model COUNTRY
  const Country = sequelize.define(
      'Country',
      {
          a2code: {
              type: Sequelize.STRING,
              primaryKey: true,
          },
          name: Sequelize.STRING,
          official: Sequelize.STRING,
          nativeName: Sequelize.STRING,
          permanentUNSC: Sequelize.BOOLEAN,
          wikipediaURL: Sequelize.STRING,
          capital: Sequelize.STRING,
          regionId: Sequelize.INTEGER,
          languages: Sequelize.STRING,
          population: Sequelize.INTEGER,
          flag:Sequelize.STRING,
      },
  );
  
  Country.belongsTo(Region, {foreignKey: 'regionId'});

  let initialize = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync()
            .then(() => {
                console.log('Database synchronized');
                resolve();
            })
            .catch((err) => {
                console.error('Error synchronizing database:', err);
                reject(err);
            });
    });
    };

let getAllCountries = () => {
    return new Promise((resolve, reject) =>{
        Country.findAll({include: [Region], order: [['name', 'ASC']]})
            .then(countries => {
                resolve(countries);
            })
            .catch(error => {
                reject(error);
            });
    });
};

let getCountryByCode = (countryCode) => {
    return new Promise((resolve, reject) => {
        Country.findAll({where: {a2code: countryCode.toUpperCase()}, include: [Region]})
            .then(country => {
                if(country && country.length > 0){
                    resolve(country[0]);
                }else{
                    reject("Unable to find the requested country");
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};

let getCountriesByRegion = (region) => {
    return new Promise((resolve, reject) => {
        Country.findAll({include: [Region], where: {'$Region.name$': {[Sequelize.Op.iLike]: `%${region}%`}}, order: [['name', 'ASC']]})
            .then(countries => {
                if(countries && countries.length > 0){
                    resolve(countries);
                }else{
                    reject("Unable to find the requested countries in the region");
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};

let addCountry = (countryData) => {
    return new Promise((resolve, reject) => {
        // Convert the checkbox value to boolean
        countryData.permanentUNSC = countryData.permanentUNSC === 'on' ? true : false;

        Country.create(countryData)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err.errors[0].message);
            });
    });
};

let getAllRegions = () => {
    return new Promise((resolve, reject) => {
        Region.findAll()
            .then(regions => {
                resolve(regions);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports = { initialize, getAllCountries, getCountryByCode, getCountriesByRegion, addCountry, getAllRegions };


