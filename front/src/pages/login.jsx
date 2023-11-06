import React from 'react';
import { useState } from 'react';
import BASE_URL from '../services/config'

const Login = () => {

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
        console.log(form);
        fetch(`${BASE_URL}user/login.php`, {
            method: 'POST',
            body: JSON.stringify(form),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
        })
    };

    return (
        <form>
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
                Password:
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
            </label>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default Login;