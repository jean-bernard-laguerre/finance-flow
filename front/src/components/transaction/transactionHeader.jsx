import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../../style/transaction.module.css';

const TransactionHeader = (props) => {

    const [filter, setFilter] = useState({
        category: '0',
        subCategory: '0'
    })

    const handleSelectChange = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <div className={styles.header}>
            <span>
                Transactions
            </span>
            <form className={styles.filter} action="">
                <select
                    name="category"
                    onChange={handleSelectChange}
                >
                    <option value={0}>All</option>
                    {props.categories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                <select
                    name="subCategory"
                    onChange={handleSelectChange}
                >
                    <option value={0}>All</option>
                    {props.subCategories.map((subCategory) => {
                        return (
                            <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                        )
                    })}
                </select>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        props.filterTransactions(filter);
                    }}
                >
                    Filter
                </button>
            </form>
        </div>
    )
};

export default TransactionHeader;