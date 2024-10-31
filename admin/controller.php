<?php

if(!defined('ABSPATH')) {die('You are not allowed to call this page directly.');}

// process ajax request
add_action( 'wp_ajax_admin_hook_sales', 'WPJReportsSalesHandler' );
function WPJReportsSalesHandler() {
    // check nonce
    check_ajax_referer( 'wpj_reports_nonce', 'WPJNonce' );

    // check user
    if ( ! current_user_can( 'manage_options' ) ) return;
    
    global $wpdb;
    $result = array();
    
    $time_zone = -(get_option('gmt_offset'));
    
    // Get membership products and transactions
    $q_products = $wpdb->prepare("SELECT ID, post_title FROM {$wpdb->posts} WHERE post_type=%s AND post_status=%s", 'memberpressproduct', 'publish');
    $q_transactions = $wpdb->prepare("SELECT id, total, user_id, product_id, coupon_id, subscription_id, status, DATE_SUB(created_at, INTERVAL " . $time_zone . " HOUR) created_at, DATE_SUB(expires_at, INTERVAL " . $time_zone . " HOUR) expires_at FROM " . $wpdb->prefix . "mepr_transactions WHERE status=%s OR status=%s ORDER BY created_at ASC", 'complete', 'refunded');
    $colors = get_option( 'wpj_reports_colors' ); if ($colors == '') { $colors = array(); }

    $result['products'] = apply_filters('wpj-reports-filter-products', $wpdb->get_results($q_products));
    $result['transactions'] = apply_filters('wpj-reports-filter-transactions', $wpdb->get_results($q_transactions));
    $result['colors'] = apply_filters('wpj-reports-filter-colors', $colors);
    $result = apply_filters('wpj-reports-data', $result, $time_zone);

    echo json_encode($result);

    wp_die();
}