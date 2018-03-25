import React from 'react';

export default class SearchForm extends React.Component {

	constructor() {
		super();
		this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
	}

	handleSearchButtonClick() {
		this.props.onSearchButtonClicked();
	}

	render() {
		return (
			<p className="search-box">
				<input
					type="search"
					id="post-search-input"
					name="s"
					ref={ this.props.searchInputRef }
				/>
				<input
					type="button"
					id="search-input"
					value="Search Posts"
					className="button"
					onClick={ this.handleSearchButtonClick }
				/>
			</p>
		);
	}
}
