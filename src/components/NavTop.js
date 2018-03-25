import React from 'react';
import TopFilters from './TopFilters';
import Navigation from './Navigation';

export default class NavTop extends React.Component {

	render() {
		return (
			<div className="tablenav top">
				<TopFilters
					catInputRef={ this.props.catInputRef }
					dateInputRef={ this.props.dateInputRef }
					onFilterButtonClicked={ this.props.onFilterButtonClicked }
				/>
				<Navigation
					totalPages={ this.props.totalPages }
					totalObjects={ this.props.totalObjects }
					currentPage={ this.props.currentPage }
					handlePageChange={ this.props.handlePageChange }
				/>
			</div>
		);
	}
}