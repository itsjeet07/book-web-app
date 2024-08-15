import React from 'react';

interface BookButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    customProp?: string;
}

const FormButton = React.forwardRef<HTMLButtonElement, BookButtonProps>(({ children, ...props }, ref) => {
    return (
        <button className='book-button' ref={ref} {...props}>
            {children}
        </button>
    );
});

export default FormButton;
