import React, { useEffect, useState } from 'react'
import { ICredentials } from '../../utils/Interfaces/ICredentials'
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from '../../Redux/store'
import { clearAuthError, loginUserByCredentials } from '../../Redux/actions/AuthActions'
import { useSelector } from 'react-redux'

export default function Login() {
    const dispatch = useAppDispatch()
    const [credentials, setCredentials] = useState<ICredentials>({
        password: "",
        email: ""
    })

    const navigate = useNavigate()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const authError = useSelector((state: RootState) => state.auth.error);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/todos")
        }
        setIsSubmitting(false)
    }, [dispatch, isAuthenticated])

    useEffect(() => {
        setIsSubmitting(false);
    }, [authError])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true);
        dispatch(loginUserByCredentials(credentials))
    }
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>, inputName: "email" | "password") {
        const value = e.target.value
        if (value.length <= 50)
            setCredentials({
                ...credentials,
                [inputName]: value
            })
        if (authError) {
            dispatch(clearAuthError())
        }
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className={style.actions}>
                        <button type="submit" id="btnLogin" disabled={isSubmitting} className={style.button}>Login</button>
                        <Link to="/Register" className={style.link}>
                            <button type="button" id="btnRegister" disabled={isSubmitting} className={`${style.button} ${style.secondaryButton}`}>Create Account</button>
                        </Link>
                    </div>
                    {authError && <div className={style.error}>{authError}</div>}
                </form>
            </main>
        </div>
    )
}