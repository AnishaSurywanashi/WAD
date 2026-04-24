# Full-Stack CRUD Application

This is a complete full-stack web application built with Node.js, Express.js, and MongoDB Atlas. It provides a simple user management system with CRUD (Create, Read, Update, Delete) functionality.

## Features

- **Backend**: Node.js and Express.js server.
- **Database**: MongoDB Atlas for cloud-based data storage, with Mongoose for object data modeling.
- **Frontend**: Simple and responsive UI built with HTML, CSS, and Bootstrap.
- **API**: A RESTful API for user management.
- **Environment Variables**: Securely manages database credentials using a `.env` file.

## Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and a cluster.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Install the necessary packages for both the server.

```bash
npm install
```

### 3. Create a `.env` File

Create a `.env` file in the root of the `ass3b` directory. This file will store your MongoDB Atlas connection string.

```env
# MongoDB Atlas connection string
# Replace <username>, <password>, and <cluster-name> with your actual credentials
MONGO_URI="mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/wadl-ass3b?retryWrites=true&w=majority"

# Port for the server to run on
PORT=3000
```

**How to get your MongoDB Atlas connection string:**

1.  Log in to your MongoDB Atlas account.
2.  Go to your cluster and click the "Connect" button.
3.  Select "Connect your application".
4.  Choose "Node.js" as your driver and the latest version.
5.  Copy the connection string provided and replace `<password>` with your database user's password. Make sure the user has read and write access to the database.

### 4. Run the Server

You can start the server in two modes:

-   **Production mode**:

    ```bash
    npm start
    ```

-   **Development mode** (with `nodemon`, which automatically restarts the server on file changes):

    ```bash
    npm run dev
    ```

The server will be running on `http://localhost:3000`.

## Application Structure

```
ass3b/
├── config/
│   └── database.js         # MongoDB connection logic
├── controllers/
│   └── UserController.js   # Logic for handling API requests
├── models/
│   └── User.js             # Mongoose User schema
├── public/
│   ├── index.html          # Frontend UI
│   ├── script.js           # Frontend JavaScript
│   └── style.css           # Frontend CSS
├── routes/
│   └── UserRoutes.js       # API routes for users
├── .env                    # Environment variables (credentials)
├── package.json            # Project dependencies and scripts
└── server.js               # Main Express server file
```

## API Endpoints

The following API endpoints are available:

-   `POST /api/user`: Register a new user.
-   `POST /api/user/login`: Dummy login to check if a user's email exists.
-   `GET /api/user`: Get a list of all users.
-   `GET /api/user/:id`: Get a single user by their ID.
-   `PATCH /api/user/:id`: Update a user's information.
-   `DELETE /api/user/:id`: Delete a user.
