import React, { useContext, useEffect, useState ,useCallback} from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import CustomToolbar from "./CustomToolbar"
import { NavBarContext } from "../NavBarContext"
import "./BigCalander.css"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment)

export default function BigCalanderComp() {
  const apiUrl = import.meta.env.VITE_API_KEY
  const [searchTerm, setSearchTerm] = useState("")
  const [view, setView] = useState("week")
  const [eventsData, setEventsData] = useState([])
  
  const { userData } = useContext(NavBarContext)

  useEffect(() => {
    fetchingUpcomingEvents()
    fetchPastEvents()
    
  }, [])

  const fetchPastEvents = async () => {
    try {
      const pastResponse = await fetch(`${apiUrl}/event/pastEvents/${localStorage.getItem("userId")}`)
      if (pastResponse.status !== 200) {
        console.log("Failed to fetch past events")
      }
      const pastEvents = await pastResponse.json()

      const upcomingEvents = userData.map(formatEvent)
      const pastFormattedEvents = pastEvents.map(formatEvent)
      
      setEventsData([...upcomingEvents, ...pastFormattedEvents].sort((a, b) => a.start - b.start))
    } catch (error) {
      console.log("Error fetching events:", error)
    }
  }

  const fetchingUpcomingEvents =  ()=>{
    try {
      const upcomingEvents = userData.map(formatEvent)
      console.log(upcomingEvents)
      setEventsData([...upcomingEvents].sort((a, b) => a.start - b.start))
    } catch (error) {
      console.log(error)
    }
  }

  const formatEvent = (item) => {
    const eventDate = new Date(item.date)
    const startTime = convertTo24HrFormat(item.startTime, item.midday)
    const endTime = addHours(startTime, item.duration)

    return {
      title: item.title.charAt(0).toUpperCase() + item.title.slice(1),
      start: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), startTime.hours, startTime.minutes),
      end: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), endTime.hours, endTime.minutes),
      isPast: eventDate < new Date(),
    }
  }

  const convertTo24HrFormat = (timeStr, midDay) => {
    let [hours, minutes] = timeStr.split(':').map(Number)
    if (midDay.toLowerCase() === "pm" && hours !== 12) hours += 12
    if (midDay.toLowerCase() === "am" && hours === 12) hours = 0
    return { hours, minutes }
  }

  const addHours = (time, hoursToAdd) => {
    let endDate = new Date(2000, 0, 1, time.hours, time.minutes)
    endDate.setHours(endDate.getHours() + hoursToAdd)
    return { hours: endDate.getHours(), minutes: endDate.getMinutes() }
  }
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])
    const copyToClipboard = (text,password) => {
      const copyMessage = `Link : ${text} password: ${password}`
      navigator.clipboard.writeText(copyMessage)
        .then(() => toast.success("Link & password copied to clipboard.",{ position: "top-center" }))
        .catch((err) => console.error("Failed to copy:", err));
    };
    
  return (
    <div style={{ padding: 20 }}>
      <div className="bigCalander">
      <Calendar
        localizer={localizer}
        events={eventsData.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", backgroundColor: "white" }}
        view={view}
        onView={setView}
        views={["day", "week", "month", "year"]}
        
        onSelectEvent={(event) =>copyToClipboard(event.title,event.password) }
        components={{
          toolbar: (props) => (
            <CustomToolbar
              {...props}
              onView={setView}
              view={view}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          ),
        }}
  defaultDate={new Date()}
  eventPropGetter={(event) => ({
    style: {
      backgroundColor: event.isPast ? "rgba(128, 128, 128, 0.5)" : "rgba(138, 43, 226, 0.1)", 
      color: event.isPast ? "black" : "purple",
      borderLeft: `5px solid ${event.isPast ? "grey" : "purple"}`,
      borderRadius: "8px",
      padding: "5px",
      transition: "0.3s",
      cursor: "pointer",
    },
  })}
/>

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
