const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String },
    address: { type: String },
    paymentOption: { type: String, enum: ["card", "bkash", "cash"], required: true },
    transactionId: { type: String, required: function () { return this.paymentOption !== "cash"; } },
    courseSelection: { type: String, required: true },
    photo: { type: String }, // base64 string
    progress: { type: Number, default: 0 },
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
