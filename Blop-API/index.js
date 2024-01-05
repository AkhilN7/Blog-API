const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
//middlewares
app.use(bodyParser.json());
//middlewares for adminRouter and userRouter
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`started listening on PORT: ${PORT}`);
});
