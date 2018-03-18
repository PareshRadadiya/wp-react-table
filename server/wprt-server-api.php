<?php

/**
 * Class WPRB_Rest_Server
 *
 * Example rest server that allows for CRUD operations on the wp_options table
 *
 */
class WPRT_Server_API extends WP_Rest_Controller {

	public $namespace = 'wprt/';
	public $version = 'v1';

	public function init() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		$namespace = $this->namespace . $this->version;

		register_rest_route( $namespace,
			'/posts-date',
			array(
				'methods'  => WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_posts_date' ),
			)
		);

	}

	public function get_posts_date( WP_REST_Request $request ) {
		global $wpdb;

		$months = $wpdb->get_results(
			$wpdb->prepare(
				"
                SELECT DISTINCT YEAR( post_date ) AS year, MONTH( post_date ) AS month
                FROM $wpdb->posts
                WHERE post_type = %s
                ORDER BY post_date DESC
		",
				'post'
			)
		);

		/**
		 * Filters the 'Months' drop-down results.
		 *
		 * @since 3.7.0
		 *
		 * @param object $months    The months drop-down query results.
		 * @param string $post_type The post type.
		 */
		$months = apply_filters( 'months_dropdown_results', $months, 'post' );

		$month_count = count( $months );

		if ( ! $month_count || ( 1 == $month_count && 0 == $months[0]->month ) ) {
			return false;
		}

		return $months;
	}

}