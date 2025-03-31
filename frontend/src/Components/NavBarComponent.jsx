import React, { useContext, useState } from 'react';
import styles from "./NavBarComponent.module.css";
import EventDisplayComponent from './EventDisplayComponent';
import EventCreateComponent from './EventCreateComponent';
import { NavBarContext } from './NavBarContext'; 
import EventUpdateComponent from './EventUpdateComponent';
import BookingComponent from './BookingComponent';
import AvailabilityComponent from './AvailabilityComponent';
import UserSettings from './UserSettings';
import { useNavigate } from "react-router";

export default function NavBarComponent() {
  const { selectedNav, setSelectedNav } = useContext(NavBarContext);
  const [logout,setLogout]=useState(false)

  const navigate = useNavigate()


  const handleClick = (e) => {
    e.preventDefault();
    setSelectedNav(e.currentTarget.dataset.value);
  };
  const handleLogout = ()=>{
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("availabilityData");
    navigate("/")
  }



  return (
    <div className={styles.homePage}>
      
      <nav className={styles.navBarComp}>
        <section className={styles.navBarItems}>
          <div id={styles.mobileComp} className={styles.compAlign}>
            <img src="./Vector.png" alt="" />
            <h1>CNNT</h1>
          </div>
          <button
            className={styles.evntAlign}
            style={{ backgroundColor: selectedNav === "event" ? "rgb(239, 237, 237)" : "white" }}
            data-value="event"
            onClick={handleClick}
          >
            <img src="./event.png" alt="events" />
            <p>Events</p>
          </button>
          <button
            className={styles.evntAlign}
            style={{ backgroundColor: selectedNav === "booking" ? "rgb(239, 237, 237)" : "white" }}
            data-value="booking"
            onClick={handleClick}
          >
            <img src="./bookings.png" alt="booking" />
            <p>Booking</p>
          </button>
          <button
            className={styles.evntAlign}
            style={{ backgroundColor: selectedNav === "Availability" ? "rgb(239, 237, 237)" : "white" }}
            data-value="Availability"
            onClick={handleClick}
          >
            <img src="./time.png" alt="time" />
            <p>Availability</p>
          </button>
          <button
            className={styles.evntAlign}
            style={{ backgroundColor: selectedNav === "settings" ? "rgb(239, 237, 237)" : "white" }}
            data-value="settings"
            onClick={handleClick}
          >
            <img src="./settings.png" alt="settings" />
            <p>Settings</p>
          </button>
          <button
            id={styles.mobileComp}
            className={styles.navBarButton}
            data-value="addEvent"
            onClick={handleClick}
          >
            + Create
          </button>
        </section>
        <section onClick={()=>setLogout(!logout)}  id={styles.mobileComp} className={styles.profileBanner}>
          <img src="./boy.png" alt="" />
          <h3>{localStorage.getItem("username")}</h3>
          {logout && <div className={styles.logout} onClick={handleLogout}>
            <img src="./logout.png" alt="" />
            <p>Sign out</p>
          </div>}
          
        </section>
      </nav>
      <div className={styles.mainBarComp}>
        {selectedNav === "event" ? <EventDisplayComponent /> : ""}
        {selectedNav === "addEvent" ? <EventCreateComponent /> : ""}
        {selectedNav === "updateEvent" ? <EventUpdateComponent /> : ""}
        {selectedNav === "booking" ? <BookingComponent/>:""}
        {selectedNav === "Availability" ? <AvailabilityComponent/>:""}
        {selectedNav === "settings" ? <UserSettings/>:""}
      </div>

    </div>
  );
}
