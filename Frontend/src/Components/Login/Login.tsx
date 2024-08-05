import React, { useEffect, useState } from 'react'
import { ICredentials } from '../../utils/Interfaces/ICredentials'
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from '../../Redux/store'
import { loginUserByCredentials } from '../../Redux/actions/AuthActions'
import { useSelector } from 'react-redux'

export default function Login() {
    const dispatch = useAppDispatch()
    const [credentials, setCredentials] = useState<ICredentials>({
        password: "",
        email: ""
    })

    const navigate = useNavigate()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/todos")
        }
    }, [dispatch, isAuthenticated])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        dispatch(loginUserByCredentials(credentials))
    }
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>, inputName: "email" | "password") {
        const value = e.target.value
        if (value.length <= 50)
            setCredentials({
                ...credentials,
                [inputName]: value
            })
    }
    return (
        <div className={style.container}>
            <main className={style.main}>
                <form onSubmit={handleSubmit} className={style.formContainer} aria-label="Login Form">
                    <h2 className={style.heading}>Login</h2>

                    <div className={style.formGroup}>
                        <label htmlFor="email" className={style.label}>email:</label>
                        <input
                            id="email"
                            type="text"
                            className={style.input}
                            value={credentials.email}
                            onChange={(e) => handleOnChange(e, "email")}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="password" className={style.label}>password:</label>
                        <input
                            id="password"
                            type="password"
                            className={style.input}
                            value={credentials.password}
                            onChange={(e) => handleOnChange(e, "password")}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <div className={style.actions}>
                        <button type="submit" id="btnLogin" className={style.button}>Login</button>
                        <Link to="/Register" className={style.link}>
                            <button type="button" id="btnRegister" className={`${style.button} ${style.secondaryButton}`}>Create Account</button>
                        </Link>

                    </div>
                </form>
            </main>
        </div>
    )
}