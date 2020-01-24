var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userPassword: {
      type: String,
      required: true
    },
    userPicture: {
      type: String,
      required: true
    },
    marksId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Mark"
      }
    ]
  },
  { timestamps: true }
);

// hashing password
userSchema.pre("save", function(next) {
  if (this.userPassword && this.isModified("userPassword")) {
    bcrypt.hash(this.userPassword, 10, (err, userPassword) => {
      if (err) return next(err);
      this.userPassword = userPassword;
      next();
    });
  }
});

userSchema.methods.verifyPassword = function(userPassword) {
  return bcrypt.compareSync(userPassword, this.userPassword);
};

module.exports = mongoose.model("User", userSchema);
