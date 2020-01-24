var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var markSchema = new Schema(
  {
    mark: {
      type: String,
      required: true
    },
    quizname: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mark", markSchema);
