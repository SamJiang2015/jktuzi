var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container about">
				<p>PiPi的宗旨是帮助朋友们轻松的过健康生活</p>
				<p>现在已有<span className="number">XXXX</span>位学员，<span className="number">XX</span>位教练</p>
			</div>
			);
	}
})