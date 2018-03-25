import React from 'react';
import { getMonthText } from '../helpers';

export default class TopFilters extends React.Component {
	constructor() {
		super();

		this.state = {
			categories: [],
			dates: [],
		};

		this.collection = new wp.api.collections.Categories();

		this.onFilterButtonClicked = this.onFilterButtonClicked.bind(this);
	}

	componentDidMount() {
		// fetch posts categories
		this.collection.fetch({
			reset: true,
		})
			.done(categories => {
				this.setState({categories: categories});
			});

		// fetch posts date
		window.fetch(`${window.wpApiSettings.root}wprt/v1/posts-date`)
			.then(response => response.json())
			.then(dates => this.setState({dates: dates}));
	}

	onFilterButtonClicked() {
		this.props.onFilterButtonClicked();
	}

	render() {

		return (
			<div className="alignleft actions">
				<select
					name="m"
					id="filter-by-date"
					ref={ this.props.dateInputRef }
				>
					<option value="">All dates</option>
					{ this.state.dates
						.map((date, index) => <option key={ index } value={ `${date.year},${date.month}` }>{ getMonthText(date.month) }&nbsp;{ date.year }</option>) }
				</select>
				<select
					name="cat"
					id="cat"
					className="cat"
					ref={ this.props.catInputRef }
				>
					<option value="">All Categories</option>
					{ this.state.categories
						.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>) }
				</select>
				<input
					type="button"
					name="filter_action"
					id="post-query-submit"
					className="button"
					value="Filter"
					onClick={ this.onFilterButtonClicked }
				/>
			</div>
		);
	}
}
