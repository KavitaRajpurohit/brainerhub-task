import { pick } from "lodash";
import mongoose from "mongoose";
import { model, Schema } from "mongoose";

import bcrypt from "bcryptjs";
import { array, string } from "@hapi/joi";

const userSchema = new mongoose.Schema({

    sEmail: {
        type: String,
    },
    sPassword: {
        type: String,
    },
},
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    });
userSchema.methods.transform = function () {
    const user = this;
    return pick(user.toJSON(), ['sEmail', "sPassword"]);
};
userSchema.pre('save', async function (next) {
    const user: any = this;
   // let lastUser = await userModel.findOne({ sUserRole: "User" }, { nNo: 1 }).sort({ _id: -1 }).limit(1);
    // if (lastUser) {
    //     let count: any
    //     count = lastUser.nNo;
    //     count = count + 1;
    //     user.nNo = count;
    // } else {
    //     user.nNo = 1;
    // }
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
        next();
    }
    next();
});

const userModel = mongoose.model("users", userSchema);
export default userModel