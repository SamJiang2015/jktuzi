//
// Auth.jsx
//

var Api = require('./api');
var Constants = require('./constants');

module.exports = {
  
  /*
  ** login
  */
  login: function(mobile, pass, cb) {

    cb = arguments[arguments.length - 1];

    if (localStorage.token) {
      if (cb) {
        cb(true)
      }

      // notify the main component that the user is authenticated
      this.onChange(true);
      return;
    }

    if (mobile && pass) {
      loginRequest(mobile, pass, function(res) {
        if (res.authenticated) {
          try {
            localStorage.token = res.token;
            this.accountName = res.name;
            this.role = res.role;
            this.infoCompleted = res.infoCompleted;
            this.accountId = res.accountId;
          } catch (e) {
            alert('您的浏览器不支持本地储存信息。请确认您没有启用"无痕浏览"后再尝试登录。');
            if (cb) cb(false);
            this.onChange(false);
            return;
          }

          if (cb) cb(true)
          this.onChange(true);
        } else {
          if (cb) cb(false)
          this.onChange(false);    
        }
      }.bind(this));
    }
  },

  /*
  ** handles registration
  */
  register: function(mobile, name, pass, cb) {

    cb = arguments[arguments.length - 1];

    if (mobile && name && pass) {
      Api.post('accounts', {mobile: mobile, name: name, password: pass})
      .then(function(json){
        cb(json.success);
        })
      .catch(function (e) {
        console.log('Error when calling register: ' + e.toString());
        cb(false);
      });    
    } else {
      cb(false);
    }
  },

  /*
  ** handles logging out
  */
  logout: function(cb) {
    if (localStorage.token) {
      // call the DB to delete the token stored on server side
      // we don't care what the function returns; it is okay even 
      // if the token was not deleted properly since we already
      // removed it from client side.    
      Api.delete('accounts/login')
          .then(function(json) {
            //do nothing
          });

      // remove the stored token on the client side
      delete localStorage.token;
    }

    if (cb) {
      cb();
    }
    this.onChange(false);
  },

  /*
  ** getting functions
  */
  getAccountName: function() {
    return this.accountName;
  },

  getAccountId: function() {
    return this.accountId;
  },

  getToken: function() {
    return localStorage.token;
  },

  getRole: function() {
    return this.role;
  },

  getRoleName: function() {
    return Constants.RoleName[this.role];
  },

  getInfoCompleted: function() {
    return this.infoCompleted;
  },

  setInfoCompleted: function(infoCompleted) {
    this.infoCompleted = infoCompleted;
  },

  loggedIn: function() {
    return !!localStorage.token;
  },

  // will be set to the UpdateAuth method from the main component
  onChange: function() {},

  // will be set once a login is successfully called
  accountName: '',
  accountId: null,
  role: Constants.RoleValue.Trainee,
  infoCompleted: false
}

/*
** login helper function that talks to the server 
*/
function loginRequest(mobile, pass, cb) {

  Api.post('accounts/login', {mobile: mobile, password: pass})
  .then(function(json){
    console.log(json);
    
    if (json.success) {
      cb({
        authenticated: true,
        accountId: json.data.id,
        token: json.data.token,
        name: json.data.name,
        role: json.data.roleId,
        infoCompleted: json.data.infoCompleted
      })
    } else {
      cb({authenticated: false});
    }
  });

  // setTimeout(function() {
  //   if (phone === '12345' && pass === 'password1') {
  //     cb({
  //       authenticated: true,
  //       token: Math.random().toString(36).substring(7)
  //     })
  //   } else {
  //     cb({ authenticated: false })
  //   }
  // }, 0)
}



