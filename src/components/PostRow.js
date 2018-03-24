import React from 'react';

export default class PostRow extends React.Component {

	render() {
		const post = this.props.post;
		return (
			<tr key={ post.id }>
				<td>{ post.title.rendered }</td>
				<td>{ post._embedded.author.map( author => <a key={ author.id } href="#">{ author.name }</a> ) }</td>
				<td>{ post._embedded['wp:term'][0]
					.map( term  => <a key={ term.id } href="#">{term.name}</a> )
					.reduce( ( prev, curr ) => [ prev, ', ', curr ] ) }
				</td>
				<td>{ post.date }</td>
			</tr>
		);
	}
}