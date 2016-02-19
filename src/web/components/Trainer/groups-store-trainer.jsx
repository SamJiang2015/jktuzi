//
// groups-store-trainer.jsx
//

var Reflux = require('reflux');

var GroupsActions = require('./groups-actions-trainer');
var Api = require('../../utils/api');
var Auth = require('../../utils/auth');

var TestGroups = require('./test-data').Test_Groups;

module.exports = Reflux.createStore({

  listenables: [GroupsActions],

  // retrieve the groups already cached in store
  getCachedGroups: function() {
    return this.groups;
  },
  
  findGroupCards: function(groupId) {
    // look for the matching group
    var showingGroup=null;
    for (var i=0; i<this.groups.length; i++) {
      if (this.groups[i].id.toString() === groupId) {
        showingGroup = this.groups[i];
        break;
      }
    }

    if (!showingGroup) {
      return null; 
    } else {
      return showingGroup;
    }
  },

  // retrieve the groups from store
  getGroups: function(token, dateFilter, cb) {

      var url = 'groups'; 

      Api.get(url, token)
        .then(function(json){
          if (json.success) {
            this.groups = json.data;
            this.triggerChange();
          }

          if (cb) cb(json.success, json.status);
        }.bind(this));
  },

  getGroupCards: function(groupId) {
    // todo: add logic to hit the db
    
    this.triggerChange();
  },

  // retrieve detail info including membership of a particular group
  getGroupDetails: function(token, groupId, cb) {

      var url = 'groups/' + groupId; 

      Api.get(url, token)
        .then(function(json){

          if (json.success) {
            var groupData = json.data;
            var cachedGroupIndex;

            // cache the return result in this.groups
            for (var i=0; i<this.groups.length; i++) {
              if (this.groups[i].id === groupData.id) {
                cachedGroupIndex = i;
                break;
              }
            }

            if (cachedGroupIndex) {
              this.groups[cachedGroupIndex] = groupData;
            } else {
              this.groups.push(groupData);
            }

            this.triggerChange();
          }

          if (cb) cb(json.success, json.status);
        }.bind(this));
  },  

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
  },

  groups: TestGroups
});
