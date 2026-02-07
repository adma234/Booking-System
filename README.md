# Scheduled Class Slot Booking System

## 👤 Author & Credit
**Developed by:** **Padma P**  
🎓 Final Year B.Tech CSE Student  
💻 Full-Stack Developer (React · Node.js · MongoDB)

---

## 👋 Introduction
Welcome! This is the documentation for the **Scheduled Class Slot Booking System** I built. This project is a full-stack web application that allows users to register, log in, and book class slots on a calendar. It prevents double-booking and keeps everything organized.

This guide is written to help you understand exactly how I put this together and, most importantly, **how to run it on any computer from scratch**.

---

## ✨ Key Features
* **Smart Scheduling**: Automatically calculates 3 training batches per month.
* **Batch Rules**: Each batch is 7 days long, skips Sundays, and enforces a 2-day break between batches.
* **Visual Calendar**: Clearly distinguishes between selectable batch days, holidays (Sundays), and gap days.
* **One-Click Management**: Easily add new slots (auto-jumps to the right month) or delete existing ones directly from the dashboard.

---

## 🏗️ How I Built This (The Architecture)

### 1. The Frontend (What you see)
- **Technology**: React.js  
- **Why**: I used React to make the user interface snappy and responsive. It acts like a mobile app but runs in the browser.  
- **Design**: Pixel-perfect UI following modern design standards.

### 2. The Backend (The Brains)
- **Technology**: Node.js & Express  
- **Why**: Handles authentication, booking logic, and prevents slot conflicts using secure JWT-based authorization.

### 3. The Database (The Memory)
- **Technology**: MongoDB (Mongoose)  
- **Why**: Flexible NoSQL database ideal for handling users, bookings, and calendar data.

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Install the Tools
1. **Node.js (LTS)** – https://nodejs.org  
2. **MongoDB Community Server** – https://www.mongodb.com/try/download/community  
   - Recommended: Install **MongoDB Compass**

---

### Step 2: Start the Database
- Ensure MongoDB is running
- Connect using:mongodb://localhost:27017


---

## ⚙️ Configuration

Inside the `backend` folder, create or verify the `.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/bookingsys
PORT=5000
JWT_SECRET=supersecretkey

🏃‍♂️ How to Run the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev


Open: http://localhost:3000

✅ Test the Application

Click Create a new account

Register with your details

Login and start booking slots 🎯

🏁 Final Note

This project was designed, developed, and documented by Padma P as a full-stack application demonstrating real-world scheduling logic, authentication, and clean UI design.

⭐ If you like this project, feel free to fork or star the repository!



