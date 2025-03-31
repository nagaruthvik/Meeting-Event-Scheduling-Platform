import React, { useEffect, useState } from 'react';
import styles from "./EventCreateComponent.module.css";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import updateUserEvent from './UpdateUserEvent';
import getUserDetails from './GetUserDetails';
import TimezoneSelect from "react-timezone-select"



export default function EventCreateComponent() {
  const [formData, setFormData] = useState({
    eventTopic: "",
    password: "",
    hostName: localStorage.getItem("username"),
    description: "",
    date: "",
    time: "2:30",
    ampm: "AM",
    timezone: "(UTC +5:00 Delhi)",
    duration: 1,
    colorBanner: "black",
    link: "",
    email: []
  });
  const apiUrl = import.meta.env.VITE_API_KEY;

 
  const [nextPage, setNextPage] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailId, setemailId] = useState([]);

  useEffect(() => {
    fetchUserDet();
  }, [formData]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? parseInt(value) : value
    }));
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleCancle = () => {
    setNextPage(false);
  };

  const handleAddEmail = async () => {
    if (emailInput.trim()) {
      const fetchApi = await fetch(`${apiUrl}user/email/${emailInput}`, {
        method: "GET"
      });
      if (fetchApi.status == 200) {
        const res = await fetchApi.json();
        setFormData((prev) => ({
          ...prev,
          email: [...prev.email, emailInput.trim()]
        }));
        toast.success("Email added", { position: "top-center" });
        setemailId((prev) => Array.isArray(prev) ? [...prev, res.id] : [res.id]);
        setEmailInput("");
      } else {
        return toast.error("Email id not found", { position: "top-center" });
      }
    }
  };

  const handleSave = () => {
   
    setNextPage(true);
  };

  const handleNext = async () => {
    const data = {
      createdBy: localStorage.getItem("userId"),
      title: formData.eventTopic,
      meeting_link: formData.link,
      password: formData.password,
      host: formData.hostName,
      description: formData.description,
      date: formData.date,
      midday: formData.ampm,
      startTime: formData.time,
      timeZone: formData.timezone,
      duration: formData.duration,
      invited_users: emailId.map((id, index) => ({
        user_id: id,
        email: formData.email[index]
      }))
    };

    const apiPosting = await fetch(`${apiUrl}event/addEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const res = await apiPosting.json();

    if (apiPosting.status == 201) {
      for (const userId of emailId) {
        const userUpdateData = {
          events: [{
            eventId: res.result._id
          }]
        };
        await updateUserEvent(userUpdateData, userId);
      }
      toast.success(res.message, { position: "top-center" });
    } else {
      return toast.error(res.message, { position: "top-center" });
    }
  };

  const fetchUserDet = async()=>{
    const useDet = await getUserDetails([localStorage.getItem("userId")],true)
    let userAvil = useDet[0].availability
    
    handleConflict(userAvil,formData.date,formData.time,formData.duration,formData.ampm)
  }
  const dataConvoter = (dateStr) => {
    const dateCon = new Date(dateStr); 
    const options = { weekday: 'short'};
   return( dateCon.toLocaleDateString('en-GB', options))
  };

  const addHour = (timeStr, hoursToAdd, midday) => {

    let date = new Date(`2000-01-01 ${timeStr} ${midday}`); 
    date.setHours(date.getHours() + hoursToAdd); 

    
    const endDate = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    return `${timeStr} ${midday} - ${endDate}`;
};
  const handleConflict = (userAvil,date,time,duration,ampm)=>{

    const day = dataConvoter(date)
   

    const filiterData = userAvil.filter((item)=>{

      const foundDay = item.day === day
      return foundDay
    })
    const timeslots = filiterData.map((item)=>{

      return item.timeSlots.map((slots)=>{
        return slots.startTime +" "+slots.endTime
      })
    })
    
    const currentSlot = addHour(time,duration,ampm)
    

    
    const unavil = timeslots[0];
    const converted = currentSlot;

    isConflict(unavil, converted); 
    

  }
  function isConflict(unavil, converted) {
    function parseTimeRange(timeRange) {
        const [start, end] = timeRange.split(' - ').map(time => new Date(`1970/01/01 ${time}`));
        return { start, end };
    }

    function formatTimeRange(timeRange) {
       
        let parts = timeRange.split(' ');
        if (parts.length === 4) {
            return `${parts[0]} ${parts[1]} - ${parts[2]} ${parts[3]}`; 
        }
        return timeRange; 
    }


    const formattedUnavil = unavil.map(formatTimeRange);

    const convertedTime = parseTimeRange(converted);

    for (let time of formattedUnavil) {
        if (!time.trim()) continue;
        const unavilTime = parseTimeRange(time);

        if (
            (convertedTime.start >= unavilTime.start && convertedTime.start < unavilTime.end) ||
            (convertedTime.end > unavilTime.start && convertedTime.end <= unavilTime.end) ||
            (convertedTime.start <= unavilTime.start && convertedTime.end >= unavilTime.end)
        ) {
            return toast.error("This time slot is unavailable for you.", { position: "top-center" });
        }
    }
    return false;
}




  return (
    <>
      {nextPage ? (
        <div className={styles.eventForm2}>
          <div>
            <h2 className={styles.eventFormMobile}>Create Event</h2>
            <p className={styles.eventFormMobile}>Create events to share for people to book on your calendar.</p>
          </div>

          <div className={styles.eventFormCont}>
            <h2 className={styles.eventFormH2}>Add Event</h2>
            <hr className={styles.eventFormHr} />

            <div className={styles.eventForm2}>
              <h4>Banner</h4>
              <section className={styles.eventFormBannerComp} style={{ backgroundColor: formData.colorBanner }}>
                <img src="./boy2.png" alt="Event Banner" />
                <h4>{formData.eventTopic}</h4>
              </section>

              <p>Custom Background Color</p>
              <div className={styles.chooseColor}>
                <input
                  type="color"
                  name="colorBanner"
                  className={styles.colorBox}
                  value={formData.colorBanner}
                  onChange={handleChange}
                />
                <input
                  className={styles.chooseColorText}
                  type="text"
                  name="colorBanner"
                  value={formData.colorBanner}
                  onChange={handleChange}
                />
              </div>
              <hr className={styles.eventFormHr} />
              <div className={styles.eventFormInput}>
                <label><div className={styles.labelTag}>Add link <p className={styles.red}>*</p></div></label>
                <input 
                  type="text" 
                  name="link" 
                  value={formData.link} 
                  onChange={handleChange} 
                  required
                />
                
              </div>
              <div className={styles.eventFormInput}>
                <label><div className={styles.labelTag}>Add Emails</div></label>
                <input 
                  type="text" 
                  name="email" 
                  value={emailInput} 
                  onChange={handleEmailChange} 
                  placeholder="Press Enter To Add Email"
                  onKeyUp={(e) => e.key === "Enter" && handleAddEmail()}
                  
                />
                
                
              </div>
              
              <div className={styles.eventFormBtns}>
                <button className={styles.eventFormBtnCancle} onClick={handleCancle}>Cancel</button>
              <button type="submit" className={styles.eventFormBtnSave} onClick={handleNext}>Save</button>
              </div>
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
            transition={Bounce}
          />
        </div>
      ) : (
        <div className={styles.eventForm}>
          <h2 className={styles.eventFormMobile}>Create Event</h2>
          <p className={styles.eventFormMobile}>Create events to share for people to book on your calendar.</p>
          <form className={styles.eventFormCont} onSubmit={handleSave}>
            <h2 className={styles.eventFormH2}>Add Event</h2>
            <hr className={styles.eventFormHr} />
            <div className={styles.eventFormInput}>
              <label><div className={styles.labelTag}>Event Topic <p className={styles.red}>*</p></div></label>
              <input 
                type="text" 
                name="eventTopic" 
                value={formData.eventTopic} 
                onChange={handleChange} 
                required
              />
              
             
            </div>
            <div className={`${styles.eventFormInput} ${styles.eventFormMobile}`}>
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </div>
            <div className={styles.eventFormInput}>
              <label><div className={styles.labelTag}>Host name <p className={styles.red}>*</p></div></label>
              <input 
                type="text" 
                name="hostName" 
                value={formData.hostName} 
                onChange={handleChange} 
                required
              />
            
            </div>
            <div className={styles.eventFormInput}>
              <label> <div className={styles.labelTag}>Description <p className={styles.red}>*</p></div> </label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                required
              ></textarea>
             
            </div>
            <hr className={styles.eventFormHr} />
            <div className={styles.eventFormDate}>
              <label> <div className={styles.labelTag}> Date and time <p className={styles.red}>*</p></div></label>
              <div className={styles.eventFormDateComp}>
                <input 
                  className={styles.eventFormDateInput} 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required
                />
               
                <select 
                  className={styles.eventFormDateInput} 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange}
                >
                  {[...Array(24)].map((_, i) => {
                    const hour = Math.floor(i / 2) + 1;
                    const minute = i % 2 === 0 ? "00" : "30";
                    return (
                      <option key={i} value={`${hour}:${minute}`}>
                        {hour}:{minute}
                      </option>
                    );
                  })}
                </select>

                <select 
                  className={styles.eventFormDateInput} 
                  name="ampm" 
                  value={formData.ampm} 
                  onChange={handleChange}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                
                <TimezoneSelect 
                  className={styles.eventFormDateInput}  
                  value={formData.timezone} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <div className={styles.eventFormHour}>
              <label> <div className={styles.labelTag}>Duration <p className={styles.red}>*</p></div></label>
              <select 
                className={styles.eventFormDateInput} 
                name="duration" 
                value={formData.duration} 
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5].map((hour) => (
                  <option key={hour} value={hour}>{hour} hour</option>
                ))}
              </select>
            </div>
            <div className={styles.eventFormBtns}>
              <button className={styles.eventFormBtnCancle}>Cancel</button>
              <input type="submit" value="Next" className={styles.eventFormBtnSave}  />
              
            </div>
          </form>
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
            transition={Bounce}
          />
        </div>
      )}
    </>
  );
}