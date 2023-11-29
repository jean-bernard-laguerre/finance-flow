import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../services/config';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';
import styles from '../../style/form.module.css';
import TransactionContext from '../../context/transactionContext';

const TransactionForm = (props) => {

    const user = useContext(AuthContext)
    const settings = useContext(TransactionContext)
    const [form, setForm] = useState({
        title: '',
        description: '',
        amount: '',
        date: '',
        place: '',
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
                props.getTransactions()
                props.closeModal(false)
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="number"
                    name="amount"
                    step={0.01}
                    min={0}
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="Date"
                />
                <input
                    type="text"
                    name="place"
                    value={form.place}
                    onChange={handleChange}
                    placeholder="Place"
                />
                <select
                    name="category"
                    onChange={handleSelectChange}
                >
                    {settings.categories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                <select
                    name="subCategory"
                    onChange={handleSelectChange}
                >
                    {settings.subCategories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>


                <button onClick={handleSubmit}>Add</button>
            </form>
        </div>
    )
};

export default TransactionForm;