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
      const indexOfSpaceDay = people.deathDay.indexOf(' ');
      let month = people.deathDay.slice(0, 3);
      let day = people.deathDay.slice(indexOfSpaceDay + 1);
      let numericDate = 0;
      let monthNum = 0;
      switch (month) {
        case 'JAN':
          monthNum = 1;
          break;
        case 'FEB':
          monthNum = 2;
          break;
        case 'MAR':
          monthNum = 3;
          break;
        case 'APR':
          monthNum = 4;
          break;
        case 'MAY':
          monthNum = 5;
          break;
        case 'JUN':
          monthNum = 6;
          break;
        case 'JUL':
          monthNum = 7;
          break;
        case 'AUG':
          monthNum = 8;
          break;
        case 'SEP':
          monthNum = 9;
          break;
        case 'OCT':
          monthNum = 10;
          break;
        case 'NOV':
          monthNum = 11;
          break;
        case 'DEC':
          monthNum = 12;
          break;
        default:
          return;
      }
      if ((monthNum === 1 && day <= 20) || (monthNum === 12 && day >= 22)) {
        astroSign = 'capricorn';
      } else if (
        (monthNum === 1 && day >= 21) ||
        (monthNum === 2 && day <= 18)
      ) {
        astroSign = 'aquarius';
      } else if (
        (monthNum === 2 && day >= 19) ||
        (monthNum === 3 && day <= 20)
      ) {
        astroSign = 'pisces';
      } else if (
        (monthNum === 3 && day >= 21) ||
        (monthNum === 4 && day <= 20)
      ) {
        astroSign = 'aries';
      } else if (
        (monthNum === 4 && day >= 21) ||
        (monthNum === 5 && day <= 20)
      ) {
        astroSign = 'taurus';
      } else if (
        (monthNum === 5 && day >= 21) ||
        (monthNum === 6 && day <= 20)
      ) {
        astroSign = 'gemini';
      } else if (
        (monthNum === 6 && day >= 22) ||
        (monthNum === 7 && day <= 22)
      ) {
        astroSign = 'cancer';
      } else if (
        (monthNum === 7 && day >= 23) ||
        (monthNum === 8 && day <= 23)
      ) {
        astroSign = 'leo';
      } else if (
        (monthNum === 8 && day >= 24) ||
        (monthNum === 9 && day <= 23)
      ) {
        astroSign = 'virgo';
      } else if (
        (monthNum === 9 && day >= 24) ||
        (monthNum === 10 && day <= 23)
      ) {
        astroSign = 'libra';
      } else if (
        (monthNum === 10 && day >= 24) ||
        (monthNum === 11 && day <= 22)
      ) {
        astroSign = 'scorpio';
      } else if (
        (monthNum === 11 && day >= 23) ||
        (monthNum === 12 && day <= 21)
      ) {
        astroSign = 'sagittarius';
      }
      const cleanPersonData = {
        deadPerson: nameSlicedAgain,
        deathDay: people.deathDay,
        deathYear: people.deathYear,
        astroSign
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
