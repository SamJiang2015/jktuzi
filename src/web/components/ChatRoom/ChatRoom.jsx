var React = require('react');
var io = require('socket.io-client');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			socket: io(),
			message: null,
			messageList: []
		}
	},

	componentDidMount: function() {
		this.state.socket.on('message', function(socketMessage) {
			console.log(this.state);
			var messageList = this.state.messageList;
			messageList.push(socketMessage);
			this.setState({
				messageList: messageList
			});
		}.bind(this));

	},

	handleInputChange: function(e) {
		e.preventDefault();

		this.setState({
			message: e.target.value
		})
	},

	handleSendMessage: function(e) {
		e.preventDefault();

		var socketMessage = {
			text: this.state.message,
			sender: '我'
		};

		var messageList = this.state.messageList;
		messageList.push(socketMessage);

		this.state.socket.emit('message', socketMessage);

		this.setState({
			message: '',
			messageList: messageList
		});
	},

	renderMessageList: function() {
		return (
			this.state.messageList.map(function(message) {
				return (
						<li>{message.sender}: {message.text}</li>
					);
			}.bind(this)
		));
	},

	render: function(){

		return (
			<div id="chat-room">
				<ul id="messages">
					{this.renderMessageList()}	
				</ul>
			    <form id="message-form">
			        <input 
			        	id="message-box" 
			        	value={this.state.message}
			        	onChange={this.handleInputChange} 
			        	placeholder="输入你的信息。。。" />
			        <button 
			        	className="send-button btn btn-success" 
			        	onClick={this.handleSendMessage}>发送
		        	</button>
			    </form>
			</div>
			);
	}	
})