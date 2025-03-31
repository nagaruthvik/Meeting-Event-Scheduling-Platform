# Meeting-Event-Scheduling-Platform
Meeting &amp; Event Scheduling Platform: A web app for scheduling, managing, and customizing meetings and events. Features include event creation, availability scheduling, participant management, conflict resolution, and secure authentication with JWT. Built with React.js, Node.js, Express.js, and MongoDB.
# 🎮 Demo Credentials  

Use the following credentials to explore the platform:  

- **Email**: `jack@gmail.com`  
- **Password**: `Jack@000`  

Feel free to log in and test the features! 🚀  

# Landing Page  
- A **public-facing** landing page.  
- Fully **responsive** across all devices.  
- Users can **sign in** or **sign up** directly from this page.
![image](https://github.com/user-attachments/assets/8c10fe43-ab6c-4ff5-8c57-538d53f9840e)
# Signup  
- Users can register an account by providing:  
  - **First Name**  
  - **Last Name**  
  - **Email** (must be unique)  
  - **Username**  
  - **Password** (securely hashed using bcrypt) with a password strength bar  
  - **Confirm Password** (must match the password)  
- Duplicate email registrations are not allowed.
  ![image](https://github.com/user-attachments/assets/b0e98e74-507e-47d5-8c9f-7525939b4742)
# Sign In Page  
- Input fields for **Email** and **Password**.  
- **Login authentication** implemented using **JWT**.  
- Only **existing** registered emails are allowed.  
- Passwords are **hashed and verified** using **bcrypt**.
  ![image](https://github.com/user-attachments/assets/13a306e2-da64-4aa1-8e34-f06a86877c9c)
# Preference Page  
- If the user is **newly registered**, they can choose:  
  - Their **username**  
  - Their **interests**  
- The **username** and **user ID** are stored in **localStorage** for future use.  
![image](https://github.com/user-attachments/assets/27f264c7-b61a-4b41-a089-73dbd304c3e2)
# Home Page  
- The home page includes a **navigation bar** with the following options:  
  - **Display Events**  
  - **Booking**  
  - **Availability**  
  - **Create Event**  
  - **Logout**  
# Create Event  
- Users can create an event by clicking the **"Create Event"** button and entering the following details:  
  - **Event Topic**  
  - **Password** (for the event)  
  - **Event Link**  
  - **Host Name**  
  - **Description**  
  - **Date & Time**  
  - **Duration**  
  - **Preferred Background Color** (using a color selector)  
- Users can **invite other users** by entering their email addresses.  
  - Only emails **registered on the platform** can be invited.  
  - Invited users will receive a **request in the "Upcoming Events"** section.  
![image](https://github.com/user-attachments/assets/5d87dcd5-c123-4a97-8b6c-de87604b211f)
# Event Display Page  
- Users can view the events they have created.  
- Basic event details are shown, including:  
  - **Event Title**  
  - **Date & Time**  
  - **Type of Meeting** (Group or Private)  

## Features:  
- **Edit**, **Delete**, **Deactivate**, and **Activate** events using a toggle button.  
- **Copy Meeting Link & Password** using a copy button.  

## User Note:  
- If a user has a **conflict with an upcoming meeting**, a **conflict message** will be displayed.  
![image](https://github.com/user-attachments/assets/a162006d-e230-4bfa-b476-e16bd4b1d86b)
# Availability Page  

The Availability Page allows users to manage and track their meeting schedules. Meetings are categorized as follows:  

## 📅 Upcoming Meetings  
- Displays **all accepted and pending meetings**.  
- Users can view details of their scheduled meetings.  

## ⏳ Pending Meetings  
- Shows meetings that require user approval.  
- Users can:  
  - View the **list of invitees** along with their response status (**Accepted/Rejected**).  
  - Choose to **Accept** or **Reject** the meeting invitation.  

## ❌ Rejected Meetings  
- Displays all meetings that the user has **rejected**.  

## 🚫 Canceled Meetings  
- Lists all meetings that have been **canceled**.  

## ⏮️ Past Meetings  
- Shows a **history of all past meetings** the user has attended or created.  

This page ensures that users can efficiently manage their schedules and avoid conflicts.  
## 📅 Upcoming Meetings  IMG
![image](https://github.com/user-attachments/assets/6ea77227-1d80-4e5c-b79a-7e9d868cf8a6)
## ⏳ Pending Meetings IMG
![image](https://github.com/user-attachments/assets/3035fa50-548d-45ad-8c14-ff8bee89e78e)
# Availability Page  

The Availability Page helps users manage their schedules efficiently by setting their availability and handling conflicts in real-time.  

## 🛠️ Components  

### 1️⃣ **Availability Component**  
- Users can **set their availability** on a **day-wise basis** (Monday to Saturday).  
- Users can **add extra time slots** by clicking the **"Add"** button on a specific week.  
- Users can **remove time slots** by pressing the **"X"** button.  
- Availability is **saved automatically** without needing a confirmation button.  

### 2️⃣ **Conflict Handling**  
- **Real-time conflict detection** prevents overlapping meetings.  
- If a meeting is **already scheduled** for a specific time slot:  
  - The system **blocks** any new meeting at the same time.  
  - A **conflict alert** appears to notify the user.  

This feature ensures a seamless scheduling experience, similar to **Calendly**, helping users manage their time effectively.  
![image](https://github.com/user-attachments/assets/520a43f4-e690-4583-b0c5-a68dc9b72c8b)
# 📆 Calendar View Page  

The Calendar View Page provides a **visual representation** of scheduled events, helping users manage their time efficiently.  

## 🛠️ Features  
- Users can **view events** they have created and upcoming events.  
- Supports different calendar views:  
  - **Day View**  
  - **Week View**  
  - **Month View**  
- Displays **both past and upcoming events**:  
  - **Upcoming events** are highlighted in **purple**.  
  - **Past events** appear in **light gray**.  
## 📱 Mobile View  
- On **mobile devices**, the default view is set to **Week View** for better usability.  

## 📝 User Notes  
- Users can **click on an event** to **copy the meeting link and password** for easy access.  
![image](https://github.com/user-attachments/assets/35ffc1bf-e58e-426d-913d-fe8aca80a9ff)
# ⚙️ Settings Page  

The Settings Page allows users to update their profile information easily.  

## 🛠️ Features  
- Users can update the following details:  
  - **First Name**  
  - **Last Name**  
  - **Email**  
  - **Password**  
  - **Confirm Password**  
- All fields come **pre-filled** with the user's existing data for convenience.  
- Secure password update with **password confirmation** to prevent errors.  
![image](https://github.com/user-attachments/assets/1d55b578-b29a-462f-baca-98fff9d72bc0)
# ✏️ Event Edit Page  

The Event Edit Page allows users to modify their existing events while keeping most details pre-filled.  

## 🛠️ Features  
- Same functionality as the **Event Create Page**, but with **pre-filled data** (except for **Date & Time**).  
- Users can edit:  
  - **Event Topic**  
  - **Password**  
  - **Meeting Link**  
  - **Host Name**  
  - **Event Description**  
  - **Duration**  
  - **Background Color**  
  - **Invited Users**  

## ⚠️ User Notes  
- If a user tries to schedule an event during their **unavailable time**, a **warning toast notification** will be shown.  
![image](https://github.com/user-attachments/assets/b20bf414-9342-4475-9191-02312b6ce793)

# 🔒 Logout Option  

The Logout feature ensures a **secure** and **complete** sign-out process for users.  

## 🛠️ Features  
- Users can access the **Logout button** via the **Profile menu**.  
- Clicking the **Logout button** will:  
  - **Securely log the user out**.  
  - **Clear all local storage data** related to the user.  
  - **Reset the user's availability settings**.  

![image](https://github.com/user-attachments/assets/0bf0d81d-9e29-4ebc-a44d-86fc7d04342c)
# 🛠️ Tech Stack & Deployment  

## 🌐 Frontend  
- **React**  
- **Vanilla CSS**  

## ⚙️ Backend  
- **Node.js with Express**  
- **MongoDB** (for database storage)  

## 🚀 Hosting  
- **Frontend** deployed on **Vercel**:  
  🔗 [Meeting Event Scheduling Platform - Frontend](https://meeting-event-scheduling-platform.vercel.app/)  
- **Backend** deployed on **Render**:  
  🔗 [Meeting Event Scheduling Platform - Backend](https://meeting-event-scheduling-platform.onrender.com/)  
