const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
    },
    addresses: {
        type: [mongoose.Schema.Types.Mixed],
    },
    salt: {
        type: Buffer,
    },
    resetPasswordToken: {
        type: String, 
        default: '',
    }
}, {
    timestamps: true
});

const virtual = userSchema.virtual('id');
virtual.get(function () {
    return this._id;
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

userSchema.methods.comparePassword = async function(textPassword){
    return await bcrypt.compare(textPassword, this.password);
    // return textPassword === this.password;
}

userSchema.pre("save", async function(next){
    if(!this.isModified){
        console.log("can not be bcrypted");
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


module.exports = mongoose.model("User", userSchema);