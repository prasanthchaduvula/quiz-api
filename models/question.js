var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    quizset: {
      type: String,
      required: true
    },
    adminId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Admin"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
