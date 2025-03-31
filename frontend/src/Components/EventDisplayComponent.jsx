import React, { useContext, useEffect, useState } from 'react'
import styles from "./EventDisplayComponent.module.css"

import 'react-toastify/dist/ReactToastify.css'
import EventDisplayChip from './EventDisplayChip'
import { NavBarContext } from './NavBarContext'
import GetUserDetails from "./GetUserDetails.js"
import NabBarMobile from './NabBarMobile.jsx'



export default function EventDisplayComponent() {
  const apiUrl = import.meta.env.VITE_API_KEY
  
  const [apiData, setApiData] = useState([])
  
  const { userData,setUserData,setSelectedNav } = useContext(NavBarContext)
 
  



  useEffect(() => {
    dataFetching()  
    handleUpcomingEvent()  
   
    
    
  }, [])


  const dataFetching = async () => {
    try {
      const response = await fetch(`${apiUrl}event/${localStorage.getItem("userId")}`, {
        method: "GET",
      })

      if (response.status !== 200) {
        console.log("No data available")
        return
      }

      const result = await response.json()
      setApiData(result.data)
    } catch (error) {
      console.log("Error fetching events:", error)
    }
  }

   const handleUpcomingEvent = async () => {
    try {
      const fetchApi = await fetch(`${apiUrl}event/upcomingEvent/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      if (fetchApi.status !== 200) {
        console.log("Error fetching upcoming events")
        return
      }
      const result = await fetchApi.json()    
      setUserData(result)
    } catch (error) {
      console.error("Error fetching upcoming events:", error)
    }
  }




  const handleConflict = (startTime, midday, duration, date) => {
   
    const eventStart = new Date(date)
    const [hours, minutes] = startTime.split(":").map(Number)
    eventStart.setHours(midday === "PM" && hours !== 12 ? hours + 12 : hours, minutes, 0) 
    const eventEnd = new Date(eventStart)
    eventEnd.setMinutes(eventEnd.getMinutes() + duration * 60)

  
    const hasConflict = userData.some((item) => {
      const existingStart = new Date(item.date)
      const [existingHours, existingMinutes] = item.startTime.split(":").map(Number)
      
      existingStart.setHours(item.midday === "PM" && existingHours !== 12 ? existingHours + 12 : existingHours, existingMinutes, 0)
  
      const existingEnd = new Date(existingStart)
      existingEnd.setMinutes(existingEnd.getMinutes() + item.duration * 60)
  

  
      return eventStart < existingEnd && existingStart < eventEnd
    })
  
    return(hasConflict ? true : false)
  }
  


  return (
    <div className={styles.eventDisplay}>
      <NabBarMobile/>
      <div className={styles.eventDisplaySection1}>
        <div className={styles.eventDisplayH}>
          <h2>Event Type</h2>
          <p>Create events to share for people to book on your calendar.</p>
        </div>
        <button onClick={()=>setSelectedNav("addEvent")} className={styles.eventDisplayBtn}>+ Add New Event</button>
      </div>
      <div className={styles.eventDisplayBox}>
        {apiData.map((item) => (
          <EventDisplayChip
            key={item._id}
            id={item._id}
            isActive={item.isActive}
            title={item.title}
            startTime={item.startTime}
            date={item.date}
            midday={item.midday}
            meeting_link={item.meeting_link}
            duration={item.duration}
            password={item.password}
            invited_users={item.invited_users}

            isConflict={handleConflict(item.startTime,item.midday,item.duration,item.date)}
          />
        ))}
      </div>
     

    </div>
  )
}
