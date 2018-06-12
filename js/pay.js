/**
* _get
*/

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
* pay
*/

var Pay = (function() {
  var
  ajaxUrl = {
    remove: 'js/api-temp/remove-cart-success.json'   // remove cart
  },
  $cartContent = $('.cart-content'),
  $coupon = $cartContent.find('.coupon'),
 
  $myModal = $('#myModal'),

  format = function(str) {
    return str.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  },

  trim = function(price) {
    return parseInt(price.toString().replace(/,/g, ''), 10);
  };

  init = function() {
    // disable input from entering
    $cartContent.find('.quantity-btn .qty').on('keyup', function() {
      var
      $this = $(this),
      val = $this.val(),
      attr = {
				qty_base: 1,
				max: 'max',
				min: 'min'
			},
      max = parseInt($this.attr(attr.max), 10),
      min = parseInt($this.attr(attr.min), 10),
      reg = /^[0-9]{1,3}$/;
      if (reg.test(val)) {
        val = parseInt(val, 10);
        if (min <= val && val <= max) {
          attr.qty_base = val;
          $this.val(val);
        } else {
          $this.val(min);
          attr.qty_base = min;
        }
      } else {
        $this.val(min);
        attr.qty_base = min;
      }
    });
    // plus & minus calc
    $cartContent.find('.quantity-btn .btns-plus, .quantity-btn .btns-minus').on('click', function(){
      var $this = $(this);
      setTimeout(function() {
        subTotal($this);
      }, 1);
    });
    // remove cart
    $cartContent.find('.delete-item').on('click', function() {
      removeCart(this);
    });
    // 查看優惠券
    getCoupon();
  },

  subTotal = function(obj) {
    var subTotal = 0   // 小計
      , grandTotal = 0 // 總計
      , discount = 0   // 折扣序號
      , point = 0     // 紅利
      , pirce = 0      // 單價
      , qty = 0        // 數量
      , specialStore = 'special-store' // 特別店鋪
      , $checkoutBtn = $cartContent.find('.btns-checkout')
      , $grandTotal = $cartContent.find('.grandtotal')
      , $point = obj.find('.point')
      , $discount = obj.find('.discount')
      , $subTotal = obj.parents('li').eq(0).find('.total')
      , $row = obj.parents('li').eq(0).find('.each-item')
    // cal subtotal
    $row.each(function() {
      if($(this).hasClass('pay-sold-out')) {
    	  subTotal += 0; //已下架商品金額不列入小計
      } else {
        if ($(this).find('[type="checkbox"]').prop('checked')) {
          qty = parseInt($(this).find('input[name="qty"]').val(), 10);
          price = trim($(this).find('.price span').text());
          subTotal += qty * price;
        }
      }
    });
    // cart empty, reset every field to 0
    if (subTotal == 0) {
      // 紅利
      if ($point.length > 0) $point.find('span').text(0);
      // 折扣序號
      if ($discount.length > 0) $discount.find('span').text(0);
    }
    // show grand total
    if ($point.length > 0) point = trim($point.find('span').text());
    if ($discount.length > 0) discount = trim($discount.text());
    $subTotal.find('span').text(format(subTotal - point - discount ));
    // cal grandTotal
    $cartContent.find('.total span').each(function() {
      grandTotal += ($(this).parents('li').eq(0).hasClass(specialStore))? 0 :trim($(this).text());
    });
    $grandTotal.text(format(grandTotal));
    // checkout btn
    (grandTotal == 0) ? $checkoutBtn.hide() : $checkoutBtn.show();

    return {subTotal: subTotal, grandTotal: grandTotal};
  },

  removeCart = function(_this) {
    var fa = {
      trash: 'fa-trash-o',
      spinner: 'fa-circle-o-notch fa-spin'
    },
    attr = {
      orderId: 'orderid',    // 主商品
      relatedId: 'relatedid' // 加購品
    },
    c = {
      eachItem: 'each-item', // tr
      modalBody: 'modal-body',
      productTitle: 'product-title',
      btnPrimary: 'btn-primary'
    };

    var $this = $(_this)
      , type = $this.data('type')
      , orderId = $this.parent().data(attr.orderId)
      , relatedId = $this.parent().data(attr.relatedId)
      , messageTitle 
      , message;

      messageTitle = (type == 'del-all') ? '是否確定刪除該店鋪所有商品?' : '是否確定刪除該筆商品?';
      message = '<div>'+ messageTitle +'<br />'+
                  '一旦刪除將無法還原'+
                  '</div>';

    message += '<div>' + $this.parent().find('.'+c.productTitle).text() + '</div>';
    if (relatedId == undefined) { // 為主商品，check是否有加購商品
      var additional = '<ul>'
        , count = 0;
      $cartContent.find('.'+c.eachItem).each(function() {
        if ($(this).data(attr.relatedId) == orderId && $(this).data(attr.relatedId) != undefined) { // 刪除加購商品
          additional += '<li>'+ $(this).find('.'+c.productTitle).text() +'</li>';
          count++;
        }
      });
      additional += '</ul>';
      if (count > 0) {
        message += '<div class="note">您的加購商品將會一併刪除：</div>' + additional;
      }
    }
    $myModal.find('.'+c.modalBody).html(message);

    // add spinner
    $this.find('i').removeClass(fa.trash).addClass(fa.spinner);

    // modal btn-ok
    $myModal.modal('show').find('.'+c.btnPrimary).on('click', function () {
      $myModal.modal('hide');
      $.post(ajaxUrl.remove, {orderId: orderId}, function(json) {
        if (json.success) {
          // 刪除加購商品
          if (relatedId == undefined) { // 為主商品，check是否有加購商品
            $cartContent.find('.'+c.eachItem).each(function() {
              if ($(this).data(attr.relatedId) == orderId) { // 刪除加購商品
                $(this).remove();
              }
            });
          }
          // save $row before deleting each-item 
          var $row = $this.parents('li').eq(0).find('.each-item');
          // 刪除主商品
          $this.parent().remove();
          subTotal($row);
        } else {
          $.notify(json.msg);
        }
      });
    });
    // modal btn-cancel & backdrop
    $myModal.on('hide.bs.modal', function () {
      // unbind click evt
      $myModal.modal('show').find('.'+c.btnPrimary).off('click');
      $myModal.find('.'+c.modalBody).text('');
      // rm spinner
      $this.find('i').removeClass(fa.spinner).addClass(fa.trash);
    });
  },

  getCoupon = function() {
    $('.product-coupon .btns-primary').on('click', function() {
      $myModal.modal('show').find('.btn-primary').on('click', function () {
        // $('#coupon').find('input').each(function() {
        //   if ($(this).prop('checked')) {
        //   }
        // });
        $myModal.modal('hide');
      });
    });
  };

  init();

  return {
    subTotal: subTotal,
    removeCart: removeCart
  };

})();




/**
 * 特別店鋪&一般店鋪 checkbox to checkout 
 * 
 */
$(function() {
  (function() {
    var  
    $cartContent = $('.cart-content'),
    c = {
      headerCheckbox: 'shopping-cart-header [type="checkbox"]',
      bodyerCheckbox: 'shopping-cart-content [type="checkbox"]',
      footerCheckbox: 'shopping-cart-footer .pull-left [type="checkbox"]',
      generalStore: 'general-store',
      specialStore: 'special-store',
      return: { // 退貨申請 on 退貨確認頁
        reason: 'return-reason',
        disable: 'disable',
        btn: 'btns'
      }
    },
    $headerCheckbox = $cartContent.find('.'+c.headerCheckbox),
    $bodyerCheckbox = $cartContent.find('.'+c.bodyerCheckbox),
    $footerCheckbox = $cartContent.find('.'+c.footerCheckbox),
  
    init = function() {
      // checkbox checked onload
      $cartContent.find('.checkbox-cont').each(function() {
        if ($(this).find('[type="checkbox"]').data('status') == 'checked') {
          $(this).click().checked();
          // 退貨申請
          var $returnReason = $(this).parents('li').eq(0).find('.'+c.return.reason);
          if ($returnReason.length > 0 && $returnReason.find('option:selected').val() != '') { 
            $returnReason.find('.'+c.return.btn).removeClass(c.return.disable);
          }
          Pay.subTotal($(this));
        }
      });

      // 退貨申請
      if ($('.'+c.return.reason).length > 0) {
        $('.'+c.return.reason).on('change', function() {
          var isChecked = 0
            , $this = $(this);
          $(this).parents('li').eq(0).find('[type="checkbox"]').each(function() {
            if ($(this).prop('checked')) {
              isChecked++;
            }
          });
          if (isChecked > 0 && $this.find('option:selected').val() != '') // none checked && select val != ''
            $this.find('.'+c.return.btn).attr('data-type', 'return-apply').removeClass(c.return.disable);
          else {
            $this.find('.'+c.return.btn).attr('data-type', 'return-message').addClass(c.return.disable);
          }
        });
      }
     
      // store header
      $headerCheckbox.on('click', function() {
        headerCheckbox(this);
      });

      // store header's children
      $bodyerCheckbox.on('click', function() {
        childrenCheckbox(this);
      });

      //check all, excluding special stores
      checkAll();
    },
    
    headerCheckbox = function(_this) {
      var storeType = $(_this).parents('li').eq(0).data('type')
        , payResult = {};
      if ($(_this).prop('checked')) {
        allHeaderCheck(storeType);
        childrenCheck(_this);
      } else {
        allHeaderUncheck(storeType);
        childrenUnCheck(_this);
      }
      // cal grand total
      payResult = Pay.subTotal($(_this));
    },

    childrenCheckbox = function(_this) {
      var $li = $(_this).parents('li').eq(0)
        , payResult = {}
        , isChildChecked;
      if ($(_this).prop('checked')) {
        allHeaderCheck($li.data('type'));
        isChildChecked = childCheck(_this);
        if ($('.'+c.return.reason).length > 0) { // 退貨申請
          if (isChildChecked > 0 && $li.find('.'+c.return.reason + ' option:selected').val() != '') { // checked && select val != ''
            $li.find('.'+c.return.btn).attr('data-type', 'return-apply').removeClass(c.return.disable);
          }
        }
      } else {
        allHeaderUncheck($li.data('type'));
        headerUncheck(_this);
        isChildChecked = childCheck(_this);
        if ($('.'+c.return.reason).length > 0) { // 退貨申請
          if (isChildChecked == 0 || $li.find('.'+c.return.reason + ' option:selected').val() == '') { // unchecked && select val == ''
            $li.find('.'+c.return.btn).attr('data-type', 'return-message').addClass(c.return.disable);
          }
        }
      }
      // cal grand total
      payResult = Pay.subTotal($(_this));
    },

    headerUncheck = function(_this) {
      // uncheck header 
      var isHeaderChecked = $(_this).parents('li').eq(0).find('.'+c.headerCheckbox);
      if (isHeaderChecked.prop('checked')) { // header checked 
        isHeaderChecked.prop('checked' , false).next().remove();
      }
    },

    childCheck = function(_this) {
      var isChildChecked = 0
        , childrenLen = $(_this).parents('.tbody').eq(0).find('[type="checkbox"]:not(":disabled")').length
          // checkAll check
        , bagCheckedCount = 0
        , $orderList = $cartContent.find('#order-list li')
        , bagCheckedLen = $orderList.not('.disabled').find('.'+c.headerCheckbox).length;
        
      $(_this).parents('.tbody').eq(0).find('[type="checkbox"]').each(function() {
        if ($(this).prop('checked')) {
          isChildChecked++;
        }
      });
      if (isChildChecked == childrenLen) { // children all checked
        if (!$(_this).parents('li').eq(0).find('.'+c.headerCheckbox).prop('checked')) { // header not check
          $(_this).parents('li').eq(0).find('.'+c.headerCheckbox).click();
        }
      }
      // checkAll checked or unchecked 
      $orderList.not('.disabled').each(function() {
        if ($(this).find('.'+c.headerCheckbox).prop('checked')) bagCheckedCount++;
      });
      if (bagCheckedCount == bagCheckedLen) {
        if ($footerCheckbox.prop('checked', true).parent().find('i').length == 0) {
          $footerCheckbox.prop('checked', true).parent().append('<i class="fa fa-check" aria-hidden="true"></i>'); // checkAll checked
        }
      } else {
        if ($footerCheckbox.prop('checked')) { 
          $footerCheckbox.prop('checked', false).parent().find('i').remove(); // checkAll unChecked 
        }
      }

      return isChildChecked;
    },
  
    allHeaderCheck = function(storeType) {
      var disabled = 'disabled';
      $headerCheckbox.each(function() {
        if ($(this).parents('li').eq(0).data('type') == storeType) { 
          if ($(this).parents('li').eq(0).hasClass(disabled)) {
            $(this).parents('li').eq(0).removeClass(disabled); // rm disabled bg
          }
        } else {
          $(this).parents('li').eq(0).addClass(disabled); // add disabled bg
          if ($(this).prop('checked')) { // uncheck store's header
            $(this).click();
          } else { // uncheck store's children
            childrenUnCheck(this);
          }
        }
      });
    },
  
    allHeaderUncheck = function(storeType) {
      var disabled = 'disabled';
      switch (storeType) {
        case 'general-store':
          var generalStoreChecked = 0;
          $cartContent.find('li [type="checkbox"]').each(function() {
            if ($(this).parents('li').eq(0).data('type') == c.generalStore && $(this).prop('checked')) {
              generalStoreChecked++;
            }
          });
          if (generalStoreChecked == 0) { // none general-store selected
            $cartContent.find('li [type="checkbox"]').each(function() {
              if ($(this).parents('li').eq(0).data('type') == c.specialStore) {
                if ($(this).parents('li').eq(0).hasClass(disabled)) {
                  $(this).parents('li').eq(0).removeClass(disabled);
                }
              }
            });
          }
        break;
        case 'special-store':
          var specialStoreChecked = 0;
          $cartContent.find('li [type="checkbox"]').each(function() {
            if ($(this).parents('li').eq(0).data('type') == c.specialStore && $(this).prop('checked')) {
              specialStoreChecked++;
            }
          });
          if (specialStoreChecked == 0) { // none speical-store selected
            $cartContent.find('li [type="checkbox"]').each(function() {
              if ($(this).parents('li').eq(0).data('type') == c.generalStore) {
                if ($(this).parents('li').eq(0).hasClass(disabled)) {
                  $(this).parents('li').eq(0).removeClass(disabled);
                }
              }
            });
          }
        break;
      }
    },
    
    childrenCheck = function(_this) {
      $(_this).parents('li').find('.'+c.bodyerCheckbox).each(function() {
        if (!$(this).prop('checked')) $(this).click();
      });
    },
  
    childrenUnCheck = function(_this) {
      $(_this).parents('li').find('.'+c.bodyerCheckbox).each(function() {
        if ($(this).prop('checked')) {
          $(this).click();
        }
      });
    },
  
    checkAll = function() {
      $footerCheckbox.on('click', function() {
        if ($(this).prop('checked')) {
          $headerCheckbox.each(function() {
            if ($(this).parents('li').eq(0).data('type') != c.specialStore && !$(this).prop('checked')) { // 選擇全部 not checked
              $(this).click();
            }
          });
        } else {
          $headerCheckbox.each(function() {
            // if ($(this).parents('li').eq(0).data('type') != c.specialStore && $(this).prop('checked')) { // 選擇全部 checked
            if ($(this).prop('checked')) { // 選擇全部 checked
              $(this).click();
            }
          });
        }
      });
    };
  
    init();
  
  })();
});




/**
* invoice
*/

(function() {
  var $shipping = $('.shipping')
    , $invoice = $shipping.find('.invoice')
    , $invoiceType = $shipping.find('.invoice-type')        // 發票方式：載具 / 捐贈 / 三聯式
    , $carrier = $shipping.find('.carrier')                 //  - 載具
    , $donateBarcode = $shipping.find('.donate-barcode')    //  - 捐贈
    , $invoiceId = $shipping.find('.invoice-id')            //  - 三聯式
    , $carrierType = $shipping.find('.carrier-type')        // 載具方式：手機條碼載具 / 自然人憑證條碼 / 會員載具
    , $mobileCarrier = $shipping.find('.mobile-carrier')    // - 手機條碼載具
    , $citizenCarrier = $shipping.find('.citizen-carrier')  // - 自然人憑證條碼
    , $donateBarcodeInput = $shipping.find('[name="donate_barcode"]')  //愛心條碼欄位
    , select = 'chosen-select';

  $invoice.find('.'+select).change(function() {
    var invoice_type = $(this).find('option:selected').data('option');
    switch (invoice_type) { // 發票開立方式：
      case 'carrier': // 載具
        $invoiceType.hide();
        $carrier.show().css({'visibility': 'visible'}).find('.'+select).change(function() {
          var carrier_type = $(this).find('option:selected').data('option');
          switch (carrier_type) {　// 載具方式：
            case 'mobile-carrier': // 手機條碼載具
              $carrierType.hide();
              $mobileCarrier.show();
              break;
            case 'citizen-barcode': // 自然人憑證條碼
              $carrierType.hide();
              $citizenCarrier.show();
              break;
            case 'member-carrier': // 會員載具
              $carrierType.hide();
              break;
            default: // 回到預設載具方式
              $carrierType.hide();
          }
        });
        break;
      case 'donate': // 捐贈
        $invoiceType.hide();
        $donateBarcode.show().find('.children-fdn span').on('click', function() {
          var fdnCode = $(this).data('fdn-code');
          $donateBarcodeInput.val(fdnCode);
        });
        break;
      case 'triplicate': // 三聯式
        $invoiceType.hide();
        $invoiceId.show();
        break;
      default: // 回到預設發票開立方式
        $invoiceType.hide();
    }
  });
})();



/**
* 同訂購人
* 同會員中心
*/

var syncData = (function() {
  var ajaxUrl = 'js/api-temp/member-get-success.json',
      active = 'active',
      twzipcode = 'twzipcode',
      // 訂購人
      $buyer = $('.customer-info'),
      $buyerName = $buyer.find('[name="buyer_name"]'),
      $buyerMobile = $buyer.find('[name="buyer_mobile"]'),
      $buyerAdress = $buyer.find('.buyer-address'),
      $buyerCountry = $buyer.find('.buyer-country'),
      // 收件人
      $receiver,
      $receiverName,
      $receiverAddress,
      $receiverMobile,

      $ortherInfo = $('.orther-info'),
      $memberInfo = $ortherInfo.find('.sync [type="checkbox"]'), // 同訂購人
      receiverData = {},

  setBuyer = function(_this) {
    var buyerName = $buyerName.val()
      , buyerMobile = $buyerMobile.val()
      , buyerAdress = $buyerAdress.val()
      , buyerCountry = $buyerCountry.find('option:selected');
      
    $receiver =  $(_this).parents('li').eq(0).find('.'+twzipcode),
    $receiverName = $receiver.parent().find('.receiver-name'),
    $receiverMobile = $receiver.parent().find('.receiver-mobile'),
    $receiverAddress = $receiver.find('.receiver-address'),
    $receiverCountry = $receiver.find('select[name="receiver-country"] option');

    $(_this).addClass(active);
    // reset receiver's address
    $ortherInfo.twzipcode('reset');
    $receiverAddress.val(buyerAdress);
    $receiverName.val(buyerName);
    $receiverMobile.val(buyerMobile);
    
    if (buyerCountry.data('type') == 'tw') { // 訂購人 tw option selected
      $receiver.find('.address:gt(0)').show();
      $receiverCountry.each(function() {
        if ($(this).data('type') == 'tw') $(this).prop('selected', true);
      });
      //twzipcode
      $buyer.twzipcode('get', function (buyerCounty, buyerDistrict, buyerZipcode) {
        $receiver.twzipcode('set', {
          'county': buyerCounty,
          'district': buyerDistrict,
          'zipcode': buyerZipcode
        });
      });
    } else { // 訂購人 其它 option selected
      $receiver.find('.address:gt(0)').hide();
      $receiverCountry.each(function() {
        if ($(this).data('type') == 'other') $(this).prop('selected', true);
      });
    }
  },

  resetBuyer = function(_this){
    $(_this).removeClass(active);
    $receiverAddress.val('');
    $receiverName.val('');
    $receiverMobile.val('');
    $receiver.twzipcode('reset');
  },

  countrySelect = function() {
    $('.'+twzipcode).find('.buyer-country, .receiver-country').on('change', function() {
      var type = $(this).find(':selected').data('type')
        , $countrySel = $(this).parents('.'+twzipcode).eq(0).find('.address:gt(0)');
      switch (type) {
        case 'tw': 
          $countrySel.show();
        break;
        case 'other': 
          $countrySel.hide();
        break;
      }
    });
  },

  init = function() {
    // 國家切換
    countrySelect();
    // 同訂購人
    $memberInfo.on('click', function() {
      var $this = $(this);
      if ($this.prop('checked')){
        syncData.setBuyer(this);
      } else {
        syncData.resetBuyer(this);
      }
    });
  };

  init();

  return {
    setBuyer: setBuyer,
    resetBuyer: resetBuyer
  };

})();



/**
* 購物清單縮合
* @param list = 1 (透過網址參數預設展開)
*/

(function() {
  var
  $orderList = $('#order-list'),
  c = {
    active: 'active',
    summary: 'summary',
    detail: 'detail',
    btnContinueShopping: 'continue-shopping'
  },
  $summary = $orderList.find('.'+c.summary),
  $detail = $orderList.find('.'+c.detail),
  $table = $orderList.find('table').length == 0 ? $orderList.find('#list-table'):$orderList.find('table'),
  init = function() {
    if (_get('list') == 1) { // set to open via URL & mod btn back url
      $summary.toggleClass(c.active);
      $detail.css({height: $table.height()});
      $table.find('.'+c.btnContinueShopping).text('回到訂單查詢').attr({href: 'javascript: window.history.go(-1);'})
    }
    toggle();
  },
  toggle = function() {
    // set detail's height if active onload
    if ($summary.hasClass(c.active)) {
      $detail.css({height: $table.height()});
    }
    $summary.on('click', function() {
      var $this = $(this);
      $this.toggleClass(c.active);
      if ($this.hasClass(c.active)) {
        $detail.css({height: $table.height()});
      } else {
        $detail.css({height: 0});
      }
    });
  };

  init();

})();



/**
* toggleExp
* toggle to Expand or Collapse
*/

(function($) {
  $.toggleExp = function($this, options) {
    var defaults = {
    },
    v = $.extend(true, defaults, options),
    c = {
      active: 'active',
      summary: 'summary',
      detail: 'detail',
      submenu: 'submenu'
    },
    $detail = $this.find('.'+c.detail),
    $submenu = $this.find('.'+c.submenu),
    toggle = function() {
      $this.find('.'+c.summary).on('click', function() {
        var $this = $(this);
        $this.toggleClass(c.active);
        if ($this.hasClass(c.active)) {
          $detail.css({height: $submenu.outerHeight(true)});
        } else {
          $detail.css({height: 0});
        }
      });
    },

    init = function() {
      toggle();
    };

    init();
  };

  $.fn.toggleExp = function(options) {
    var $this = $(this);
    if ($this.data('toggleExp')) {
      return;
    } else {
      $this.data('toggleExp', new $.toggleExp($this, options));
    }
    return $this.data('toggleExp');
  };
})(jQuery);
