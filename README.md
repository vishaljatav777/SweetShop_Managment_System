🛍️ Mitha_Dukan (Sweet Shop Management System)

A professional full-stack MERN application to manage premium products, perform purchases, track stock, manage admin operations, and provide a seamless user shopping experience.

🌐 Take demo of Mitha_Dukan:

https://sweet-shop-management-system-eta.vercel.app/

🚀 1. Project Overview :

Mitha_Dukan is a MERN-based full-stack web application designed with a modern, professional UI to:
✔ Allow users to view, search, filter, and purchase premium sweets/products
✔ Allow admin to add, update, delete, or restock inventory
✔ Provide secure authentication & authorization (User vs Admin)
✔ Display real-time order history and status tracking
✔ Responsive, professional UI built with Tailwind CSS

🛠 2. Tech Stack

Frontend (To run frontend command = npm start)

React.js (Hooks, Context API)

React Router (Navigation)

Tailwind CSS (Professional Blue/Gray Theme)

Toast Notifications (User Feedback)

Backend (To run backend command = node server.js)

Node.js (Runtime Environment)

Express.js (REST API Framework)

MongoDB + Mongoose (Database)

JWT Authentication (Secure Login)

⚙️ 3. Setup Instructions (Run Locally)

Follow the steps exactly as written.

📌 Clone the Repository

git clone [https://github.com/](https://github.com/)<your-username>/sweet-shop-management-system.git
cd sweet-shop-management-system


🧩 4. Backend Setup

📂 Navigate to Backend

cd backend


📦 Install Dependencies

npm install


📝 Create .env file inside backend folder

PORT=4000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your-secret-key


▶️ Run Backend

npm start


Backend will now run on: http://localhost:4000

🎨 5. Frontend Setup

📂 Navigate to Frontend

cd ../frontend


📦 Install Dependencies

npm install


▶️ Run Frontend

npm start


Frontend will run on: http://localhost:3000

🧪 6. Testing Instructions

Project contains automated tests (Jest / Manual API Testing).

Run Backend Test Suite

npm test


📄 7. Test Report

Test Case Description

Status

User Registration (Ensures new users can sign up)

✔ Passed

User Login (Validates email/password and returns JWT)

✔ Passed

Auth Middleware (Blocks unauthorized access)

✔ Passed

Add Product (Admin) (Admin can add new inventory)

✔ Passed

Purchase Flow (User can buy items & order is created)

✔ Passed

Get Orders (User sees own orders, Admin sees all)

✔ Passed

Pagination (Product list paginated properly)

✔ Passed

➡ All tests passed successfully.
➡ Manual testing screenshots can be added here if needed.

🖼️ 8. Screenshots

Please refer to the screenshots folder in the current repository.

project-root/
├── backend/
├── frontend/
├── screenshots/   ← All images are stored here
└── README.md


🤖 9. My AI Usage (Mandatory Section)

This project was developed with the assistance of AI tools (ChatGPT/Gemini) to enhance code quality and design.

The AI was used for:

Refactoring the UI to a professional "Blue & Gray" corporate theme.

Writing clean, modular, and optimized React components.

Creating robust validation logic for forms.

Writing backend controller snippets and middleware.

Structuring the README.md documentation.

All final decisions, debugging, project structure, and implementation were manually reviewed, tested, and approved by the developer.

