var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var app = express();

// connect mongo
mongoose.connect(
  "mongodb://localhost/quiz-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    console.log("connected", err ? false : true);
  }
);

// handling routes
var adminsRouter = require("./routes/admins");
var adminRouter = require("./routes/admin");
var questionsRouter = require("./routes/questions");
var usersRouter = require("./routes/users");
var userRouter = require("./routes/user");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/admins", adminsRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ err });
});

module.exports = app;
