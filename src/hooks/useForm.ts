import React, {useState, useCallback} from 'react';

interface UseFormInput{
    [key: string]: string | number | boolean;
}

export const useForm = <T extends UseFormInput>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
        if(errors[name as keyof T]){
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    },
    [errors]
    );

    const setFieldValue = useCallback((field: keyof T, value: T[keyof T]) => {
        setValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    },
    []
    );

    const setFieldError = useCallback((field: keyof T, error: T[keyof T]) => {
        setErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    },
    []
    );
    
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
    },
    [initialValues]
    );

    return {
        values,
        errors,
        handleChange,
        setFieldValue,
        setFieldError,
        resetForm,
    };
};