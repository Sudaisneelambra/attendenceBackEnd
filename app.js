require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const cron = require('node-cron');

const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const employees =require('./models/login')
const attendences = require('./models/attendance')

const commonRoutes = require('./routes/common.routes')
const adminRoutes = require('./routes/admin.routes')
const employeeRoutes = require('./routes/employee.routes');
const { status } = require("express/lib/response");


app.use(cors())
app.use(express.json());

cron.schedule('00 23  * * 1-6', async () => {
    const optionsTime = { timeZone: 'Asia/Kolkata' };
    const currentDate = new Date().toLocaleString('en-US', optionsTime);
    const [currentDatePart, currentTimePart] = currentDate.split(', ')
    const attendence = await attendences.find()
    const employee = await employees.find()

    const todyas = attendence.filter((m)=>{
        const [datePart, timePart] = m.checkIn.split(', ');
        return datePart == currentDatePart
    })

    const excludedObjects = employee.filter((emp) => {
        const isPresent = todyas.some((today) => {
            return emp._id.equals(today.employeeId);
        });
        return !isPresent;
    });

    excludedObjects.forEach( async(element) => {
        const newAttendence = new attendences({
            employeeId:element._id,
            date:currentDate,
            status:'leave'
        })
        await newAttendence.save()
    });
  });

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


