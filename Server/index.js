const express = require("express");
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./src/v1/routes/userRoutes");
const v1AdminRouter = require("./src/v1/routes/adminRouter");
const sellerItem = require("./src/v1/routes/sellerItem")
const bidItem = require("./src/v1/routes/bidItem")
const cors =  require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use("/", v1WorkoutRouter);
app.use("/", v1AdminRouter);
app.use("/", sellerItem);
app.use("/", bidItem);

app.listen(3000, () => {
    console.log(`API is listening on port ${PORT}`);
});
