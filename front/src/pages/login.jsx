import React from 'react';
import AuthContext from '../context/authContext';
import { useState, useContext } from 'react';
import { BASE_URL } from '../services/config'
import styles from '../style/form.module.css';

const Login = () => {

    const user = useContext(AuthContext)
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${BASE_URL}user/login.php`, {
            method: 'POST',
            body: JSON.stringify(form),
        })
            .then((response) => response.json())
            .then((auth) => {
                if (auth.status == 1){
                    user.login(auth.data)
                    window.location.href = "/"
            }
        })
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button onClick={handleSubmit}>Login</button>
            </form>
            <div>
                <span>
                    Pas encore inscrit ?
                    <a href="/register">Inscription</a>
                </span>
            </div>
        </div>
    );
};

export default Login;