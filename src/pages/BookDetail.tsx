import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '@/types/Book';
import styles from '@/styles/bookDetail.module.scss';
import { toast } from 'react-toastify';
import ImageContainer from '@/components/ImageContainer';

interface BookDetailProps {
    books: Book[];
    deleteBook: (id: number) => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ books, deleteBook }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const book = id ? books.find(b => +b.id === parseInt(id)) : undefined;

    if (!book) return <p>Book not found</p>;

    const handleDelete = () => {
        deleteBook(book.id);
        toast.success("Book deleted!", { autoClose: 3000 });
        navigate('/books');
    };

    const handleEdit = () => {
        navigate('/books/edit/' + book.id);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.book_detail}>
            <ImageContainer src={book.cover} alt={book.title} className='detail-Img' />
            <h2>{book.title}</h2>
            <h4>{book.author}</h4>
            <p>{book.description}</p>
            <p>{new Date(book.publicationDate).toLocaleDateString()}</p>

            <div>
                {book.newBook && <button className={styles.btn} onClick={handleEdit}>Edit</button>}
                {book.newBook && <button className={styles.btn} onClick={handleDelete}>Delete</button>}
                <button className={styles.btn} onClick={handleBack}>Back</button>
            </div>
        </div>
    );
};

export default BookDetail;
