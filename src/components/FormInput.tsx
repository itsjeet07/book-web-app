import React from 'react';

interface BookInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    customProp?: string;
}


const FormInput = React.forwardRef<HTMLInputElement, BookInputProps>((props, ref) => {
    return (
        <input {...props} ref={ref} placeholder="Title" />
    );
});

export default FormInput;
