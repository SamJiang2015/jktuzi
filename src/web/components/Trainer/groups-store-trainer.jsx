//
// groups-store-trainer.jsx
//

var Reflux = require('reflux');

var GroupsActions = require('./groups-actions-trainer');
var Api = require('../../utils/api');

var TestGroups = require('./test-data').Test_Groups;

module.exports = Reflux.createStore({

  listenables: [GroupsActions],

  // retrieve the groups already cached in store
  getCachedGroups: function() {
    return this.groups;
  },

  // retrieve the list of groups managed by a trainer from store
  getGroups: function(coachId, token, accountId, cb) {

      var url = 'coachclasslist'; 

      var params = {coachId: coachId};

      Api.get(url, token, params, accountId)
        .then(function(json){

          if (json.code===200) {
            this.groups = json.data;
            this.triggerChange();
          }

          if (cb) cb(json.code===200);
        }.bind(this));
  },

  // helper function
  pickGroupById: function(groupId) {
    var group; 
    for (var i=0; i< this.groups.length; i++) {
      if (this.groups[i].classid.toString()===groupId.toString()) {
        group = this.groups[i];
      }
    }

    return group;
  },

  // retrieve the cards for all trainees belonging to a group
  getGroupCards: function(groupId, date, accountId, token, cb) {
      var url = 'cards'; 

      var params = {classId: groupId, date: date, operatorId: accountId};

      Api.get(url, token, params, accountId)
        .then(function(json){
          if (json.code===200) {
            // cache the cards info in the groups array. 
            var group = this.pickGroupById(groupId);
            // todo: consider caching the info for different dates in the group object
            // this can be done by: group[date] = json.data
            // however, reason to not cache is to hit DB to refresh data any chance we get
            group.trainees = json.data;
            this.triggerChange();
          }

          if (cb) cb(json.code===200);
        }.bind(this));
  },

  // write remarks into DB
  writeRemarks: function(groupId, coachId, operatorId, date, remarks, token, cb) {

    var url = 'remarks'; 

    var payload = {
      classId: groupId, 
      coachId: coachId,
      operatorId: operatorId,
      date: date,
      remarks: remarks
    };

    Api.post(url, payload, token, operatorId)
      .then(function(json){
        if (json.code===200) {
            // cache the cards info in the groups array. 
            var group = this.pickGroupById(groupId);
            // this can be done by: group[date] = json.data
            // however, reason to not cache is to hit DB to refresh data any chance we get
            group.trainees = json.data;
            this.triggerChange();
        }
        if (cb) cb(json.code===200);
      }.bind(this));    
  },

  // write exercise info into DB
  writeExerciseInfo: function(groupId, coachId, operatorId, date, exerciseInfo, token, cb) {

    var url = 'exercise'; 

    var payload = {
      classId: groupId, 
      coachId: coachId,
      operatorId: operatorId,
      cardDate: date,
      cards: exerciseInfo
    };

    Api.post(url, payload, token, operatorId)
      .then(function(json){
        if (json.code===200) {
            // cache the cards info in the groups array. 
            var group = this.pickGroupById(groupId);
            // this can be done by: group[date] = json.data
            // however, reason to not cache is to hit DB to refresh data any chance we get
            group.trainees = json.data;
            this.triggerChange();
        }
        if (cb) cb(json.code===200);
      }.bind(this));    
  },

  // write meal info into DB
  writeMealInfo: function(groupId, coachId, operatorId, date, url, mealInfo, token, cb) {

    var payload = {
      classId: groupId, 
      coachId: coachId,
      operatorId: operatorId,
      cardDate: date,
      cards: mealInfo
    };

    Api.post(url, payload, token, operatorId)
      .then(function(json){
        if (json.code===200) {
            // cache the cards info in the groups array. 
            var group = this.pickGroupById(groupId);
            // this can be done by: group[date] = json.data
            // however, reason to not cache is to hit DB to refresh data any chance we get
            group.trainees = json.data;
            this.triggerChange();
        }
        if (cb) cb(json.code===200);
      }.bind(this));    
  },

  // write exercise info into DB
  writeBodyInfo: function(groupId, coachId, operatorId, date, bodyInfo, token, cb) {

    var url = 'body'; 

    var payload = {
      classId: groupId, 
      coachId: coachId,
      operatorId: operatorId,
      cardDate: date,
      cards: bodyInfo
    };

    Api.post(url, payload, token, operatorId)
      .then(function(json){
        if (json.code===200) {
            // cache the cards info in the groups array. 
            var group = this.pickGroupById(groupId);
            // this can be done by: group[date] = json.data
            // however, reason to not cache is to hit DB to refresh data any chance we get
            group.trainees = json.data;
            this.triggerChange();
        }
        if (cb) cb(json.code===200);
      }.bind(this));    
  },

  // // write the cards info for all trainees belonging to a group
  // writeGroupCards: function(group) {

  //   if (!group || !group.trainees || group.trainees.length===0) {
  //     console.log("writeGroupCards called with null or empty group");
  //     return;
  //   }

  //   // todo: replace this logic below, need to hit DB
  //   for (var i=0; i<this.groups.length; i++) {
  //     if (this.groups[i].id.toString() === group.id.toString()) {
  //       this.groups[i] = group;
  //       break;
  //     }
  //   }

  //   this.triggerChange();
  // },

  triggerChange: function() {

    this.trigger(this.groups);
  },

  groups: []
});
