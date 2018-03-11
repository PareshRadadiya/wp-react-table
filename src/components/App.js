import React from 'react';
import PostTable from './PostTable';

export default class App extends React.Component {
	constructor() {
		super();
        // initial state
		this.state = {
            posts: [],
        };
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

	render() {
		return (
            <div>
                <PostTable posts={this.state.posts}/>
            </div>
		);
	}

}