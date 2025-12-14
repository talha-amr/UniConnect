# UniConnect Backend

Secure and scalable backend for the UniConnect university complaint portal.

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Copy `.env.example` to `.env` and update the values:
    ```bash
    cp .env.example .env
    ```

3.  **Database**
    - Ensure MySQL is running.
    - Create a database named `uniconnect_db` (or whatever you set in `.env`).
    - The application uses Sequelize to sync models.

4.  **Run Server**
    - Development: `npm run dev`
    - Production: `npm start`

## API Documentation

See the implementation plan or code comments for route details.
