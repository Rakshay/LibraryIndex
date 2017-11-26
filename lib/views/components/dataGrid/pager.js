'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Pager is a react based component that displays the current page (of a set of pages) information. It also provides an interface to navigate across pages
 *
 * @param {object} props The props of the component
 * @returns {ReactElement} The Pager react component
 */
const Pager = (props) => {
  let classNames = {
        prevNav: classnames('table-page-nav-btn', 'prev-page', {
          'active': props.currentPage > 1
        }),
        nextNav: classnames('table-page-nav-btn', 'next-page', {
          'active': props.currentPage < props.totalPages
        })
      },
      showPrevPage = () => {
        /* istanbul ignore else */
        if (props.currentPage > 1) {
          props.updateDataPage(props.currentPage - 1);
        }
      },
      showNextPage = () => {
        /* istanbul ignore else */
        if (props.currentPage < props.totalPages) {
          props.updateDataPage(props.currentPage + 1);
        }
      };

  return (
    <div className="table-data-pager">
      <div className="table-page-size-selector" />
      <div className="table-page-nav">
        <div className="table-page-indicator">
          <span className="table-page-summary" >{props.currentPage} of {props.totalPages}</span>
        </div>
        <div className="table-page-nav-actions">
          <i className={classNames.prevNav} onClick={showPrevPage} />
          <i className={classNames.nextNav} onClick={showNextPage} />
        </div>
      </div>
    </div>
  );
};

Pager.propTypes = {
  /**
   * The index of the currently displayed page. The index starts from 1. It is required to generate the page counts
   */
  currentPage: PropTypes.number,
  /**
   * The total page count
   */
  totalPages: PropTypes.number,
  /**
  * This property exposes the way for consuming components to be alerted for page navigation actions
  */
  updateDataPage: PropTypes.func
};

export default Pager;
