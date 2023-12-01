import React, { useEffect } from 'react';
import { useState } from 'react';

const useForm = (form, validation) => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState(form);
    const [valid, setValid] = useState(false);

    const handleChange = (event) => {
        console.log(values)
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSelectChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        setValid(validation(values));
    }, [values]);

    return { 
        handleChange,
        handleSelectChange, 
        values,
        valid, 
        errors 
    };
};

export default useForm;