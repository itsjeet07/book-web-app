import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/types/Book';
import { useFavorites } from '@/hooks/useFavorites';
import styles from '@/styles/bookItem.module.scss';
import { toast } from 'react-toastify';
import ImageContainer from '@/components/ImageContainer';

interface BookItemProps {
    book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.includes(book.id);

    const togleFavoriteHandle = () => {
        toggleFavorite(book.id);
        const msg = isFavorite ? "Removed from favourites" : "Added to favourites";
        toast.info(msg, { autoClose: 3000 });
    }

    return (
        <div className={styles.book_item}>
            <ImageContainer src={book.cover} alt={book.title} />
            <Link to={`/books/${book.id}`}>
                <h3>{book.title}</h3>
            </Link>
            <p className={styles.author}>{book.author}</p>
            <p>{book.description}</p>
            <p>{new Date(book.publicationDate).toLocaleDateString()}</p>
            <button onClick={togleFavoriteHandle}>
                {isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
    );
};

export default BookItem;
