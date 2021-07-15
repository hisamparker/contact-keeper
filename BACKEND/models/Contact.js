const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	type: {
		type: String,
		default: 'personal'
	}
},
{
    timestamps: { createdAt: `created_at`, updatedAt: `updated_at` }
}
);

module.exports = mongoose.model('contact', ContactSchema);