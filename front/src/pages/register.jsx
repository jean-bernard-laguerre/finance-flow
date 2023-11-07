import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../services/config';
import styles from '../style/form.module.css';

const Register = () => {

    const [form, setForm] = useState({
        email: '',
        username: '',
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
        fetch(`${BASE_URL}user/register.php`, {
            method: 'POST',
            body: JSON.stringify(form),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 1){
                    window.location.href = "/login"
            }
        })
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </label>
                <button
                    type="submit"
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </form>
        </div>
    )
};

export default Register;