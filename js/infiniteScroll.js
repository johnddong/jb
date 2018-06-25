var _get = function(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
};


/**
* Infinite Scroll
* Desc:
*	  via button submit or scroll to bottom to ajax request next 'page' of search results
*   upon scroll to request, page number incrmented and append to url, ex: url?page=2 (default hidden page val = 1)
*   upon submit to request, page number will be removed from url, ex: url (hidden page val set back to 1)
* @param {string} page page=1 to ~
* @param {number} col 3 or 4 columns on PC
* @param {string} pg pg=1 to ~ (anchor via URL)
*/

var infiniteScroll = (function($, win, doc) {
	$win = $(win),
	$doc = $(doc),
	$this = {},
	page = '',
	code = '',
	ajaxPath = '',
	viewType = { // display type
		id: 'view-type',
		default: 'grid'
	},
	is_request = true,
	c = {
		active: 'active',
		loader: 'loader',
		footer: 'footer'  // for scroll offset
	},
	timer = null,
	scrollOffset = $('.'+c.footer).height(),

	init = function(options) {
		var defaults = {
			_this: 'product-grid',
			page: 'page', // current page number
			code: 'code', // current page id
			col: 4,       // 3 or 4 columns on PC
			ajaxPath: 'js/api-temp/product-list.json'
		},
		v = $.extend(true, defaults, options);
		$this = $('.'+v._this),
		page = v.page,
		code = v.code,
		col = v.col,
		ajaxPath = v.ajaxPath;
		/* cancel data request */
		var pageSize = parseInt($('[name="pageSize"]').val(), 10); // from html markup
		if (pageSize == 1 || pageSize <= _get(page)) return;
		formSetup();
		addLoader();
		scrollRequest();
	},
	
	formSetup = function() {
		if ($this.find('form').length == 0) {
			$('<form />', {action: ajaxPath}).insertAfter($this);
		} 
		var pageNum = (_get(page) == '') ? 1 : _get(page);
		$('<input />', {type: 'hidden', name: page}).val(pageNum).appendTo('form');
		var codeId = _get(code);  
		if (codeId != '') $('<input />', {type: 'hidden', name: code}).val(codeId).appendTo('form');
	},
	
	trim = function(data) { // remove empty filed upon ajax submission
		return data.replace(/[^&]+=\.?(?:&|$)/g, '');
	},
	
	scrollRequest = function() {
		$win.on('scroll', function() {
			if($(this).scrollTop() + $win.height() >= $doc.height() - scrollOffset) {
				if (is_request) {
					is_request = false;
					//add loader();
					$('#'+c.loader).appendTo($this).animate({opacity: 1}, 500);
					clearTimeout($.data(this, 'scrollTimer'));
					$.data(this, 'scrollTimer', setTimeout(function() { // prevent frequent request
						requestData($this.parent().find('form'), 'scroll');
					}, 500));
				}
			}
		});
	},
	
	addParam = function(url, param, value) { // source: stackoverflow.com/users/336827/freedev
		var a = document.createElement('a'),
		regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g;
		var match, str = []; a.href = url; param = encodeURIComponent(param);
		while (match = regex.exec(a.search))
			if (param != match[1]) str.push(match[1]+(match[2]?"="+match[2]:""));
				str.push(param+(value?"="+ encodeURIComponent(value):""));
		a.search = str.join("&");
		return a.href;
	},

	requestData = function($form, requestType) { // ajax callback and populate data
		var
		$page = $('input[name="'+page+'"]'), // hidden val for page
		pageNum = _get(page);
		// set url page param
		if (requestType == 'submit') {
			$page.val(1); // default input hidden val for page
			history.replaceState({}, '', location.pathname+'?'+trim($form.serialize()));
		} else if (requestType == 'scroll') { // add page param to URL
			pageNum = (pageNum == '') ? parseInt($page.val(), 10)+1 : parseInt(pageNum, 10)+1;
			$page.val(pageNum);
			var url = addParam(location.href, page, pageNum);
			history.replaceState({}, '', url);
		}

		// request data
		$.ajax({
			method: 'post',
			url: $form.attr('action'),
			data: trim($form.serialize()),
			requestType: requestType,
			dataType: 'json',
			success: populate,
			error: errorMsg
		});
	},

	getViewType = function() {
		var type = viewType.default;
		$('#'+viewType.id).find('li').each(function() {
			if ($(this).hasClass(c.active)) {
				type = $(this).children().data('type')
			}
		});
		return type;
	},

	populate = function(json) {
		if (json.search != null) {
			rmLoader();
			var 
			anchor,
			productEl = '',
			mobileColClass = '',  // bootstrap col class 
			colClass = '',
			pageNum = parseInt(_get(page), 10);

			if (json.search == '') return;
			$.each(json.search, function(i, e) {
				anchor = (i == 0) ? '<a name="pg'+pageNum+'"></a>' : '';
				mobileColClass = (getViewType() == viewType.default) ? 'col-ss-6' : 'col-ss-12';
				colClass = (col == 4) ? 
					mobileColClass + ' col-xs-6 col-sm-4 col-md-4 col-lg-3"' : // 4 columns on PC
					mobileColClass + ' col-xs-6 col-sm-6 col-md-6 col-lg-4"';  // 3 columns on PC
				productEl =
					anchor +
					'<div class="'+colClass+'">'+
						'<div class="product-item layout1">'+
							'<div class="product-inner">'+
								'<div class="thumb">'+
									'<div class="group-button">'+
										'<a href="javascript:void(0);" class="wishlist-button wishlist" data-sku="'+e.btn.pid+'" data-type="wishlist"></a>'+
									'</div>'+
									'<a href="'+e.url+'"><img src="'+e.image+'" alt=""></a>'+
								'</div>'+
								'<div class="info">'+
									'<a href="'+e.url+'" class="product-name">'+e.desc+'</a>'+
									'<div class="price">'+
										'<span class="del"><span>'+e.fixed_price+'</span></span>'+
										'<span class="ins">$<span>'+e.sale_price+'</span></span>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';

				$this.append(productEl).find('.wishlist').on('click', function() { // add to wish list
					Cart.wish(this);
				});

			});
			is_request = (pageNum >= json.result.pageSize) ? false : true; // false: reach the last page of search results
		}
	},
	
	errorMsg = function() {
		rmLoader();
		$.notify({
			message: '系統異常，請稍候再試'
		}, {
			type: 'warning'
		});
	},

	addLoader = function() {
		//loader
		if ($('#'+c.loader).length == 0) {
			$('<div />', {id: c.loader}).css({
				width: '100%',
				height: '32',
				clear: 'both',
				opacity: 0,
				position: 'absolute',
				bottom: 10
			}).addClass(c.loader).insertAfter($this);
		}
	},

	rmLoader = function() {
		$('#'+c.loader).animate({opacity: 0}, 300);
	};

	return {
		init: init
	};
		
})(jQuery, window, document);
