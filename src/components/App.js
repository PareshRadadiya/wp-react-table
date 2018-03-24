import React from 'react';
import PostTable from './PostTable';
import SearchForm from './SearchForm';
import NavTop from './NavTop';

export default class App extends React.Component {
	constructor() {
		super();
		// initial state
		this.state = {
			posts: [],
			totalPage: 1,
			page: 1,
		};

		this.collection = new wp.api.collections.Posts();
		this.fetchData = {
			context: 'view',
			_embed: 'true',
			per_page: 20,
			status: 'any',
		};

		this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
		this.onFilterButtonClicked = this.onFilterButtonClicked.bind(this);
	}

	componentDidMount() {
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
				this.setState({posts: posts});
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

	render() {
		return (
			<div>
				<SearchForm
					onSearchButtonClicked={ this.onSearchButtonClicked }
					searchInputRef={ input => this.searchInput = input }
				/>
				<NavTop
					catInputRef={ input => this.catInput = input }
					dateInputRef={ input => this.dateInput = input }
					onFilterButtonClicked={ this.onFilterButtonClicked }
				/>
				<PostTable
					posts={ this.state.posts }
				/>
			</div>
		);
	}

}