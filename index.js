const {nextISSTimesForMyLocation} = require('./iss');

const printPassTimes = function(passTimes) {
  for (const passTime of passTimes) {
    let datetime = new Date(passTime.risetime * 1000);
    datetime = datetime.toUTCString();

    console.log(`Next pass at ${datetime}-0700 (Pacific Daylight Time) for ${passTime.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log(error);
  } else {
    printPassTimes(passTimes);
  }
});

module.exports = {printPassTimes};