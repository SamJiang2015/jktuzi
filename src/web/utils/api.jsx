var Fetch = require('whatwg-fetch');
var PORT = process.env.PORT || 3000;
var rootUrl = 'http://10.10.10.110:3000/api/v1/';
//var rootUrl = 'http://pipifit.herokuapp.com/api/v1/'; 
console.log('rootUrl: ' + rootUrl);

// need this for browsers that do not support fetch (IEs, android)
require('es6-promise').polyfill();

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url, {
      headers: {
        'Auth': localStorage.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'              
      }
    })
    .then(function(response){
      return response.json()
    })
  },

  post: function(url, payload, needAuth) {
    var token = needAuth? localStorage.token : '';

    return fetch(rootUrl + url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth': token
      },
      body: JSON.stringify(payload)
    })
    .then(function(response) {
      return response.json()
    })
  },

  put: function(url, payload) {
    return fetch(rootUrl + url, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',        
        'Auth': localStorage.token
      },
      body: JSON.stringify(payload)
    })
    .then(function(response) {
      return response.json()
    })
  },

  delete: function(url) {
    return fetch(rootUrl + url, {
      method: 'delete',
      headers: {
        'Auth': localStorage.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'        
      },
    })
    .then(function(response) {
      return response.json()
    })
  }
};
