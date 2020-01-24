var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    answers: {
      type: [String],
      required: true
    },
    correctanswer: {
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
