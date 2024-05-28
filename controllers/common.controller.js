const users = require('../models/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const sercretKey = process.env.JWT_SECRET_KEY
const attendence = require('../models/attendance')

const commonLogin = async ( req, res ) => {
    try {
        const { password, email, userType } = req.body;
        const mailExist = await users.findOne({ email });
        if (mailExist) {
            const passwordDecode = await bcrypt.compare(password, mailExist.password);
            if (passwordDecode) {

                const token = jwt.sign(
                    {
                      employeeId: mailExist._id,  
                      name: mailExist.username,
                      email: mailExist.email,
                      phonenumber: mailExist.phoneNumber,
                      type: mailExist.isAdmin,
                    },
                    sercretKey,
                    { expiresIn: "4h" }
                  );

                if ( userType === 'user') {
                    
                    if (!mailExist.blockStatus) {
                        if(!mailExist?.isAdmin) {
                            res.json({
                            success: true,
                            token: token,
                            data:mailExist,
                            message: "User login successfull",
                            });
                        }else {
                            res.json({
                                success: false,
                                message: "You are not user",
                            });
                        }
                    } else {
                        res.json({
                        success: false,
                        message: "admin blocked user access",
                        });
                    }
                }

                if (userType === 'admin') {
                    if (mailExist.isAdmin) {
                        res.json({
                            success: true,
                            token: token,
                            data:mailExist,
                            message: "Admin login successfull",
                        });
                    } else {
                        res.json({
                            success: false,
                            message: "You are not admin",
                        });
                    }
                   
                }

            } else {
              res.json({
                success: false,
                message: "password incorrect",
              });
            }
        } else {
            res.json({
              success: false,
              message: "User Not Found",
            });
        }

    } 
    catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'login failed',
        })
    }
} 

const getAttendence = async (req, res) =>{
    const {employeeId} =req.tokens
    try {
        // Aggregate query to get attendance details
        const details = await attendence.aggregate([
          {
            $match: {
                employeeId: new mongoose.Types.ObjectId(employeeId),
            },
          },
          {
            $project: {
                _id: 0,
                date: {
                    $dateToString: {
                        format: '%Y-%m-%d',
                        date: { $toDate: '$date' },
                    },
                },
                status: 1,
                color: {
                    $switch: {
                      branches: [
                        {case: {$eq: ['$status', 'leave']}, then: 'red'},
                        {case: {$eq: ['$status', 'present']}, then: 'green'},
                        {case: {$eq: ['$status', 'late']}, then: 'yellow'},
                      ],
                      default: 'black',
                    },
                },
            },
        },
        ]);
        res.status(200).json({
          success: true,
          data: details,
        });
      } catch (err) {
        console.error(err);
        // Internal server error
        res.status(500).json({
          success: false,
          error: 'Internal Server Error',
        });
      }
}

module.exports = { commonLogin ,getAttendence }