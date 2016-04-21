var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataScheme = new Schema({
	date: Date
});

module.exports = mongoose.model('calendarDate', dataScheme);