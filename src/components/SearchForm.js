import React from 'react';

export default class SearchForm extends React.Component {

	constructor(props) {
		super(props);

		this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
	}

	handleSearchButtonClick() {
		this.props.onSearchButtonClicked();
	}

	render() {
		return (
			<p>
				<input
					type="search"
					id="post-search-input"
					ref={this.props.searchInputRef} />
				<input
					type="button"
					id="search-input"
					value="Search Posts"
					onClick={this.handleSearchButtonClick}/>
			</p>
		);
	}
}
