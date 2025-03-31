import React, { createContext, useState } from 'react';

const NavBarContext = createContext(); 

export default function NavBarProvider({ children }) { 
    const [selectedNav, setSelectedNav] = useState("");
    const [eventId,setEventId] = useState("")
    const [userData,setUserData] = useState([])
    const [ userId,setUserId ] = useState()
    return (
      <NavBarContext.Provider value={{ selectedNav, setSelectedNav, eventId,setEventId, userId,setUserId ,userData,setUserData}}>
        {children} 
      </NavBarContext.Provider>
    );
}

export { NavBarContext }; 
