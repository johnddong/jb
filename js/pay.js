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
    removeCart();
    // 查看優惠券
    getCoupon();
    // check 店鋪
    checktoCal();
  },

  subTotal = function(obj) {
    var subTotal = 0   // 小計
      , grandTotal = 0 // 總計
      , discount = 0   // 折扣序號
      , point = 0     // 紅利
      , pirce = 0      // 單價
      , qty = 0        // 數量
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
        if ($(this).find('[type="checkbox"]').is(':checked')) {
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
      grandTotal += trim($(this).text());
    });
    $grandTotal.text(format(grandTotal));
    // checkout btn
    (grandTotal == 0) ? $checkoutBtn.hide() : $checkoutBtn.show();

    return subTotal;
  },

  removeCart = function() {
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
    $cartContent.find('.delete-item').on('click', function() {
      var $this = $(this)
        , orderId = $this.parent().data(attr.orderId)
        , relatedId = $this.parent().data(attr.relatedId)
        , message = '是否確認從購物車移除?';

      message += '<div>' + $this.parent().find('.'+c.productTitle).text() + '</div>';
      if (relatedId == undefined) { // 為主商品，check是否有加購商品
        var additional = '<ul>'
          , count = 0;
        $cartContent.find('.'+c.eachItem).each(function() {
          if ($(this).data(attr.relatedId) == orderId) { // 刪除加購商品
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
    });
  },

  getCoupon = function() {
    $('.product-coupon .btns-primary').on('click', function() {
      $myModal.modal('show').find('.btn-primary').on('click', function () {
        // $('#coupon').find('input').each(function() {
        //   if ($(this).is(':checked')) {
        //   }
        // });
        $myModal.modal('hide');
      });
    });
  },

  checktoCal = function() {
    // check header 
    $('.shopping-cart-header').find('[type="checkbox"]').on('click', function() {
      var $this = $(this)
        , $li = $this.parents('li').eq(0);
      if ($this.is(':checked')) { // check all
        $li.find('.each-item').find('[type="checkbox"]').each(function() {
          if (!$(this).is(':checked')) $(this).click();
        });
        // exclude store with gray bg color
        var storeType = $li.data('type');
        $cartContent.find('#order-list li').each(function() {
          if ($(this).data('type') != storeType) {
            $(this).addClass('special-store');
          } else {
            // uncheck all
            $(this).removeClass('special-store');
          }
        });
      } else { //uncheck all
        $this.parents('li').eq(0).find('.each-item').find('[type="checkbox"]').each(function() {
          if ($(this).is(':checked')) $(this).click();
        });
        // remove exlcuded sotre w/o gray bg color
        $cartContent.find('li').each(function() {
          $(this).removeClass('special-store');
        });
      }
    });

    // check content 
    $('.shopping-cart-content').find('[type="checkbox"]').on('click', function() {
      var $this = $(this);
      subTotal($this);
    });

    // check all
    $('.shopping-cart-footer').find('[type="checkbox"]').on('click', function() {
      var $this = $(this)
        , specialStore = 'special-store';
      $cartContent.find('li').each(function() { // loop stores
        if ($this.is(':checked')) { // store checked
          if ($(this).data('type') == specialStore) { // special store
            $(this).addClass(specialStore);
            $(this).find('.each-item').find('[type="checkbox"]').each(function() {
              if ($(this).is(':checked')) $(this).click();
            });
          }
        } else { // store unchecked
          if ($(this).data('type') == specialStore) {
            $(this).removeClass(specialStore);
          }
        }
      });
    });

  };

  init();

})();



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
      // 訂購人
      $buyer = $('.customer-info'),
      $buyerName = $buyer.find('[name="buyer_name"]'),
      $buyerMobile = $buyer.find('[name="buyer_mobile"]'),
      $buyerAdress = $buyer.find('.receiver-address'),
      // 收件人
      $receiver = $('.shipping-method'),
      $receiverName = $receiver.find('.receiver-name'),
      $receiverMobile = $receiver.find('.receiver-mobile'),
      $receiverAddress = $receiver.find('.receiver-address'),
      $ortherInfo = $('.orther-info'),
      $memberInfo = $ortherInfo.find('[name="member_info"]'), // 同訂購人/會員中心 radio
      receiverData = {},

  setBuyer = function(_this) {
    var buyerName = $buyerName.val()
      , buyerMobile = $buyerMobile.val()
      , buyerAdress = $buyerAdress.val();
    $(_this).addClass(active);
    // reset receiver's address
    $ortherInfo.twzipcode('reset');
    $receiverAddress.val(buyerAdress);
    $receiverName.val(buyerName);
    $receiverMobile.val(buyerMobile);
    $buyer.twzipcode('get', function (buyerCounty, buyerDistrict, buyerZipcode) {
      $receiver.twzipcode('set', {
        'county': buyerCounty,
        'district': buyerDistrict,
        'zipcode': buyerZipcode
      });
    });
  },
  resetBuyer = function(_this){
    $(_this).removeClass(active);
    $receiverAddress.val('');
    $receiverName.val('');
    $receiverMobile.val('');
    $receiver.twzipcode('reset');
  },
  init = function() {
    // 預設訂購人
    if ($buyerName.length > 0 && $buyerMobile.length > 0) {
      if ($buyerName.val() != '' || $buyerMobile.val() != '') {
        $memberInfo.eq(0).attr('checked', true).addClass(active);
        setBuyer('#buyer_sync');
      }
    }
    // 同訂購人
    $ortherInfo.find('#buyer_sync').on('click', function() {
      var $this = $(this);
      if($this.prop('checked')){
        syncData.setBuyer(this);
      }else{
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
