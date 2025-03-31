# To-Do List App

A simple and interactive To-Do list web application built with React.js that allows users to create, edit, delete, and update tasks. The app includes authentication with login and signup, and it communicates with a backend API to store and retrieve tasks.

## Features

- **Authentication**: Users can sign up, log in, and log out.
- **Task Management**: Users can add, edit, delete, and update task status (In Progress/Completed).
- **User-friendly UI**: The app provides a clean and intuitive UI with a responsive layout.
- **API Integration**: The app makes HTTP requests to a backend server using `fetch` for task management.

## Tech Stack

- **Frontend**: React.js, React Router
- **Backend**: API calls to a backend server (you can replace it with your backend URL)
- **State Management**: React Context API
- **UI**: Tailwind CSS for styling

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VamsiMakke87/todo-app.git
cd todo-app/frontend
```

### 2. Install Dependencies

Ensure you have `Node.js` and `npm` installed. Run the following command to install dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file at the root of your project and add the following:

```bash
REACT_APP_BACKEND_URL=<your-backend-url>
```

Replace `<your-backend-url>` with the actual backend URL for API requests.

### 4. Run the Development Server

Start the React development server:

```bash
npm start
```

Your app should now be accessible at `http://localhost:3000`.

## Folder Structure

```
/src
  /Components
    - Navbar.js
    - TaskForm.js
    - Todo.js
    - Login.js
    - Signup.js
    - Home.js
    - Logout.js
  - App.js
  - AppContext.js
  - index.js
  - index.css
```

- **`Navbar.js`**: Displays the navigation bar.
- **`TaskForm.js`**: Form for creating and editing tasks.
- **`Todo.js`**: Displays individual tasks with the ability to edit or delete.
- **`Login.js`**: Login page for user authentication.
- **`Signup.js`**: Signup page for user registration.
- **`Home.js`**: Main page displaying all tasks.
- **`Logout.js`**: Handles user logout.

## API Calls

The application makes the following API requests to the backend server:

- **POST** `/api/tasks`: Create a new task.
- **GET** `/api/tasks`: Retrieve all tasks.
- **PUT** `/api/tasks/:id`: Update an existing task (edit or mark as completed).
- **DELETE** `/api/tasks/:id`: Delete a specific task.

## App Context

The app uses React's Context API (`AppContext.js`) to manage global state and make API requests:

- **State**: `successMsg`, `errorMsg`, `todo`, `token`
- **Functions**:
  - `getReq`: Makes a GET request to the backend.
  - `postReq`: Makes a POST request to the backend.
  - `putReq`: Makes a PUT request to the backend.
  - `deleteReq`: Makes a DELETE request to the backend.
  - `setSuccessMsg`: Updates the success message.
  - `setErrorMsg`: Updates the error message.
  - `setToken`: Sets the user token for authentication.
  - `setTodo`: Sets the current task being edited.

## Routing

The app uses `react-router-dom` for client-side routing:

- `/login`: Login page.
- `/signup`: Signup page.
- `/`: Home page (lists all tasks).
- `/add`: Add new task form.
- `/edit`: Edit an existing task.
- `/logout`: Logout the user.

## UI Feedback

- **Success**: A green success message appears at the top of the screen when a task is added, updated, or deleted successfully.
- **Error**: A red error message appears when an issue occurs during API calls or form validation.

## Notes

- Ensure that the backend server is properly set up and the API endpoints are working before running the app.
- The app uses localStorage to store the authentication token.

