const attendence = require('../models/attendance')
const leave = require ('../models/leave')
const mongoose = require('mongoose')

const checkIn = async (req, res) =>{
    try {
        const {employeeId,date} =req.body

        const optionsTime = { timeZone: 'Asia/Kolkata' };
        const currentDate = new Date().toLocaleString('en-US', optionsTime);

        const nodeDate = new Date(currentDate);
        this.date = new Date();
        const dateString = this.date.toDateString();

        const nineThirtyAM = new Date(nodeDate);
        nineThirtyAM.setHours(9, 30, 0, 0);

        let isLate = false
        let status = "present"
        
        if (nodeDate.getTime() > nineThirtyAM.getTime()) {
            status = "late"
            isLate =true
        } 


        const checkLogin = await attendence.aggregate([
            {
                $match: {
                  $and: [
                    { date: dateString },
                    { employeeId: new mongoose.Types.ObjectId(employeeId) }
                  ]
                }
            }
        ])

        if(checkLogin && checkLogin?.length > 0) {
            if (checkLogin?.[0].checkOut){
                res.status(400).json({
                    success:false,
                    message:'already check In and Check Outed'
                })
            }
        } else {

            const checkIn = new attendence({
                employeeId: employeeId,
                date:date,
                checkIn:currentDate,
                isLate:isLate,
                status:status,
            })

            const saved = await checkIn.save()

            res.json({
                success:true,
                message:'check In successfully',
                data:saved
            })
        }

    }
    catch (err) {
        res.status(400).json({
            success: false,
            message:'checkin Failed. please try again'
        })
    }
}

const checkCheckin = async (req, res) =>{
    try {
        const {date,employeeId} =req.query
        const checkIn = await attendence.findOne({employeeId:employeeId,date:date})
        if(checkIn && !checkIn?.checkOut) {
            res.json({
                success:true,
                message:'already Checkined',
                data:checkIn
            })
        } else {
            res.json({
                success:false,
                message:'checkOuted',
                data:checkIn
                })
        }
    } 
    catch (err) {
        res.status(400).json({
            success:false,
            message:'checkOut failed'
            })
    }
}

const checkOut = async (req, res) =>{
    try {
        const { employeeId , date , workedHoures} = req.body
        const checkInedEmployee = await attendence.findOne({employeeId:employeeId,date:date})
        if (checkInedEmployee &&  !checkInedEmployee?.checkOut) {

            const optionsTime = { timeZone: 'Asia/Kolkata' };
            const currentDate = new Date().toLocaleString('en-US', optionsTime);

            const lastBreak = checkInedEmployee?.break?.[checkInedEmployee?.break.length-1]
            if (lastBreak && !lastBreak.breakEnd) {
                lastBreak.breakEnd = currentDate;
                lastBreak.duration = calculateDuration(lastBreak.breakStart, currentDate);
            }


            checkInedEmployee.checkOut = currentDate
            checkInedEmployee.workingHours = workedHoures

            const saved = await checkInedEmployee.save()



            if (saved) {
                res.json({
                    success: true,
                    message:'employee successfully checkOuted'
                })
            } else {
                res.json({
                    success: false,
                    message:'employee not checkOuted'
                    })
            }
        } else {
            res.json({
                success:false,
                message:'employee already CheckOuted'
            })
        }

    } 
    catch (err) {
        res.status(400).json({
            success: false,
            message:'employee checkOutFailed'
            })
    }
}

const takeBreak = async (req, res) =>{
    try {
        const {employeeId, date} = req.body
        const checkInedEmployee = await attendence.findOne({employeeId:employeeId,date:date})

        if (checkInedEmployee) {
            if(checkInedEmployee?.break?.length=== 0 || checkInedEmployee?.break?.[checkInedEmployee?.break?.length-1]?.breakEnd){
                const optionsTime = { timeZone: 'Asia/Kolkata' };
                const currentDate = new Date().toLocaleString('en-US', optionsTime);
                const newBreak = {
                    breakStart: currentDate,
                }
    
                checkInedEmployee.break.push(newBreak);
    
                const saved = await checkInedEmployee.save();
    
                if (saved) {
                    res.json({
                        success: true,
                        message:'employee successfully takeBreak'
                        })
                } else {
                    res.json({
                        success: false,
                        message:'employee takeBreak failed'
                    })
                }

            } else {
                res.json({
                    success: false,
                    message:'employee takeBreak failed. The Previous break not ended'
                })
            }
           
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message:'employee takeBreak failed'
        })
    }
}

const breakCheck = async (req, res) =>{
    try {
        const {employeeId, date} = req.query
        const checkInedEmployee = await attendence.findOne({employeeId:employeeId,date:date})
        if (checkInedEmployee) {
            const lastBreak = checkInedEmployee?.break?.[checkInedEmployee?.break.length-1]
            if(lastBreak && !lastBreak?.breakEnd){
                res.json({
                    success: true,
                    message:'employee break is not ended',
                    data:checkInedEmployee
                    })
            } else {
                res.json({
                    success: false,
                    message:'employee not take break or break is ended'
                    })
            }
        } else {
            res.json({
                success: false,
                message:'employee not found'
                })
        }

    }
    catch (err) {
        res.status(400).json({
            success: false,
            message:'employee breakCheck failed'
            })
    }
}

const breakEnd = async (req, res) =>{
    try {
        const { employeeId , date , workedHoures} = req.body
        const checkInedEmployee = await attendence.findOne({employeeId:employeeId,date:date})
        if (checkInedEmployee) {
            const lastBreak = checkInedEmployee?.break?.[checkInedEmployee?.break.length-1]
            if(lastBreak && !lastBreak?.breakEnd){
                const optionsTime = { timeZone: 'Asia/Kolkata' };
                const currentDate = new Date().toLocaleString('en-US', optionsTime);
                lastBreak.breakEnd = currentDate;
                lastBreak.duration = workedHoures

                const saved = await checkInedEmployee.save()
                
                if (saved) {
                    res.json({
                        success: true,
                        message:'employee break is ended'
                        })
                }
            } else {
                res.json({
                    success: false,
                    message:'employee is not take break',
                })
            }
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message:'employee breakEnd failed'
            })
    }
}

function calculateDuration(start, end) {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const duration = endTime - startTime;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
}

const leaveRequest = async (req, res) =>{
    try {
        const { employeeName, startDate ,endDate , reason ,employeeId} = req.body

        const newLeaveData = new leave({
            employeeName,startDate,endDate,reason,employeeId
        })

        const saved = newLeaveData.save()

        if (saved) {
            res.json({
                success: true,
                message:'leave request is sended'
                })
        } else {
            res.json({
                success: false,
                message:'leave request is not sended'
                })
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message:'leave request failed'
            })
    }
}

const getAttendance = async (req, res) =>{
    try{
        const {employeeId} = req.tokens
        const data = await attendence.find({employeeId:employeeId})
        if(data) {
            res.json({
                success:true,
                message:'attendance data is found',
                data:data
            })
        } else {
            res.json({
                success:false,
                message:'attendance data is not found'
                })
        }
    }
    catch (err) {
        res.status(400).json({
            success:false,
            message:'attendence getting failed'
        })
    }
}

module.exports = {checkIn ,checkCheckin ,checkOut ,takeBreak,breakCheck, breakEnd ,leaveRequest,getAttendance}

