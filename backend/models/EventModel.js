import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
    {
        createdBy :{type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        title: { type: String, required: true },  
        meeting_link: { type: String, required: true }, 
        password: { type: String, required: true }, 
        host: { type: String, required: true },  
        description: { type: String },  
        date: { type: Date, required: true }, 
        startTime: { type: String, required: true }, 
        midday :{type:String,required:true},
        timeZone: { type: String, required: true }, 
        duration: { type: Number, required: true },
        isActive: { type: Boolean, default: true }, 
        invited_users: [
            {
                user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },  
                email: { type: String, required: true }, 
                
                status: { 
                    type: String, 
                    enum: ["pending", "accepted", "rejected"], 
                    default: "pending" 
                }  
            }
        ]
    },
    { timestamps: true }
);

const Meeting = mongoose.model("Meeting", MeetingSchema);
export default Meeting;
