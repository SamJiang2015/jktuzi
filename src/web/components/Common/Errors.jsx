//
// Errors.jsx
//

var React = require('react');

module.exports = React.createClass({
	statics: {
		getMsg: function(errorCode) {
			switch(errorCode) {
				case 200:
				case 201:
				case 204: 
					return '您的操作已成功';
				case 400:
					return '好像您输入的信息有误哦。请核对信息后再试。如果持续有问题，请您联系我们客服(电话: (010)xxxx-xxxx)';
				case 401: 
					return '很抱歉您的登录已经失效。请重新登录。';
				case 404: 
					return '您想要的信息还不存在。请核对后再试。';
				case 500: 
				default: 
					return '很抱歉暂时不能完成您的操作。请您稍侯再试。如果持续有问题，请联系我们客服(电话：(010)xxxx-xxxx)';
			}
		}
	},

	render: function() {

	}
})