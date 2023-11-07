import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../services/config';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';
import styles from '../../style/form.module.css';

const TransactionForm = () => {

    const user = useContext(AuthContext)
    const [form, setForm] = useState({
        title: '',
        description: '',
        amount: null,
        date: null,
        place: null,
        category: 1,
        subCategory: 1,
        user_id: user.currentUser.id
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSelectChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${BASE_URL}transaction/addTransaction.php`, {
            method: 'POST',
            body: JSON.stringify(form),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Place:
                    <input
                        type="text"
                        name="place"
                        value={form.place}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Category:
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleSelectChange}
                    >
                        <option value="1">Credit</option>
                        <option value="2">Debit</option>
                    </select>
                </label>
                <label>
                    SubCategory:
                    <select
                        name="subCategory"
                        value={form.subCategory}
                        onChange={handleSelectChange}
                    >
                        <option value="1">Salary</option>
                        <option value="2">Rent</option>
                        <option value="3">Food</option>
                        <option value="4">Transport</option>
                        <option value="5">Clothes</option>
                        <option value="6">Entertainment</option>
                        <option value="7">Health</option>
                    </select>
                </label>
                <button onClick={handleSubmit}>Add</button>
            </form>
        </div>
    )
};

export default TransactionForm;