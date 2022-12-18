const express = require("express");


const app = express();
const cors=require("cors")
const morgan = require("morgan");
app.use(cors());
app.use(morgan("dev"));
const { sequelize } = require("./lib/databaseConnection");
const HttpException = require("./exceptions/HttpException");
const { initRoutes } = require("./routes");
const bodyParser = require("body-parser");
const passport = require("passport");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initRoutes(app);
require("./utils/passportConfig")(passport);


//sequelize authentication to database
sequelize
  .authenticate()
  .then(() => {
    // sequelize.sync({ force: true });
    console.log("Database connected successfully")
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
  err.message = err.stack || "Something went wrong";
  err.data = err.data|| null;

  res.status(err.status).json({
    success: err.success,
    status: err.status,
    message: err.message,
    data: err.data,
  });
});

const PORT=process.env.PORT

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
