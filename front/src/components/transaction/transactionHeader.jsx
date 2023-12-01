import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import styles from '../../style/transaction.module.css';
import TransactionContext from '../../context/transactionContext';

const TransactionHeader = (props) => {

    const settings = useContext(TransactionContext)
    const [filter, setFilter] = useState(props.filter);

    const handleSelectChange = (event) => {
        props.setFilter({
            ...props.filter,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <div className={styles.header}>
            <span>
                <strong>{
                    filter.category === "0" ?
                        'All' :
                        settings.categories.filter(category => category.id === filter.category)[0].name
                    } {

                    filter.subCategory === "0" ?
                        '' :
                        "/ "+settings.subCategories.filter(subCategory => subCategory.id === filter.subCategory)[0].name
                    }
                </strong>
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
                    title='Filter transactions'
                    onClick={(event) => {
                        event.preventDefault();
                        props.filterTransactions(props.filter);
                        setFilter(props.filter);
                    }}
                >
                    Filter
                </button>
            </form>
        </div>
    )
};

export default TransactionHeader;