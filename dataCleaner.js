const fs = require('fs');

const januaryData = require('./webscraped-data/januaryData.json');
const februaryData = require('./webscraped-data/februaryData.json');
const marchData = require('./webscraped-data/marchData.json');
const aprilData = require('./webscraped-data/aprilData.json');
const mayData = require('./webscraped-data/mayData.json');
const juneData = require('./webscraped-data/juneData.json');
const julyData = require('./webscraped-data/julyData.json');
const augustData = require('./webscraped-data/augustData.json');
const septemberData = require('./webscraped-data/septemberData.json');
const octoberData = require('./webscraped-data/octoberData.json');
const novemberData = require('./webscraped-data/novemberData.json');
const decemberData = require('./webscraped-data/decemberData.json');

const arrayOfMonths = [
  januaryData,
  februaryData,
  marchData,
  aprilData,
  mayData,
  juneData,
  julyData,
  augustData,
  septemberData,
  octoberData,
  novemberData,
  decemberData
];

const cleanData = monthArray =>
  monthArray.map(dayArray =>
    dayArray.map(people => {
      const indexOfSpace = people.deadPerson.indexOf(' ');
      const indexOfComma = people.deadPerson.indexOf(', ');
      const frontSlicedPerson = people.deadPerson.slice(indexOfSpace + 1);
      const sliceTheEndOfPerson = frontSlicedPerson.slice(0, indexOfComma);
      const slicedIndexComma = sliceTheEndOfPerson.indexOf(',');
      const nameSlicedAgain = sliceTheEndOfPerson.slice(0, slicedIndexComma);
      const cleanPersonData = {
        deadPerson: nameSlicedAgain,
        deathDay: people.deathDay,
        deathYear: people.deathYear
      };

      return fs.appendFile(
        'allData.js',
        JSON.stringify(cleanPersonData),
        () => {
          console.log('Saved!');
        }
      );

      // return cleanPersonData;
    })
  );

const cleanMonths = monthData => monthData.map(month => cleanData(month));

cleanMonths(arrayOfMonths);
