//
// Auth.jsx
//

module.exports = {
  
  login: function(phone, pass, cb) {

    cb = arguments[arguments.length - 1];

    if (localStorage.token) {
      if (cb) {
        cb(true)
      }

      // notify the main component that the user is authenticated
      this.onChange(true);
      return;
    }

    if (phone && pass) {
      pretendRequest(phone, pass, function(res) {
        if (res.authenticated) {
          try {
            localStorage.token = res.token;
          } catch (e) {
            alert('您的浏览器不支持本地储存信息。请确认您没有启用"无痕浏览"后再尝试登录。')
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

  getUser: function() {
    return '姜山';
  },

  getToken: function() {
    return localStorage.token;
  },

  logout: function(cb) {
    delete localStorage.token;

    if (cb) {
      cb();
    }
    this.onChange(false);
  },

  loggedIn: function() {
    return !!localStorage.token;
  },

  // will be set to the UpdateAuth method from the main component
  onChange: function() {}
}

function pretendRequest(phone, pass, cb) {
  setTimeout(function() {
    if (phone === '12345' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
