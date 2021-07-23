import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
let createError = require("http-errors");

let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let usersRouter = require("./routes/users");

let app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));


let fallpath = path.join(__dirname, "../public/fe/index.html");
app.get("**", (req: Request, res: Response) => {
  res.sendFile(fallpath);
});

app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
