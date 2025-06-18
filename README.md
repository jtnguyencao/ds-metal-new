# Chantier Planning Tool Node.js Backend

## Setup

1. Open a terminal in the `backend-node` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in this directory with the following content (edit as needed):
   ```env
   MONGO_URI=mongodb+srv://blenderit5:changeYourPasswordRene@cluster0.he8t5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   DB_NAME=chantier_planning
   COLLECTION_NAME=chantiers
   ```
4. Start the server:
   ```sh
   npm start
   ```

The backend will run on http://localhost:5000

## Endpoints
- `GET /api/chantiers` — List all chantiers
- `POST /api/chantiers` — Create a chantier

## Serving Frontend
Static files from `../frontend` are served automatically. Open your browser to http://localhost:5000 to use the app. 