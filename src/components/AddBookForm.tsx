import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '@/types/Book';
import '@/styles/bookForm.scss'
import { toast } from 'react-toastify';
import FormInput from '@/components/FormInput';
import FormTextarea from '@/components/FormTextArea';
import FormButton from '@/components/FormButton';

interface AddBookFormProps {
    books?: Book[];
    updateBook: (book: Book) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ updateBook, books }) => {
    const { register, handleSubmit, reset } = useForm<Book>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const onSubmit = useCallback((data: Book) => {
        data.id = id ? +id : Date.now();
        const msg = id ? "Book Updated!" : "Book Added!";
        if (!id) {
            data.newBook = true;
        }
        updateBook(data);
        reset();
        toast.success(msg, { autoClose: 3000 });
        navigate(-1);
    }, [updateBook, id, navigate, reset]);

    useEffect(() => {
        if (id && books) {
            const bookData = books.find(b => +b.id === parseInt(id));
            if (bookData) {
                reset({ ...bookData });
            }
        }
    }, [books, id, reset]);

    const handleBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const renderInput = (name: keyof Book, placeholder: string, type: string = "text") => (
        <FormInput {...register(name as keyof Book, { required: true })} placeholder={placeholder} type={type} />
    );

    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            {renderInput('title', 'Title')}
            {renderInput('author', 'Author')}
            {renderInput('cover', 'Cover URL')}
            <FormTextarea {...register('description', { required: true })} placeholder="Description" />
            {renderInput('publicationDate', 'Publication Date', 'date')}

            <FormButton className='btn-submit' type="submit">{id ? "Edit" : "Add"} Book</FormButton>
            <FormButton type='button' onClick={handleBack}>Cancel</FormButton>
        </form>
    );
};

export default AddBookForm;
