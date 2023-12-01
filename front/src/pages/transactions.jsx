import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import TransactionContext from '../context/transactionContext';
import { BASE_URL } from '../services/config'
import finances from '../services/functions';
import TransactionHeader from '../components/transaction/transactionHeader';
import TransactionForm from '../components/transaction/transactionForm';
import TransactionList from '../components/transaction/transactionList';
import styles from '../style/transaction.module.css';
import Modal from '../components/layout/modal';

const Transactions = () => {

    const user = useContext(AuthContext)

    const [transactions, setTransactions] = useState(null)
    const [categories, setCategories] = useState(null)
    const [subCategories, setSubCategories] = useState(null)
    const [open, setOpen] = useState(false)

    const transactionsValues = useMemo(() =>{
        return { transactions, categories, subCategories }
    }, [transactions, categories, subCategories])


    const getTransactions = () => {
        fetch(`${BASE_URL}transaction/getTransactions.php/?user_id=${user.currentUser.id}`)
            .then((response) => response.json())
            .then((content) => {
                setTransactions(content.data)
        })
    }

    const getCategories = () => {
        fetch(`${BASE_URL}categories/getCategories.php`)
            .then((response) => response.json())
            .then((data) => {
                
                setCategories(data.categories)
        })
    }

    const getSubCategories = () => {
        fetch(`${BASE_URL}categories/getSubCategories.php`)
            .then((response) => response.json())
            .then((data) => {
                setSubCategories(data.subCategories)
        })
    }

    useEffect(() => {
        if(user.currentUser){
            !transactions && getTransactions()
            !categories && getCategories()
            !subCategories && getSubCategories()
        }
    }, [transactions])

    return <section>
        {
            user.currentUser ?
            (
                <>
                    { (categories && subCategories && transactions) && (
                        <TransactionContext.Provider value={transactionsValues}>

                            <div className={styles.title}>
                                <h2>
                                    Transactions
                                    &nbsp;
                                </h2>
                                <button
                                    title='Add a transaction'
                                    onClick={() => setOpen(true)}>
                                    <div className="icon add"/>
                                    <span>Add</span>
                                </button>
                            </div>
                            <Modal
                                title="Add a transaction"
                                openModal={open}
                                setOpenModal={setOpen}
                            >
                                <TransactionForm
                                    getTransactions={getTransactions}
                                    closeModal={setOpen}
                                />
                            </Modal>
                            <TransactionList
                                getTransactions={getTransactions}
                            />
                        </TransactionContext.Provider >
                        )
                    }
                </>
            )
            :
            (
                <h1>Login to manage your finances</h1>
            )
        }
    </section>
};

export default Transactions;