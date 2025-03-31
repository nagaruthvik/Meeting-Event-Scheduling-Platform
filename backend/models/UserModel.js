import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: 
    { type: String, 
        required: true 
    }, 
    userName:{
        type:String,
       
    },
    preference:{
        type:String
    },
    availability: [
        {
            day: {  
                type: String,
                enum: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            },
            timeSlots: [
                {
                    startTime: { type: String }, 
                    endTime: { type: String }  
                }
            ]
        }
    ],

    events: [
        {
        eventId: { type: 
            mongoose.Schema.Types.ObjectId,  
            ref: "Event" 
        },
        status: { type: String, 
            enum: ["pending", "accepted", "rejected"], 
            default: "pending" 
        }
        }
        ]
        }, 
        { 
            timestamps: true 
        });

const userModel = mongoose.model("User", UserSchema);

export default userModel
