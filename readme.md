# 🗓️ Bookly - Booking Management System

A professional full-stack booking platform designed for businesses to manage services, staff, and appointments seamlessly.

---

## 📂 Project Structure

The project is split into two main directories:
* **`backend/`**: Node.js/Express server with MongoDB integration.
* **`frontend/`**: Vite + React frontend for a fast, modern user interface.

---

## ⚙️ Local Setup Instructions

### 1. Backend Configuration
Navigate to the backend directory and set up the environment:

```bash
cd backend
npm install

Create a .env file in the root of the backend folder and paste the following:

Code snippet
PORT=3005
MONGO_URL=mongodb+srv://ajimsismail123_db_user:Eb0V6VMi2eCqRE1S@cluster0.kee7j8c.mongodb.net/?
CLOUDINARY_CLOUD_NAME=dqijnywnf
CLOUDINARY_API_KEY=743135479548149
CLOUDINARY_API_SECRET=QLuTPrtjWDppE1CKEKKbx0BQctI

Start the backend server:

Bash
npm start
The server will run at http://localhost:3005

2. Frontend Setup
Open a new terminal window and navigate to the frontend folder:

Bash
cd frontend
Install the dependencies:

Bash
npm install
Create a .env file in the root of the frontend folder:

Code snippet
VITE_API_URL=http://localhost:3005
Start the frontend development server:

Bash
npm run dev
The application will typically be available at http://localhost:5173

🛠 Tech Stack
Backend: Node.js, Express, MongoDB, coudinary.

Frontend: React, Redux Toolkit, Tailwind CSS.     