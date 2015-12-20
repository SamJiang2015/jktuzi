//
// sportcard-store.jsx
//

var Reflux = require('reflux');
var _ = require('underscore');

var GroupsActions = require('../actions/groups-actions');
var Api = require('../utils/api');
var Auth = require('../utils/auth');

module.exports = Reflux.createStore({

  listenables: [GroupsActions],
  
  getGroups: function(accountId, token, cb) {

      var url = 'accounts/'+ accountId +'/groups'; 
      Api.get(url, token)
        .then(function(json){
          if (json.success) {
            this.groups = json.data;
            this.triggerChange();
          }

          if (cb) cb(json.status);
        }.bind(this));
  },

  getGroupMembers: function(accountId, groupId, token, cb) {

    var group = _.findWhere(this.groups, {id: groupId});

    if (!group) {
      console.log('getGroupMembers called with unrecognized groupId');
      if (cb) cb(400);
      return; 
    }

    if (group.members && groups.members.legnth>0) {
      // we already fetched members of this group
      if (cb) cb(200);
      return;
    } else {
      // fetch from DB
      var url = 'groups/'+ groupId; 
      Api.get(url, token)
        .then(function(json){
          if (json.success) {
            group.members = json.data;
        }
        if (cb) cb(json.status);
      }.bind(this));
    }
  },
  
  triggerChange: function() {

    this.trigger('change', this.groups);
  }
});
