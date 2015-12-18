//
// sportcard-store.jsx
//

var Reflux = require('reflux');

var SportCardActions = require('../actions/sportcard-actions');
var Api = require('../utils/api');
var Auth = require('../utils/auth');

module.exports = Reflux.createStore({

  listenables: [SportCardActions],
  
  getSportCard: function(accountId, date, token) {

      var url = 'accounts/'+ accountId +'/workoutCards/' + date; 
      Api.get(url, token)
        .then(function(json){
          if (json.success) {
            this.sportCard = json.data;
            this.triggerChange();
          }
        }.bind(this));
  },

  // call to create the workoutcard info on server side
  // use callback to return the status back to caller in case there are errors
  updateSportCard: function(accountId, date, sportCard, token, callback) {

    var url = 'accounts/'+ accountId +'/workoutCards/' + date; 

    Api.post(url, sportCard, token)
      .then(function(json){
        if (json.success) {
          this.sportCard = json.data;
          this.triggerChange();
        }
        // return the error code so that the caller can display proper UI to user
        if (callback) callback({success: json.success, status: json.status});
      }.bind(this))
      .catch(function (error) {
          console.log('Error when calling updateSportCard: ' + error.toString());
          if (callback) callback({success: false, status: 500});
      });    
  },

  triggerChange: function() {

    this.trigger('change', this.sportCard);
  },

  getInitialState: function() {
    this.sportCard = [];

    return this.sportCard;
  }
});
