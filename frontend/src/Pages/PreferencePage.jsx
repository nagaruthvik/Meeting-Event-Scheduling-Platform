import React, { useState } from 'react';
import styles from "./PreferencePage.module.css";
import { useNavigate } from 'react-router';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function PreferencePage() {
    const apiUrl = import.meta.env.VITE_API_KEY
    const navigate = useNavigate()
    const [selected, setSelected] = useState("");
    const [username,setUserName] = useState("")

    const handleClick = (category) => {
        setSelected(category); 
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(selected,username)
        const formData = {
            userName : username,
            preference : selected

        }

        const fetchApi = await fetch(`${apiUrl}user/updateUser/${localStorage.getItem("userId")}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(formData),
            credentials: "include"

        })
        
        const response = await fetchApi.json()
                
        if (fetchApi.status !== 200) {
            return toast.error(response.message, { position: "top-center" });
            } 
            else {
                toast.success(response.message, { position: "top-center" });
                localStorage.setItem("username",formData.userName)
                navigate("/HomePage")
            }

    }
    return (
        <div className={styles.preferenceMain}>
            <div className={styles.preferenceForm}>
                <div className={styles.logBanner}>
                    <img src="./Vector.png" alt="" />
                    <h1>CNNT</h1>
                </div>
                <h1>Your Preferences</h1>
                <input className={styles.preferenceInput} type="text" placeholder="Tell us your username" value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
                <h4>Select one category that best describes your CNNCT:</h4>

                <section className={styles.preferenceSelection}>
                    <div
                        style={{
                            backgroundColor: selected === "Sales" ? "#1877F2" : "white",
                            border: selected === "Sales" ? "none" : "2px solid #E0E2D9",
                            color: selected === "Sales" ? "white" : "black"
                        }}
                        onClick={() => handleClick("Sales")}
                        className={styles.preferenceChip}
                    >
                        <p>🏢 Sales</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: selected === "Education" ? "#1877F2" : "white",
                            border: selected === "Education" ? "none" : "2px solid #E0E2D9",
                            color: selected === "Education" ? "white" : "black"
                        }}
                        onClick={() => handleClick("Education")}
                        className={styles.preferenceChip}
                    >
                        <p>📚 Education</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: selected === "Finance" ? "#1877F2" : "white",
                            border: selected === "Finance" ? "none" : "2px solid #E0E2D9",
                            color: selected === "Finance" ? "white" : "black"
                        }}
                        onClick={() => handleClick("Finance")}
                        className={styles.preferenceChip}
                    >
                        <p><img src="./money.png" alt="money" /> Finance</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: selected === "Politics" ? "#1877F2" : "white",
                            border: selected === "Politics" ? "none" : "2px solid #E0E2D9",
                            color: selected === "Politics" ? "white" : "black"
                        }}
                        onClick={() => handleClick("Politics")}
                        className={styles.preferenceChip}
                    >
                        <p>⚖️ Government & Politics</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: selected === "Consulting" ? "#1877F2" : "white",
                            border: selected === "Consulting" ? "none" : "2px solid #E0E2D9",
                            color: selected === "Consulting" ? "white" : "black"
                        }}
                        onClick={() => handleClick("Consulting")}
                        className={styles.preferenceChip}
                    >
                        <p><img src="./briefcase.png" alt="briefcase" /> Consulting</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: selected === "Recruiting" ? "#1877F2" : "white",
                            border: selected === "Recruiting" ? "none" : "2px solid #E0E2D9",
                            color: selected === "Recruiting" ? "white" : "black"
                        }}
                        onClick={() => handleClick("Recruiting")}
                        className={styles.preferenceChip}
                    >
                        <p><img src="./note.png" alt="notes" /> Recruiting</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: selected === "Tech" ? "#1877F2" : "white",
                            border: selected === "Tech" ? "none" : "2px solid #E0E2D9",
                            color: selected === "Tech" ? "white" : "black"
                        }}
                        onClick={() => handleClick("Tech")}
                        className={styles.preferenceChip}
                    >
                        <p>🖥 Tech</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: selected === "Marketing" ? "#1877F2" : "white",
                            border: selected === "Marketing" ? "none" : "2px solid #E0E2D9",
                            color: selected === "Marketing" ? "white" : "black"
                        }}
                        onClick={() => handleClick("Marketing")}
                        className={styles.preferenceChip}
                    >
                        <p className={styles.imgAlign}><img src="./rocket.png" alt="rocket" /> Marketing</p>
                    </div>
                </section>
                <input className={styles.preferenceBtn} type="submit" value="Continue" onClick={handleSubmit}/>
            </div>
            <div className={styles.preferenceImg}>
                <img src="./banner.png" alt="" />
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
    );
}
