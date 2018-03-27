/**
* Date: 2018/01/02
* Desc: create a mask with COVER effect on a uploaded image
* Note: take effect only on image width >= 576
* verion: v2, 效果呈現方式由 「遮罩」改為「圖框」
* 套用: 模組 01(Basic)、02(Autumn)、03(Skyline)、07(Feature), 08(tpl08)
* @param {Object} - {pos: 0}, {pos: 1}, {pos: 2} => 置左/置上, 置中, 置右/置下
*/



var Mask = (function() {
  var $galleryWrap = $('.gallery-wrap'),
      $imgWrap = $galleryWrap.find('.img-wrap').find('img'), // uploaded $img
      $inner = $galleryWrap.find('.inner'),                  // $imgWrap parent
      img = {},                                              // uploaded img size
      id = {
        frame: 'frame',
        mask: 'mask'
      },

  init = function(obj) {
    img = imgSize();
    if (('#'+id.frame).length > 0) {
      $('#'+id.frame).remove(); // rm previous unused img
    }
    if (img.width >= 576)  {
      // pre-adjust page's layout
      if ($inner.length > 0) {
        $inner.css({overflow: 'visible', marginBottom: 50});
        $imgWrap.parent().css({overflow: 'visible'});
      }
      cover(obj);
    }
  },

  imgSize = function() {
    var $img = $galleryWrap.find('img')
      , img = new Image();
    img.src = $img.attr('src');
    return img;
  },

  imgDirection = function() {
    if (img.width >= img.height) {
      return 'hor';
    } else {
      return 'ver';
    }
  },

  coverFocus = function($frame, obj) {
    var $coverFocus = $galleryWrap.parent().find('.cover-focus')
      , $radio = $coverFocus.find('[type="radio"]')
      , dir = imgDirection();
    // via parameter to override default radio selection
    if (!$.isEmptyObject(obj) && obj.pos >= 0 && obj.pos < 3) {
      $radio.eq(obj.pos).prop('checked', true);
    } else {  // default radio selection (center)
      $radio.eq(1).prop('checked', true);
    }

    $radio.on('click', function() {
      var pos = $(this).val()
        , frameStyle = {}
        , maskStyle = {};
      switch (pos) {
        case '0':
          if (dir == 'hor') {
            frameStyle.left = 0;
            maskStyle.objectPosition = 'left';
          } else {
            frameStyle.top = 0;
            maskStyle.objectPosition = 'top';
          }
          break;
        case '1':
          if (dir == 'hor') {
            frameStyle.left = '25%';
            maskStyle.objectPosition = 'center';
          } else {
            frameStyle.top = '25%';
            maskStyle.objectPosition = 'center';
          }
          break;
        case '2':
          if (dir == 'hor') {
            frameStyle.left = '50%';
            maskStyle.objectPosition = 'right';
          } else {
            frameStyle.top = '50%';
            maskStyle.objectPosition = 'bottom';
          }
          break;
      }
      $frame.css(frameStyle).find('#'+id.mask).css(maskStyle); // cover pos change via user's radio selection
    });
  },

  cover = function(obj) {  // append a duplicated image w/ mask
     var dir = imgDirection()
       , src = $galleryWrap.find('img').attr('src')
       , mask = $('<img />', {id: id.mask}).attr({src: src}).css({ // MASK image
         objectFit: 'cover',
         transition: 'all .5s ease',
         boxShadow: '0 0 0 3px rgba(85, 85, 85, .8)',  // outer border
         outline: '3px solid rgba(255, 255, 255, .8)', // inner border
         outlineOffset: '-3px',                        // inner border offset
         width: '100%',
         height: '100%'
       })
       , tag = $('<span />', {class: 'tag'}).css({  // mask's TAG
         position: 'absolute',
         top: '100%',
         left: '50%',
         transform: 'translateX(-50%)', // center tag horizontally
         width: 105,
         background: '#777',
         color: '#fff',
         padding: '10px',
         fontSize: '12px'
       }).text('手機展示範圍')
       , divCon = $('<div />', {id: id.frame}).css({ // parent div
         transition: 'all .5s ease',
         position: 'absolute',
         zIndex: 1,
         top: 0,
         width: (dir == 'hor') ? '50%' : '100%',
         height: (dir == 'hor') ? '100%' : '50%',
         cursor: 'text'
       })
       .append(mask)
       .append(tag);
    $imgWrap.parent().append(divCon);

    var $frame = $galleryWrap.find('#'+id.frame);
    if (dir == 'hor') {
      $frame.css({left: '25%'}).find('#'+id.mask).css({objectPosition: 'center'}); // default  align center horizontally
    } else {
      $frame.css({top: '25%'}).find('#'+id.mask).css({objectPosition: 'center'});  // default align center vertically
    }
    // via parameter to override default position
    if (!$.isEmptyObject(obj)) {
      switch (obj.pos) {
        case 0:
          if (dir == 'hor') { // align left
            $frame.css({left: '0'}).find('#'+id.mask).css({objectPosition: 'left'});
          } else { // align top
            $frame.css({top: '0'}).find('#'+id.mask).css({objectPosition: 'top'});
          }
          break;
        case 2:
          if (dir == 'hor') { // align right
            $frame.css({left: '50%'}).find('#'+id.mask).css({objectPosition: 'right'});
          } else { // align bottom
            $frame.css({top: '50%'}).find('#'+id.mask).css({objectPosition: 'bottom'});
          }
          break;
        default:
          if (dir == 'hor') { // align center
            $frame.css({left: '25%'}).find('#'+id.mask).css({objectPosition: 'center'});
          } else { // align center
            $frame.css({top: '25%'}).find('#'+id.mask).css({objectPosition: 'center'});
          }
      }
    }
    coverFocus($frame, obj);
  },

  clear = function() {
    var $frame = $galleryWrap.find('#'+id.frame);
    if ($frame.length > 0) {
      $frame.remove();
    }
  };

  return {
    init: init,
    clear: clear
  };

})();





//　套入方式分前後台說明：

// 1. 後台
      /*
      1.1 判斷：圖片寬度 >= 576 才顯示 radio 選項
      1.2 CSS：.column-4 => width 改為 100% (讓上傳圖片等比填滿)
               .inner => overflow 改為 initial (讓圖框能超過顯示範圍)
      呼叫方式：
      1.3 引入 mask.js
      1.4 於圖片上傳成功時，呼叫 Mask.init();
      1.5 新增 radio 選項：
      <div class="margin-bottom cover-focus">
        <label class="modal-label">手機可見範圍：</label>
        <!-- 橫式圖 -->
        <input type="radio" id="position1" name="position" value="0">
        <label for="position1">置左</label>
        <input type="radio" id="position2" name="position" value="1" checked>
        <label for="position2">置中</label>
        <input type="radio" id="position3" name="position" value="2">
        <label for="position3">置右</label>
        <!--/ 橫式圖 -->
        <!-- or -->
        <!-- 直式圖 -->
        <input type="radio" id="position1" name="position" value="0">
        <label for="position1">置上</label>
        <input type="radio" id="position2" name="position" value="1" checked>
        <label for="position2">置中</label>
        <input type="radio" id="position3" name="position" value="2">
        <label for="position3">置下</label>
        <!--/ 直式圖 -->
        <div class="clear"></div>
      </div>
      */

// 2. 前台
      /*
      模板 01(Basic)、02(Autumn)、03(Skyline)、07(Feature) 電視牆套上：
      橫式圖：
      2.1. style="background-position: left;" (radio value = 0)
      2.2. 為預設值, markup 不變 (radio value = 1)
      2.3. style="background-position: right;" (radio value = 2)
      直式圖：
      2.4. style="background-position: top;" (radio value = 0)
      2.5. 為預設值, markup 不變 (radio value = 1)
      2.6. style="background-position: bottom;" (radio value = 2)
      ex:
      <div class="slide-item item-background" data-background="images/slide25.jpg" style="background-position: left;">
      */
