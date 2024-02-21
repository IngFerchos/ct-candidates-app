## Evaluation CT Todo List by Joan Gutierrez

A todo list application was created in this repository was developed with Laravel Framework v10, Vue.js 3 and Vuetify.

## Installing and Run Laravel project

### Requeriments

- PHP 8.0 or later
- Node JS and npm
- Composer

### Instructions
Run the following commands:

Install all packages for laravel and VueJS 3 project
```
composer install
npm install
```

Run the migrations and seeders
```
php artisan migrate --seed
```

#### For database and appliaction settings.

Copy .env.example file and rename like as .env

Generate a new application key:
```
php artisan key:generate
```

Build vue assets
```
npm run build
```

Run server
```
php artisan serve
```

Open a web browser and go to http://localhost:8000.
