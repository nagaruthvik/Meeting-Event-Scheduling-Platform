import React, { useContext, useEffect, useState } from 'react'
import styles from "./EventDisplay.module.css"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBarContext } from './NavBarContext';

export default function EventDisplayChip({id, title, startTime, date, midday, meeting_link, duration,invited_users,isConflict,password
}) {
  const {setSelectedNav, setEventId} = useContext(NavBarContext);
  const [isChecked, setIsChecked] = useState(true);
  

  
  const [isPrivate,setIsPrivate] = useState(true)
  const [newDuration,setNewDuration] = useState("")
  const [newDate,setNewDate]= useState("")

  const apiUrl = import.meta.env.VITE_API_KEY;
  const dataConvoter = (dateStr) => {
    const dateCon = new Date(dateStr); 
    const options = { weekday: 'long', day: '2-digit', month: 'short' };
   setNewDate( dateCon.toLocaleDateString('en-GB', options))
  };
  
    const addHour = (timeStr, hoursToAdd) => {
      let date = new Date(`2000-01-01 ${timeStr}`); 
      date.setHours(date.getHours() + hoursToAdd); 
      const endDate =date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      setNewDuration(`${startTime} ${midday} - ${endDate}`)
  };

  const setGroupMeeting = ()=>{
    if(invited_users.length >1){
      setIsPrivate(false)
    }
  }
  const copyToClipboard = (text,password) => {
    const copyMessage = `Link : ${text} password: ${password}`
    navigator.clipboard.writeText(copyMessage)
      .then(() => toast.success("Copied to clipboard!",{ position: "top-center" }))
      .catch((err) => console.error("Failed to copy:", err));
  };
  
  const deleteEvent=async(id)=>{
    try {

      const apiFetching = await fetch(`${apiUrl}event/deleteEvent/${id}/${localStorage.getItem("userId")}`,{
        method :"DELETE"

      })
      const res = await apiFetching.json()

      if(apiFetching.status === 200){
        return toast.success(res.message,{ position: "top-center" }); 

      }
      toast.error(res.message,{ position: "top-center" });
      
      
    } catch (e) {
      console.log(e)
      return toast.error("something went wrong",{ position: "top-center" });

    }
  }

  const handleEdit = async(id)=>{
   
    setEventId(id)
    setSelectedNav("updateEvent")
    
    
  }


  
 
  useEffect(()=>{
    dataConvoter(date)
    addHour(startTime+" "+midday,duration)
    setGroupMeeting()
    
  },[])

 
 
  return (
    <div className={styles.EventDisplayChip}> 
        <div style={{backgroundColor : isChecked?"#1877F2":"#676767"}} className={styles.EventDisplayChipHead}></div>

        <div>
            <div className={styles.EventDisplayChipHeading}><h4 className={styles.EventDisplayChipH4}>{title}</h4> <button className={styles.EventDisplayChipEdit} onClick={()=>handleEdit(id)}><img src="./edit.png" alt="" /></button>
            </div>
            {isConflict &&<div className={styles.conflict}>
              <img src="./conflict.png" alt="" />
              <div className={styles.conflictMessage}>
                <p>Conflict of timing</p>
              </div>
            </div>
            }
            

        <div className={styles.EventDisplayChipEle}>
            <p style={{margin :"0"}}>{newDate}</p>
            <h5 className={styles.EventDisplayChipColorBlue}>{newDuration}</h5>
            
            <p className={styles.EventDisplayChipColorGrey} >{duration}hr,{isPrivate?"Private discussion":"Group Meeting"}</p>
        </div>
        <hr className={styles.EventDisplayChipLine}/>
        <div className={styles.EventDisplayChipBtn}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>

        </label>
            <button onClick={()=>copyToClipboard(meeting_link,password)}><img src="./copy.png" alt="" /></button>
            <button onClick={()=>deleteEvent(id)}><img src="./delete.png" alt="" /></button>
        </div>
        </div>
         
        <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                      transition={Bounce}></ToastContainer>
    </div>
  )
}
