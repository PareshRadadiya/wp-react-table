import React from 'react';
import PostTable from './PostTable';
import SearchForm from './SearchForm';

export default class App extends React.Component {
	constructor() {
		super();
        // initial state
		this.state = {
            posts: [],
            searchText: ''
        };

        this.collection = new wp.api.collections.Posts();

		this.onSearchTextChange = this.onSearchTextChange.bind(this);
		this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
	}

	componentDidMount() {
        const param = {
            reset: true,
            data: {
            context: 'edit',
                _embed: 'true',
                per_page: 20,
                status: 'any',
            }
        };

        this.fetchPosts(param);
    }

    fetchPosts(param) {
        this.collection.fetch(param)
            .done( posts => {
                this.setState({posts: posts});
            });
    }

    onSearchTextChange(value) {
        this.setState({searchText: value});
    }

    onSearchButtonClicked() {
        const param = { data: { search: this.state.searchText } };
        this.fetchPosts(param);
    }

	render() {
		return (
            <div>
                <SearchForm
                    onSearchTextChange={this.onSearchTextChange}
                    onSearchButtonClicked={this.onSearchButtonClicked}
                    searchText={this.state.searchText}/>
                <PostTable
                    posts={this.state.posts}/>
            </div>
		);
	}

}