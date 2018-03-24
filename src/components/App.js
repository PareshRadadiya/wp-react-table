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
			context: 'edit',
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
		this.fetchData.categories = this.catInput.value;
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
					onFilterButtonClicked={ this.onFilterButtonClicked }
				/>
				<PostTable
					posts={ this.state.posts }
				/>
			</div>
		);
	}

}