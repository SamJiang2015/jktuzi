//
// group-actions-trainer.jsx
//

var Reflux = require('reflux');

module.exports = Reflux.createActions([
	'getGroups',
	'getGroupCards',
	'writeGroupCards',

	'writeTraineeLabels' //todo: consider moving this action to a separate store
]);
