import React, { useEffect, useState } from "react";
import styles from "./UserSettings.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetUserDetails from "./GetUserDetails";
import NabBarMobile from "./NabBarMobile";
import { useNavigate } from "react-router";


export default function UserSettings() {
    const apiUrl = import.meta.env.VITE_API_KEY
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cPassword: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        const getUserDet = async () => {
            try {
                const data = await GetUserDetails([localStorage.getItem("userId")], true);
                if (data && data.length > 0) {
                    setFormData((prev) => ({
                        ...prev,
                        firstName: data[0].firstName,
                        lastName: data[0].lastName,
                        email: data[0].email
                    }));
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        getUserDet();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.cPassword) {
            toast.error("Passwords do not match", { position: "top-center" });
            return;
        }

        const data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch(`${apiUrl}user/updateUser/${localStorage.getItem("userId")}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update user");
            }

            toast.success(result.message, { position: "top-center" });
            navigate("/")
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        }
    };

    return (
        <div className={styles.settingMain}>
            <NabBarMobile/>
            <div>
                <h4>Profile</h4>
                <p>Manage settings for your profile</p>
            </div>
            <div className={styles.settingForm}>
                <p>Edit</p>
                <hr />
                <form className={styles.settingFormValues} onSubmit={handleSubmit}>
                    <div className={styles.settingFormFeild}>
                        <label>First name</label>
                        <input
                            className={styles.settingFormInput}
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Last name</label>
                        <input
                            className={styles.settingFormInput}
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            className={styles.settingFormInput}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            className={styles.settingFormInput}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                   


                    <div>
                        <label>Confirm Password</label>
                        <input
                            className={styles.settingFormInput}
                            type="password"
                            name="cPassword"
                            value={formData.cPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.saveBtn}>
                        <button type="submit">Save</button>
                    </div>
                </form>
               
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
