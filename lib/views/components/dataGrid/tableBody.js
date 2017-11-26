'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './tableRow';

/**
 * TableBody is a react based component that displays the data sent to it in a tabular format
 *
 * @param {object} props The props of the component
 * @returns {ReactElement} The TableBody react component
 */
const TableBody = (props) => {
  return (
    <tbody>
      {
        ((data, dataModel, noDataMessage) => {
          if (data.length > 0) {
            return data.map((datum, index) => {
              return <TableRow key={index} dataModel={dataModel} datum={datum} onRowClick={props.onRowClick} />;
            });
          } else {
            return (
              <tr className="table-row no-data-message">
                <td colSpan={Object.keys(dataModel).length}>{noDataMessage}</td>
              </tr>
            );
          }
        })(props.data, props.dataModel, props.noDataMessage)
      }
    </tbody>
  );
};

TableBody.propTypes = {
  /**
   * The data to be rendered in the table.
   */
  data: PropTypes.array,
  /**
  * This describes the data being displayed. It is an array of objects. Each object providing the following options/config; <br /><br />title - *The name to be used as a aheader title* <br />column - *The column name/property name in the data object this header associates with* <br />order - *The order in whcih this column should appear* <br />isSortable - *Is the data sortable by this column* <br/>cellRender - **
  */
  dataModel: PropTypes.object,
  /**
   * This is the no data message that should be rendered in case no data is present to be displayed
   */
  noDataMessage: PropTypes.node,
  /**
   * The callback action to be triggered when any of rows are clicked
   */
  onRowClick: PropTypes.func
};

export default TableBody;
