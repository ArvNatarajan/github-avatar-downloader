const request = require("request");
const dotenv = require('dotenv').config();
const fs = require("fs");

function githubRequest(endPoint, callback) {
  var requestData = {
    url: `https://api.github.com${endPoint}`,
    auth: {
      bearer: process.env.TOKEN
    },
    headers: {
      "User-Agent": "ABCD"
    }
  }

  //Error check to see if a .env file exists
  //If it does not, report the error to STDOUT
  //If it does, run the program
  try {
    fs.accessSync(".env");
    request.get(requestData, callback);
  }
  catch (error) {
    console.log("No .env file exists");
    throw error;
  }
}

function getRepoContributors(repoOwner, repoName, callback) {
  githubRequest(`/repos/${repoOwner}/${repoName}/contributors`, (err, response, body) => {
    var data = JSON.parse(body)

    //Error checks to see if a the Repo or Owner exists
    //If they do not, throw the error to STDOUT
    if (data.message === "Not Found") {
      throw "Incorrect Repo Name or Owner"
    }
    if (data.message === "Bad credentials") {
      throw "Check your .env file to ensure that it has the right credentials"
    }

    data.forEach( (contributor) => {
      callback(contributor.avatar_url, contributor.login);
    })

  })
}

module.exports = getRepoContributors;
