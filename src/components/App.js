import React from 'react';
import PostTable from './PostTable';
import SearchForm from './SearchForm';
import NavTop from './NavTop';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		// initial state
		this.state = {
			posts: [],
			totalPages: 0,
			totalObjects: 0,
			currentPage: 0,
		};

		this.fetchData = {
			context: 'view',
			_embed: 'true',
			per_page: 10,
			status: 'any',
		};

		this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
		this.onFilterButtonClicked = this.onFilterButtonClicked.bind(this);
		this.onPageChange          = this.onPageChange.bind(this);
	}

	componentDidMount() {
		this.collection = new wp.api.collections.Posts();
		this.fetchPosts();
	}

	fetchPosts() {

		// Remove unfiltered property
		Object.keys(this.fetchData).forEach((key) => ( this.fetchData[key].length === 0) && delete this.fetchData[key] );

		this.collection.fetch({
			reset: true,
			data: this.fetchData
		})
			.done(posts => {
				this.setState({
					posts: posts,
					totalPages: this.collection.state.totalPages,
					totalObjects: this.collection.state.totalObjects,
					currentPage: this.collection.state.currentPage,
				});

			});
	}

	onSearchButtonClicked() {
		this.fetchData.search = this.searchInput.value;
		this.fetchPosts();
	}

	onFilterButtonClicked() {
		// Category filter parameter
		this.fetchData.categories = this.catInput.value;
		// Date filter parameter
		if ( this.dateInput.value ) {
			let firstDate = new Date( this.dateInput.value );
			this.fetchData.after = new Date(firstDate.getFullYear(), firstDate.getMonth(), 0).toISOString();
			this.fetchData.before = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).toISOString();
		} else {
			delete this.fetchData.before;
			delete this.fetchData.after;
		}
		this.fetchPosts();
	}

	onPageChange(newPage) {
		this.fetchData.page = newPage;
		this.fetchPosts();
	}

	render() {
		return (
			<div className="wrap">
				<h1 className="wp-heading-inline">Posts</h1>
				<form id="posts-filter" method="get">
					<SearchForm
						onSearchButtonClicked={ this.onSearchButtonClicked }
						searchInputRef={ input => this.searchInput = input }
					/>
					<NavTop
						catInputRef={ input => this.catInput = input }
						dateInputRef={ input => this.dateInput = input }
						onFilterButtonClicked={ this.onFilterButtonClicked }
						totalPages={ this.state.totalPages }
						totalObjects={ this.state.totalObjects }
						currentPage={ this.state.currentPage }
						handlePageChange={ this.onPageChange }
					/>
					<PostTable
						posts={ this.state.posts }
						totalObjects={ this.state.totalObjects }
					/>
				</form>
			</div>
		);
	}

}