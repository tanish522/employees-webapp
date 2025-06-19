# employees-webapp

# Steps for running the project:

1. Clone the repository:
   git clone https://github.com/tanish522/employees-webapp.git


2. Install dependencies:
   - For the backend:
     cd backend
     npm install

   - For the frontend:
     cd frontend
     npm install


3. Create a `.env` file in the `backend` directory with the following content:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=employee_manager
    PORT=5000


4. Open MySQL CLI or phpMyAdmin. Run the following SQL to create the database and tables:

    Run the script.sql file in the root directory of the project.


5. Start the backend server:
   
    cd backend
    node server.js


6. Start the frontend server:

    cd frontend
    npm start

7. Open your browser and navigate to `http://localhost:3000` to view the application.