/**
 * Author: @zeroneit
 */
 var salesData;
 var reportType;
 
 (function($) {
	$(document).ready(function() {
        // Load start data in ajax
        $.post(ajaxurl, {
            WPJNonce: WPJReports.nonce,
            action: 'admin_hook_sales',
            dataType: "json"
        }, function(result) {
            salesData = JSON.parse(result);
            loadTabContent(reportType);
        });
        
        // Report tab click module
        $(document).on('click', '#pro-reports-tabs-wrapper a', function(e){
            e.preventDefault();
            reportType = $(this).attr('id');
            localStorage.setItem('selected-tab', reportType);
            
            if (!$(this).hasClass('nav-tab-active')) {
                $('#pro-reports-tabs-wrapper a').removeClass('nav-tab-active');
                $(this).addClass('nav-tab-active');

                $('.tab-content').removeClass('active');
                $('#' + reportType + '-tab-content').addClass('active');
                
                loadTabContent(reportType);
            }
        });
        
        // Load last tab content
        if (WPJReports.param) {
            var param = JSON.parse(atob(WPJReports.param));
            if (param.sales) { reportType = 'sales'; }
            if (param.churns) { reportType = 'churns'; }
            if (param.subscriptions) { reportType = 'subscriptions'; }
            if (param.members) { reportType = 'members'; }
            if (param.courses) { reportType = 'courses'; }
            if (param.students) { reportType = 'students'; }
        } else if (WPJReports.reportID != undefined && WPJReports.reportID != '') {
            if (WPJReports.reportID.includes('wpj-reports-sales')) { reportType = 'sales'; }
            if (WPJReports.reportID.includes('wpj-reports-churns')) { reportType = 'churns'; }
            if (WPJReports.reportID.includes('wpj-reports-subscriptions')) { reportType = 'subscriptions'; }
            if (WPJReports.reportID.includes('wpj-reports-members')) { reportType = 'members'; }
            if (WPJReports.reportID.includes('wpj-reports-courses')) { reportType = 'courses'; }
            if (WPJReports.reportID.includes('wpj-reports-students')) { reportType = 'students'; }
        } else {
            reportType = localStorage.getItem("selected-tab");
        }
        
        if (reportType == undefined || WPJReports.premiumAvailable == false) { reportType = 'sales'; }
        $('#pro-reports-tabs-wrapper a#' + reportType).trigger('click');
	});
	
    function loadTabContent(reportType) {
        if (salesData) {
            setTimeout(function(){
                if (reportType != 'pro') {
                    window[reportType]();
                }
            }, 10);
        }
    }
})( jQuery );

function formatedPrice(price) {
    return '$' + price.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

function getMonthlyScopeArr(startDate, endDate) {
    var currentTime = moment(WPJReports.currentSiteTime); // If customer select a end date value after today, we use today as the end date
    if (endDate.isAfter(currentTime)) { endDate = currentTime; }
    
    var startDateArr = [];
    var endDateArr = [];
    
    var fromDate = startDate.clone();
    while (fromDate.isBefore(endDate)) {
        startDateArr.push(fromDate.clone());
        var endOfMonth = fromDate.endOf('month');
        
        if (endOfMonth.isSameOrBefore(endDate)) {
            endDateArr.push(endOfMonth);
        } else {
            endDateArr.push(endDate);
        }
        
        fromDate = fromDate.add(1, 'months').startOf('month');
    }
    return [startDateArr, endDateArr];
}