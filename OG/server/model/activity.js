var mongoose = require('mongoose');
var Schema = mongoose.Schema;

activitySchema = new Schema( {
	name: String,
	address: String,
	price: Number,
    capacity: Number,
    dateTime: String,
	image: String,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
activity = mongoose.model('activity', activitySchema);

module.exports = activity;