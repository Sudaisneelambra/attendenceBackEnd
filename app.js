require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
// const cron = require('node-cron');

const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;

const commonRoutes = require('./routes/common.routes')
const adminRoutes = require('./routes/admin.routes')
const employeeRoutes = require('./routes/employee.routes')


app.use(cors())
app.use(express.json());

// cron.schedule('03 1  * * 1-6', () => {

//     const time = new Date();
//     const currentTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     const notification = {
//       message: 'This is a reminder that check-in time is at 9:00 AM. Please be on time, Thank You 🙏',
//       Time: currentTime
//     };
  
//     array.forEach(user => {
//       io.to(user.socketId).emit('notification', notification);
//     });
//   });

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


