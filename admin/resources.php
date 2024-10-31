<?php
// enqueue styles
add_action( 'admin_enqueue_scripts', 'WPJReportsEnqueueStyles' );
function WPJReportsEnqueueStyles( $hook ) {
	// check if our page
	if ( 'memberpress_page_wpj-reports' !== $hook ) return;

	wp_enqueue_style('daterangepicker_style', plugins_url( '/css/daterangepicker.css', __FILE__ ));
    wp_enqueue_style('datatable_style', plugins_url( '/css/datatables.min.css', __FILE__ ));
    wp_enqueue_style('datatable_checkbox_style', plugins_url( '/css/dataTables.checkboxes.css', __FILE__ ));
    wp_enqueue_style('datatable_buttons_style', plugins_url( '/css/buttons.dataTables.min.css', __FILE__ ));
    
    do_action('wpj_reports_css_library_loading');
	wp_enqueue_style('wpj_reports_style', plugins_url( '/css/main.css', __FILE__ ), array(), WPJ_FREE_VERSION);
}

// enqueue scripts
add_action( 'admin_enqueue_scripts', 'WPJReportsEnqueueScripts' );
function WPJReportsEnqueueScripts( $hook ) {

	// check if our page
	if ( 'memberpress_page_wpj-reports' !== $hook ) return;

	// enqueue script
	wp_enqueue_script('moment_dep', plugins_url( '/js/moment.min.js', __FILE__ ));
	wp_enqueue_script('d3_v4_url_dep', plugins_url( '/js/d3.v4.min.js', __FILE__ ));
    wp_enqueue_script('jquery-ui-resizable');
    wp_enqueue_script('daterangepicker_dep', plugins_url( '/js/daterangepicker.min.js', __FILE__ ), array('jquery', 'moment_dep'));
    wp_enqueue_script('datatable_dep', plugins_url( '/js/datatables.min.js', __FILE__ ), array('jquery'));
    wp_enqueue_script('datatable_checkbox_dep', plugins_url( '/js/dataTables.checkboxes.min.js', __FILE__ ), array('jquery', 'datatable_dep'));
    wp_enqueue_script('datatable_buttons_dep', plugins_url( '/js/dataTables.buttons.min.js', __FILE__ ), array('jquery', 'datatable_dep'));
    wp_enqueue_script('datatable_jszip_dep', plugins_url( '/js/jszip.min.js', __FILE__ ), array('jquery', 'datatable_dep'));
    wp_enqueue_script('datatable_pdfmake_dep', plugins_url( '/js/pdfmake.min.js', __FILE__ ), array('jquery', 'datatable_dep'));
    wp_enqueue_script('datatable_vfs_dep', plugins_url( '/js/vfs_fonts.js', __FILE__ ), array('jquery', 'datatable_dep'));
    wp_enqueue_script('datatable_buttons_html5_dep', plugins_url( '/js/buttons.html5.min.js', __FILE__ ), array('jquery', 'datatable_dep'));
	wp_enqueue_script('sales_report_dep', plugins_url( '/js/sales-report.js', __FILE__ ), array( 'jquery', 'daterangepicker_dep', 'd3_v4_url_dep',  'datatable_dep'), WPJ_FREE_VERSION);
    
    do_action('wpj_reports_js_library_loading');
	wp_enqueue_script('wpj_reports_dep', plugins_url( '/js/main.js', __FILE__ ), array( 'daterangepicker_dep', 'd3_v4_url_dep'), WPJ_FREE_VERSION);

	// create nonce
	$nonce = wp_create_nonce( 'wpj_reports_nonce' );

	// define script
	$script = array( 'nonce' => $nonce, 'currentSiteTime' => date( 'Y-m-d H:i:s', current_time( 'timestamp' ) ));
    if (is_plugin_active('wpj-reports-premium/wpj-reports-premium.php')) {
        $script['premiumAvailable'] = true;
    } else {
        $script['premiumAvailable'] = false;
    }
    
    if (isset($_REQUEST['param'])) {
        $script['param'] = $_REQUEST['param'];
    } else {
        $script['param'] = '';
    }
    
    $script = apply_filters('wpj_reports_js_params', $script);

	// localize script
	wp_localize_script('wpj_reports_dep', 'WPJReports', $script);
}
