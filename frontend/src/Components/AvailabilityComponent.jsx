import React, { useState, useEffect } from "react"
import styles from "./AvailabilityComp.module.css"
import BigCalanderComp from "./BigCalander/BigCalanderComp"
import NabBarMobile from "./NabBarMobile"

const AddAvailability = ({ handleRemoveAv, handleChange, day, index, availTime }) => {
  return (
    <div className={styles.avDisplayFeild}>
      <input
        className={styles.avDisplayInput}
        type="text"
        value={availTime.start}
        onChange={(e) => handleChange(day, index, "start", e.target.value)}
      />
      <p>-</p>
      <input
        className={styles.avDisplayInput}
        type="text"
        value={availTime.end}
        onChange={(e) => handleChange(day, index, "end", e.target.value)}
      />
      <button className={styles.avDisplayRemove} onClick={() => handleRemoveAv(day, index)}>
        x
      </button>
    </div>
  )
}

export default function AvailabilityComponent() {
  const defaultAvailability = {
    Sun: { availableActivate: false, Availability: [] },
    Mon: { availableActivate: true, Availability: [{ start: "", end: "" }] },
    Tue: { availableActivate: true, Availability: [{ start: "", end: "" }] },
    Wed: { availableActivate: true, Availability: [{ start: "", end: "" }] },
    Thu: { availableActivate: true, Availability: [{ start: "", end: "" }] },
    Fri: { availableActivate: true, Availability: [{ start: "", end: "" }] },
    Sat: { availableActivate: true, Availability: [{ start: "", end: "" }] },
  }
  const apiUrl = import.meta.env.VITE_API_KEY
  const [available, setAvailable] = useState(() => {
    const savedData = localStorage.getItem("availabilityData")
    return savedData ? JSON.parse(savedData) : defaultAvailability
  })


  const [apiData,setApiData] = useState([])
  const [compChange,setCompChange] = useState(false)
  const [timeZone, setTimeZone] = useState("")

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  const addAvailabilityItem = (day) => {
    setAvailable((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        Availability: [...prev[day].Availability, { start: "", end: "" }],
      },
    }))
  }

  const removeAvailabilityItem = (day, idx) => {
    setAvailable((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        Availability: prev[day].Availability.filter((item, index) => index !== idx),
      },
    }))
  }

  const changeAvailability = (day) => {
    setAvailable((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        availableActivate: !prev[day].availableActivate,
      },
    }))
  }

  const handleChangeAvailability = (day, idx, field, value) => {
    setAvailable((prev) => {
      const updatedAvailability = [...prev[day].Availability]
      updatedAvailability[idx] = { ...updatedAvailability[idx], [field]: value }

      return {
        ...prev,
        [day]: { ...prev[day], Availability: updatedAvailability },
      }
    })
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("availabilityData", JSON.stringify(available))
  
      const formattedData = Object.entries(available)
        .filter(([day]) => day !== "Sun")
        .map(([day, data]) => ({
          day,
          timeSlots: data.Availability.map(({ start, end }) => ({
            startTime: start,
            endTime: end,
          })),
        }))
  
      setApiData(formattedData) 

          }, 1000)
  
    return () => clearTimeout(timer)
  }, [available])

  useEffect(() => {
    if (apiData.length === 0) return 
  
    const apiFetching = async () => {
      try {
        const userId = localStorage.getItem("userId")
        const response = await fetch(`${apiUrl}user/availability/${userId}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        })
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
    
        const data = await response.json()  
        console.log("API Response:", data)
      } catch (error) {
        console.error("API Error:", error)
      }
    }
    
  
    apiFetching()
  }, [apiData]) 
  


  return (
    <div className={styles.avMain}>
      <NabBarMobile/>
      <h2>Availability</h2>
      <p>Configure times when you are available for bookings</p>
      <div className={styles.avBtn}>
        <div className={styles.avBtnCont1} onClick={()=>setCompChange(false)}>
          <img src="./Availability.png" alt="" />
          <p style={{backgroundColor : compChange ? "transparent" :"white"}} >Availability</p>
        </div>
        <div  className={styles.avBtnCont2} onClick={()=>setCompChange(true)}>
          <img src="./calender.png" alt="" />
          <p style={{backgroundColor : compChange ? "white" :"transparent"}}>Calendar View</p> 
        </div>
      </div>
      {compChange ? 
      <div className={styles.BigCalander}>
        <div className={styles.BigCalanderP}>
          <p>Activity</p>
          <div>
            <p>Time Zone</p>
            <p style={{color :"#1877F2"}}>{timeZone}</p>
          </div>
        </div>
        <BigCalanderComp/>
      </div>:      
        <div className={styles.avDisplay}>
        <h5>Weekly hours</h5>
        {Object.entries(available).map(([day, data]) => (
          <div key={day} className={styles.avDisplayItems}>
            
            <input type="checkbox" checked={data.availableActivate} onChange={() => changeAvailability(day)} />
            <p>{day}</p>

            <div className={styles.AddAvailability}>
              {data.availableActivate ? (
                data.Availability.map((availTime, idx) => (
                  <AddAvailability
                    key={idx}
                    handleRemoveAv={removeAvailabilityItem}
                    handleChange={handleChangeAvailability}
                    day={day}
                    index={idx}
                    availTime={availTime}
                  />
                ))
              ) : (
                <p>Unavailable</p>
              )}
            </div>

            <button className={styles.avDisplayRemove} onClick={() => addAvailabilityItem(day)} disabled={!data.availableActivate}>
              +
            </button>
          </div>
        ))}
      </div>}
    </div>
  )
}
