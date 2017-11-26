/*global location*/

'use strict';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * This react component provides the layout of the application and hosts
 * @class
 */
class SearchBox extends React.Component {
  /* istanbul ignore next */
  /**
   * Creates an instance of SearchBox.
   * @memberof SearchBox
   */
  constructor () {
    super();
    this.state = {
      searchText: ''
    };
    this.onChange = (e) => this._onChange(e);
    /* istanbul ignore next */
    this.handleKeyPress = (e) => this._handleKeyPress(e);
    this.onSearch = () => this._onSearch();
  }

  /**
   * The callback function triggered when the user changes the value in the input
   *
   * @param {object} e The event object fired for the click event
   * @returns {undefined}
   * @memberof SearchBox
   */
  _onChange (e) {
    this.setState({
      searchText: e.target.value
    });
  }

  /**
   * The callback function triggered when the user triggers Search by clicking on the button
   *
   * @returns {undefined}
   * @memberof SearchBox
   */
  _onSearch () {
    /* istanbul ignore else */
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(this.state.searchText);
    }
  }

  /**
   * The callback function triggered when the user presses any key in the input. Will look for enter key to trigger search
   *
   * @param {object} e The event object fired for the click event
   * @returns {undefined}
   * @memberof SearchBox
   */
  _handleKeyPress (e) {
    /* istanbul ignore next */
    if (e.key === 'Enter') {
      this.onSearch();
    }
  }

  /* eslint-disable require-jsdoc */
  render () {
    return (
      <div>
        <input autoFocus value={this.state.searchText} onChange={this.onChange} onKeyPress={this.handleKeyPress} />
        <button onClick={this.onSearch}>Search</button>
      </div>
    );
  }
  /* eslint-enable require-jsdoc */
}

SearchBox.displayName = 'SearchBox';

SearchBox.propTypes = {
  /**
  * This property exposes the way for consuming components to be alerted for search actions
  */
  onSearch: PropTypes.func
};

export default SearchBox;
