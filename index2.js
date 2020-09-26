const {nextISSTimesForMyLocation} = require("./iss_promises");
const {printPassTimes} = require("./index");

nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log(error.message);
  });
