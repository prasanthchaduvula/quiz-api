var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var quizsetSchema = new Schema({
  questionsId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
  quizsetName: {
    type: String
  }
});

module.exports = mongoose.model("Quizset", quizsetSchema);
