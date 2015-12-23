var Fetch = require('whatwg-fetch');

// need this for browsers that do not support fetch (IEs, android)
require('es6-promise').polyfill();

//var rootUrl = 'http://pipifit.herokuapp.com/api/v1/'; 
//var rootUrl = 'http://pipifit.carp.mopaasapp.com/api/v1/';

var rootUrl = 'http://localhost:3000/api/v1/'; 


console.log('rootUrl: ' + rootUrl);


module.exports = {

  get: function(url, token) {
    return fetch(rootUrl + url, {
      headers: {
        'Auth': token,
        'Accept': 'application/json'           
      }
    })
    .then(function(response){
      return response.json()
    })
  },

  post: function(url, payload, token) {
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

  put: function(url, payload, token) {
    return fetch(rootUrl + url, {
      method: 'put',
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

  delete: function(url, token) {
    return fetch(rootUrl + url, {
      method: 'delete',
      headers: {
        'Auth': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'        
      },
    })
    .then(function(response) {
      return response.json()
    })
  }
};
