import React, { useState } from 'react';
import style from './Register.module.css';
import { IUser } from '../../utils/Interfaces/IUser';
import { Link } from 'react-router-dom';
import APIService from '../../utils/Class/API';

export default function Register() {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string>("")
    const [user, setUser] = useState<IUser>({
        id: 0,
        name: "",
        email: "",
        password: ""
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        let error = ""
        if (!validateEmail(user.email)) {
            error = "Please enter a valid email address.";
        }

        if (user.password.length < 6) {
            error = "Password must be at least 6 characters long.";
        }

        if (user.name.length < 6) {
            error = "Name must be at least 6 characters long.";
        }

        if (error) {
            setError(error)
        } else {
            const created = await APIService.CreateUser(user)
            if (created.ok) {
                setSuccess(true)
            } else {
                setError(created.error!)
            }
        }
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>, inputName: "name" | "email" | "password") {
        const value = e.target.value;
        if (value.length <= 50) { // Ajusta el límite si es necesario
            setUser({
                ...user,
                [inputName]: value
            });
        }
        setError("")
    }

    return (
        <div className={style.container}>
            <main className={style.main}>
                <form onSubmit={handleSubmit} className={style.formContainer} aria-label="Register Form">
                    <h2 className={style.heading}>Register</h2>

                    <div className={style.formGroup}>
                        <label htmlFor="name" className={style.label}>Name:</label>
                        <input
                            id="name"
                            type="text"
                            className={style.input}
                            value={user.name}
                            onChange={(e) => handleOnChange(e, "name")}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="email" className={style.label}>Email:</label>
                        <input
                            id="email"
                            type="email"
                            className={style.input}
                            value={user.email}
                            onChange={(e) => handleOnChange(e, "email")}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="password" className={style.label}>Password:</label>
                        <input
                            id="password"
                            type="password"
                            className={style.input}
                            value={user.password}
                            onChange={(e) => handleOnChange(e, "password")}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    {error ?
                        <span>{error}</span>
                        : <></>
                    }

                    <div className={style.actions}>
                        {success ?
                            <Link to="/" className={style.button}>
                                <button type="submit" className={style.button}>Login</button>
                            </Link>
                            : <button type="submit" className={style.button}>Register</button>
                        }
                        <Link to="/" className={style.link}>Already have an account? Login</Link>
                    </div>
                </form>
            </main>
        </div>
    );
}
