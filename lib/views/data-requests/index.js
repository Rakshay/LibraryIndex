import axios from 'axios';

/**
 * Retrieves all active toDo items
 *
 * @export
 * @param {string} bookTitle The book title to search for
 * @param {number} pageIndex The page of data to fetch
 * @returns {Promise} Promise object that returns all toDo Items that are active
 */
export function getBooks (bookTitle, pageIndex) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/books',
      method: 'get',
      params: {
        bookTitle,
        pageIndex
      }
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
