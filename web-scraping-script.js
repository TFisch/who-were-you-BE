const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });
const fs = require('fs');

const octoberUrls = [];
for (let i = 1; i < 32; i++) {
  octoberUrls.push(`https://www.onthisday.com/deaths/october/${i}`);
}

octoberUrls.reduce(
  (acc, url) => acc.then(() => nightmare
    .goto(url)
    .wait(1000)
    .evaluate(() => {
      const deadPeopleLi = Array.from(document.querySelectorAll('.event-list__item'));
      const deathDate = document.querySelector('.date').innerText;
      const deathMonth = document.querySelector('.month').innerText;
      const deadPeopleData = deadPeopleLi.map((deadPersonLi) => {
        const deathYear = deadPersonLi.querySelector('a').innerText;
        const deadPerson = deadPersonLi.innerText;
        const deathDay = `${deathMonth} ${deathDate}`;
        return { deathDay, deathYear, deadPerson };
      });
      return deadPeopleData;
    })
    .then((result) => {
      console.log('Nightmare script ran successfully', result);
      fs.appendFile('octoberData.json', JSON.stringify(result), () => {
        console.log('Saved!');
      });
    })
    .catch((error) => {
      console.log('Something went wrong: ', error);
    })),
  Promise.resolve([]).then((results) => {
    console.dir(results);
  }),
);
