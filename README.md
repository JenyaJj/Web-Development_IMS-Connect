# Web-Development-IMS-Connect
IMS Connect Application is a React-based web application designed to streamline idea management processes, improve collaboration, and foster innovation within organizations. The application consists of a React-based client and a Node.js backend with an SQLite3 database.

## Requirements

Before starting, ensure that you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager, which comes with Node.js)
- **SQLite3** (for the database)

### Install SQLite3:

- **On Ubuntu**:
  ```bash
  sudo apt update
  sudo apt install sqlite3
- **On macOS**:
  ```bash
  brew install sqlite
- **On Windows**:
Download SQLite from the official SQLite website.
Add the SQLite folder to your system’s PATH.


### Project Structure

ims-connect/

│

├── ims-connect-app/                  # React client-side application

└── ims-connect-server-app/           # Node.js server-side application

### Setting up the Server (Node.js)

- **Navigate to the server folder**:
  ```bash
  cd ims-connect-server-app

- **Install server dependencies**:
   ```bash
   npm install

- **Run the server**:
  ```bash
  node server.js

- **Alternatively, you can use nodemon to automatically restart the server on changes**:
  ```bash
  npx nodemon server.js

### Setting up the Client (React)
- **Navigate to the client folder**:
  ```bash
  cd ../ims-connect-app

- **Install client dependencies**:
  ```bash
  npm install

- **Start the client application: Run the React application**:
  ```bash
  npm start

- **The client will be available at**:
   ```bash
   http://localhost:3000

### User Roles and Authentication In the IMS Connect application, there are three roles: 
* **User**
* **Manager**
* **Admin**

Each user role has specific permissions within the application.
Below are the login credentials for each role:
  #### Predefined Users:
1. **User**:
  * **Username**: `jenya`
  * **Password**: `jenya1`
2. **Manager**:
  * **Username**: `manager`
  * **Password**: `manager1`
3. **Admin**:
  * **Username**: `admin`
  * **Password**: `admin1`
#### User Registration:
* When you visit the **Signup** page, you can register a new user. By default, all newly registered users will have the role of **User**.
* After registering, you can use the newly created **username** and **password** to log into the system.

These login credentials will give you access to the application based on the assigned role, and the system will show you different views and permissions depending on whether you are a **User**, **Manager**, or **Admin**.

