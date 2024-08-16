# Backend (Laravel)
The backend is built with Laravel and uses Docker for containerization.
## Setup Instructions
1. Navigate to the backend directory:
```bash
    cd backend
```
2. Start the backend using Docker:
```bash
    docker-compose up
```
3. Install Composer Dependencies
```bash
    docker-compose exec laravel.test composer install
```
4. Run database migrations:
```bash
    docker-compose exec laravel.test php artisan migrate
```
# Frontend (React)
The frontend is developed using React with TypeScript
## Setup Instructions
1. Navigate to the frontend directory:
```bash
    cd Frontend
```

2. Install dependecies
```bash
    npm install
```
Configure the backend URL:

3. Configure the backend URL.
Check that the .env file in the frontend directory contains the correct backend URL:
```bash
    VITE_BACKEND_URL=http://localhost:80/api
```

4. Start the development server:
```bash
    npm run dev
```
