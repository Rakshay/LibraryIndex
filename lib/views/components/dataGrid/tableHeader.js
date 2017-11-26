'use strict';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * TableHeader is a react based component that displays the table headers based on the data sent to it
 *
 * @param {object} props The props of the component
 * @returns {ReactElement} The TableHeader react component
 */
const TableHeader = (props) => {
  let headers = props.headers.sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <thead>
      <tr>
        {
          headers.map((header, index) => {
            return (
              <th key={index} data-column={header.column} className="table-header-cell">
                <span className="table-header-title">{header.title}</span>
              </th>
            );
          })
        }
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  /**
   * This describes the data being displayed. It is an array of objects. Each object providing the following options/config; <br /><br />title - *The name to be used as a aheader title* <br />column - *The column name/property name in the data object this header associates with* <br />order - *The order in whcih this column should appear* <br />isSortable - *Is the data sortable by this column* <br/>cellRender - **
   */
  headers: PropTypes.array
};

export default TableHeader;
