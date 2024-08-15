import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddBookForm from "@/pages/AddBookForm";
import BookDetail from "@/pages/BookDetail";
import BookList from "@/pages/BookList";
import { useBooks } from "@/hooks/useBooks";
import { Book } from '@/types/Book';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const { books, loading, addBook, editBook, deleteBook } = useBooks();

  const handleAddBook = useCallback((book: Book) => {
    addBook(book);
  }, [addBook]);

  const handleEditBook = useCallback((book: Book) => {
    editBook(book);
  }, [editBook]);

  const handleDeleteBook = useCallback((id: number) => {
    deleteBook(id);
  }, [deleteBook]);


  if (loading) return <div className="loading-container"><p>Loading...</p></div>;

  return (
    <Router>
      <div className="App">
        <h1>Book Web App</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookList books={books} />} />
          <Route path="/books/new" element={<AddBookForm updateBook={handleAddBook} />} />
          <Route path="/books/edit/:id" element={<AddBookForm books={books} updateBook={handleEditBook} />} />
          <Route
            path="/books/:id"
            element={<BookDetail books={books} deleteBook={handleDeleteBook} />}
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App
