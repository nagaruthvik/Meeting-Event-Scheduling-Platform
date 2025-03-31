import express from "express"


import errorLogger from "../middlewares/errorHandling.js"
 
import dotenv from "dotenv" 
import Meeting from "../models/EventModel.js"
import { authMiddleware } from "../middlewares/AuthMiddleWare.js"

dotenv.config()
const eventRoutes = express.Router()


eventRoutes.get("/:id" ,errorLogger,async(req,res)=>{
   try {
    const id = req.params.id
    const getAll = await Meeting.find({createdBy:id})
    if(!getAll || getAll.length === 0){
        return res.status(404).json({ message: "something went wrong" })  
    }
   
    res.status(200).json({data:getAll,message:"Data fetch sucessful"})
   } catch (error) {
    errorLogger(error,req,res) 
     
   }
})
eventRoutes.get("/eventId/:id", errorLogger, async (req, res) => {
    try {
        const id = req.params.id
        const getAll = await Meeting.findById(id)

        if (!getAll) {
            return res.status(404).json({ message: "Event not found" })
        }

        res.status(200).json({ data: getAll, message: "Data fetch successful" })
    } catch (error) {
        errorLogger(error, req, res)
        res.status(500).json({ message: "Internal Server Error" })
    }
})


eventRoutes.get("/upcomingEvent/:id", errorLogger, async (req, res) => {
    try {
        const id = req.params.id
        const startToday = new Date()
        startToday.setHours(0, 0, 0, 0)
    
        const upcomingMeetings = await Meeting.find({
           
                
            "invited_users": {
                $elemMatch: { user_id: id}       
            },
            
            date: { $gte: startToday }
        }).sort({ date: 1, startTime: 1 })

        if (upcomingMeetings.length === 0) {
            return res.status(404).json({ message: "No upcoming events found" })
        }

        res.status(200).json(upcomingMeetings)
    } catch (error) {

        res.status(500).json({ message: "Something went wrong" })
    }
})
eventRoutes.get("/pendingEvent/:id", errorLogger, async (req, res) => {
    try {
        const id = req.params.id
        const startToday = new Date()
        startToday.setHours(0, 0, 0, 0)

        const upcomingMeetings = await Meeting.find({
           
                
            "invited_users": {
                $elemMatch: { user_id: id, status: "pending" }
            },
            
            date: { $gte: startToday }
        }).sort({ date: 1, startTime: 1 })

        if (upcomingMeetings.length === 0) {
            return res.status(404).json({ message: "No upcoming events found" })
        }

        res.status(200).json(upcomingMeetings)
    } catch (error) {
        
        res.status(500).json({ message: "Something went wrong" })
    }
})
eventRoutes.get("/cancledEvent/:id", errorLogger, async (req, res) => {
    try {
        const id = req.params.id
        const startToday = new Date()
        startToday.setHours(0, 0, 0, 0)

        const upcomingMeetings = await Meeting.find({
           
                
            "invited_users": {
                $elemMatch: { user_id: id, status: "rejected" }
            },
            
            date: { $gte: startToday }
        }).sort({ date: 1, startTime: 1 })

        if (upcomingMeetings.length === 0) {
            return res.status(404).json({ message: "No upcoming events found" })
        }

        res.status(200).json(upcomingMeetings)
    } catch (error) {
        
        res.status(500).json({ message: "Something went wrong" })
    }
})
eventRoutes.get("/pastEvents/:id", errorLogger, async (req, res) => {
    try {
        const id = req.params.id
     

        const startOfToday = new Date()
        startOfToday.setHours(0, 0, 0, 0)

        const pastMeetings = await Meeting.find({
            "invited_users": {
                $elemMatch: { user_id: id}
            },
            date: { $lt: startOfToday }
        }).sort({ date: -1, startTime: -1 })

        if (pastMeetings.length === 0) {
            
            return res.status(404).json({ message: "No past events found" })
        }

        
        res.status(200).json(pastMeetings)
    } catch (error) {
        console.error("Something went wrong:", error)
        res.status(500).json({ message: "Something went wrong" })
    }
})


eventRoutes.post("/addEvent",errorLogger ,async(req,res)=>{
    try {
        const {createdBy,title,meeting_link,password,host,description,date,midday,startTime,timeZone,duration,invited_users} = req.body

        const newMeating = new  Meeting({
            createdBy,
            title,
            meeting_link,
            password,
            host,
            description,
            date,
            midday,
            startTime,
            timeZone,
            duration,
            invited_users
        })

        const data = await newMeating.save()
        if(!data){
            return res.status(500).json({ message: "something went wrong" })  
        }
        res.status(201).json({ message: "Event created sucessfuly",result:data })
    } catch (error) {
        errorLogger(error,req,res)
    }
})

eventRoutes.put("/updateEvent/:id/:userId", errorLogger, async (req, res) => {
    try {
        const data = req.body
        const meetingId = req.params.id
        const userId = req.params.userId

        
        const findMeeting = await Meeting.findById(meetingId)
        if (!findMeeting) {
            return res.status(404).json({ message: "Meeting Not Found" }) 
        }

  
        if (findMeeting.createdBy.toString() !== userId) {
            return res.status(401).json({ message: "You are not allowed to update this meeting" })
        }

        
        const updateMeeting = await Meeting.findByIdAndUpdate(meetingId, data, { new: true })

        if (!updateMeeting) {
            return res.status(500).json({ message: "Something went wrong" })
        }

        return res.status(200).json({ message: "Meeting updated", result: updateMeeting })

    } catch (error) {
        errorLogger(error, req, res)
    }
})

eventRoutes.put("/updateEventStatus/:id/:userId/:status", errorLogger, async (req, res) => {
    try {
        const { id, userId, status } = req.params

        

        const updatedMeeting = await Meeting.findOneAndUpdate(
            { _id: id, "invited_users.user_id": userId },
            
            { $set: { "invited_users.$.status": status } }, 
            { new: true } 
        )

        if (!updatedMeeting) {
            return res.status(404).json({ message: "Meething Not Found" })
        }

        res.status(200).json({ message: `Meeting${status}`, result : updatedMeeting })
    } catch (error) {
        console.error("Error updating event status:", error)
        res.status(500).json({ message: "something went wrong", error })
    }
})




eventRoutes.delete("/deleteEvent/:id/:userId", errorLogger, async (req, res) => {
    try {
        const meetingId = req.params.id
        const userId = req.params.userId

  
        const findMeeting = await Meeting.findById(meetingId)
        if (!findMeeting) {
            return res.status(404).json({ message: "Meeting Not Found" })
        }

   
        if (findMeeting.createdBy.toString() !== userId) {
            return res.status(401).json({ message: "You are not allowed to delete this meeting" })
        }

        const deleteMeeting = await Meeting.findByIdAndDelete(meetingId)
        if (!deleteMeeting) {
            return res.status(500).json({ message: "Something went wrong" })
        }

        return res.status(200).json({ message: "Meeting Deleted" })

    } catch (error) {
        errorLogger(error, req, res)
    }
})



export default eventRoutes