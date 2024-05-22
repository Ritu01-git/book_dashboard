import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api';
import './BookTable.css';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const loadBooks = async () => {
      const bookData = await fetchBooks('the lord of the rings', page, limit);
      setBooks(bookData);
    };
    loadBooks();
  }, [page, limit]);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    const sortedBooks = [...books].sort((a, b) => {
      const aValue = a[field] !== undefined ? a[field] : '';
      const bValue = b[field] !== undefined ? b[field] : '';
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setBooks(sortedBooks);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('author_name')}>Author Name</th>
            <th onClick={() => handleSort('first_publish_year')}>First Publish Year</th>
            <th onClick={() => handleSort('subject')}>Subject</th>
            <th onClick={() => handleSort('ratings_average')}>Ratings Average</th>
            <th onClick={() => handleSort('author_birth_date')}>Author Birth Date</th>
            <th onClick={() => handleSort('author_top_work')}>Author Top Work</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author_name.join(', ')}</td>
              <td>{book.first_publish_year}</td>
              <td>{book.subject.join(', ')}</td>
              <td>{book.ratings_average}</td>
              <td>{book.author_birth_date}</td>
              <td>{book.author_top_work}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default BookTable;
