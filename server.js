const express = require("express");
const connectDB = require("./config/db");
const app = express();
//ConnectDB
connectDB();
///Init middleware
app.use(express.json({ extended: false }));
//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
