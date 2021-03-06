//
// Auth.jsx
//

var Api = require('./api');
var Constants = require('./constants');

module.exports = {
  
  /*
  ** login
  */
  login: function(mobile, pass, requiredRoleType, cb) {

    cb = arguments[arguments.length - 1];

    // ToDo: commented out the check on localStorage.token because it is
    // problematic to trust local cached token, as 
    // if the server-side token has been removed, user action will result in
    // auth error.  To address this, we hit the server for a new login token
    // each time user provides mobile and pass.

    // if (localStorage.token) {
    //   if (cb) {
    //     cb(true)
    // //   }

    //   // notify the main component that the user is authenticated
    //   this.onChange(true);
    //   return;
    // }

    if (mobile && pass) {
      loginRequest(mobile, pass, function(res, json) {
        if (res.authenticated) {
          try {
            localStorage.token = res.token;
            this.accountName = res.name;
            this.role = res.role;
            this.infoCompleted = res.infoCompleted;
            this.accountId = res.accountId;
            this.coachId = res.coachId;
          } catch (e) {
            if (cb) cb(false, 400, '您的浏览器不支持本地储存信息。请确认您没有启用"无痕浏览"后再尝试登录。');
            this.onChange(false);
            return;
          }

          // check the role
          var roleCheckSuccess=false;
          if (requiredRoleType) {
            for (var i=0; i<requiredRoleType.length; i++) {
              if (this.role == requiredRoleType[i]) {
                roleCheckSuccess = true;
              }
            }
            if (!roleCheckSuccess) {
              this.onChange(false);
              if(cb) cb(false, 400, '您不是教练身份');
              this.logout();
              return;
            }  
          }

          if (cb) cb(true)
          this.onChange(true);
        } else {
          if (cb) cb(false, res.status, json);
          this.onChange(false);    
        }
      }.bind(this));
    } else {
      // empty string
      this.onChange(false);
      if(cb) cb(false, 400, '账户和密码不能为空');
    } 
  },

  /*
  ** handles registration
  */
  // register: function(mobile, name, pass, cb) {

  //   cb = arguments[arguments.length - 1];

  //   if (mobile && name && pass) {
  //     Api.post('accounts', 
  //               {mobile: mobile, name: name, password: pass}, 
  //               localStorage.token)
  //     .then(function(json){
  //       cb(json.success);
  //       })
  //     .catch(function (e) {
  //       console.log('Error when calling register: ' + e.toString());
  //       cb(false);
  //     });    
  //   } else {
  //     cb(false);
  //   }
  // },

  /*
  ** handles logging out
  */
  logout: function(cb) {
    if (localStorage.token) {
      // call the DB to delete the token stored on server side
      // we don't care what the function returns; it is okay even 
      // if the token was not deleted properly since we already
      // removed it from client side.    
      Api.post('logout', 
        [{key: 'userId', value: this.accountId}],
        localStorage.token, 
        Api.PostType.STRING)
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

  getCoachId: function() {
    return this.coachId;
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

  // getInfoCompleted: function() {
  //   return this.infoCompleted;
  // },
  //
  // setInfoCompleted: function(infoCompleted) {
  //   this.infoCompleted = infoCompleted;
  // },

  loggedIn: function() {
    return !!localStorage.token;
  },

  // will be set to the UpdateAuth method from the main component
  onChange: function() {},

  // will be set once a login is successfully called
  accountName: '',
  accountId: null,
  coachId: null,
  role: null,
//  infoCompleted: false
}

/*
** login helper function that talks to the server 
*/
function loginRequest(mobile, pass, cb) {

  Api.post(
    'login', 
    [{key: 'mobnum', value: mobile},
     {key: 'password', value: pass}],
     null, //token
     null,
     Api.PostType.STRING)
  .then(function(json){
    if (json.code === 200) {
      cb({
        authenticated: true,
        status: json.code,
        accountId: json.data.userId,
        token: json.access_token,
        name: json.data.nickname,
        role: json.data.role,
        coachId: json.data.coachid,
        gender: json.data.gender
      })
    } else {
      cb({authenticated: false, status: json.status}, json);
    }
  });  

//  JSON类型的 POST用下面的code  
  // Api.post(
  //   'accounts/login', 
  //   {mobile: mobile, password: pass})
  // .then(function(json){
  //   if (json.success) {
  //     cb({
  //       authenticated: true,
  //       status: json.status,
  //       accountId: json.data.id,
  //       token: json.data.token,
  //       name: json.data.name,
  //       role: json.data.roleTypeId,
  //       infoCompleted: json.data.infoCompleted
  //     })
  //   } else {
  //     cb({authenticated: false, status: json.status});
  //   }
  // });

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



