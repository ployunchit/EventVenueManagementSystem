var mongoose = require('mongoose');
var Schema = mongoose.Schema;

venueSchema = new Schema( {
	name: String,
	address: String,
	price: Number,
	image: String,
	discount: Number,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
}),
venue = mongoose.model('venue', venueSchema);

module.exports = venue;