//
// sportcard-store.jsx
//

var Reflux = require('reflux');

var GroupsActions = require('./groups-actions-admin');
var Api = require('../../utils/api');
var Auth = require('../../utils/auth');

module.exports = Reflux.createStore({

  listenables: [GroupsActions],

  // create a group
  createGroup: function(token, cb) {
    var url = 'groups';

    Api.post(url, null, token)
      .then(function(json){
        if (json.success) {
          this.groups = json.data;
          this.triggerChange();
        }
        // return the error code so that the caller can display proper UI to user
        if (cb) cb(json.success, json.status);
      }.bind(this))
      .catch(function (error) {
          console.log('Error when calling createGroup: ' + error);
          if (cb) cb(false, 500);
      });    
  },
  
  // getGroups: function(accountId, token, cb) {

  //     var url = 'accounts/'+ accountId +'/groups'; 
  //     Api.get(url, token)
  //       .then(function(json){
  //         if (json.success) {
  //           this.groups = json.data;
  //           this.triggerChange();
  //         }

  //         if (cb) cb(json.status);
  //       }.bind(this));
  // },

  // getGroupMembers: function(accountId, groupId, token, cb) {

  //   // look for the matching group
  //   var showingGroup=null;
  //   var index=null;
  //   for (var i=0; i<this.groups.length; i++) {
  //     if (this.groups[i].id === groupId) {
  //       showingGroup = this.groups[i];
  //       index=i;
  //       break;
  //     }
  //   }

  //   if (!showingGroup) {
  //     console.log('getGroupMembers called with unrecognized groupId');
  //     if (cb) cb(false, 400);
  //     return; 
  //   }

  //   if (showingGroup.members && showingGroup.members.legnth>0) {
  //     // we already fetched members of this group
  //     if (cb) cb(true, 200);
  //     return;
  //   } else {
  //     // fetch from DB
  //     var url = 'groups/'+ groupId; 
  //     Api.get(url, token)
  //       .then(function(json){
  //         if (json.success) {
  //           // note that the call return the full info of the group
  //           this.groups[index] = json.data;
  //           this.triggerChange();
  //       }
  //       if (cb) cb(true, json.status);
  //     }.bind(this));
  //   }
  // },

  triggerChange: function() {

    this.trigger('change', this.groups);
  }
});
