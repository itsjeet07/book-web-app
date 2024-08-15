import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Book } from '@/types/Book';
import BookItem from '@/components/BookItem';
import styles from '@/styles/bookList.module.scss';
import Pagination from '@/components/Pagination';

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
    
    useEffect(() => {
        setSearchParams({ page: JSON.stringify(currentPage) });
    }, [currentPage, setSearchParams]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
            <Pagination
                currentPage={currentPage}
                totalItems={books.length}
                itemsPerPage={booksPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BookList;
