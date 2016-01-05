var constants = require('./constants');
var questionModel = {
	randomQuestion: function(){
		var url = constants.restURL+ "questions/random.json";
		return getRequest(url);
	},
	getQuestion:function(id){
		var url = constants.restURL + "questions/" + id;
		return getRequest(url);
	}
}
function getRequest(url){
	return $.get(url)
}
module.exports = questionModel;
