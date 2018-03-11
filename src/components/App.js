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

		this.onSearchTextChange = this.onSearchTextChange.bind(this);
		this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
	}

	componentDidMount() {
        this.collection = new wp.api.collections.Posts();
        this.collection
            .fetch({
                reset: true,
                data: {
                    context: 'edit',
                    _embed: 'true',
                    per_page: 20,
                    status: 'any',
                }
            })
            .done( posts => {
                this.setState({posts: posts});
            });
    }

    onSearchTextChange(value) {
        this.setState({searchText: value});
    }

    onSearchButtonClicked() {
        console.log('clicked');
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