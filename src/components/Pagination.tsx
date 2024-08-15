import React from 'react';
import styles from '@/styles/pagination.module.scss';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    return (
        <div className={styles.pagination}>
            <button 
                className={styles.btn} 
                onClick={() => handlePageClick(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={page}
                        className={`${styles.page_number} ${currentPage === page ? styles.active : ''}`}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </button>
                );
            })}

            <button 
                className={styles.btn} 
                onClick={() => handlePageClick(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
