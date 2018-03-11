import React from 'react';

export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.handleSearchTextSearch = this.handleSearchTextSearch.bind(this);
    }

    handleSearchButtonClick() {
        this.props.onSearchButtonClicked();
    }

    handleSearchTextSearch(e) {
        this.props.onSearchTextChange(e.target.value);
    }

    render() {
        return (
            <p>
                <input
                    type="search"
                    id="post-search-input"
                    value={this.props.searchText}
                    onChange={this.handleSearchTextSearch}/>
                <input
                    type="submit"
                    id="search-input"
                    onClick={this.handleSearchButtonClick}/>
            </p>
        );
    }
}
