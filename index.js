const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./lib/database.connection");
const HttpException = require("./exceptions/http.exception");
const { initRoutes } = require("./routes/index");
const passport = require("passport");
const IAes = require("./algorithm/aes");

require("./utils/passportConfig")(passport);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));

initRoutes(app);

//sequelize authentication to database
sequelize
  .authenticate()
  .then(() => {
    // sequelize.sync({ alter: true });
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

//test endpoint
app.get("/test", (req, res) => {
  res.json({
    message: "test successful",
  });
});

//if Routes Not Found
app.use((req, res, next) => {
  const err = new HttpException(404, "Route doesnot exist");
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  err.success = false;
  err.status = err.status || 500;
  err.message = err.message || "Something went wrong";
  err.stack = err.stack;
  err.data = err.data || null;

  res.status(err.status).json({
    success: err.success,
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err.errors,
    data: err.data,
  });
});

const PORT = process.env.PORT;
// var encr = IAes.encrypt("big secret", "pāşšŵōřđ", 256);
// console.log(encr);
// var decr = IAes.decrypt("lwGl66VVwVObKIr6of8HVqJr", "pāşšŵōřđ", 256); // decr: 'big secret'

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
