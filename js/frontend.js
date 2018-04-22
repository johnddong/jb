var kt_innit_carousel
  , special_banner
  , checked;
jQuery(document).ready(function ($) {
  "use strict";
    // isMobile
    var mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    //menu onepage
    $(".each-section .next-section").on( "click", function(e) {
      var url = $(this).attr("href");
      var target = parseFloat($(url).offset().top);
      $('html,body').animate({scrollTop:target}, 'slow');
      return false;
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').fadeOut();
            $('.back-to-top').removeClass('show');
        }
    });
    $(document).on('click','.back-to-top',function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

    function kt_tab_fadeeffect(){
      // effect click
      $(document).on('click','.kt-tab-fadeeffect a[data-toggle="pill"]',function(){
        var item = '.product-item';
        var tab_id = $(this).attr('href');
        var tab_animated = $(this).data('animated');
        tab_animated = ( tab_animated == undefined ) ? 'fadeInUp' : tab_animated;

        if( $(tab_id).find('.owl-carousel').length > 0 ){
          item = '.owl-item.active';
        }
        $(tab_id).find(item).each(function(i){
          var t = $(this);
          var style = $(this).attr("style");
          style = ( style == undefined ) ? '' : style;
          var delay  = i * 200;
          t.attr("style", style +
                    ";-webkit-animation-delay:" + delay + "ms;"
                  + "-moz-animation-delay:" + delay + "ms;"
                  + "-o-animation-delay:" + delay + "ms;"
                  + "animation-delay:" + delay + "ms;"
          ).addClass(tab_animated+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              t.removeClass(tab_animated+' animated');
              t.attr("style", style);
          });
        })
      })
    }

    function kt_get_scrollbar_width() {
      var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
          $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
          inner = $inner[0],
          outer = $outer[0];
      jQuery('body').append(outer);
      var width1 = parseFloat(inner.offsetWidth);
      $outer.css('overflow', 'scroll');
      var width2 = parseFloat(outer.clientWidth);
      $outer.remove();
      return (width1 - width2);
    }

    function kt_resizeMegamenu(){
      var window_size = parseFloat(jQuery('body').innerWidth());
      window_size += kt_get_scrollbar_width();
      if( window_size > 1024 ){
        if( $('.container-wapper .main-menu').length > 0){
          var container = $('.main-menu-wapper');
          if( container!= 'undefined'){
            var container_width = 0;
            container_width = parseFloat(container.innerWidth());
            var container_offset = 0;
            container_offset = container.offset();
            setTimeout(function(){
              $('.main-menu .menu-item-has-children').each(function(index,element){
                $(element).children('.mega-menu').css({'width':container_width+'px'});
                var sub_menu_width = parseFloat($(element).children('.mega-menu').outerWidth());
                var item_width = parseFloat($(element).outerWidth());
                $(element).children('.mega-menu').css({'left':'-'+(sub_menu_width/2 - item_width/2)+'px'});
                var container_left = container_offset.left;
                var container_right = (container_left + container_width);
                var item_left = $(element).offset().left;
                var overflow_left = (sub_menu_width/2 > (item_left - container_left));
                var overflow_right = ((sub_menu_width/2 + item_left) > container_right);
                if( overflow_left ){
                  var left = (item_left - container_left);
                  $(element).children('.mega-menu').css({'left':-left+'px'});
                }
                if( overflow_right && !overflow_left ){
                  var left = (item_left - container_left);
                  left = left - ( container_width - sub_menu_width );
                  $(element).children('.mega-menu').css({'left':-left+'px'});
                }
              })
            },100);
          }
        }
      }
    }

    function sticky_menu(){
      if(!$('.header').hasClass('no-sticky')) {
        if(!$('.header').hasClass('no-prepend-box-sticky')){
          if (!$('.header .box-sticky').length) {
              $('.header').prepend('<div class="box-sticky"><div class="row"><div class="col-md-2 col-lg-2"><div class="logo-prepend"></div></div><div class="col-md-8 col-lg-8"><div class="main-menu-prepend"></div></div><div class="col-md-2 col-lg-2"><div class="top-links-prepend"><div class="wishlist-prepend prepend-icon"></div><div class="cart-prepend prepend-icon"></div></div></div></div></div>');
          }
        }
        $('.header').find('.logo').clone().appendTo('.header .logo-prepend');
        $('.header').find('.main-menu').clone().appendTo('.header .main-menu-prepend');
        $('.header').find('.wishlist-icon').clone().appendTo('.header .top-links-prepend .wishlist-prepend');
        $('.header').find('.minicart').clone().appendTo('.header .top-links-prepend .cart-prepend');
      }
    }

     function sticky_menu_run(){
        if($(window).width() > 1024) {
            if ($(window).scrollTop() > 500) {
                $('.header .box-sticky').addClass('is-sticky');
                $('.header .this-sticky').addClass('box-sticky');
            }
            else {
                $('.header .box-sticky').removeClass('is-sticky');
                $('.header .this-sticky').removeClass('box-sticky');
            }
        }
    }

    //function kt_innit_carousel(){
    kt_innit_carousel = function(obj){
        if ($('.'+obj._this).find('.owl-carousel').length == 0) return;
        //owl has thumbs
        $('.owl-carousel.has-thumbs').owlCarousel({
            loop: true,
            items: 1,
            thumbs: true,
            thumbImage: true,
            thumbContainerClass: 'owl-thumbs',
            thumbItemClass: 'owl-thumb-item'
        });
        // owl config
        $('.'+obj._this).find(".owl-carousel").each(function(index, el) {
            var config = $(this).data();
            config.navText = ['<span class="flaticon-arrows-left"></span>','<span class="flaticon-arrows-right"></span>'];
            var animateOut = $(this).data('animateout');
            var animateIn  = $(this).data('animatein');
            var slidespeed = parseFloat($(this).data('slidespeed'));
            var autoheight = $(this).data('autoheight');

            if(typeof animateOut != 'undefined' ){
                config.animateOut = animateOut;
            }
            if(typeof animateIn != 'undefined' ){
                config.animateIn = animateIn;
            }
            if(typeof (slidespeed) != 'undefined' ){
                config.smartSpeed = slidespeed;
            }
            if(typeof (autoheight) != 'undefined' ){
                config.autoHeight = autoheight;
            }

            if( $('body').hasClass('rtl')){
                config.rtl = true;
            }

            var owl = $(this);
            owl.on('initialized.owl.carousel',function(event){
                var total_active = parseInt(owl.find('.owl-item.active').length);
                var i            = 0;
                owl.find('.owl-item').removeClass('item-first item-last');
                setTimeout(function(){
                    owl.find('.owl-item.active').each(function () {
                        i++;
                        if (i == 1) {
                            $(this).addClass('item-first');
                        }
                        if (i == total_active) {
                            $(this).addClass('item-last');
                        }
                    });

                }, 100);
            })
            owl.on('refreshed.owl.carousel',function(event){
                var total_active = parseInt(owl.find('.owl-item.active').length);
                var i            = 0;
                owl.find('.owl-item').removeClass('item-first item-last');
                setTimeout(function(){
                    owl.find('.owl-item.active').each(function () {
                        i++;
                        if (i == 1) {
                            $(this).addClass('item-first');
                        }
                        if (i == total_active) {
                            $(this).addClass('item-last');
                        }
                    });

                }, 100);
            })
            owl.on('change.owl.carousel',function(event){
                var total_active = parseInt(owl.find('.owl-item.active').length);
                var i            = 0;
                owl.find('.owl-item').removeClass('item-first item-last');
                setTimeout(function(){
                    owl.find('.owl-item.active').each(function () {
                        i++;
                        if (i == 1) {
                            $(this).addClass('item-first');
                        }
                        if (i == total_active) {
                            $(this).addClass('item-last');
                        }
                    });

                }, 100);
                owl.addClass('owl-changed');
                setTimeout(function () {
                    owl.removeClass('owl-changed');
                },config.smartSpeed)
            })
            owl.on('drag.owl.carousel',function(event){
                owl.addClass('owl-changed');
                setTimeout(function () {
                    owl.removeClass('owl-changed');
                },config.smartSpeed)
            })
            if($(window).width() < 992)  {
                var itembackground = $(".item-background");
                    itembackground.each(function(index){
                    if ($('.item-background').attr("data-background")){
                      $(this).css("background-image", "url(" + $(this).data("background") + ")");
                      var height = parseInt($(this).closest('.owl-carousel').data("height"));
                      $(this).css("height", height + 'px');
                      $('.slide-img').css("display",'none');
                    }
                });
            }
            owl.owlCarousel(config);

        });
    }

    function kt_verticalMegamenu(){
        var window_size = parseFloat(jQuery('body').innerWidth());
        window_size += kt_get_scrollbar_width();
        if( window_size > 991 ){
            if( parseFloat($('.container-vertical-wapper .vertical-menu').length) >0){
                var container = $('.container-vertical-wapper');
                if( container!= 'undefined'){
                    var container_width = 0;
                    container_width = parseFloat(container.innerWidth());
                    var container_offset = 0;
                    container_offset = container.offset();
                    var content_width = 0;
                    content_width = parseFloat($('.vertical-wapper ').outerWidth());
                    setTimeout(function(){
                        $('.vertical-menu .menu-item-has-children').each(function(index,element){
                             $(element).children('.mega-menu').css({'width':container_width - content_width + 30 + 'px'});
                        })
                    },100);
                }
            }
        }
    }

    function kt_countdown(){
      if($('.kt-countdown').length >0){
        var labels = ['Years', 'Months', 'Weeks', 'Days', 'Hrs', 'Mins', 'Secs'];
        var layout = '<span class="box-count day"><ul><li class="number">{dnn}</li> <li class="text">Days</li></ul></span><span class="box-count hrs"><ul><li class="number">{hnn}</li> <li class="text">Hours</li></ul></span><span class="box-count min"><ul><li class="number">{mnn}</li> <li class="text">Mins</li></ul></span><span class="box-count secs"><ul><li class="number">{snn}</li> <li class="text">Secs</li></ul></span>';
        $('.kt-countdown').each(function() {
          var austDay = new Date($(this).data('y'),$(this).data('m') - 1,$(this).data('d'),$(this).data('h'),$(this).data('i'),$(this).data('s'));
          $(this).countdown({
            until: austDay,
            labels: labels,
            layout: layout
          });
        });
      }
    };

    // Price filter
    $('.slider-range-price').each(function(){
      var min             = parseFloat($(this).data('min'));
      var max             = parseFloat($(this).data('max'));
      var unit            = $(this).data('unit');
      var value_min       = parseFloat($(this).data('value-min'));
      var value_max       = parseFloat($(this).data('value-max'));
      var label_reasult   = $(this).data('label-reasult');
      var t               = $(this);
      $('.price-filter' ).slider({
        range: true,
        min: min,
        max: max,
        values: [ value_min, value_max ],
        slide: function( event, ui ) {
          var result = '<span class="from">'+ unit + ui.values[ 0 ] +' </span><span class="to"> '+ unit +ui.values[ 1 ]+'</span>';
          t.closest('.price-filter').find('.amount-range-price').html(result);
        }
      });
    });

    //Woocommerce plus and minius
    $(document).on('click', '.quantity .plus, .quantity .minus', function (e) {
        // Get values
        var $qty = $(this).closest('.quantity').find('.qty'),
            currentVal = parseFloat($qty.val()),
            max = parseFloat($qty.attr('max')),
            min = parseFloat($qty.attr('min')),
            step = $qty.attr('step');
        // Format values
        if (!currentVal || currentVal === '' || currentVal === 'NaN') currentVal = 0;
        if (max === '' || max === 'NaN') max = '';
        if (min === '' || min === 'NaN') min = 0;
        if (step === 'any' || step === '' || step === undefined || parseFloat(step) === 'NaN') step = 1;
        // Change the value
        if ($(this).is('.plus')) {
            if (max && ( max == currentVal || currentVal > max )) {
                $qty.val(max);
            } else {
                $qty.val(currentVal + parseFloat(step));
            }
        } else {
            if (min && ( min == currentVal || currentVal < min )) {
                $qty.val(min);
            } else if (currentVal > 0) {
                $qty.val(currentVal - parseFloat(step));
            }
        }
        // Trigger change event
        $qty.trigger('change');
        e.preventDefault();
    });

    $(document).on('click','.show-content',function(){
      $(this).closest('.parent-content').toggleClass('active');
      $(this).closest('.parent-content').find('.hidden-content').toggleClass('show');
      return false;
    });

    $(document).on('click','.header .show-menu',function(){
      $(this).closest('.header-nav').find('.box-menu').addClass('show');
      return false;
    });
    $(document).on('click','.header .close-menu',function(){
      $(this).closest('.header-nav').find('.box-menu').removeClass('show');
      return false;
    });

    $(document).on('click','.header.layout2 .menu-item-has-children > a',function(){
      $(this).closest('.menu-item-has-children').toggleClass('show-submenu');
      return false;
    });

    $(document).on('click','.vertical-menu .toggle-submenu',function(){
      $('.vertical-menu').find('.menu-item-has-children').removeClass('show-submenu');
      if ($(this).closest('.menu-item-has-children').hasClass('show-submenu')) {
        $(this).closest('.menu-item-has-children').removeClass('show-submenu');
      } else {
        $(this).closest('.menu-item-has-children').addClass('show-submenu');
      }
      var is_mobile = mobilecheck();
      // on PC: enable link, on mobile: disable link (on Skyline )
      return (is_mobile) ?　false : true;
    });

    /*special banner*/
    special_banner = function() {
      var $specialBanner = $('.special-banner');
      if ($specialBanner.length == 0) return;
      $specialBanner.find('.banner-item').each(function(index, el) {
        var backgroundbanner = $(this).find('.banner-content').data('background');
         $(this).find('.banner-content').css({'background-image':'url( '+ backgroundbanner + ')'});
      });

      $specialBanner.find('.banner-item').on('click' ,function() {
        $(this).find('.banner-content').addClass('show');
        //return false;
      });

      $specialBanner.find('.close-banner').on('click', function() {
        $(this).parent().removeClass('show');
        return false;
      });

      // $(document).on('click','.banner-item .show-banner',function(){
        // $(this).closest('.banner-item').find('.banner-content').addClass('show');
        // return false;
      // });
      // $(document).on('click','.banner-item .close-banner',function(){
        // $(this).closest('.banner-item').find('.banner-content').removeClass('show');
        // return false;
      // });
    }
    function kt_scroll() {
      if(parseFloat($(window).outerWidth()) > 0) {
        $('.header .scrollbar').mCustomScrollbar();
      }
    }

    function newletter_popup(){
      var window_size = parseFloat(jQuery('body').innerWidth());
      window_size += kt_get_scrollbar_width();
      if(window_size > 767){
        if($('body').hasClass('home')){
              $.magnificPopup.open({
                 items: {
                  src: '<div class="popup-newsletter "><div class="popup-content"><h4 class="title">SIGN UP NEWSLETTER</h4><h5 class="subtitle">Sign up our Newsletter & Get 25% Off at your first Purchase!</h5><div class="input-block inner-content"><div class="input-inner"><input type="text" class="input-info" placeholder="Enter your email" name="input-info"><a href="#" class="submit">Subscribe</a></div></div></div></div></div>',
                  type: 'inline'
               }
               });
           }
      }
    }

    function quickview_popup(){
      var window_size = parseFloat(jQuery('body').innerWidth());
      window_size += kt_get_scrollbar_width();
      if(window_size > 992){
         $(document).on('click','.quickview-button',function(){
              $.magnificPopup.open({
                 items: {
                  src: '<div class="popup-quickview "><div class="about-product"><div class="details-thumb"><div class="owl-carousel has-thumbs" data-autoplay="false" data-nav="false" data-dots="false" data-loop="true" data-slidespeed="800" data-margin="1"><div class="details-item"><div class="main-img"><a href="product-details"><img src="images/product-details1.jpg" alt=""></a></div></div><div class="details-item"><div class="main-img"><a href="product-details"><img src="images/product-details1.jpg" alt=""></a></div></div><div class="details-item"><div class="main-img"><a href="product-details"><img src="images/product-details1.jpg" alt=""></a></div></div></div></div><div class="details-info"><a class="product-name" href="#">Herschel Supply bag </a><div class="rating"><ul class="list-star"><li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li><li><a href="#"><i class="fa fa-star-half-o" aria-hidden="true"></i></a></li></ul></div><div class="price"><span class="ins">$75.00</span></div><ul class="list-color"><li><a href="#" class="red"></a></li><li class="current"><a href="#" class="blue-0"></a></li><li><a href="#" class="black"></a></li><li><a href="#" class="green"></a></li></ul><div class="quantity"><input class="input-text qty text" type="text" size="4" title="Qty" value="1" name="quantity"><div class="group-quantity-button"><a class="plus" href="#"><i class="fa fa-sort-asc" aria-hidden="true"></i></a><a class="minus" href="#"><i class="fa fa-sort-desc" aria-hidden="true"></i></a></div></div><a href="#" class="add-to-cart">ADD TO CART</a><ul class="group-button"><li><a href="#" class="wishlist">Add to Wishlist</a></li><li><a href="#" class="compare-button">Add to Compare</a></li></ul><a href="product-details.html" class="view-details">View full details <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a></div></div></div>',
                  type: 'inline'
               }
               });
              //kt_innit_carousel();
              return false;
           });
      }
    }

    function compare_popup(){
      var window_size = parseFloat(jQuery('body').innerWidth());
      window_size += kt_get_scrollbar_width();
      if(window_size > 600){
         $(document).on('click','.compare-button',function(){
              $.magnificPopup.open({
                 items: {
                  src: '<div class="popup-compare"><h4 class="supper-title">Compare products</h4><table class="compare-content"><tr><td class="product-title" data-title="Product image"><span>Product image</span></td><td class="product-img"><div class="product-item layout1"><div class="product-inner"><div class="thumb"><a href="#"><img src="images/product13.jpg" alt=""></a></div><div class="info"><a href="#" class="product-name">Classic T-Shirt in Blue</a><div class="price"><span class="ins">$75</span></div></div></div></div></td><td class="product-img"><div class="product-item layout1"><div class="product-inner"><div class="thumb"><a href="#"><img src="images/product80.jpg" alt=""></a></div><div class="info"><a href="#" class="product-name">Classic T-Shirt in Blue</a><div class="price"><span class="del">$180</span><span class="ins">$90</span></div></div></div></div></td><td class="product-img"><div class="product-item layout1"><div class="product-inner"><div class="thumb"><a href="#"><img src="images/product1.jpg" alt=""></a></div><div class="info"><a href="#" class="product-name">Classic T-Shirt in Blue</a><div class="price"><span class="ins">$75</span></div></div></div></div></td></tr><tr><td class="product-title" data-title="Descriptions"><span>Descriptions</span></td><td class="product-des"><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,feugiat vitae,</p></td><td class="product-des"><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,feugiat vitae,</p></td><td class="product-des"><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,feugiat vitae,</p></td></tr><tr><td class="product-title" data-title="Availability"><span>Availability</span></td><td class="availability"><span class="stock">In Stock</span></td><td class="availability"><span class="not-stock">Out of Stock</span></td><td class="availability"><span class="not-stock">Out of Stock</span></td></tr><tr><td class="product-title" data-title="Unit Price"><span>Unit Price</span></td><td class="unit-price"><span class="price">$150.00</span></td><td class="unit-price"><span class="price">$90.00</span></td><td class="unit-price"><span class="price">$150.00</span></td></tr></table></div>',
                  type: 'inline'
               }
               });
              return false;
           });
      }
    }

    //$("#datecountdown").TimeCircles();
    var updateTime = function(){
      var date = parseInt($("#date").val());
      var time = parseInt($("#time").val());
      var datetime = date + ' ' + time + ':00';
      $("#datecountdown").data('date', datetime).TimeCircles().start();
    }

    $(".chosen-select").chosen({disable_search_threshold: 10});
    //newletter_popup();
    //kt_countdown();
    kt_tab_fadeeffect();
    kt_resizeMegamenu();
    kt_verticalMegamenu();
    sticky_menu();
    //kt_innit_carousel();
    special_banner();
    //quickview_popup();
    //compare_popup();

    $(window).scroll(function() {
      sticky_menu_run();
    });

    $(window).resize(function(){
      kt_resizeMegamenu();
      kt_verticalMegamenu();
      //kt_innit_carousel();
      //quickview_popup();
      //compare_popup();
    });
    $(window).load(function(){
      kt_scroll();
      //kt_innit_carousel();
      //newletter_popup();
      //quickview_popup();
      //compare_popup();
    });

    /*
    *otify default setting
    */
    $.notifyDefaults({
      type: 'success',
      placement: {
        from: 'bottom'
      },
      animate: {
        enter: 'animated fadeInUp',
        exit: 'animated fadeOutDown'
      },
      delay: 1500,
      timer: 600,
      z_index: 1052
    });

    $.fn.checked = function() {
      var
      $this = $(this),
      input = $this.find('input'),
      fa = '<i class="fa fa-check" aria-hidden="true"></i>';
      if (input.prop('checked')) {
        $this.append(fa);
      }else{
        $this.find($('.fa')).remove();
      }
    };

    $('.checkbox-cont').on('click',function(){
      $(this).checked();      
    });
});
