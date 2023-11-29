import React from 'react';
import { useState } from 'react';
import styles from '../../style/modal.module.css';

const Modal = ({ children, title, openModal, setOpenModal }) => {

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <>
            {openModal &&
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h2>{title}</h2>
                            <span className={styles.close} onClick={handleClose}>&times;</span>
                        </div>
                        <div className={styles.body}>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Modal;