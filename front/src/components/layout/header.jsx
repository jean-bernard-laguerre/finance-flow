import React, {useState} from 'react';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext';
import styles from '../../style/header.module.css';
import Drawer from './header/drawer';

const Header = () => {

    const user = useContext(AuthContext)
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <span>
                    {
                        user.currentUser ?
                        `${user.currentUser.username}`
                        :
                        'No user logged in'
                    }
                </span>
                <menu className={styles.menu}>
                    <li>
                        <button
                            className={styles.button}
                            onClick={() => window.location.href='/'}
                        >
                            Home
                        </button>
                    </li>
                    {
                        user.currentUser ?
                        <>
                            <li>
                                <button
                                    className={styles.button}
                                    onClick={() => window.location.href='/transactions'}
                                >
                                    Transactions
                                </button>
                            </li>
                            <li>
                                <button
                                    className={styles.button}
                                    onClick={user.logout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>

                        :
                        <>
                            <li>
                                <button
                                    className={styles.button}
                                    onClick={() => window.location.href='/register'}
                                >
                                    Register
                                </button>    
                            </li>
                            <li>
                                <button
                                    className={styles.button}
                                    onClick={() => window.location.href='/login'}
                                >
                                    Login
                                </button>
                            </li>
                        </>
                    }
                </menu>
            </nav>
            {/* responsive drawer header */}
            <Drawer 
                user={user}
            />
        </header>
    );
};

export default Header;