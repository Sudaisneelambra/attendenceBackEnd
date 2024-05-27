require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;

const commonRoutes = require('./routes/common.routes')
const adminRoutes = require('./routes/admin.routes')
const employeeRoutes = require('./routes/employee.routes')


app.use(cors())
app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`database connected successfully`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log(`Database connection failed`);
  });

  app.use('/', commonRoutes)
  app.use('/admin', adminRoutes)
  app.use('/employee', employeeRoutes)


