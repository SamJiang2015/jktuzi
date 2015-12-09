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
          localStorage.token = res.token;
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
