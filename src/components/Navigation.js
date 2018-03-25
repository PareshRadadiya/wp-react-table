import React from 'react';
import PaginationLinks from './PaginationLinks';

export default class Navigation extends React.Component {

	render() {
		return (
			<div className="tablenav-pages">
				<span className="displaying-num">{ this.props.totalObjects } items</span>
				{
					1 < this.props.totalPages &&
					<PaginationLinks
						currentPage={ this.props.currentPage }
						handlePageChange={ this.props.handlePageChange }
						totalPages={ this.props.totalPages }
					/>
				}
			</div>
		);

	}
}