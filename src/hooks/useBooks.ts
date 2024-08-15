import { useEffect, useState } from 'react';
import { Book } from '@/types/Book';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [localBooks, setLocalBooks] = useState<Book[]>(() => {
    const localBooks = localStorage.getItem('localBooks');
    return localBooks ? JSON.parse(localBooks) : [];
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://my-json-server.typicode.com/cutamar/mock/books');
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const updateLocal = (allLocalBooks: Book[]) => {
    localStorage.setItem('localBooks', JSON.stringify(allLocalBooks));
  }

  const addNewbook = (book: Book) => {
    const allLocalBooks = [book, ...localBooks];
    setLocalBooks(allLocalBooks);
    updateLocal(allLocalBooks);
  }

  const addBook = (book: Book) => addNewbook(book);
  const deleteBook = (id: number) => {
    const updatedBooks = localBooks.filter(book => book.id !== id);
    setLocalBooks(updatedBooks);
    updateLocal(updatedBooks);
  };
  const editBook = (updatedBook: Book) => {
    const allBooks = [...localBooks];
    const bookIndex = allBooks.findIndex(book => +book.id === +updatedBook.id);
    if (bookIndex !== -1) {
      allBooks[bookIndex] = updatedBook;
      setLocalBooks(allBooks);
      updateLocal(allBooks);
    } else {
      console.log('Book not found');
    }
  };

  const allBooks = [...books, ...localBooks];

  return { books: allBooks, loading, addBook, deleteBook, editBook };
};
