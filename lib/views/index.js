/*global location*/

'use strict';

import React from 'react';
import * as dataRequests from './data-requests';
import DataGrid from './components/dataGrid';
import SearchBox from './components/searchBox';

const fetchBooks = (bookTitle, pageIndex) => {
  return new Promise((resolve, reject) => {
    dataRequests.getBooks(bookTitle, pageIndex)
      .then((list) => {
        resolve(list);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const dataModels = [{
  title: 'Book Cover',
  column: 'images',
  order: 0,
  isSortable: false,
  /* eslint-disable react/display-name */
  cellRender: (data, key) => {
    return (
      <td key={key} className="table-cell">
        <img src={data.small} />
      </td>
    );
  }
  /* eslint-enable react/display-name */
}, {
  title: 'Title',
  column: 'title',
  order: 1,
  isSortable: false
}, {
  title: 'Author',
  column: 'author',
  order: 2,
  isSortable: false
}];

/**
 * This react component provides the layout of the application and hosts
 * @class
 */
class GoodReadsApp extends React.Component {
  /* istanbul ignore next */
  /**
   * Creates an instance of GoodReadsApp.
   * @memberof GoodReadsApp
   */
  constructor () {
    super();
    this.state = {
      searchText: '',
      books: [],
      data: [],
      currentPage: 0,
      startIndex: 0,
      endIndex: 0,
      totalResults: 0
    };
    this.fetchPageData = (pageIndex) => this._fetchPageData(pageIndex);
    this.updateSearchQuery = (searchText) => this._updateSearchQuery(searchText);
  }

  /**
   * Fetches appropriate page data
   *
   * @param {number} pageIndex The page number of the data to be fetched
   * @returns {undefined}
   * @memberof GoodReadsApp
   */
  _fetchPageData (pageIndex) {
    return new Promise ((resolve, reject) => {
      this.setState({
        isLoading: true
      }, () => {
        fetchBooks(this.state.searchText, pageIndex)
          .then((data) => {
            this.setState({
              ...data,
              isLoading: false
            });
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  /**
   * Redirects the user to the GoodReads web app for the book which the user clicked on, in the grid
   *
   * @param {object} book The book whose details the user wished to see
   * @returns {undefined}
   * @memberof GoodReadsApp
   */
  rowClick (book) {
    /* istanbul ignore next */
    window.location = `https://www.goodreads.com/book/show/${book.id}`;
  }

  /**
   * Sets the Book title to query and updates the book list
   *
   * @param {string} searchText The book title to search GoodReads with
   * @returns {undefined}
   * @memberof GoodReadsApp
   */
  _updateSearchQuery (searchText) {
    /* istanbul ignore else */
    if (searchText !== this.state.searchText) {
      this.setState({
        searchText,
        currentPage: 0,
        isLoading: true
      }, () => {
        fetchBooks(this.state.searchText, this.state.currentPage + 1)
          .then((data) => {
            this.setState({
              ...data,
              isLoading: false
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }

  /* eslint-disable require-jsdoc */
  render () {
    return (
      <div className="app">
        <div className="toolbar">
          <SearchBox onSearch={this.updateSearchQuery} />
          <div className="goodreads-acknowledgement">
            <span>All data fetched from </span>
            <img src="https://s.gr-assets.com/assets/doodle/choice_awards_2017/desktop_gr_logo.png" />
          </div>
        </div>
        <DataGrid
          isLoading={this.state.isLoading}
          pageSize={20}
          dataModels={dataModels}
          data={this.state.books}
          startIndex={this.state.startIndex}
          endIndex={this.state.endIndex}
          totalRowsCount={this.state.totalResults}
          currentPage={this.state.currentPage}
          getPageData={this.fetchPageData}
          onRowClick={this.rowClick} />
      </div>
    );
  }
}

GoodReadsApp.displayName = 'GoodReadsApp';

export default GoodReadsApp;
