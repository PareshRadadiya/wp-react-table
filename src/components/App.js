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
		this.onCatChange = this.onCatChange.bind(this);
		this.onFilterButtonClicked = this.onFilterButtonClicked.bind(this);
	}

	componentDidMount() {
		this.fetchPosts();
	}

	fetchPosts() {
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

	onDateChange() {

	}

	onCatChange(value) {
		( this.fetchData.categories = value ) || ( delete this.fetchData.categories );
	}

	onFilterButtonClicked() {
		this.fetchPosts();
	}

	render() {
		return (
			<div>
				<SearchForm
					onSearchButtonClicked={this.onSearchButtonClicked}
					searchInputRef={ input => this.searchInput = input } />
				<NavTop
					onDateChange={this.onDateChange}
					onCatChange={this.onCatChange}
					onFilterButtonClicked={this.onFilterButtonClicked}
					dateFilter={this.state.dateFilter}
					catFilter={this.state.catFilter}
				/>
				<PostTable
					posts={this.state.posts}/>
			</div>
		);
	}

}