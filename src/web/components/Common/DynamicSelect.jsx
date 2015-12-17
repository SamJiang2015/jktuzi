//
// DynamicSelect.jsx
//
//    <DynamiceSelect 
//			selectItems={itemsArray<value, display>}
//			handleChange={someFunc(value)}
//			className
//			value />

var React = require('react');
// React-Bootstrap components
var Input = require('react-bootstrap/lib/input'); 

module.exports = React.createClass({

  // call the parent function to handle change
  handleChange: function(e) {
  	  e.preventDefault();
      this.props.handleChange(e.target.value);
  },

  // selectItems is an array of objects with two properties:
  //  1- value  2-display
  renderSelectItems: function() {
    return this.props.selectItems.map(function(item){
      return (
      <option
      	key={item.value}
        value={item.value}>
        {item.display}
      </option>
      )
    }.bind(this));
  },

  render: function() {
    var results = (
      <Input
      	label={this.props.label}
        type='select'
        value={this.props.value}
        className={this.props.className}
        onChange={this.handleChange}>
        {this.renderSelectItems()}
      </Input>
    );
    return results;
  }
})
