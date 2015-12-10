var Fetch = require('whatwg-fetch');
var rootUrl = 'http://localhost:3000/v1/api/';
var auth = require('../components/auth')

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

  post: function(url, payload) {
    return fetch(rootUrl + url, {
      method: 'post',
      headers: {
        'Authorization': auth.getToken()
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
