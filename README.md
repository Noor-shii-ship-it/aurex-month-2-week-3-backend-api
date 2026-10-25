# AUREX Month 2 — Week 3: Backend API

## Project Overview

This project is part of the AUREX Full-Stack Engineering Internship, Month 2, Week 3.

It is a RESTful Task Management API built using Node.js, Express.js, and MongoDB. The API allows users to create, read, update, and delete tasks. Postman is used to test the API endpoints.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Postman
- Git and GitHub

## Features

- Create a new task
- Retrieve all tasks
- Retrieve a single task by ID
- Update an existing task
- Delete a task
- Validate task IDs and required fields
- Store tasks in MongoDB
- Test API endpoints using Postman

## Project Structure

```text
month full week 3/
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

**Note:** The `.env` file and `node_modules/` folder are excluded from GitHub.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Noor-shii-ship-it/aurex-month-2-week-3-backend-api.git
```

### 2. Open the Project Folder

```bash
cd aurex-month-2-week-3-backend-api
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your own MongoDB Atlas connection string. Never upload your actual database credentials to GitHub.

### 5. Start the Server

```bash
node server.js
```

The server will run at:

`http://localhost:5000`

If the database connection is successful, the terminal will display a MongoDB connection success message.

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check server status |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Example Request

### Create a Task

**Method:** `POST`

**Endpoint:** `/api/tasks`

Select **Body → raw → JSON** in Postman and enter:

```json
{
  "title": "Learn Express API",
  "completed": false
}
```

### Update a Task

**Method:** `PUT`

**Endpoint:** `/api/tasks/YOUR_TASK_ID`

```json
{
  "title": "Learn Express API",
  "completed": true
}
```

Replace `YOUR_TASK_ID` with the actual `_id` returned by MongoDB.

## Testing

The API endpoints are tested using Postman.

Testing includes:

- Checking server status
- Retrieving all tasks
- Creating a task
- Retrieving a task by ID
- Updating a task
- Deleting a task
- Checking responses for invalid IDs and missing fields

Screenshots of the Postman tests are maintained separately for internship submission.

## Database

MongoDB Atlas is used to store task data. Mongoose provides the schema and database operations.

Each task contains:

- `_id`: Unique MongoDB document ID
- `title`: Task title
- `completed`: Task completion status
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Security

- Environment variables are stored in `.env`.
- The `.env` file is excluded using `.gitignore`.
- `node_modules/` is excluded from version control.
- Database credentials should never be committed to GitHub.

## Learning Outcomes

Through this project, I practised:

- Building RESTful APIs with Express.js
- Implementing CRUD operations
- Connecting a Node.js application to MongoDB Atlas
- Using Mongoose for database operations
- Testing API endpoints with Postman
- Managing project files with Git and GitHub
- Using environment variables for configuration

## Internship Information

**Program:** AUREX Full-Stack Engineering Internship  
**Month:** 2  
**Week:** 3  
**Project:** Backend API Development  
**Developer:** Noor Fatima

## GitHub Repository

[View the Week 3 Backend API Repository](https://github.com/Noor-shii-ship-it/aurex-month-2-week-3-backend-api)

