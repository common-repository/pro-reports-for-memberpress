<?php // MyPlugin - Admin Menu


/**
 * exit if file is called directly
 */

if ( ! defined( 'ABSPATH' ) ) {

	exit;

}


/**
 * Add submenu on MemberPress
 */

function WPJReportsMenu() {
	
	/**
	 * Check MemberPress plugin is active
	 */

	if ( is_plugin_active( 'memberpress/memberpress.php' ) ) {
	
		add_submenu_page(
			'memberpress',
			__('WPJ Reports', 'memberpress'),
			__('WPJ Reports', 'memberpress'),
			'manage_options',
			'wpj-reports',
			'wpj_reports_view'
		);

	}
	
}
add_action( 'mepr_menu', 'WPJReportsMenu' );