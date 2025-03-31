import React, {  useState,useEffect, useContext } from 'react'
import styles from "./BookingComponent.module.css"
import getUserDetails from './GetUserDetails'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import { NavBarContext } from './NavBarContext'
import NabBarMobile from './NabBarMobile'

const apiUrl = import.meta.env.VITE_API_KEY
const dataConvoter = (dateStr) => {
    const dateCon = new Date(dateStr) 
    const options = { weekday: 'long', day: '2-digit', month: 'short' }
   return( dateCon.toLocaleDateString('en-GB', options))
  }
  
const addHour = (timeStr,midDay ,hoursToAdd) => {
      let date = new Date(`2000-01-01 ${timeStr}`) 
      date.setHours(date.getHours() + hoursToAdd) 
      const endDate =date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      return(`${timeStr} ${midDay} - ${endDate}`)
  }



  const UpcomingPageCard = ({ title,id ,startTime, date, duration, midday, invited_users, updateButton }) => {
      const [request, setRequest] = useState(false)
      const [userName, setUserName] = useState([])
      const [requestStatus, setRequestStatus] = useState([])

  
      useEffect(() => {
        const fetchUserDetails = async () => {
            if (invited_users.length > 0) {
                try {
                    
                    
                   
                    const usernames = await getUserDetails(invited_users.map(item => item.user_id),false)
    
             
                    
                    setUserName(usernames)
                    setRequestStatus(invited_users.map(item => item.status))
                } catch (error) {
                    console.error("Error fetching user details:", error)
                }
            }
        }    
    
        fetchUserDetails()
    }, [invited_users])
    


        
      
     
      const handleRequestUpation=async(id,userId,reqStatus)=>{
        try {
            const apiFetching = await fetch(`${apiUrl}event/updateEventStatus/${id}/${userId}/${reqStatus}`,{
                method :"PUT",
                headers :{
                    "Content-Type" : "application/json"
                }
            })
            const res = await apiFetching.json()
            if(apiFetching.status === 200){
                toast.success(`request ${res.message}`,{ position: "top-center" })
                
            }

          }
         
        catch (error) {
            console.log(error)
        }
    }

      
   
  
      return (
          <div  className={styles.UpcomingChipMain}>
            
                
              <div className={styles.UpcomingChipSub1}>
              
                  <div>
                  
                      <p>{dataConvoter(date)}</p>
                      <p className={styles.pBlue}>{addHour(startTime, midday, duration)}</p>
                  </div>
                  <div>
                      <p>{title}</p>
                      <p className={styles.pGrey}>You and team ({invited_users.length})</p>
                      
                  </div>
                  <button style={{ display: updateButton ? "block" : "none" }} onClick={() => setRequest(true)} className={styles.updateRequest}>
                      <div className={styles.btnComp}>
                          <img src="./people.png" alt="sry" /> {invited_users.length + 1} people
                      </div>
                  </button> 
              </div>
  
              <div className={styles.UpcomingChipBtn}>
                  <button >{requestStatus[0]}</button>
                  

                  <button style={{ display: updateButton ? "none" : "block" }} className={styles.peopleGrey}>{invited_users.length + 1} people</button>
              </div>
  
              {request && (
                  <div className={styles.updateChip}>
                        <div className={styles.closeBtn} >
                        <button onClick={()=>setRequest(false)}>X</button>
                        </div>
                        
                      <div className={styles.updateChipHeading}>
                          <h4>Participant({invited_users.length + 1})</h4>
                          <button onClick={()=>handleRequestUpation(id,localStorage.getItem("userId"),"rejected")}  className={styles.updateChipCancleBtn}>
                              <div className={styles.updateChipBtnCont}><img src="./reject.png" alt="" />Reject</div>
                          </button>
                          <button onClick={()=>handleRequestUpation(id,localStorage.getItem("userId"),"accepted")} className={styles.updateChipAcceptBtn}>
                              <div className={styles.updateChipBtnCont}> <img src="./accept.png" alt="" />Accept</div>
                          </button>
                      </div>

                      <div>
                       {userName.map((item,index)=>(
                        <div className={styles.updateBookingPart}>
                            
                            <div className={styles.updateBookingPart1}>
                                <img src="./boy.png" alt="" />
                                <p>{item}</p>
                            </div>
                            <input 
                                type="checkbox" 
                                disabled 
                                checked={requestStatus[index] === "accepted"} 
                            />

                            
                        </div>
                       ))}
                      </div>
                  </div>
              )}
          </div>
      )
  }
  

export default function BookingComponent() {

    const [data,setData] = useState([]) 
    const [isUpdate,setIsUpdate] = useState(false)
    const {userData,setUserData} = useContext(NavBarContext)
    const [isCancle,setCancle] = useState(false)
   
    useEffect(()=>{
        const handleUpcomingEvent = async () => {
            try {
              const fetchApi = await fetch(`${apiUrl}event/upcomingEvent/${localStorage.getItem("userId")}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                }
              });
          
              if (fetchApi.status !== 200 ) {
                console.log("Error fetching upcoming events");
                return;
              }
              const result = await fetchApi.json();   

              setUserData(result);
            } catch (error) {
              console.error("Error fetching upcoming events:", error);
            }
        }
        handleUpcomingEvent()
    },[])
   
    const handleUpcomingEvents=async()=>{
        
        setData(userData)
        
    }
    const handlependingEvents=async()=>{
        setIsUpdate(true)
        setCancle(false)
        const fetchApi = await fetch(`${apiUrl}event/pendingEvent/${localStorage.getItem("userId")}`,{
            method :"GET",
            headers : {
                "Content-Type" :"application/json"
            }
        })

        const result = await fetchApi.json()
        setData(result)
    }
    const handleCancledEvents=async()=>{
        setIsUpdate(false)
        setCancle(false)
        const fetchApi = await fetch(`${apiUrl}event/cancledEvent/${localStorage.getItem("userId")}`,{
            method :"GET",
            headers : {
                "Content-Type" :"application/json"
            }
        })

        const result = await fetchApi.json()
        setData(result)
    }
    
    const handlePastEvents=async()=>{
        setCancle(true)
        setIsUpdate(false)

        try {
            const fetchApi = await fetch(`${apiUrl}event/pastEvents/${localStorage.getItem("userId")}`,{
                method :"GET",
                headers : {
                    "Content-Type" :"application/json"
                }
            })
            if(fetchApi.status !== 200 ){
                return console.log("Error Fetching ")
            }
            const result = await fetchApi.json()
            setData(result)
        } catch (error) {
            console.log(error)
        }
    }
    
    
  return (
    <div className={styles.bookingMainCont}>
        <NabBarMobile/>
        <div className={styles.bookingHeading}>
            <p>Booking</p>
            <p>See upcoming and past events booked through your event type links.</p>
        </div>
            <section className={styles.bookingItemCont}>
                <nav className={styles.bookingNavBar}>
                    <div onClick={handleUpcomingEvents}>Upcoming</div>
                    <div onClick={handlependingEvents}>Pending </div>
                    <div onClick={handleCancledEvents}>Canceled</div>
                    <div onClick={handlePastEvents}>past</div>
                </nav>
                <hr />

                <div className={styles.displayItem}>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <UpcomingPageCard 
                                key={index} 
                                id = {item._id}
                                title={item.title} 
                                invited_users={item.invited_users} 
                                date={item.date} 
                                midday={item.midday} 
                                startTime={item.startTime} 
                                duration={item.duration}
                                updateButton = {isUpdate} 
                                cancleButton = {isCancle}
                            />
                        ))
                    ) : <p>no events</p>}
                </div>

            </section>
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
