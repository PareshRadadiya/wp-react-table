import React from 'react';

export default class PostRow extends React.Component {

	render() {
		const post = this.props.post;
		return (
			<tr key={post.id}>
				<td>{post.id}</td>
				<td>{post.title.rendered}</td>
			</tr>
		);
	}
}