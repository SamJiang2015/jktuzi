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
    var trainee=null;
    for (var i=0; i<this.trainees.length; i++) {
      if (this.trainees[i].id.toString() === traineeId.toString()) {
        trainee = this.trainees[i];
        break;
      }
    }

    return trainee;
  },

  // retrieve the list of labels of a trainee
  getTraineeLabels: function(traineeId) {
    // var trainee = this.findTrainee(traineeId);

    // if (trainee) {
    //   return trainee.labels;
    // } else {
    //   // todo: hit the DB to get the labels 

    this.triggerChange();
  },

  writeTraineeLabels: function(traineeId, labels) {

    // todo: replace this logic below, need to hit DB
    for (var i=0; i<this.trainees.length; i++) {
      if (this.trainees[i].id.toString() === traineeId.toString()) {
        this.trainees[i].labels = labels;
        break;
      }
    }

    this.triggerChange();
    
  },

  triggerChange: function() {

    this.trigger('change', this.trainees);
  },

  trainees: TestTrainees
});
