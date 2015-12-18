//
// healthcard-store.jsx
//

var Reflux = require('reflux');

var HealthCardActions = require('../actions/healthcard-actions');
var Api = require('../utils/api');
var Auth = require('../utils/auth');

module.exports = Reflux.createStore({

  listenables: [HealthCardActions],
  
  getHealthCard: function(accountId, date, token) {

      var url = 'accounts/'+ accountId +'/healthCards/' + date; 
      Api.get(url, token)
        .then(function(json){
          if (json.success) {
            this.healthCard = json.data;
            this.triggerChange();
          }
        }.bind(this));
  },

  // call to create the healthcard info on server side
  // use callback to return the status back to caller in case there are errors
  updateHealthCard: function(accountId, date, healthCard, token, callback) {

    var url = 'accounts/'+ accountId +'/healthCards/' + date; 

    Api.post(url, healthCard, token)
      .then(function(json){
        if (json.success) {
          this.healthCard = json.data;
          this.triggerChange();
        }
        // return the error code so that the caller can display proper UI to user
        if (callback) callback({success: json.success, status: json.status});
      }.bind(this))
      .catch(function (error) {
          console.log('Error when calling updatehealthCard: ' + error.toString());
          if (callback) callback({success: false, status: 500});
      });    
  },

  triggerChange: function() {
    this.trigger('change', this.healthCard);
  },

  getInitialState: function() {
    this.healthCard = {weight:null, bodyfat:null};

    return this.healthCard;
  }
});
