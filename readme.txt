  
=== WPJ Reports for MemberPress ===
Contributors: treeflips, zeroneit
Donate link: https://www.paypal.me/wpjohnny
Tags: memberpress, reports, membership, addon
Requires at least: 4.9
Requires PHP: 7.2
Tested up to: 6.4.1
Stable tag: 1.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Show MemberPress reports with more detail. More sales information, date-ranges, and filtering options.

== Description ==

This plugins shows much more useful data than the default MemberPress reports. You can see how many of each membership (product) sold, payments made, coupons used, refunds given, and many other useful product sales data. Everything is also organized into a visual bar chart as well as data table.

I built my own reports plugin because I got sick of waiting for MemberPress to update their default reports function. Currently, the default reports focus too much on transactional data like “completed, pending, failed, refunded”, instead of more important sales data. I’ve spoken to their founder and devs over the years, begging for certain features and laying out UI designs but they never got around to it. They're too busy creating integrations to help attract new buyers, rather than making existing ones happier.

The FREE version is already much better than the default MemberPress reports function (more sales data, and better report visualization). And the PRO version has even more awesome features...see below.

### FREE FEATURES

- **More date ranges** - the default MemberPress reports only show Month, Year, All-Time. WPJ Reports also shows Yesterday, Today, Last 7 Days, Last 30 days, This Month, This Year, Last 364 Days, Last Year, and Custom Date Range.
- **Visual bar charts** - showing sales proportions for each product.
- **Filter products** - choose which products to show on sales charts.
- **Product details** - calculate quantities sold, new subscriptions, coupons used, payments made, and sales revenue by each product.
- **Match website timezone** - default MP reports show data in UTC timezone which is frustrating when daily sales amounts don't sync up with your region. WPJ Reports will show data in the same timezone as your site.

### FREE REPORT TABS

- **Sales** – product sales info, payments, coupons, revenue, refunds.

### PRO FEATURES

- **More report tabs** - Churns, Subscriptions, Members, Courses, and Students.
- **Filter features** - choose which data to show, and sort to your liking.
- **Color select** - specify custom colors for each product.
- **Save reports** - save your favorite filter selections as custom reports, so you don't have to keep re-selecting them.
- **Report URLS** - bookmark and visit reports directly through handy URLS.
- **Export to PDF/CSV** - to print reports or import data elsewhere.

### PRO REPORT TABS

- **Churns** - churn rate, churn revenue, churn revenue rate.
- **Subscriptions** – subscriber sign-ups, active status, payments, sales.
- **Members** – member status, payments made, product access.
- **Courses** – users registered, active status, course usage.
- **Students** – student activity, course progress, lessons opened.

<a href="https://wpjohnny.com/wpj-reports-for-memberpress/">Learn more about WPJ Reports for MemberPress (PRO)</a>

== Installation ==

1. Install easily from your dashboard Add Plugins page or manually download the plugin and upload the extracted archived to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. From your Dashboard, go to the sidebar MemberPress menu and click on "Pro Reports".

== Frequently Asked Questions ==

= Does this plugin work with newest WP version and also older versions? =
* Yes, this plugin works perfect with the latest version of WordPress! It also works with older versions as well but you should always run the latest WordPress and PHP version for best security and performance. This plugin is used in my critical sites so you can be assured it works perfect.

= Will this plugin slow down my site? =
* No. Nothing is loaded in the frontend. I'm an absolute speed fanatic.

= How often do you plan to update this plugin? =
* We'll keep maintaining both FREE and PRO versions to work with the latest WordPress version and other plugins.
* New features and styling adjustments will be made over time, at our discretion. Priority given to the most user-requested ones.
* PRO version pricing will increase over time to reflect added features. Existing PRO customers will be grandfathered in (no price changes for them).

== Screenshots ==
1. Choose date range filter and products filter, and look beautiful graph bars report & table report.
2. Mouse-hover shows payments made and revenue for each product.
3. Daily/Monthly/Yearly report view based on wide selection of date-ranges.
4. Data table showing sales details for each product, side-by-side.

== Changelog ==
= 1.5 =
- Version is added to core asset files to avoid several caches after plugin is upgraded.
- We show a notification if there are no membership products configured.

= 1.4 =
- Revenue and Net total calculation logic were changed.

= 1.3 =
- Some words are changed.

= 1.2 =
- Issue is fixed in Filtered Columns checkbox.

= 1.1 =
- As default, "All Products" button is selected for users started plugin at first.
- Some minor issues are fixed.

= 1.0 =
- Add new filters into plugin core.
- Free plugin is compatible to have Churn tab premium feature of PRO version.
- Some style issues are fixed in mobile responsive mode.
- In monthly view chart, the month order problem is fixed.
- Operation speed is quicker than before since after optimize logic.
- We updated plugin descriptions for better understanding.
- We removed the version remove code snippet from URLs because it occurs cache problem in several sites.
- Graph tooltip position is updated for better viewing.
- Payments# count value is added at top of graph and on the mouse-over event in Sales tab.
- We cleaned up all program code.
- Sales tab graph tooltip has more data now.

= 0.6 =
- Menu title and some words were replaced with words. Those were some minor changes.
- Plugin description is updated.

= 0.5 =
- Custom Color feature is added for pro version. In pro version, custom colors can be determined in color pickers.
- Several styles are updated.

= 0.4 =
- jQuery compatible problem was fixed.

= 0.3 =
- We changed plugin name.
- New hooks were added.
- Pro Features tab content was added.

= 0.2 =
- New hooks were added.

= 0.1.9 =
- Refunded transactions are calculated again in report. (Fixed)
- Resolved issue where some transactions weren't showing in reports based on WP Settings > General > Timezone. (Fixed)
- Updated to show plugin compatibility for latest WP version. (Fixed)

= 0.1.8 =
- Ajax controller is fixed to return transaction status. It was removed unexpectedly.

= 0.1.7 =
- $wpdb->prefix is added to make it work in any Wordpress database prefix.
- Remove Font-awesome

= 0.1.6 =
- CSS styling updates to look prettier. ;)
- Remove unnecessary FontAwesome call from date-range filter.
- Add plugin version variable to CSS call for cache-busting.
- Update some text labels.

= 0.1.5 =
- Issue Fix: 0 transactions validation added in main Javascript file.
- Issue Fix: $wpdb->prefix is added with MemberPress transaction db table.

= 0.1.4 =

- Chart now shows total refunds for the period.
- Sales data now shows a refund column (for refunds made during the period).
- Previously, refunds were (incorrectly) subtracted from the total but that behavior is now removed since MemberPress refunds simply cancel out the initial payment. There is no minus transaction.
- New "ALL TIME" option available in the date range drop down (shows all transactions). If selected date range extends beyond 365 days, the graph will show report data by year.

= 0.1.3 =

- Refunded transactions are calculated in report now.
- Resolved issue where some transactions weren't showing in reports based on WP Settings > General > Timezone.
- Updated to show plugin compatibility for latest WP version.

= 0.1.2 =

Updated correct contributor name.

= 0.1.1 =

* Initial Release
