'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * TableRow is a react based component that displays the data sent to it in a tabular row format
 *
 * @param {object} props The props of the component
 * @returns {ReactElement} The TableRow react component
 */
const TableRow = (props) => {
  let columns = [],
      datumModel,
      content,
      key,
      className = classnames('table-row', {
        'clickable': typeof props.onRowClick === 'function'
      }),
      /* istanbul ignore next */
      onRowClick = () => {
        if (typeof props.onRowClick === 'function') {
          props.onRowClick(props.datum);
        }
      };

  for (let col in props.datum) {
    datumModel = props.dataModel[col];

    if (datumModel !== undefined) {
      key = (columns.length + 1);

      if (typeof datumModel.cellRender === 'function') {
        content = datumModel.cellRender(props.datum[col], key);
      } else {
        content = <td className="table-cell" key={key}>{props.datum[col]}</td>;
      }

      columns.push({
        content: content,
        order: datumModel.order
      });
    }
  }

  columns.sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <tr className={className} onClick={onRowClick}>
      {
        columns.map((column) => {
          return column.content;
        })
      }
    </tr>
  );
};

TableRow.propTypes = {
  datum: PropTypes.object,
  /**
   * This describes the data being displayed. It is an objects providing the following options/config; <br /><br />title - *The name to be used as a aheader title* <br />column - *The column name/property name in the data object this header associates with* <br />order - *The order in whcih this column should appear* <br />isSortable - *Is the data sortable by this column* <br/>cellRender - **
   */
  dataModel: PropTypes.object,
  /**
  * The callback action to be triggered when any of rows are clicked
  */
  onRowClick: PropTypes.func
};

export default TableRow;
