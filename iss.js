const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      callback(null, body);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const bodyData = JSON.parse(body).data;
      const coordinates = {};
      coordinates.latitude = bodyData.latitude;
      coordinates.longitude = bodyData.longitude;
      callback(error, coordinates);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = coords.latitude;
  const lon = coords.longitude;

  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching pass times. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const bodyObj = JSON.parse(body);
      const flyoverTimes = bodyObj.response;
      callback(error, flyoverTimes);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log(error);
    } else {
      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          console.log(error);
        } else {
          fetchISSFlyOverTimes(coords, (error, passTimes) => {
            if (error) {
              console.log(error);
            } else {
              callback(error, passTimes);
            }
          });
        }
      });
    }
  });
};

module.exports = {nextISSTimesForMyLocation};
