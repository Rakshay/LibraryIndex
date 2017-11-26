'use strict';

import axios from 'axios';
import parser from 'xml2json';

/**
 * Returns the list of ToDos
 *
 * @export
 * @param {string} bookTitle The book title to search for
 * @param {string} pageIndex The page of data to fetch
 * @returns {Promise} Promise object that returns all books that match the query
 */
export function getBooks (bookTitle, pageIndex) {
  return new Promise((resolve, reject) => {
    axios({
      url: 'https://www.goodreads.com/search.xml?key=4kxKjdaFlijmQIix5XlElA&q=Ender%27s+Game',
      params: {
        key: '4kxKjdaFlijmQIix5XlElA',
        q: bookTitle,
        page: pageIndex
      },
      responseType: 'text'
    })
      .then((response) => {
        let JSONResponse = JSON.parse(parser.toJson(response.data)),
            startIndex = JSONResponse.GoodreadsResponse.search['results-start'],
            endIndex = JSONResponse.GoodreadsResponse.search['results-end'],
            totalResults = JSONResponse.GoodreadsResponse.search['total-results'],
            totalPages,
            currentPage;

        startIndex = (isNaN(startIndex) === false) ? parseInt(startIndex, 10) : startIndex;
        endIndex = (isNaN(endIndex) === false) ? parseInt(endIndex, 10) : endIndex;
        totalResults = (isNaN(totalResults) === false) ? parseInt(totalResults, 10) : totalResults;
        totalPages = Math.ceil(totalResults / 20),
        currentPage = Math.ceil(startIndex / 20);

        resolve({
          startIndex,
          endIndex,
          totalResults,
          currentPage,
          totalPages,
          books: JSONResponse.GoodreadsResponse.search.results.work.map((item) => {
            return {
              id: item.best_book.id['$t'],
              title: item.best_book.title,
              author: item.best_book.author.name,
              images: {
                small: item.best_book.small_image_url,
                regular: item.best_book.image_url
              }
            };
          })
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
