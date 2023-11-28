import React from 'react';
import { useState } from 'react';

const Modal = ({ children, title, openModal, setOpenModal }) => {

    const [open, setOpen] = useState(openModal);

    const handleClose = () => {
        setOpen(false);
        setOpenModal(false);
    };

    return (
        <>
            {open &&
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{title}</h2>
                            <span className="close" onClick={handleClose}>&times;</span>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Modal;