var React = require('react');
var Auth = require('../Auth');

module.exports = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})