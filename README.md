
# Todo List API

This project is a RESTful API for managing Todo items, including user authentication and CRUD operations, built using **Node.js**, **Express.js**, **MongoDB**, and **JWT (JSON Web Tokens)**.

## Features

- **User Registration**: Allows users to create an account with a username, email, and password.
- **User Login**: Authenticated users can log in using their credentials and receive a JWT token for further requests.
- **Todo Management**: Authenticated users can create, update, view, and delete their todo items.
- **JWT Authentication**: Protects routes by verifying JWT tokens in the `Authorization` header for secure access.
- **CRUD Operations**:
  - **Create**: Add new todo items.
  - **Read**: Retrieve a list of todos for the authenticated user.
  - **Update**: Update a specific todo item.
  - **Delete**: Delete a specific todo item.

## Technologies Used

- **Node.js**: JavaScript runtime for the backend server.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user and todo data.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcrypt**: For hashing user passwords before storing them in the database.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/todo-api.git
cd todo-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```bash
MONGO_URI=your-mongo-uri-here
JWT_SECRET=your-jwt-secret-here
```

4. Start the server:

```bash
npm start
```

By default, the server will run on `http://localhost:8800`.

## API Endpoints

### Authentication Routes

- **POST** `/api/register`: Register a new user.

  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "User Created Successfully",
      "isSuccessMessage": true
    }
    ```

- **POST** `/api/login`: Login an existing user and get a JWT token.
  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "token": "JWT token here",
      "userId": "userId",
      "message": "Login Success",
      "isSuccessMessage": true
    }
    ```

### Todo Routes (Protected by JWT)

- **GET** `/api/tasks`: Get all todos for the authenticated user.

  - Headers:
    ```bash
    Authorization: Bearer your-jwt-token
    ```
  - Response:
    ```json
    [
      {
        "_id": "todoId",
        "title": "string",
        "description": "string",
        "isCompleted": false,
        "userId": "userId"
      }
    ]
    ```

- **POST** `/api/tasks`: Create a new todo for the authenticated user.

  - Request Body:
    ```json
    {
      "title": "string",
      "userId": "userId",
      "description": "string", #optional
    }
    ```
  - Response:
    ```json
    {
      "message": "Todo Created Successfully!",
      "isSuccessMessage": true
    }
    ```

- **PUT** `/api/tasks/:taskid`: Update a todo item.

  - Request Body:
    ```json
    {
      "userId": <user-id>,
      "title": "Updated title" # add fields that needs to be updated

    }
    ```
  - Response:
    ```json
    {
      "message": "Todo Updated Successfully",
      "isSuccessMessage": true
    }
    ```

- **DELETE** `/api/tasks/:taskls
id`: Delete a todo item.
  - Request Body:
    ```json
    {
        "userId": <user-id>
    }
    ```
  - Response:
    ```json
    {
      "message": "Todo Deleted Successfully",
      "isSuccessMessage": true
    }
    ```

## Middleware

- **JWT Authentication**: The `authJWT` middleware checks for a valid token in the `Authorization` header and grants access to the protected routes.

## Error Handling

- **400**: Bad request (e.g., invalid data).
- **401**: Unauthorized (e.g., no token provided).
- **403**: Forbidden (e.g., trying to update or delete someone else's todo).
- **404**: Not found (e.g., user or todo does not exist).
- **500**: Internal server error.

## Folder Structure

```
├── models/
│   ├── todo.js        # Todo model
│   └── user.js        # User model
├── routes/
│   ├── auth.js        # Authentication routes (register/login)
│   └── todo.js        # Todo management routes (CRUD)
├── middleware/
│   └── authMiddleware.js     # JWT Authentication middleware
├── .env               # Environment variables (Mongo URI, JWT secret)
├── index.js             # Express application setup
└── package.json       # Project dependencies and scripts
```
