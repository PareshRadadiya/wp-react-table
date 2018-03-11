import React from 'react';
import PostRow from './PostRow';

export default class PostTable extends React.Component {
    render() {
        const rows = [];

        this.props.posts.forEach((post) => {
            rows.push(
                <PostRow post={post} key={post.id}/>
            );
        });

        return (
            <table>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}