//
// trainee-store.jsx
//

var Reflux = require('reflux');

var TraineeActions = require('./trainee-actions');
var Api = require('../../utils/api');
var Auth = require('../../utils/auth');

var TestTrainees = require('./test-data').Test_Trainees;

module.exports = Reflux.createStore({

  listenables: [TraineeActions],
  
  findTrainee: function(traineeId) {
    // look for the matching trainee

    return this.trainees[traineeId.toString()];
  },

  // retrieve the list of labels of a trainee
  getTraineeLabels: function(traineeId, accountId, token, cb) {
      var url = 'labels'; 

      var params = {userId: traineeId, operatorId: accountId};

      Api.get(url, token, params, accountId)
        .then(function(json){
          if (json.code===200) {
            this.trainees[traineeId.toString()] = json.bodyLabel;
            this.triggerChange();
          }

          if (cb) cb(json.code===200);
        }.bind(this));
    this.triggerChange();
  },

  writeTraineeLabels: function(traineeId, labels, coachId, accountId, token, cb) {

    var url = 'labels'; 

    var payload = {
      coachId: coachId,
      operatorId: accountId,
      userId: traineeId,
      labels: labels
    };

    Api.post(url, payload, token, accountId)
      .then(function(json){
        if (json.code===200) {
          this.trainees[traineeId.toString()] = labels;
          this.triggerChange();
        }

        if (cb) cb(json.code===200);
      }.bind(this));    
  },

  triggerChange: function() {
    this.trigger('change', this.trainees);
  },

  trainees: {}
});
