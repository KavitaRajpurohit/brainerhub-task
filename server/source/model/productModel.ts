import { boolean } from "@hapi/joi";
import { timeStamp } from "console";
import { model, Schema } from "mongoose";
var mongoose = require('mongoose');


const ProductSchema = new Schema({

    sProductName: String,
    sProductImage: String,
    sPrice: Number,
    sDescription: String,
   sQuantity: Number
}, {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
});
const products = mongoose.model("products", ProductSchema);

export default products;