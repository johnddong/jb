$(function(){
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

  /*手機版捲軸到底移除fixed*/
  var
  $mainContent = $('.main-content'),
  is_mobile = mobilecheck();
  if(is_mobile){
    if($('footer').hasClass('merge')){
      $mainContent.css('margin-bottom','76px');
      $(window).scroll(function(){
        var window_height = $(window).height(),
            window_scrollTop = $(window).scrollTop(),
            document_height = $( document ).height(),
            footer = $('.fixed-footer');
        if(window_height + window_scrollTop == document_height){
          footer.css('position','relative');
          $mainContent.css('margin-bottom','0px');
        }else if(document_height-window_height-window_scrollTop<76){
          footer.css('position','fixed');
          $mainContent.css('margin-bottom','76px');
        }
      });
    }
  }
});
