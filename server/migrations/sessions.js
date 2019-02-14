const mongoose = require("mongoose");
const { Schema } = mongoose;

const SessionSchema = new Schema({
  token: {
    type: String,
    required: true
  }
});

mongoose.model("sessions", SessionSchema);
