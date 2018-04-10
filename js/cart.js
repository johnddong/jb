/*
* Cart
*  - 加入購物車
*  - 立即購買
*  - 加入我的最愛
*/

var Cart = (function() {
  var flag = true,

  add = function(_this) {
    var ajaxUrl = 'js/api-temp/add-to-cart.json'
      , postData = []
      , mainObj = {}
      , spec = []
      , $spec = $('.spec')
      , $quantityBtn = $('#additional-product')
      , $this = $(_this)
      , specLen = $spec.length;
    mainObj['sku'] = $this.data('sku').toString();
    mainObj['qty'] = $('[name="qty"]').val();

    // spec
    if (specLen > 0) {
      for(var i = 0; i < specLen; i++) {
        var specSKU = $spec.eq(i).find('.chosen-select').val();
        spec.push(specSKU);
      }
      mainObj['spec'] = spec;
    }
    postData.push(mainObj);

    // 加購
    if ($quantityBtn.find('[type="checkbox"]').length > 0) {
      $quantityBtn.find('[type="checkbox"]').each(function() {
        var $this = $(this);
        if ($this.is(':checked')) {
          var subObj = {};
          subObj['sku'] = $this.data('sku').toString();
          subObj['qty'] = 1;
          subObj['spec'] = [];
          postData.push(subObj);
        }
      });
    }
    // post cart
    postCart(postData, $this, ajaxUrl);
  },

  wish = function(_this) {
    var ajaxUrl = 'js/api-temp/wishlist.json'
      , $this = $(_this)
      , sku = $this.data('sku').toString()
      , active = $this.hasClass('active')
      , mainObj = {sku: sku, status: "add"};
      if (active) {
        mainObj['status'] = 'del';
      }
    // post cart
    postCart(mainObj, $this, ajaxUrl);
  },

  postCart = function(postData, $this, ajaxUrl) {
    if (flag) {
      $.ajax({
        method: 'post',
        url: ajaxUrl,
        dataType: 'json',
        $this: $this,
        data: {'cart': postData},
        success: updateCart,
        error: errorCart
      });
      flag = false;
    }
  },

  updateCart = function(json) {
    if (json.success) {
      var status = json.status            // login status
        , type = this.$this.data('type'); // btn type
      switch(status) {
        case '0000':  // 尚未登入
          if (type == 'checkout') { // 立即結帳
            $.notify({
              // options
              message: '請先登入您的會員帳號'
            },{
              onClosed: function() {
                location.href = '/pay/';
              }
            });
          }
          flag = true;
          break;
        case '0001':  // 已登入
          if (type == 'checkout') { // 立即結帳
            location.href = '/pay/';
          }
          break;
      }
      if (type == 'add-to-cart') { // 加入購物車
        $.notify({
          // options
          message: json.msg
        });
        $('.count').text(json.qty);
        flag = true;
      } else if (type == 'wishlist') {
        var active = 'active'
          , status = this.$this.hasClass(active);
        if (status) {
          this.$this.removeClass(active);
        } else {
          this.$this.addClass(active);
        }
        $.notify({
          // options
          message: json.msg
        });
        flag = true;
      }
    }
  },

  errorCart = function(jqXHR, textStatus, errorThrown) {
    $.notify({
    	// options
    	message: '系統異常，請稍候再試'
    }, {
      type: 'warning'
    });
  };

  return {
    add: add,
    wish: wish
  };
})();


/* 加購商品 */
(function() {
  var init = function() {
    var $quantityBtn = $('.quantity-btn')
      , attr = {
        qty: 'qty',
        max: 'max',
        min: 'min'
      };

    $quantityBtn.find('.btns-plus').on('click', function() {
      var
      $qty = $(this).parent().find('input[name="'+attr.qty+'"]'),
      qty = $qty.val(),
      max = parseInt($qty.attr(attr.max), 10);
      if (qty < max) {
        qty++;
      }
      $qty.val(qty);
      if (qty > 1) {
        $(this).parent().find('.btns-minus').removeClass('disable');
      }
    });
    $quantityBtn.find('.btns-minus').on('click', function() {
      var
      $qty = $(this).parent().find('input[name="'+attr.qty+'"]'),
      qty = $qty.val(),
      min = parseInt($qty.attr(attr.min), 10);
      if (qty > min) {
        qty--;
      }
      $qty.val(qty);
      if (qty == 1) {
        $(this).addClass('disable');
      }
    });
    $quantityBtn.find('input[name="'+attr.qty+'"]').on('keyup', function() {
      var
      $this = $(this),
      val = $this.val(),
      max = parseInt($this.attr(attr.max), 10),
      min = parseInt($this.attr(attr.min), 10),
      reg = /^[0-9]{1,3}$/;
      if (reg.test(val)) {
        val = parseInt(val, 10);
        if (min <= val && val <= max) {
          $this.val(val);
        } else {
          $this.val(min);
        }
      } else {
        $this.val(min);
      }
    });
  };

  $(function() {
    init();
  });

})();



/*
商品主圖
* owl carousel 2 sync
* demo: https://goo.gl/HgMQbY
*/
(function() {
  var
  $product = $('#product'),
  sync1 = $product.find("#sync1"),
  sync2 = $product.find("#sync2"),
  slideSpeed = 400,
  sync1SlideSpeed = 300,
  slidesPerPage = 5, //globaly define number of elements per page
  syncedSecondary = true,
  setSync2 = function(){
    var
    win_width = $(window).width(),
    width,
    height,
    maxWidth,
    maxHeight;

    if(win_width<576){
      var num = sync2.find('.owl-item').width();
      maxWidth = '';
      maxHeight = '';
      height = num;
    }else{
      maxWidth = 75;
      maxHeight = 75;
      width='';
      height='';
    }
    sync2.find('.owl-item').css({
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      height: height
    });
  };

  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: false,
    dots: true,
    loop: false, //關閉:避免複製多張主圖，取得正確的index
    autoplay:false,
    responsiveRefreshRate : 200,
    navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : slidesPerPage,
    dots: false,
    nav: true,
    margin: 10,
    smartSpeed: 200,
    pagination:false,
    slideSpeed : slideSpeed,
    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    navText: ['<span class="flaticon-arrows-left"></span>','<span class="flaticon-arrows-right"></span>'],
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //**if you set loop to false, you have to restore this next line
     var current = el.item.index;

    //**if you disable loop you have to comment this block
    // var count = el.item.count-1;
    // var current = Math.round(el.item.index - (el.item.count/2) - .5);
    //
    // if(current < 0) {
    //   current = count;
    // }
    // if(current > count) {
    //   current = 0;
    // }

    //**end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, slideSpeed , true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, slideSpeed, true);
    }
  }

  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, sync1SlideSpeed, true);
    }
  }

  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, sync1SlideSpeed, true);
  });

  //指定商品小圖的尺寸
  setSync2();
  if(sync2.find(".owl-nav").hasClass("disabled")){
    sync2.find(".owl-stage-outer").css("margin-left","0");
  }
  $( window ).resize(function() {
    setSync2();
  });

  /*選規格切換主圖*/
  var specSelect = $product.find('.details-info .spec');

  specSelect.find('select').on('change',function(){
    var
    spec = $(this).find(':selected').data('spec'),
    mainImg = sync1.find('.details-item');

    if(spec != ''){
      $.each(mainImg,function(k,v){
        var
        $this = $(this),
        imgSpec = $this.data('spec');
        if(spec == imgSpec){
          sync2.data('owl.carousel').to(k, sync1SlideSpeed, true);
          sync1.data('owl.carousel').to(k, sync1SlideSpeed, true);
        }
      });
    }
  });

})();
