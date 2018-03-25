import React from 'react';

export default class PaginationLinks extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentPage: props.currentPage,
		};

		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange(event) {
		let newPage = event.target.value;
		let currentPage = this.props.currentPage;
		let totalPages = this.props.totalPages;
		this.setState({ currentPage: newPage });
		if ( '' !== newPage && newPage != currentPage && 0 < newPage &&  totalPages >= newPage ) {
			this.props.handlePageChange(newPage);
		}
	}

	componentWillReceiveProps(nextProps) {
		if ( this.state.currentPage != nextProps.currentPage ) this.setState({currentPage: nextProps.currentPage});
	}

	render() {
		return (
			<span className="pagination-links">
				{
					1 === this.props.currentPage ? [
						<span className="tablenav-pages-navspan" aria-hidden="true" key="first-page">«</span>,
						<span className="tablenav-pages-navspan" aria-hidden="true" key="prev-page">‹</span>
					] : [
						<a
							className="first-page"
							key="first-page"
							onClick={ (e) => { e.preventDefault(); this.props.handlePageChange(1); } }
						>
							<span aria-hidden="true">«</span>
						</a>,
						<a
							className="prev-page"
							key="prev-page"
							onClick={ (e) => { e.preventDefault(); this.props.handlePageChange(this.props.currentPage - 1); } }
						>
							<span aria-hidden="true">‹</span>
						</a>
					]
				}

				<span className="paging-input">
					<input
						type="text"
						className="current-page"
						id="current-page-selector"
						name="paged"
						size="1"
						aria-describedby="table-paging"
						value={ this.state.currentPage }
						onChange={ this.handlePageChange }
					/>
					<span className="tablenav-paging-text"> of <span className="total-pages">2</span></span>
				</span>
				{
					this.props.currentPage >= this.props.totalPages ? [
						<span key="next-page" className="tablenav-pages-navspan" aria-hidden="true">›</span>,
						<span key="last-page" className="tablenav-pages-navspan" aria-hidden="true">»</span>
					] : [
						<a
							key="next-page"
							className="next-page"
							onClick={ (e) => { e.preventDefault(); this.props.handlePageChange(this.props.currentPage + 1); } }
						>
							<span aria-hidden="true">›</span>
						</a>,
						<a
							key="last-page"
							className="last-page"
							onClick={ (e) => { e.preventDefault(); this.props.handlePageChange(this.props.totalPages); } }
						>
							<span aria-hidden="true">»</span>
						</a>
					]
				}
			</span>
		);
	}
}