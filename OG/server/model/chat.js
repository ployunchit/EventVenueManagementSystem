var mongoose = require('mongoose');
var Schema = mongoose.Schema;

chatSchema = new Schema( {
    name: String,
    chat: String
}),
chat = mongoose.model('Chats', chatSchema);

module.exports = chat;
