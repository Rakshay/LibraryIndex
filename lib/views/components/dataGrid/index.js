'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Pager from './pager';

/**
 * Datagrid is a react based grid component. It generates a table view to display data provided you pass it the appropriate data model and data.
 */
class DataGrid extends React.Component {
  /* istanbul ignore next */
  /**
   * Creates an instance of DataGrid.
   * @param {object} props The Props of the DataGrid
   * @memberof DataGrid
   */
  constructor (props) {
    super(props);
    this.state = this.extractStateFromProps(props);
    this.updateDataPage = (pageIndex) => this._updateDataPage(pageIndex);
  }

  /**
   * Returns the state from the props provided to the component
   *
   * @param {object} props The props provided to the component
   * @returns {object} state of the component based on the props provided
   * @memberof DataGrid
   */
  extractStateFromProps (props) {
    let data = [],
        dataModel = {},
        datumModel,
        currentPage,
        totalPages,
        startIndex,
        endIndex;

    totalPages = Math.ceil(props.totalRowsCount / props.pageSize);
    currentPage = Math.ceil(props.startIndex / props.pageSize);
    startIndex = props.startIndex;
    endIndex = props.endIndex;

    data = props.data.map((datum) => {
      return Object.assign({}, datum);
    });

    for (let i = 0, len = props.dataModels.length; i < len; i++) {
      datumModel = props.dataModels[i];
      dataModel[datumModel.column] = datumModel;
    }

    return {
      isLoading: false,
      currentPage,
      data,
      dataModel,
      endIndex,
      startIndex,
      totalPages
    };
  }

  /**
   * Updates the data being rendered on the page based on the pageIndex provided
   *
   * @param {number} pageIndex The page of data that has to be rendered
   * @returns {undefined}
   * @memberof DataGrid
   */
  _updateDataPage (pageIndex) {
    let currentPage = pageIndex,
        startIndex = (((pageIndex - 1) * this.props.pageSize) + 1),
        endIndex = (startIndex + this.props.pageSize) - 1;

    this.setState({
      isLoading: true
    }, () => {
      this.props.getPageData(currentPage, startIndex, endIndex, this.props.pageSize)
        .then(() => {
          this.setState({
            isLoading: false
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  /* eslint-disable require-jsdoc */
  componentWillReceiveProps (nextProps) {
    this.setState(this.extractStateFromProps(nextProps));
  }
  /* eslint-enable require-jsdoc */

  /* eslint-disable require-jsdoc */
  render () {
    let className = classnames('datagrid-wrapper', {
      'loading': (this.state.isLoading === true || this.props.isLoading === true)
    });

    return (
      <div className={className}>
        <table className="datagrid">
          <TableHeader headers={this.props.dataModels} />
          <TableBody data={this.state.data}
            dataModel={this.state.dataModel}
            onRowClick={this.props.onRowClick}
            noDataMessage={this.props.noDataMessage} />
        </table>
        <Pager startIndex={this.state.startIndex}
          endIndex={this.state.endIndex}
          totalRowsCount={this.state.totalRowsCount}
          currentPage={this.state.currentPage}
          totalPages={this.state.totalPages}
          updateDataPage={this.updateDataPage} />
      </div>
    );
  }
  /* eslint-enable require-jsdoc */
}

DataGrid.displayName = 'DataGrid';

DataGrid.propTypes = {
  /**
   * Indicates if the data is being loaded
   */
  isLoading: PropTypes.bool,
  /**
   * The data to be rendered in the table.
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * This describes the data being displayed. It is an array of objects. Each object providing the following options/config; <br /><br />title - *The name to be used as a aheader title* <br />column - *The column name/property name in the data object this header associates with* <br />order - *The order in whcih this column should appear* <br />isSortable - *Is the data sortable by this column* <br/>cellRender - **
   */
  dataModels: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    order: PropTypes.number,
    isSortable: PropTypes.bool,
    cellRender: PropTypes.func
  })).isRequired,
  /**
   * This is the no data message that should be rendered in case no data is present to be displayed
   */
  noDataMessage: PropTypes.node,
  /**
   * The page size of the datagrid
   */
  pageSize: PropTypes.number,
  /**
   * The index of the currently displayed page. The index starts from 1. It is required to generate the page counts
   */
  currentPage: PropTypes.number,
  /**
   * The startIndex of the data rows
   */
  startIndex: PropTypes.number,
  /**
   * The endIndex of the data rows
   */
  endIndex: PropTypes.number,
  /**
   * Total rows available. It is required to generate the page counts
   */
  totalRowsCount: PropTypes.number,
  /**
   * This property exposes the way for consuming components to inject data for a particular page in a syn/async manner. The function should return a promise. Which on resolving should return the array of data to be rendered.
   */
  getPageData: PropTypes.func,
  /**
   * The callback action to be triggered when any of rows are clicked
   */
  onRowClick: PropTypes.func
};

DataGrid.defaultProps = {
  noDataMessage: <div>No Data Available</div>,
  pageSize: 10,
  currentPage: 1,
  startIndex: 1,
  endIndex: 10
};

export default DataGrid;
