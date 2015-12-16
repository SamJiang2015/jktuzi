
var Reflux = require('reflux');
var objectAssign = require('object.assign');

var AccountActions = require('../actions/account-actions');
var Api = require('../utils/api');
var Auth = require('../utils/auth');

module.exports = Reflux.createStore({

  listenables: [AccountActions],
  
  // todo: what happens when the user is not logged in
  // where to handle the 401 error: here or caller
  getAccountTraineeInfo: function(token) {

    // if the user has previously completed the trainee info, fetch it;
    // otherwise just return an object with all the fields set to null
    if (Auth.getInfoCompleted()) {
      var url = 'accounts/'+Auth.getAccountId()+'/traineeInfo'; 

      Api.get(url, token)
        .then(function(json){
          if (json.success) {
            this.accountTraineeInfo = json.data;
            this.triggerChange();
          }
        }.bind(this));
    } else {
      this.accountTraineeInfo = {
          // basic info:
          isMale: null,
          nickname: '',
          signature: '', 
          birthdate: '',
          email: '',
          profession: '',
          // health info:
          height: '',
          weight: '',
          bodyfat: '',
          weightGoal: '',
          bodyfatGoal: '',
          habbit: '',
          // sponsor:
          sponsorName: '',
          sponsorMobile: ''        
      };
      this.triggerChange();
    }
  },

  // since we ask the user to enter trainee info in steps,
  // we expose this action to store the partially completed info
  saveAccountTraineeInfoInMemory: function(data) {
    // store the properties specified in 'fields' in the fieldValues object
    this.accountTraineeInfo = objectAssign({}, this.accountTraineeInfo, data);
    this.triggerChange();
  },

  // call to create the trainee info on server side
  // use callback to return the status back to caller in case there are errors
  createAccountTraineeInfo: function(token, callback) {

    var url = 'accounts/'+ Auth.getAccountId() +'/traineeInfo';

    Api.post(url, this.accountTraineeInfo, token)
      .then(function(json){
        if (json.success) {
          this.accountTraineeInfo = json.data;
          // flip the flag cached at server-side;
          Auth.setInfoCompleted(true);    
          this.triggerChange();
        }
        // return the error code so that the caller can display proper UI to user
        callback({success: json.success, status: json.status});
      }.bind(this))
      .catch(function (error) {
          console.log('Error when calling submitTraineeInfo: ' + error.toString());
          callback({success: false, status: 500});
      });    
  },

  // call to create the trainee info on server side
  // use callback to return the status back to caller in case there are errors
  updateAccountTraineeInfo: function(token, callback) {

    var url = 'accounts/'+ Auth.getAccountId() +'/traineeInfo';

    Api.put(url, this.accountTraineeInfo, token)
      .then(function(json){
        if (json.success) {
          this.accountTraineeInfo = json.data;
          // flip the flag cached at server-side;
          Auth.setInfoCompleted(true);    
          this.triggerChange();
        }
        // return the error code so that the caller can display proper UI to user
        callback({success: json.success, status: json.status});
      }.bind(this))
      .catch(function (error) {
          console.log('Error when calling submitTraineeInfo: ' + error.toString());
          callback({success: false, status: 500});
      });    
  },

  triggerChange: function() {
    this.trigger('change', this.accountTraineeInfo);
  },

  getInitialState: function() {
    this.accountTraineeInfo = {
          // basic info:
          isMale: null,
          nickname: null,
          signature: null, 
          birthdate: null,
          email: null,
          profession: null,
          // health info:
          height: null,
          weight: null,
          bodyfat: null,
          weightGoal: null,
          bodyfatGoal: null,
          habbit: null,
          // sponsor:
          sponsorName: null,
          sponsorMobile: null
        };

    return this.accountTraineeInfo;
  }
});
