import React, { useContext, useReducer } from 'react';
import { useState, useEffect } from 'react';
import styles from '../../style/transaction.module.css';
import TransactionContext from '../../context/transactionContext';
import { BASE_URL } from '../../services/config';
import TransactionHeader from './transactionHeader';
import transacTools from '../../services/functions';
import usePagination from '../../hooks/usePagination';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FILTER_TRANSACTIONS':
            return {
                ...state,
                transactions: transacTools.filter(action.payload.transactions, action.payload.filters)
            }
        case 'SORT_TRANSACTIONS':
            return {
                ...state,
                transactions: transacTools.sort(state.transactions, action.payload.sort.key, action.payload.sort.order)
            }
        case 'REFRESH_TRANSACTIONS':
            return {
                ...state,
                transactions: action.payload.transactions
            }
        default:
            return state
    }
}

const columns = [
    {key: 'title', label: 'Title', sortable: true, hide: true},
    {key: 'amount', label: 'Amount', sortable: true, hide: false},
    {key: 'description', label: 'Description', sortable: false, hide: true},
    {key: 'place', label: 'Place', sortable: false, hide: true},
    {key: 'category_name', label: 'Category', sortable: true, hide: false},
    {key: 'subcategory_name', label: 'Sub Category', sortable: true, hide: true},
    {key: 'transaction_date', label: 'Date', sortable: true, hide: false},
]

const TransactionList = ({ getTransactions }) => {

    const values = useContext(TransactionContext)
    
    const [balance, setBalance] = useState(transacTools.getBalance(values.transactions))
    const [responsive, setResponsive] = useState(false)
    const [state, dispatch] = useReducer(reducer, {
        transactions: values.transactions
    })
    const [filter, setFilter] = useState({
        category: '0',
        subCategory: '0'
    })
    const [sort, setSort] = useState({
        key: '',
        order: 'desc'
    })
    const pagination = usePagination(state.transactions, 10)

    const filterTransactions = (filters) => {
        dispatch({ type: 'FILTER_TRANSACTIONS', payload: {
            transactions: values.transactions,
            filters: filters
        } }
    )}

    const deleteTransaction = (id) => {
        fetch(`${BASE_URL}transaction/deleteTransaction.php/?id=${id}`)
            .then((response) => response.json())
            .then(getTransactions)
    }

    useEffect(() => {
        setBalance(transacTools.getBalance(values.transactions))
        
        dispatch({ type: 'REFRESH_TRANSACTIONS', payload: {
            transactions: values.transactions
        } })
        dispatch({ type: 'FILTER_TRANSACTIONS', payload: {
            transactions: values.transactions,
            filters: filter
        } })
        if(sort.key !== ''){
            dispatch({ type: 'SORT_TRANSACTIONS', payload: {
                sort: sort
            } })
        }

    }, [values])

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 800
                ? setResponsive(true)
                : setResponsive(false);
        };
        setResponsiveness();
        window.addEventListener('resize', () => setResponsiveness());
        return () => {
            window.removeEventListener('resize', () => setResponsiveness());
        };
    }, [responsive])
    
    return (
        <>
            <TransactionHeader
                filterTransactions={filterTransactions}
                setFilter={setFilter}
                filter={filter}
            />
            <div>
                <table className={styles.table}>
                    <thead className={styles.table_head}>
                        <tr>
                            {
                                columns.map((column) => {
                                    return (
                                        <th key={column.key}
                                            className={column.hide && responsive ? 'hidden' : ''}
                                        >
                                            {column.sortable ? (
                                                <button
                                                    className={styles.sort_button}
                                                    onClick={() => {
                                                    setSort({key: column.key, order: sort.order === 'asc' ? 'desc' : 'asc'})
                                                    dispatch({ type: 'SORT_TRANSACTIONS', payload: {
                                                        sort: sort
                                                    } })
                                                }}>
                                                    {column.label} &nbsp;
                                                    {sort.key === column.key ? (
                                                        sort.order === 'asc' ? '▲' : '▼'
                                                    ): ''}
                                                </button>
                                            )
                                            : 
                                            <>{column.label}</>}
                                        </th>
                                    )
                                })
                            }
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagination.currentData().map((transaction) => {
                                return (
                                    <tr key={transaction.id}>
                                        {
                                            columns.map((column) => {
                                                return (
                                                    <td key={column.key}
                                                        className={column.hide && responsive ? 'hidden' : ''}
                                                    >
                                                        {transaction[column.key]}{column.key == 'amount' && " €"}
                                                    </td>
                                                )
                                            })
                                        }
                                        <td>
                                            <button onClick={() => {
                                                window.confirm(`Are you sure you want to delete ${transaction.title} ?`) &&
                                                deleteTransaction(transaction.id)}
                                            }>X</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className={styles.table_head}>Balance:</td>
                            <td className={styles.balance}>{balance} €</td>
                            <td className={styles.paginate}
                                colSpan={columns.length - 2}
                            >
                                <button
                                    disabled={(pagination.currentPage === 1)}
                                    onClick={pagination.prev}
                                >{"<-"}</button>
                                <select
                                    value={pagination.currentPage}
                                    onChange={(e) => pagination.jump(e.target.value)}
                                >
                                    {
                                        [...Array(pagination.maxPage)].map((page, index) => (
                                            <option key={index} value={index + 1}>{index + 1}</option>
                                        ))
                                    }
                                </select>
                                <button
                                    disabled={(pagination.currentPage === pagination.maxPage)}
                                    onClick={pagination.next}
                                >{"->"}</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
};

export default TransactionList;