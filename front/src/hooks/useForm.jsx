import React from 'react';
import { useState } from 'react';

const useForm = (form, validation) => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState(form);

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

    const isSubmitting = () => {
        setErrors(validation(values));
        console.log(values, errors)
        if (Object.keys(errors).length === 0) {
            return true;
        }
        return false;
    };

    return { 
        handleChange,
        handleSelectChange, 
        isSubmitting,
        values: form, 
        errors 
    };
};

export default useForm;