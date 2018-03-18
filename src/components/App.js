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

		this.onSearchTextChange = this.onSearchTextChange.bind(this);
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

	onSearchTextChange(value) {
		( this.fetchData.search = value ) || ( delete this.fetchData.search );
	}

	onSearchButtonClicked() {
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
					onSearchTextChange={this.onSearchTextChange}
					onSearchButtonClicked={this.onSearchButtonClicked}
					searchText={this.state.search}
				/>
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