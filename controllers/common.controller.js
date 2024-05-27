const users = require('../models/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const sercretKey = process.env.JWT_SECRET_KEY

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
                    { expiresIn: "1h" }
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

module.exports = { commonLogin }