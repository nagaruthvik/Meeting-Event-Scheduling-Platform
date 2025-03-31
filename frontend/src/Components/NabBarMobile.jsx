import React, { useState } from 'react'
import styles from "./NavBarMobile.module.css"
import { useNavigate } from "react-router";

export default function NabBarMobile() {
    const [logout,setLogout]=useState(false)

    const navigate = useNavigate()
  
  

    const handleLogout = ()=>{
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("availabilityData");
      navigate("/")
    }
  return (
    <div className={styles.mobileNav}>
        <div id={styles.mobileComp} className={styles.compAlign}>
                    <img src="./Vector.png" alt="" />
                    <h1>CNNT</h1>
                  </div>
         <section onClick={()=>setLogout(!logout)}  id={styles.mobileComp} className={styles.profileBanner}>
                  <img src="./boy.png" alt="" />
                  
                  {logout && <div className={styles.logout} onClick={handleLogout}>
                    <img src="./logout.png" alt="" />
                    <p>Sign out</p>
                  </div>}
                  
        </section>
    </div>
  )
}
