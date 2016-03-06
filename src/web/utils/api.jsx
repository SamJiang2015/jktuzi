var Fetch = require('whatwg-fetch');

// need this for browsers that do not support fetch (IEs, android)
require('es6-promise').polyfill();

//var rootUrl = 'http://pipifit.herokuapp.com/api/v1/'; 
//var rootUrl = 'http://pipifit.carp.mopaasapp.com/api/v1/';

//var rootUrl = 'http://localhost:3000/api/v1/'; 
//var rootUrl = "https://api.s.pipifit.com/";
var rootUrl = "http://api2.s.pipifit.com/";

module.exports = {

  PostType: {
    JSON: 1,
    STRING: 2
  },

  get: function(url, token, params, userId) {
    var fullUrl = rootUrl + url;

    if (params) {
      var qp='';

      Object.keys(params).forEach(
        function(key){
          qp+=encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) +'&'
        });

      // get ride of the last '&'
      qp=qp.slice(0,qp.length-1);

      fullUrl += '?'+qp;
    }

    console.log('Request Url: ' + fullUrl);  

    return fetch(fullUrl, {
      headers: {
//        'Auth': token,
        'x-access-token': token,
        'x-user-id': userId,
        'Accept': 'application/json'           
      }
    })
    .then(function(response){
      return response.json();
    })
  },

  post: function(url, payload, token, userId, type) {
    var body;
    var contentType;

    switch(type) {

      case this.PostType.STRING:
        // payload is set of value pairs: [{key, value}, ...]
        contentType='application/x-www-form-urlencoded';
        body='';
        for (var i=0; i< payload.length; i++) {
          body+=payload[i].key;
          body+='=';
          body+=payload[i].value;
          if (i<payload.length-1) {
            body+='&';
          }
        }
        // encode the body in case there are unexpected characters
        //body=encodeURIComponent(body);
        break;      
      case this.PostType.JSON:
      default: 
        // payload is JSON
        contentType = 'application/json';
        body=JSON.stringify(payload);      
    }

    console.log('Request body: ' + body);    

    return fetch(rootUrl + url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': contentType,
        'x-access-token': token,
        'x-user-id': userId
//        'Auth': token
      },
      body: body
    })
    .then(function(response) {
      return response.json()
    })    
  }

  // put: function(url, payload, token) {
  //   return fetch(rootUrl + url, {
  //     method: 'put',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',        
  //       'Auth': token
  //     },
  //     body: JSON.stringify(payload)
  //   })
  //   .then(function(response) {
  //     return response.json()
  //   })
  // },

  // delete: function(url, token) {
  //   return fetch(rootUrl + url, {
  //     method: 'delete',
  //     headers: {
  //       'Auth': token,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'        
  //     },
  //   })
  //   .then(function(response) {
  //     return response.json()
  //   })
  // }
};
