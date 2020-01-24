var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var adminSchema = new Schema(
  {
    adminName: {
      type: String,
      required: true
    },
    adminEmail: {
      type: String,
      required: true,
      unique: true,
      match: /@/
    },
    adminPassword: {
      type: String,
      required: true
    },
    adminPicture: {
      type: String,
      required: true
    },
    questionsId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question"
      }
    ]
  },
  { timestamps: true }
);

// hashing adminPassword
adminSchema.pre("save", function(next) {
  if (this.adminPassword && this.isModified("adminPassword")) {
    bcrypt.hash(this.adminPassword, 10, (err, adminPassword) => {
      if (err) return next(err);
      this.adminPassword = adminPassword;
      next();
    });
  }
});

adminSchema.methods.verifyPassword = function(adminPassword) {
  return bcrypt.compareSync(adminPassword, this.adminPassword);
};

// export model
module.exports = mongoose.model("Admin", adminSchema);
