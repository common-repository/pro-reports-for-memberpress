/**
 * Author: @zeroneit
 */

var salesTabInitialized = false;
var salesOptions = localStorage.getItem('wpj-sales-options');
if (salesOptions) {
    salesOptions = JSON.parse(salesOptions);
} else {
    salesOptions = {
        start: '',
        end: '',
        filteredColumns: [],
        selectedProducts: [],
        order: []
    }
}
var SalesDateFilter = (function () {
    var $ = jQuery;
	var _start;
	var _end;
	var _dateObj;

	function applyFilter() {
		SalesChart.update();
		SalesTable.update();
        if (WPJReports.premiumAvailable) {
            saveOptions('sales');
        }
	}

	function cb(start, end) {
		_start = start.startOf('day');
		_end = end.endOf('day');
		applyFilter();
	}
 
	return {
		init : function (objectID) {
			_dateObj = $('#' + objectID);
            
            var startDate;
            var endDate;
            
            if (WPJReports.premiumAvailable && salesOptions.start && salesOptions.end) {
                startDate = moment(salesOptions.start);
                endDate = moment(salesOptions.end);
            } else {
                startDate = moment().subtract(29, 'days');
                endDate = moment();
            }

			cb(startDate, endDate);

			if (salesData.transactions.length > 0) {
				$('#' + objectID).daterangepicker({
					startDate: startDate,
					endDate: endDate,
					ranges: {
						'TODAY': [moment(), moment()],
						'YESTERDAY': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
						'LAST 7 DAYS': [moment().subtract(6, 'days'), moment()],
						'THIS WEEK': [moment().startOf('week'), moment().endOf('week')],
						'LAST WEEK': [moment().subtract(1, 'weeks').startOf('week'), moment().subtract(1, 'weeks').endOf('week')],
						'LAST 30 DAYS': [moment().subtract(29, 'days'), moment()],
						'THIS MONTH': [moment().startOf('month'), moment().endOf('month')],
						'LAST MONTH': [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
						'THIS YEAR': [moment().startOf('year'), moment().endOf('year')],
						'LAST 364 DAYS': [moment().subtract(363, 'days'), moment()],
                        'LAST YEAR': [moment().subtract(1, 'years').startOf('year'), moment().subtract(1, 'years').endOf('year')],
						'ALL TIME': [moment(salesData.transactions[0]['created_at']), moment(salesData.transactions[salesData.transactions.length - 1]['created_at'])]
					}
				}, cb);
			} else {
				$('#' + objectID).daterangepicker({
					startDate: startDate,
					endDate: endDate,
					ranges: {
						'TODAY': [moment(), moment()],
						'YESTERDAY': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
						'LAST 7 DAYS': [moment().subtract(6, 'days'), moment()],
						'THIS WEEK': [moment().startOf('week'), moment().endOf('week')],
						'LAST WEEK': [moment().subtract(1, 'weeks').startOf('week'), moment().subtract(1, 'weeks').endOf('week')],
						'LAST 30 DAYS': [moment().subtract(29, 'days'), moment()],
						'THIS MONTH': [moment().startOf('month'), moment().endOf('month')],
						'LAST MONTH': [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
						'THIS YEAR': [moment().startOf('year'), moment().endOf('year')],
						'LAST 364 DAYS': [moment().subtract(363, 'days'), moment()],
                        'LAST YEAR': [moment().subtract(1, 'years').startOf('year'), moment().subtract(1, 'years').endOf('year')]
					}
				}, cb);
			}
		},
		getTransactions : function (productIds) {
            return salesData.transactions.filter(function(transaction) {
                if (productIds.includes(transaction.product_id)) {
                    var created_at = moment(transaction.created_at);
                    if (created_at.isBetween(_start, _end, undefined, '[]')) {
                        return true;
                    }
                }
                return false;
            });
		},
		getDate : function () {
			return {
				start : _start,
				end : _end,
			};
		},
		setDateRange : function (startDate, endDate) {
            startDate = moment(startDate);
            endDate = moment(endDate);
			_dateObj.data('daterangepicker').setStartDate(startDate);
			_dateObj.data('daterangepicker').setEndDate(endDate);
			cb(startDate, endDate);
		}
	};
}());

var SalesProductFilter = (function() {
    var $ = jQuery;
	var _tglBtnWrap;
	var _allSelectObject;
	var _products = [];
	var _is_all = true;

	function applyFilter() {
		SalesChart.update();
		SalesTable.update();
        if (WPJReports.premiumAvailable) {
            saveOptions('sales');
        }
	}

	function initActions() {
		_allSelectObject.on('click', function() {
			if (_is_all == false) {
				_is_all = true;
				_allSelectObject.addClass('selected');
				_products.forEach(function(product) {
					product._object.removeClass('selected');
				});
				applyFilter();
			}
		});

		_products.forEach(function(product) {
			product._object.on('click', function() {
				_is_all = false;
				_allSelectObject.removeClass('selected');
                $(this).toggleClass('selected');
				applyFilter();
			});
		});
	}

	return {
		init : function (objectID) {
            defaultColors = d3.scaleOrdinal(d3.schemeCategory20).domain(_products.map(function(d) { return d.ID; }));
            _products = salesData.products.map(product => { return {...product, color: salesData.colors[product.ID] ? salesData.colors[product.ID] : defaultColors(product.ID)} });
			
            if (_products !== undefined && _products.length > 0) {
                _tglBtnWrap = $('<div class="tglBtnWrap"></div>');
			    $('#' + objectID).append(_tglBtnWrap);

			    _allSelectObject = $('<span class="selected">All products</span>');
                
                if (WPJReports.premiumAvailable && salesOptions.selectedProducts !== undefined && salesOptions.selectedProducts.length > 0 && salesOptions.selectedProducts.length != _products.length) {
                    _is_all = false;
                    _allSelectObject.removeClass('selected');
                }
                
			    _tglBtnWrap.append(_allSelectObject);

			    _products.forEach(function(product) {
				    var productObject = $('<span style="border-left: 4px solid ' + product.color + ';">'+ product.post_title +'</span>');
                    
                    if (WPJReports.premiumAvailable && salesOptions.selectedProducts !== undefined && salesOptions.selectedProducts.length > 0 && salesOptions.selectedProducts.length != _products.length && salesOptions.selectedProducts.includes(product.ID)) {
                        productObject.addClass('selected');
                    }
                    
				    _tglBtnWrap.append(productObject);

				    product._object = productObject;
			    });
                
			    initActions();
            } else {
                $('#sales-tab-content .wpj_reports_product_filter').parent('.wpj_reports_box').replaceWith('<p class="alert alert-warning" style="margin-top: 15px; ">There are no membership products yet.</p>');
                _products = [];
            }
		},
		getProducts: function () {
			if (_is_all) {
				return _products;
			} else {
				return _products.filter(function(p) { return p._object.hasClass('selected'); });
			}
		},
        getProductIds: function () {
            var ids = [];
            if (_is_all) {
                _products.forEach(function(product){
                    ids.push(product.ID);
                });
                return ids;
            } else {
                _products.forEach(function(product){
                    if (product._object.hasClass('selected')) {
                        ids.push(product.ID);
                    }
                });
                return ids;
            }
        },
        setSelectedProducts : function (selectedProducts) {
        	if (selectedProducts.length == 0 || selectedProducts.length == _products.length) {
                _is_all = true;
                _allSelectObject.addClass('selected');
                _products.forEach(function(product) {
					product._object.removeClass('selected');
				});
            } else {
            	_is_all = false;
                _allSelectObject.removeClass('selected');
                _products.forEach(function(product) {
                	if (selectedProducts.includes(product.ID)) {
                		product._object.addClass('selected');	
                	} else {
                		product._object.removeClass('selected');
                	}
				});
            }
        }
	}
}());

var SalesChart = (function () {
    var $ = jQuery;
	var _graphData = [];

	var _overviewID;
	var _tooltipID;

	var _container;
	var _unitContainer;
	var _SVG;
	var _GROUP;
	var _width = 0;
	var _height = 0;
	var _margin = { top: 20, bottom: 100, left: 20, right: 20 };

	function getDailyData (products, transactions, start, dayCount) {
		var graphData = [];
        
		for (var i = 0; i <= dayCount; i++) {
			var category = [];
			var date = start.clone().add(i, 'days');
            var startOfDate = date.clone();
            var endOfDate = date.clone().endOf('day');

			if (dayCount > 7) {
				category['category'] = date.format('M/D');
			} else {
				category['category'] = date.format('M/D ddd');
			}

			products.forEach(function(product) {
				var sales = transactions.filter(function(transaction) {
					if (transaction.product_id == product.ID && moment(transaction.created_at).isBetween(startOfDate, endOfDate, undefined, '[]')) {
						return true;
					}
					return false;
				});
                
                var payments = 0;
                var total = d3.sum(sales, function(sale) {
                    if (sale.status == 'complete' || sale.status == 'refunded') {
                        payments += 1;
                        return sale.total;
                    }
                    return 0;
                });
                
                var refund = d3.sum(sales, function(sale) {
                    if (sale.status == 'refunded') {
                        return sale.total;
                    }
                    return 0;
                });
                
				category[product.ID] = {
                    payments: payments,
                    revenue: total,
                    refund: refund,
                    net: total - refund
                };
			});

			graphData.push(category);
		}

		_graphData = graphData;
	}

    /**
    * Get report data by yearly if selected period scope is over 31 days but it is under 365 days
    * 
    * @param products
    * @param transactions
    */
	function getMonthlyData (products, transactions, start, end) {
		var graphData = [];
        var resultTotal = [];
        var resultRefund = [];
        var resultPayments = [];
        const[startDateArr, endDateArr] = getMonthlyScopeArr(start, end);
        
        transactions.forEach(function(transaction) {
            var resultKey = moment(transaction.created_at).format('YYYY-MM');
            if (!resultTotal[resultKey]) { resultTotal[resultKey] = []; resultRefund[resultKey] = []; resultPayments[resultKey] = []; }
            if (!resultTotal[resultKey][transaction.product_id]) {
                resultTotal[resultKey][transaction.product_id] = 0; 
                resultRefund[resultKey][transaction.product_id] = 0;
                resultPayments[resultKey][transaction.product_id] = 0;
            }
            
            if (transaction.status == 'complete' || transaction.status == 'refunded') {
                resultTotal[resultKey][transaction.product_id] += parseFloat(transaction.total);
                resultPayments[resultKey][transaction.product_id] += 1;
            }
            
            if (transaction.status == 'refunded') {
                resultRefund[resultKey][transaction.product_id] += parseFloat(transaction.total);
            }
        });
        
		for (var i = 0; i < startDateArr.length; i++) {
            var resultKey = startDateArr[i].format('YYYY-MM');
			var category = [];
			category['category'] = resultKey;

			products.forEach(function(product) {
                if (resultTotal[resultKey]) {
                    category[product.ID] = {
                        payments: !resultPayments[resultKey][product.ID] ? 0: resultPayments[resultKey][product.ID],
                        revenue: !resultTotal[resultKey][product.ID] ? 0: resultTotal[resultKey][product.ID],
                        refund: !resultRefund[resultKey][product.ID] ? 0 : resultRefund[resultKey][product.ID],
                        net: !resultTotal[resultKey][product.ID] ? 0 : (resultTotal[resultKey][product.ID] - resultRefund[resultKey][product.ID])
                    };
                } else {
                    category[product.ID] = {
                        payments: 0,
                        revenue: 0,
                        refund: 0,
                        net: 0
                    };
                }
			});

			graphData.push(category);
		}
		
		_graphData = graphData;
	}
    
    /**
    * Get report data by yearly if selected period scope is over 365 days
    * 
    * @param products
    * @param transactions
    */
    function getYearlyData (products, transactions) {
        var graphData = [];
        for (var y = moment(transactions[0]['created_at']).year(); y <= moment(transactions[transactions.length - 1]['created_at']).year(); y++) {
            var category = [];
            category['category'] = y;
            
            products.forEach(function(product) {
                var sales = transactions.filter(function(transaction) {
                    if (transaction.product_id == product.ID && moment(transaction.created_at).year() == y) {
                        return true;
                    }
                    return false;
                });
                
                var payments = 0;
                
                var total = d3.sum(sales, function(sale) {
                    if (sale.status == 'complete' || sale.status == 'refunded') {
                        payments += 1;
                        return sale.total;
                    }
                    return 0;
                });
                
                var refund = d3.sum(sales, function(sale) {
                    if (sale.status == 'refunded') {
                        return sale.total;
                    }
                    return 0;
                });
                
                category[product.ID] = {
                    payments: payments,
                    revenue: total,
                    refund: refund,
                    net: total - refund
                };
            });
            graphData.push(category);
        }
        _graphData = graphData;
    }

	function getGraphData (products, transactions, start, end) {
		var dayCount = end.diff(start, 'days');
		if (dayCount > 365) {
            getYearlyData(products, transactions);
        } else if (dayCount > 31) {
			getMonthlyData(products, transactions, start, end);
		} else {
			getDailyData(products, transactions, start, dayCount);
		}
	}

	function draw (products) {
	    
	    // product key:value
		var productObject = {};
		products.forEach(function(p) {
			productObject[p.ID] = p;
		});
	    
	    // Data Keys Extract
		var categories = _graphData.map(function(d) { return d.category; });                                                                               
		var productIDs = products.map(function(d) { return d.ID; });
		var totals = _graphData.map(function(category) {
            var payments = 0;
			var revenue = 0;
            var refund = 0;
			productIDs.forEach(function(product) {
                payments += category[product]['payments'];
                revenue += category[product]['revenue'];
				refund += category[product]['refund'];
			});
			return {
                payments: payments,
                revenue: revenue,
                refund: refund,
                net: revenue - refund
            };
		});
        
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
		
        // Total Payments #
        var totalPayments = totals.map(function(d) { return d.payments; }).reduce(reducer);
		var totalPrice = totals.map(function(d) { return d.revenue; }).reduce(reducer);
        var refundTotalPrice = totals.map(function(d) { return d.refund; }).reduce(reducer);
        var netTotalPrice = totalPrice - refundTotalPrice;
        
		$('#' + _overviewID).html('PAYMENTS = ' + totalPayments + ', <strong>PAYMENTS NET TOTAL = ' + formatedPrice(netTotalPrice) + '</strong>, REVENUE = ' + formatedPrice(totalPrice) + ', REFUNDED = ' + formatedPrice(refundTotalPrice));

		// Init Container Size
		var containerWidth  = _container.innerWidth();
		var containerHeight = 500;

		_width  = containerWidth  - _margin.left - _margin.right;
		_height = containerHeight - _margin.top  - _margin.bottom;

		/*_SVG.attr('width',  containerWidth);
		_SVG.attr('height', containerHeight);*/
        _SVG.attr('viewBox', '0 0 ' + containerWidth + ' 500');

		_GROUP.selectAll("*").remove();
		_GROUP.attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");

		// Draw SVG
		var stack = d3.stack();

		var xScale = d3.scaleBand()
			.rangeRound([0, _width])
			.padding(0.3)
			.align(0.5)
			.domain(categories);

		var yScale = d3.scaleLinear()
			.rangeRound([_height, 0])
			.domain([0, d3.max(totals, function(d) { return d.net; })]).nice();

        var _graphDataCompleteOnly = _graphData.map(function(data) {
            var newData = {};
            for(key in data) {
                newData[key] = data[key].net;
            }
            newData['category'] = data.category;
            return newData;
        });
        
        var paymentsOnly = _graphData.map(function(data) {
            var newData = {};
            for(key in data) {
                newData[key] = data[key].payments;
            }
            newData['category'] = data.category;
            return newData;
        });                        
        
		_GROUP.selectAll(".product")
			.data(stack.keys(productIDs)(_graphDataCompleteOnly))
			.enter().append("g")
			.attr("class", "product")
			.selectAll("rect")
			.data(function(d) {
				d.forEach(function(e) {
					e.product_id = d.key;
					e.color = productObject[d.key].color;
                    e.payments = paymentsOnly.filter(function(p) { return p.category == e.data.category; })[0];
				});
				return d;
			})
			.enter().append("rect")
			.attr("fill", function(d) { return d.color; })
			.attr("x", function(d) { return xScale(d.data.category); })
			.attr("y", function(d) { return yScale(d[1]); })
			.attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
			.attr("width", xScale.bandwidth())
			.on("mouseover", function(d) {
				var productName = products.filter(function(p) { return p.ID == d.product_id; })[0]['post_title'];
                var productPayments = d.payments[d.product_id];
				var productSale = d.data[d.product_id];
				var tooltip = d3.select("#" + _tooltipID);
				tooltip.select(".product_title").text(productName);
                tooltip.select(".product_payments").text(productPayments + (productPayments == 1 ? ' payment' : ' payments'));
				tooltip.select(".product_sale").text(formatedPrice(productSale));
				tooltip.classed("hidden", false);
                var xPosition = xScale(d.data.category) + xScale.bandwidth() + _margin.left + _margin.right;
                if (xPosition + tooltip.node().clientWidth > _width) {
                    xPosition = xScale(d.data.category) - tooltip.node().clientWidth;
                }
                var yPosition = yScale(d[1]);
                tooltip.style("left", xPosition + "px").style("top", yPosition + "px");
			})
			.on("mouseout", function() {
				d3.select("#" + _tooltipID).classed("hidden", true);
			});

		_GROUP.append("g")
			.attr("class", "category-axis")
			.attr("transform", "translate(0," + _height + ")")
			.call(d3.axisBottom(xScale).tickSize(0).tickPadding(20))
			.call(g => g.select(".domain").remove());

		_GROUP.append("g")
			.attr("class", "category-total-axis")
			.attr("transform", "translate(0," + _height + ")")
			.call(d3.axisBottom(xScale).tickSize(0).tickPadding(60).tickFormat(function(d, i) {
                return '$' + parseFloat(totals[i].net.toFixed(2));
			}))
			.call(g => g.select(".domain").remove());
	}
 
	return {
		init : function (containerID, overviewID, tooltipID) {
			_overviewID = overviewID;
			_tooltipID = tooltipID;

			_container = $('#' + containerID);

			_SVG = d3.select("#" + containerID).append("svg");
			_GROUP = _SVG.append("g");
		},
		update: function () {
            var productIds = SalesProductFilter.getProductIds();
			var products = SalesProductFilter.getProducts();
			var transactions = SalesDateFilter.getTransactions(productIds);
			var start = SalesDateFilter.getDate().start;
			var end = SalesDateFilter.getDate().end;
			getGraphData(products, transactions, start, end);
			draw(products);
		}
	}; // end of the return
}());

var SalesTable = (function () {
    var $ = jQuery;
    var table;
    var _tableData;

	function getArraySum (data) {
		if (data.length > 0) {
			return data.reduce(function(total, t){ return total + t; })
		}
		return 0;
	}

	function getTableData (products, transactions) {
		_tableData = [];
        
		products.forEach(function(product) {
			var allTransaction = transactions.filter(function(transaction) {
				return transaction.product_id == product.ID;
			});
            
			var couponTransaction = transactions.filter(function(transaction) {
				return transaction.product_id == product.ID && transaction.coupon_id != '0';
			});
            var total = getArraySum(allTransaction.map(function(d){
                if (d.status == "complete" || d.status == "refunded") {
                    return parseFloat(d.total);
                }
                return 0;
            }));
            var refundTotal = getArraySum(allTransaction.map(function(d){
                if (d.status == "refunded") {
                    return parseFloat(d.total);
                }
                return 0;
            }));
            var net = total - refundTotal;

			_tableData.push({
                checkbox: '',
				productColor : '<span class="color" style="background-color: ' + product.color +'">&nbsp;</span>',
				productName : '<div class="name">' + product.post_title + '</div>',
				quantity : allTransaction.length,
				coupon : couponTransaction.length,
				total : formatedPrice(total),
                refundTotal : formatedPrice(refundTotal),
                net: formatedPrice(net),
                responsive: ''
			});
		});
	}

	function update () {
		table.clear().rows.add(_tableData).draw().responsive.recalc();
	}

	function filename(isMomentAppend = false) {
		var filename = $('.tab-content.active .report-list a.active').length ? $('.tab-content.active .report-list a.active').html() : $('#pro-reports-tabs-wrapper .nav-tab-active').html() + ' Report';
		if (isMomentAppend) {
			filename += ' - ' + moment().format('YYYY-MM-DD');
		}
		return filename;
	}

	return {
		init : function () {
            if (table == undefined) {
                table = $('#sales-list').DataTable( {
                    "dom": "Blfrtip",
                    "buttons": {
						"dom": {
							"button": {
								"className": ""
							}
						},
						"buttons": [
				            { 
				            	extend: 'csv', 
				            	exportOptions: { 
					            	columns: ':visible:not(:first-child):not(:contains(Color))'
					            },
					            action: function(e, dt, button, config) {
							        config.filename = filename(true);
							        $.fn.DataTable.ext.buttons.csvHtml5.action.call(this, e, dt, button, config);
							    }
					        },
				            { 
				            	extend: 'pdf', 
				            	exportOptions: { 
					            	columns: ':visible:not(:first-child):not(:contains(Color))'
					            },
					            action: function(e, dt, button, config) {
							        config.filename = filename(true);
							        config.title = filename();
							        $.fn.DataTable.ext.buttons.pdfHtml5.action.call(this, e, dt, button, config);
							    }
					        }
				        ]
					},
                    "responsive": {
                        details: {
                            type: "column",
                            target: -1
                        }
                    },
                    "paging": false,
                    "columns": [
                        { data: 'checkbox', className: 'left'},
                        { data: 'productColor', className: 'center'},
                        { data: 'productName', className: 'left' },
                        { data: 'quantity', className: 'center'},
                        { data: 'coupon', className: 'center' },
                        { data: 'total', className: 'right' },
                        { data: 'refundTotal', className: 'right' },
                        { data: 'net', className: 'right' },
                        { data: 'responsive'}
                    ],
                    "order": salesOptions.order && salesOptions.order.length ? salesOptions.order : [[ 5, "desc" ]],
                    "language": {
                        "info": "Showing _START_ to _END_ of _TOTAL_ products"
                    },
                    "select": "multi",
                    "columnDefs": [ 
                        { 
                            "targets": 0, 
                            "orderable": false, 
                            "checkboxes": {
                               "selectRow": true,
                            },
                        },
                        { 
                            "targets": 1, 
                            "orderable": false,
                            "width": "40px"
                        },
                        {
                            className: 'dtr-control',
                            orderable: false,
                            targets:   -1
                        }
                    ]
                } );
                
                if (WPJReports.premiumAvailable) {
                    var columnsFilterHtml = $('<div class="columns_filter_wrapper" data-table-id="sales-list"><strong>Filter Columns: </strong></div>');
                    columnsFilterHtml.append('<span><input type="checkbox" id="sales_color" data-column="1" checked="checked" /><label for="sales_color">Color</label></span>');
                    columnsFilterHtml.append('<span><input type="checkbox" id="sales_product_name" data-column="2" checked="checked" /><label for="sales_product_name">Product Name</label></span>');
                    columnsFilterHtml.append('<span><input type="checkbox" id="sales_payments" data-column="3" checked="checked" /><label for="sales_payments">Payments</label></span>');
                    columnsFilterHtml.append('<span><input type="checkbox" id="sales_coupons" data-column="4" checked="checked" /><label for="sales_coupons">Coupons</label></span>');
                    columnsFilterHtml.append('<span><input type="checkbox" id="sales_revenue" data-column="5" checked="checked" /><label for="sales_revenue">Revenue</label></span>');
                    columnsFilterHtml.append('<span><input type="checkbox" id="sales_refunded" data-column="6" checked="checked" /><label for="sales_refunded">Refunded</label></span>');
                    columnsFilterHtml.append('<span><input type="checkbox" id="sales_net" data-column="7" checked="checked" /><label for="sales_net">Net</label></span>');
                    columnsFilterHtml.insertBefore('#sales-list');
                    
                    setTimeout(function() {
                    	if ($('#sales-report-list a.active').length == 0) {
	                        $('#pro_report_sales_table .columns_filter_wrapper input').each(function(){
	                        	var column = table.column($(this).data('column'));
	                            if (salesOptions.filteredColumns !== undefined && salesOptions.filteredColumns.length > 0 && !salesOptions.filteredColumns.includes($(this).attr('id'))) {
	                                $(this).prop('checked', false);
	                    			column.visible(false);
	                            } else {
	                            	$(this).prop('checked', true);
	                				column.visible(true);
	                            }
	                        });
	                    }
                    }, 30);
                }
            }
		},
		update: function () {
            var productIds = SalesProductFilter.getProductIds();
			var products = SalesProductFilter.getProducts();
			var transactions = SalesDateFilter.getTransactions(productIds);
			getTableData(products, transactions);
			update();
		},
		updateOrderFilter : function (filteredColumns, order) {
			$('#pro_report_sales_table .columns_filter_wrapper input').each(function(){
            	var column = table.column($(this).data('column'));
                if (filteredColumns.length && !filteredColumns.includes($(this).attr('id'))) {
                	$(this).prop('checked', false);
                    column.visible(false);
                } else {
                	$(this).prop('checked', true);
                	column.visible(true);
                }
            });

            table.order(order[0]).draw();
		}
	}
}());

function sales() {
    var $ = jQuery;
    if (!salesTabInitialized) {
    	var param = {};
        $('#sales-tab-content > .hidden').removeClass('hidden');
        $('#sales-tab-content .wpj_reports_loading').hide();

        if (WPJReports.param) {
            param = JSON.parse(atob(WPJReports.param));
            if (param.sales != undefined) {
            	salesOptions = param.sales;
            }
        }
        
        // Sales tab
        SalesChart.init('pro_report_sales_chart', 'sales_total_overview', 'pro_report_sales_chart_tooltip');
        SalesTable.init();
        SalesProductFilter.init('pro_report_sales_product_filter');
        SalesDateFilter.init('pro_report_sales_date_filter');
        salesTabInitialized = true;
        
        if (WPJReports.reports != undefined && WPJReports.reports.sales != undefined && Object.entries(WPJReports.reports.sales).length) {
        	$('#sales-report-list').html('<strong>Custom Reports: </strong>');
        	var first_report_flag = true;
	        for (const [reportID, report] of Object.entries(WPJReports.reports.sales)) {
	        	if (first_report_flag) {
	        		first_report_flag = false;
	        	} else {
	        		$('#sales-report-list').append('<span>|</span>');
	        	}
	            $('#sales-report-list').append('<a href="javascript:;" id="' + report.reportID + '">' + report.reportName + '</a>');
	        }
	    }

	    if (param.sales == undefined) {
	    	var reportID;
	    	if (WPJReports.reportID != undefined) {
	    		reportID = WPJReports.reportID;
	    	} else {
	    		reportID = localStorage.getItem('wpj-sales-last-report');
	    	}
		    
		    $('#sales-report-list').find('#' + reportID).trigger('click');
		}
    }
}