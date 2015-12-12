var Fetch = require('whatwg-fetch');
var rootUrl = 'http://10.10.10.110:3000/api/v1/';
require('es6-promise').polyfill();

var auth = require('./auth');

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url, {
      headers: {
        'Authorization': auth.getToken()
      }
    })
    .then(function(response){
      return response.json()
    })
  },

  post: function(url, payload, needAuth) {
    var token = needAuth? auth.getToken() : '';

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

  login: function(url, payload) {
    return fetch(rootUrl + url, {
      method: 'post',
      body: JSON.stringify(payload)
    })
  },   

  put: function(url, payload) {
    return fetch(rootUrl + url, {
      method: 'put',
      headers: {
        'Authorization': auth.getToken()
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
        'Authorization': auth.getToken()
      },
    })
    .then(function(response) {
      return response.json()
    })
  }
};
