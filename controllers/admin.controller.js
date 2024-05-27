const emplyees = require('../models/login')
const users =require('../models/login')
const emails = require("../utils/emails");
const bcrypt = require('bcrypt')


const addEmployee = async ( req, res ) => {
    try {
        const {username , email, phoneNumber} = req.body
        const existingEmployee= await emplyees.findOne({email})
        if (existingEmployee) {
            res.status(400).json({
                success:false,
                message:'Employee already exists',
            })
        } else {
            const password = username.substring(0, 4).toUpperCase()+ phoneNumber.toString().substring(0, 4)
            const lowercaseusername= username.toLowerCase()
            emails(
                email,
                `ADMIN VERIFICATION EMAIL`,
                lowercaseusername,
                password
            ).then(async ()=>{
                console.log('suucessfully mail sended');
                    const bcryptpassword= await bcrypt.hash(password, 10)
                    const newUser = new emplyees({
                        username:lowercaseusername,
                        email,
                        phoneNumber,
                        password:bcryptpassword
                    })
                    await newUser.save()
                    res.json({
                        success:true,
                        message:'employee added successfully',
                    })
            })
            .catch(err=>{
                console.log(`errr ${err}`);
                res.status(400).json({
                    message: 'email send failed'
                })
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'User Adding Failed'
        })
    }
} 

const showUser = async (req, res) => {
    try {
      const userList = await users.find();
      if (userList.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res
        .status(200)
        .json({ message: "Users retrieved successfully", userList });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  const blockAndUnblockEmployee = async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.blockStatus = !user.blockStatus;
      await user.save();
      return res
        .status(200)
        .json({ message: "Block status updated successfully", user });
    } catch (error) {
      console.error("Error updating block status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { addEmployee , showUser , blockAndUnblockEmployee}