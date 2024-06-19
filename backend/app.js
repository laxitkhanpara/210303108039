require('dotenv').config();
port = process.env.PORT || 35000
const express = require("express");
const app = express();

const CompanyDetailsRouter= require("./router/CompanyDetailsRouter");
app.use("/",CompanyDetailsRouter);

//==================server=========================
app.listen(port, () => {
    try {
        console.log(`connection is working on '${port}'`)
    } catch (error) {
        console.log(error);
    }
})