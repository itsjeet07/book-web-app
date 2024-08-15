import React from 'react';

interface BookTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    customProp?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, BookTextareaProps>((props, ref) => {
    return (
        <textarea className='book-textarea' ref={ref} {...props} />
    );
});

export default FormTextarea;
