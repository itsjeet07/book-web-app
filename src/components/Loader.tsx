import React from 'react';
import styles from '@/styles/loader.module.scss';

interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = (({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className={styles.loading_container}><p>Loading...</p></div>
    );
});

export default Loader;
