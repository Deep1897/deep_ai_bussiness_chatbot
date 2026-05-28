# DEEP-AI-BUSSINESS-CHATBOT

## 🚀 Project Overview

**AI-BUSSINESS-CHATBOT** is an AI-powered business assistant chatbot backend developed using **Node.js, Express.js, MySQL, Sequelize ORM, and Groq AI**.

The system allows authenticated admin users to interact with business data using **natural language queries** and receive intelligent responses from the database.

Users can ask business-related questions such as:

* Show total sales this month
* Top 5 customers by revenue
* Show all orders
* Show all products
* Show all sales
* Pending orders
* Products under a specific price
* Download sales reports

The chatbot converts natural language into ORM queries, fetches data from MySQL, and returns meaningful responses dynamically.

---

# 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MySQL
* Sequelize ORM

### Authentication

* JWT Authentication
* bcrypt password hashing

### AI Integration

* Groq API

### Report Generation

* ExcelJS (Dynamic Excel Report Generation)

---

# 📁 Project Structure

```bash
AI-BUSSINESS-CHATBOT
│── README.md
│── readme.txt
│── package.json
│── app.js
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── chatController.js
│   └── reportController.js
    └── tableController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Customer.js
│   ├── Order.js
│   ├── OrderItem.js
│   ├── Sale.js
│   └── index.js
│
├── routes/
│   ├── authRoutes.js
│   ├── chatRoutes.js
│   └── reportRoutes.js
    └── tableRoutes.js
│
├── services/
│   ├── groqService.js
│   ├── excelService.js
│   ├── queryService.js
│   └── aiParserService.js
│
└── utils/
    └── generateToken.js
```

---

# ✨ Key Features

### 🔐 Secure Authentication

* Admin Registration
* Admin Login
* JWT Token Authentication
* Protected APIs

### 🤖 AI Business Chatbot

Admin users can interact with business data using natural language.

Example Queries:

#### Sales Queries

* Show total sales this month
* Top 5 customers by revenue
* Show all sales
* Download sales report

#### Product Queries

* Show all products
* Low stock products
* Products under 5000

#### Order Queries

* Show all orders
* Pending orders
* Last completed orders

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone git@github.com:Deep1897/deep_ai_bussiness_chatbot.git
```

## 2. Move to Project Folder

```bash
cd AI-BUSSINESS-CHATBOT
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=######
DB_NAME=ai_chatbot
JWT_SECRET=mysecretkey
GROQ_API_KEY=[your key]
```

## 5. Run Server

Development Mode:

```bash
npm start
```

Production Mode:

```bash
npm start
```

Server will run on:

```bash
http://localhost:5000
```

---

# 🔑 Authentication APIs

## Register Admin

**POST**

```http
http://localhost:5000/api/auth/register
```

### Request Body

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "123456"
  "role":"admin"
}
```

---

## Login Admin

**POST**

```http
http://localhost:5000/api/auth/login
```

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login Successful",
  "token": "jwt_token_here"
}
```

---

# 🤖 Chat API

## Chat with AI Assistant

**POST**

```http
http://localhost:5000/api/chat
```

### Authorization

```makefile
Bearer Token Required
```

### Headers

```http
Authorization: Bearer your_token
```

### Request Body

```json
{
  "message": "Top 5 customers by revenue"
}
```

### Sample Queries

```text
Show total sales this month
Top 5 customers by revenue
Show all products
Show all orders
Show all sales
Pending orders
Low stock products
Download sales report
```

---

# 📊 Sales Report API

## Get Sales Reports

**GET**

```http
http://localhost:5000/api/reports/sales
```

### Authorization

```http
Bearer Token Required
```

This endpoint dynamically generates sales reports and returns downloadable data.

---

# 📌 Optional APIs Supported

## Get All Products

**GET**

```http
/api/products
```

return all product in json

---

## Get All Orders

**GET**

```http
/api/orders
```

return all orders in json
---

## Get Sales Data

**GET**

```http
/api/reports/sales
```

return downloaded sales report 

---

# 🧠 System Workflow

```text
1. Admin Registration/Login
2. JWT Token Generation
3. User Sends Natural Language Query
4. AI Parser Understands Intent
5. Query Service Converts to ORM Query
6. Database Fetches Results
7. JSON Response Returned
8. If Report Requested → Excel File Generated
```

---

# 🛡 Security Features

* Password Hashing using bcrypt
* JWT-based Authentication
* Protected Routes Middleware
* Environment Variables Configuration
* Proper Error Handling

---

# 📂 Database Models

The system includes the following business entities:

* Users
* Customers
* Products
* Orders
* Order Items
* Sales

These entities are managed using **Sequelize ORM** for scalable and maintainable database operations.

---

# 📬 Postman Testing

Use the following APIs for testing:

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### Chatbot

* `POST /api/chat`

### Reports

* `GET /api/reports/sales`

---

# 👨‍💻 Developer Note

This project is developed following **clean MVC architecture**, proper service separation, authentication middleware, reusable services, and scalable folder organization.

The goal of this system is to provide an intelligent business assistant that can interact with business data using human language while maintaining secure and structured backend practices.
