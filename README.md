## Evaluation CT by #CTDesarrallo #Funiber

Welcome candidate to our technical skills assessment project.

Carefully review the questions provided by your evaluator then try to solve them with this project and show us your best skills

I wish you good luck

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Installing and Running Laravel with Inertia and Vue 3

This guide outlines the steps to install and run a Laravel project with Inertia and Vue 3 on a new machine.

### Prerequisites:
- PHP 8.0 or later
- Composer
- Node.js and npm (or yarn)

### Instructions:

#### Clone the Project:
```{Bash}
git clone https://your-repository-url.git
cd your-project-directory
```

#### Install Dependencies:
```{Bash}
composer install
npm install (or yarn install)
```

##### Configure Database:
- Create a .env file in the project root if it doesn't exist.
- Copy .env.example to .env and update database credentials.

#### Generate Application Key:
```{Bash}
php artisan key:generate
```

#### Run Migrations:
```{Bash}
php artisan migrate
```

#### Build Vue Assets:
```{Bash}
npm run build (or yarn build)
```

#### Start Development Server:
```{Bash}
php artisan serve
```

#### Access the Application:

Open a web browser and go to http://localhost:8000.

### Additional Notes:
If you' re running this project with xampp, you have to follow this steps:

#### Find Response.php from inertijs dependency
- Go to vendor/inertiajs/inertia-laravel/src/Rsponse.php and change line 102 with this: 
```{php}
'url' => $request->getRequestUri()
```
- Create a Enviroment Variable with this:
```ASSET_URL="${APP_URL}/public"```

I hope this helps!