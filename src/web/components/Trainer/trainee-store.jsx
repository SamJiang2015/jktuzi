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

  getTraineeInfo: function(traineeId, accountId, token, cb) {
    var url= 'userinfo';
    traineeId=traineeId.toString();
    var params = {userId: traineeId};

    Api.get(url, token, params, accountId)
      .then(function(json){
          if (json.code===200) {
            
            if (!this.trainees[traineeId]) {
              this.trainees[traineeId] = {};
            }
            
            this.trainees[traineeId].infoSynced = true;
            this.trainees[traineeId].gender = json.gender;
            this.trainees[traineeId].birthday = json.birthday;
            this.trainees[traineeId].city = json.city;
            this.trainees[traineeId].college = json.college;
            this.trainees[traineeId].lifeStatus = json.lifeStatus;
            this.trainees[traineeId].practiseHobby = json.practiseHobby;
            this.trainees[traineeId].height = json.height;
            this.trainees[traineeId].curWeight = json.curWeight;
            this.trainees[traineeId].fatori = json.fatori;
            this.trainees[traineeId].hopeWeight = json.hopeWeight;

            this.triggerChange();
          }

          if (cb) cb(json.code===200, json);
        }.bind(this)        
        );
  },

  // retrieve the list of labels of a trainee
  getTraineeLabels: function(traineeId, accountId, classId, token, cb) {
      var url = 'labels'; 
      traineeId=traineeId.toString();
      var params = {userId: traineeId, operatorId: accountId, classId: classId};

      Api.get(url, token, params, accountId)
        .then(function(json){
          if (json.code===200) {
             if (!this.trainees[traineeId]) {
              this.trainees[traineeId] = {};
            }
            this.trainees[traineeId.toString()].bodyLabels = json.bodyLabel;
            this.triggerChange();
          }

          if (cb) cb(json.code===200, json);
        }.bind(this));
    this.triggerChange();
  },

  writeTraineeLabels: function(traineeId, labels, coachId, accountId, classId, token, cb) {

    var url = 'labels'; 

    var payload = {
      coachId: coachId,
      operatorId: accountId,
      userId: traineeId,
      classId: classId,
      labels: labels
    };

    Api.post(url, payload, token, accountId)
      .then(function(json){
        if (json.code===200) {
          this.trainees[traineeId.toString()].bodyLabels = labels;
          this.triggerChange();
        }

        if (cb) cb(json.code===200, json);
      }.bind(this));    
  },

  triggerChange: function() {
    this.trigger('change', this.trainees);
  },

  trainees: {}
});
