import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import styles from '../../style/transaction.module.css';
import TransactionContext from '../../context/transactionContext';

const TransactionHeader = (props) => {

    const settings = useContext(TransactionContext)

    const handleSelectChange = (event) => {
        props.setFilter({
            ...props.filter,
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
                    <option value={0}>All</option>
                    {settings.subCategories.map((subCategory) => {
                        return (
                            <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                        )
                    })}
                </select>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        props.filterTransactions(props.filter);
                    }}
                >
                    Filter
                </button>
            </form>
        </div>
    )
};

export default TransactionHeader;