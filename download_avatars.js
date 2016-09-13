const request = require("request");
const fs = require("fs");
const dotEnv = require('dotenv').config();


function githubRequest(endPoint, callback) {
  var requestData = {
    url: `https://api.github.com${endPoint}`,
    auth: {
      bearer: process.env.DB_TOKEN
    },
    headers: {
      "User-Agent": "ABCD"
    }
  }
  request.get(requestData, callback);
}

function getRepoContributors(repoOwner, repoName, callback) {
  githubRequest(`/repos/${repoOwner}/${repoName}/contributors`, (err, response, body) => {
    if (err) {
      throw err;
    }
    var data = JSON.parse(body)

    data.forEach( (item) => {
      callback(item.avatar_url, item.login);
    })
  })
}

function downloadImagebyURL(url, path) {
  request(url).pipe(fs.createWriteStream(`./avatars/${path}.png`))
}

getRepoContributors(process.argv[2], process.argv[3], downloadImagebyURL);
