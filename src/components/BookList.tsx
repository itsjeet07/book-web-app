import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Book } from '@/types/Book';
import BookItem from '@/components/BookItem';
import styles from '@/styles/bookList.module.scss';

interface BookListProps {
    books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page');
    const [currentPage, setCurrentPage] = useState<number>(page ? +page : 1);
    const booksPerPage = 5;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const nextPage = () => setCurrentPage(prev => prev + 1);
    const prevPage = () => setCurrentPage(prev => prev - 1);

    useEffect(() => {
        setSearchParams({ page: JSON.stringify(currentPage) });
    }, [currentPage, setSearchParams]);

    return (
        <div>
            <div className={styles.list_header}>
                <Link className={styles.btn} to="/books/new">Add New Book</Link>
            </div>
            <div className={styles.book_list}>
                {currentBooks.map(book => (
                    <div key={book.id}>
                        <BookItem book={book} />
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <button className={styles.btn} onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <button className={styles.btn} onClick={nextPage} disabled={indexOfLastBook >= books.length}>Next</button>
            </div>
        </div>
    );
};

export default BookList;
