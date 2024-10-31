<?php
/*
Plugin Name:  WPJ Reports for MemberPress
Description:  Show MemberPress reports with more detail. More sales information, date-ranges, and filtering options. For more powerful reports and features, upgrade to <a href="https://wpjohnny.com/pro-reports-for-memberpress/">PRO version</a>.
Plugin URI:   https://wpjohnny.com/pro-reports-for-memberpress/
Author:       <a href="https://wpjohnny.com">WPJohnny</a>, <a href="https://profiles.wordpress.org/zeroneit/">zerOneIT</a>
Version:      1.5
Text Domain:  memberpress-pro-reports
License:      GPL v2 or later
License URI:  https://www.gnu.org/licenses/gpl-2.0.txt
*/

// disable direct file access
if ( ! defined( 'ABSPATH' ) ) {

	exit;

}
define('WPJ_FREE_VERSION', '1.5');
// include plugin dependencies
require_once plugin_dir_path( __FILE__ ) . 'admin/menu.php';
require_once plugin_dir_path( __FILE__ ) . 'admin/view.php';
require_once plugin_dir_path( __FILE__ ) . 'admin/resources.php';
require_once plugin_dir_path( __FILE__ ) . 'admin/controller.php';

// remove version from head
//remove_action('wp_head', 'wp_generator');

// remove version from rss
//add_filter('the_generator', '__return_empty_string');

// remove version from scripts and styles
/*function zerOneIT_remove_version_scripts_styles($src) {
    if (strpos($src, 'ver=')) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('style_loader_src', 'zerOneIT_remove_version_scripts_styles', 9999);
add_filter('script_loader_src', 'zerOneIT_remove_version_scripts_styles', 9999);*/

//if (!is_plugin_active('wpj-reports-premium/wpj-reports-premium.php')) {
add_action ( 'wpj_reports_more_tabs', 'WPJReportsProTab', 100);
function WPJReportsProTab() {
    echo '<a class="nav-tab" id="pro" href="#">PRO Features</a>';
}

add_action ( 'wpj_reports_more_tab_contents', 'WPJReportsProTabContents' );
function WPJReportsProTabContents() {
    ?>
    <!-- Pro Features Tab Content -->
    <div id="pro-tab-content" class="tab-content">
        <div class="wpj_reports_box">
            <div class="wpj_reports_sales">
                <?php
                    do_action('wpj_reports_pro_features_before');
                ?>
                <h3>Get way more helpful reports for your membership site.</h3>
                <ul class="pro-features-list">
                    <li><strong>More report tabs</strong> – Churns, Subscriptions, Members, Courses, and Students.</li>
                    <li><strong>Filter features</strong> – choose which data to show, and sort to your liking.</li>
                    <li><strong>Color select</strong> – specify custom colors for each product.</li>
                    <li><strong>Save reports</strong> – save your favorite filter selections as custom reports, so you don't have to keep re-selecting them.</li>
                    <li><strong>Report URLS</strong> – bookmark and visit reports directly through handy URLS.</li>
                    <li><strong>Export to PDF/CSV</strong> – to print reports or import data elsewhere.</li>
                </ul>
                <p style="max-width: 1200px;">
                    The default built-in MP reports are missing useful data and doesn't help business owners much. It was a personal pain point I dealt with for years. Imagine managing over 10,000 members without knowing how each product was selling, and how members were engaging with my products. So I built my very own custom reports plugin just the way I wanted. It truly is a dream plugin and lovingly used every day!
                </p>
                <p>See <a href="https://wpjohnny.com/pro-reports-for-memberpress/#glossary" target="_blank" >glossary</a> for table terms.</p>
                <?php
                    do_action('wpj_reports_pro_features_after');
                ?>
            </div>
        </div>
    </div>
    <?php
}