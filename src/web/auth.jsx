//
// Auth.jsx
//

module.exports = {
  
  login: function(email, pass, cb) {

    cb = arguments[arguments.length - 1];

    if (localStorage.token) {
      if (cb) {
        cb(true)
      }

      // notify the main component that the user is authenticated
      this.onChange(true);
      return;
    }

    pretendRequest(email, pass, function(res) {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true)
        this.onChange(true);
      } else {
        if (cb) cb(false)
        this.onChange(false);    
      }
    })
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token;
    if (cb) cb()
    this.onChange(false);
  },

  loggedIn() {
    return !!localStorage.token;
  },

  // will be set to the UpdateAuth method from the main component
  onChange() {}
}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
