# UniConnect Setup Guide for Collaborators

Follow these steps to get the project running on your machine.

## Prerequisites
- **Node.js**: [Download here](https://nodejs.org/)
- **MySQL Server**: [Download here](https://dev.mysql.com/downloads/installer/)

## 1. Clone the Repository
Clone the repository and switch to the correct branch:
```bash
git clone https://github.com/talha-amr/UniConnect.git
cd UniConnect
git checkout frontend
```

## 2. Install Dependencies
You need to install dependencies for both the main project (frontend) and the backend.

**Root (Frontend):**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

## 3. Configure Database
1.  Ensure your **MySQL Server** is running.
2.  Go to the `backend` folder.
3.  Copy `.env.example` to a new file named `.env`.
    ```bash
    cd backend
    cp .env.example .env
    # On Windows specific terminals if cp doesn't work, just manually copy and rename it.
    ```
4.  oOpen `.env` and update the database credentials to match your local MySQL setup:
    ```ini
    DB_USER=root            # Your MySQL username
    DB_PASSWORD=your_password  # Your MySQL password
    ```

## 4. Initialize Database
Run these commands inside the `backend` folder to create the database and add sample data:

```bash
# Still inside the 'backend' folder
node create_db.js
npm run seed
```

## 5. Run the Application
Simply run this command from the **root** folder:
```bash
npm run dev
```
This will automatically start both the Backend (port 5000) and Frontend (port 5173).

Troubleshooting:
*   **Database Error?** Check if MySQL service is running and your `.env` username/password are correct.
*   **White Screen?** Check the console (F12) for errors. Ensure the backend is running on port 5000.
