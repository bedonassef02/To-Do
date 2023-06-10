const express = require("express");
const cors = require("cors");
const app = express()
const bodyParser = require('body-parser');

const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/", require("./src/routes/user.router"))

app.use("/api/lists/", require("./src/routes/list.router"))
app.use("/api/lists/", require("./src/routes/list.items.router"))

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})