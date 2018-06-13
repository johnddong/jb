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

$(function(){
  /* 手機版捲軸底部時，設定底部margin */
  var
  $mainContent = $('.main-content'),
  is_mobile = mobilecheck();
  if(is_mobile){
    if ($('.fixed-footer').length > 0) { // 有閑 fixed footer
      if ($('.footer').is(':visible')) { // 一般 footer 
        $('html').css({height: 'auto'}); // reset to enable setting margin
        $('.footer').css({marginBottom: 76}); 
      } else {
        if ($('#order-list').length == 0) {
          $mainContent.css({marginBottom: 36});
        }
      }
    }
  }
});
