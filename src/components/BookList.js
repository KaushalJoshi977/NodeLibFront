import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';

const url = 'http://localhost:5000'
const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(url+'/getBooks')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(url + `/delete/${id}`)
      .then(() => {
        setBooks(books.filter(book => book._id !== id));
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };

  return (
    <div>
      <h1>Book List</h1>
      {books.map(book => (
        <Book key={book._id} book={book} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default BookList;
