import { useState } from "react";

export function useForm(initialValues, onSubmit) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await onSubmit(values);
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return {
        values,
        changeHandler,
        submitHandler,
        resetForm, // Expose resetForm
    };
}
