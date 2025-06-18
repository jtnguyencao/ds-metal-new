# Chantier Planning Tool Node.js Backend
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (LTS) via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

### Setup

# Set Up Nginx Reverse Proxy with SSL

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```
## Create Nginx config

```bash
sudo nano /etc/nginx/sites-available/dsmetal
```

```bash
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5050;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/dsmetal /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```
## Get SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com
```

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