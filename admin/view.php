<?php
/**
 * exit if file is called directly
 */

if ( ! defined( 'ABSPATH' ) ) {	exit; }


/**
 * Main report page
 */
function wpj_reports_view() {
	
	/**
	 * check if user is allowed access
	 */
	if ( ! current_user_can( 'manage_options' ) ) return;
	?>
	<?php do_action('wpj-reports-before-start'); ?>
	<div class="wrap">
		<h2>
			<?php echo esc_html( get_admin_page_title() ); ?>
		</h2>
        <?php do_action('wpj_reports_before_tabs'); ?>
		<div id="wpj_reports_board">
			<h2 id="pro-reports-tabs-wrapper" class="nav-tab-wrapper">
				<a class="nav-tab nav-tab-active" id="sales" href="#">Sales</a>
                <?php do_action('wpj_reports_more_tabs'); ?>
			</h2>
            
			<!-- Sales Tab Content -->
			<div id="sales-tab-content" class="tab-content active">
				<div class="wpj_reports_loading">loading ...</div>
				<div class="hidden">
					<div class="box-right">
                        <div id="sales-report-list" class="report-list"></div>
                        <div class="wpj_reports_date_filter">
                            <i class="dashicons dashicons-calendar-alt"></i><input type="text" id="pro_report_sales_date_filter">
                        </div>
                        <div class="pro-functions">
                            <?php do_action('wpj_reports_filter_actions'); ?>
                        </div>
					</div>
					<div class="wpj_reports_box">
						<div id="pro_report_sales_product_filter" class="wpj_reports_product_filter">
						</div>
					</div>
					<div class="wpj_reports_box">
						<div id="sales_total_overview" class="item_price_total"></div>
						<div id="pro_report_sales_chart" class="wpj_reports_chart">
							<div id="pro_report_sales_chart_tooltip" class="wpj_reports_chart_tooltip hidden">
						    	<div><strong class="product_title"></strong></div>
                                <div><span class="product_payments"></span></div>
						    	<div><span class="product_sale"></span></div>
						  	</div>
						</div>
					</div>
					<div class="wpj_reports_box">
						<div id="pro_report_sales_table" class="wpj_reports_sales">
                            <div class="tools-wrapper">
                            	<?php do_action('wpj-reports-sales-tools'); ?>
                            </div>
                            <table id="sales-list" class="display responsive striped" width="100%">
                                <thead>
                                    <th data-priority="1"></th>
                                    <th data-priority="21">Color</th>
                                    <th data-priority="2">Product Name</th>
                                    <th data-priority="50">Payments</th>
                                    <th data-priority="60">Coupons</th>
                                    <th data-priority="20">Revenue</th>
                                    <th data-priority="30">Refunded</th>
                                    <th data-priority="40">Net</th>
                                    <th></th>
                                </thead>
                            </table>
						</div>
					</div>
				</div>
			</div>
            <?php do_action('wpj_reports_more_tab_contents'); ?>
		</div>
        <?php do_action('wpj-reports-after-tabs'); ?>
	</div>
	
	<?php
    do_action('wpj_reports_after_end');
}