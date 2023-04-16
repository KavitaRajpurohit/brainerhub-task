import { model, Schema } from "mongoose";
import constant from "../common/config/constant"
var mongoose = require('mongoose');

var tokensSchema = new Schema({
	token: { type: String, required: true, index: true, },
	type: {
		type: Number,
		required: true,
		// enum: [
		// 	constant.TOKEN_TYPE.ACCESS_TOKEN		]
	},
	expiresAt: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, required: true }
}, {
	timestamps: true,
	toObject: { getters: true },
	toJSON: { getters: true },
});
const Tokens = mongoose.model('Tokens', tokensSchema);

export default Tokens