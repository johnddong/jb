/**
* 會員資訊：
*   動態新增電話號碼
*   動態新增收件人地址
*   form submit via ajax
*/

var Member = (function() {
  var
  ajaxUrl = {
    update: 'js/api-temp/member-update-success.json', // update user's data
    modify: 'js/api-temp/member-modify-success.json'
  },
  formCount = 0,
  $member = $('.receiving-address'),
  $addressError = $member.find('.address-error'),
  $btnSubmit = $('.btn-submit'),
  $btnModify = $('.btn-modify'),
  spinnerEl = '<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>',
  c = {
    row: 'row', // phone's dynamic parent class
    addressBox: 'address-box', // address's dynamic parent class
    btnOpenAddress:'btn-open-address',
    btnSubmit: 'btn-submit',
    btnModify: 'btn-modify'
  },

  ReceiverAddressElement =
    '<h5 class="text-label">收件人姓名<span></span></h5>'+
    '<input type="text" name="receiver_name[]" class="input-info receiver-name" placeholder="請填寫真實姓名" />'+
    '<span class="buyer-note">請填入收件人真實姓名，以確保順利收件</span>'+
    '<h5 class="text-label">收件人連絡電話<span></span></h5>'+
    '<input type="text" name="receiver_mobile[]" class="input-info receiver-mobile" placeholder="請填寫連絡電話" />'+
    '<h5 class="text-label">收件人地址<span></span></h5>'+
    '<div class="twzipcode">'+
      '<div class="address">'+
        '<div class="shipping">'+
          '<select name="buyer-country[]" class="buyer-country">'+
            '<option value="" data-type="tw">台灣</option>'+
            '<option value="" data-type="other">其他</option>'+
          '</select>'+
          '<i class="fa fa-angle-down" aria-hidden="true"></i>'+
        '</div>'+
      '</div>'+
      '<div class="address">'+
        '<div data-role="county" data-name="receiver_county[]" data-style="receiver-county"></div>'+
        '<i class="fa fa-angle-down" aria-hidden="true"></i>'+
      '</div>'+
      '<div class="address">'+
        '<div data-role="district" data-name="receiver_area[]" data-style="receiver-area"></div>'+
        '<i class="fa fa-angle-down" aria-hidden="true"></i>'+
      '</div>'+
      '<div data-role="zipcode" data-name="receiver_zipcode[]" data-style="receiver-zipcode"></div>'+
      '<input class="input-info receiver-address" name="receiver_address[]" type="text" value="" placeholder="請填寫詳細地址" />'+
      '<span class="buyer-note">請勿填寫郵政信箱，以免商品配送及贈品可能無法送達</span>'+
    '</div>',

  createReceiverAddress = function(formCount) {
    var
    addressRemove =
      $('<i />', {'class': 'fa fa-times remove'})
        .attr({'aria-hidden': 'true', 'title': '移除'})
        .css({float: 'right'})
        .on('click', function() {
          $(this).parents('.'+c.addressBox).eq(0).remove();
          if ($addressError.text() != '') $addressError.text('');
      }),

    addressElement =
      $('<div />', {'class': c.addressBox})
        .css({
          border: '1px solid #fff',
          margin: '20px 0'
        })
        .append(
          '<form  name="shipping-info'+formCount+'" action="" method="post">'+
            '<div class="receiver-default-box">'+
              '<label class="radio-cont" for="receiver-default'+formCount+'">預設'+
                '<input type="radio" id="receiver-default'+formCount+'" name="receiver_default[]" value="1">'+
                '<span class="checkmark"></span>'+
              '</label>'+
            '</div>'+
            ReceiverAddressElement+
            '<div class="note">'+
              '<button type="submit" class="btns btn-submit">新增</button>'+
            '</div>'+
          '</form>'
        )
        .prepend(addressRemove);
    return addressElement;
  },

  createMiniReceiverAddress = function(obj){
      if(obj.default){
        var radio = '<input type="radio" name="receiver_default[]" value="1" checked>';

      }else{
        var radio = '<input type="radio" name="receiver_default[]" class="receiver-default" value="1">';
      }
      var element =
      '<div class="item">'+
        '<div class="mini-address-box table">'+
          '<div class="tr">'+
            '<div class="td">'+
              '<div class="receiver-default-box">'+
                '<label class="radio-cont" for="receiver-default001">預設'+
                  radio+
                '<span class="checkmark"></span>'+
              '</label>'+
              '</div>'+
            '</div>'+
            '<div class="td receiver-info">'+
            '<div><span class="name">'+obj.name+'</span>- <span class="mobile">'+obj.phone+'</span></div>'+
              '<div class="old_address">'+
                '<span class="county">'+obj.county+'</span>'+
                '<span class="zipcode">'+obj.area+'</span>'+
                '<span class="street">'+obj.address+'</span>'+
              '</div>'+
            '</div>'+
            '<div class="td btn-box">'+
              '<a href="javascript:void(0);" class="btn-open-address">'+
                '<i class="fa fa-pencil fa-lg" aria-hidden="true"></i>'+
              '</a>'+
              '<a href="javascript:void(0);" class="btn-delete">'+
                '<i class="fa fa-trash fa-lg" aria-hidden="true"></i>'+
              '</a>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="modify-address-box"></div>'+
      '</div>';

      // $member.find('.saved-receiver-address').append(element);
  },

  validate = function(formCount){
    $('form[name="shipping-info'+formCount+'"]').validate({
      event: 'keyup',
      ignore: '',
      errorClass: 'invalid',
      rules: {
        'buyer_mobile[]': {
          required: true,
          minlength: 6,
          number: true
        },
        'receiver_name[]': {
          required: true
        },
        'receiver_mobile[]': {
          required: true,
          minlength: 6,
          number: true
        },
        // 'receiver_county[]': {
        //   required: true
        // },
        // 'receiver_area[]': {
        //   required: true
        // },
        'receiver_address[]': {
          required: true
        }
      },
      errorPlacement: function(error, el) {
        var $error;
        if (el.prop('tagName') == 'SELECT') {
          $error = el.parents('.twzipcode').prev().find('span');
        } else {
          $error = el.prev().find('span');
        }
        $error.empty().append(error.text());
      },
      success: function(label, element) {
      }
    });
  },

  update = function($this) { // public
    $this.parents('.'+c.addressBox).addClass('new');
      var
      $form = $this.parents('form'),
      data = $form.serialize()
      isvalid = $form.valid();
      if(isvalid){
        $btnSubmit = $btnSubmit.find('span');
        $btnSubmit.empty().append(spinnerEl);
        $.post(ajaxUrl.update, {data: data}, function(json) {
          // remove spinner, add btn text
          $btnSubmit.empty().append($btnSubmit.data('txt'));
          if (json.success) {
            $member.find('.new').remove();
            var receiver_address = json.receiver_address;
            createMiniReceiverAddress(receiver_address);
            $.notify(json.msg);
          } else {
            $.notify({
              message: json.msg
            }, {
              type: 'warning'
            });
          }
        });
      }
  },

  createModifyReceiverAddress = function(formCount){
    addressElement =
        $('<div />', {'class': 'address-box'})
          .append(
            '<form  name="shipping-info'+formCount+'" action="" method="post">'+
              ReceiverAddressElement+
              '<div class="note">'+
                '<button type="submit" class="btn-modify btns">儲存變更</button>'+
              '</div>'+
            '</form>'
          );
      return addressElement;
  },

  populate = function($this){

    var
    $miniAddressBox = $this.parents('.mini-address-box'),
    $modifyAddressBox = $miniAddressBox.next('.modify-address-box'),
    $receiverInfo = $miniAddressBox.find('.receiver-info'),
    $oldAddress = $miniAddressBox.find('.old_address');
    data = {
      name: $receiverInfo.find('.name').html(),
      mobile: $receiverInfo.find('.mobile').html(),
      county: $oldAddress.find('.county').html(),
      zipcode: $oldAddress.find('.zipcode').html(),
      street: $oldAddress.find('.street').html()
    };

    $modifyAddressBox.find('.receiver-name').val(data.name);
    $modifyAddressBox.find('.receiver-mobile').val(data.mobile);
    $modifyAddressBox.find('.receiver-address').val(data.street);

    return data;
  },

  receiver_rmove = function(){
    $member.on('click','.btn-delete', function(){
      $(this).parents('.item').eq(0).remove();
    });
  },

  modify = function($this){
    var
    $form = $this.parents('form'),
    data = $form.serialize(),
    isvalid = $form.valid(),
    $item = $this.parents('.item'),
    $close = $item.find('.'+ c.btnOpenAddress);
    $miniAddressBox = $item.find('.mini-address-box');

    if(isvalid){
      $this.find('span').empty().append(spinnerEl);
      $.post(ajaxUrl.modify, {data: data}, function(json) {
        // remove spinner, add btn text
        $btnSubmit.empty().append($btnSubmit.data('txt'));
        if (json.success) {
          $close.click();
          var receiver_address = json.receiver_address;
          $miniAddressBox.find('.name').html(receiver_address.name);
          $miniAddressBox.find('.mobile').html(receiver_address.mobile);
          $miniAddressBox.find('.county').html(receiver_address.county);
          $miniAddressBox.find('.zipcode').html(receiver_address.zipcode);
          $miniAddressBox.find('.street').html(receiver_address.address);
          if(receiver_address.default){
            $miniAddressBox.find('.receiver-default').attr('checked',true);
          }
          $.notify(json.msg);
        } else {
          $.notify({
            message: json.msg
          }, {
            type: 'warning'
          });
        }
      });
    }
  },

  init = function() {

    // address event
    $member.find('.btn-address').on('click', function() {
      var addressElement = createReceiverAddress(formCount);
      $(this).parents('#address-section').find('.saved-receiver-address').append(addressElement);
      $(addressElement).find('.twzipcode').twzipcode({
        'countyName'   : 'receiver_county[]',
        'districtName' : 'receiver_area[]',
        'zipcodeName'  : 'receiver_zipcode[]'
      });
      validate(formCount);
      formCount++;
    });

    //update event
    $member.on('click','.btn-submit',function(e){
      e.preventDefault();
      update($(this));
    });

    //Open event
    $member.on('click','.'+c.btnOpenAddress,function(){
      var
      $miniAddressBox = $(this).parents('.mini-address-box'),
      $modifyAddressBox = $miniAddressBox.next('.modify-address-box');
      addressElement = createModifyReceiverAddress(formCount);
      $miniAddressBox.toggleClass('active');

      if($miniAddressBox.hasClass('active')){
        $modifyAddressBox.append(addressElement).css('height','470px');
        var data = populate($(this));
        $('.address-box').find('.twzipcode').twzipcode({
          'countySel'    : data.county, // 預設縣市
          'districtSel'  :  data.zipcode  // 預設鄉鎮
        });
        validate(formCount);
        formCount++;
      }else{
        $modifyAddressBox.css('height','0px').empty();
      }
    });

    //modify event
    $member.on('click','.btn-modify' , function(e){
      modify($(this));
      return false;
    });

    $member.on('click','form .receiver-default',function(){
      var $form = $(this).parents('.address-box').eq(0);
      $form.siblings('.address-box').find('.receiver-default').prop('checked',false);
    });

    receiver_rmove();

  };

  init();

  return {
    update: update
  };

})();
$(function(){
  //聯絡地址
  $('#member').on('click','.buyer-country',function(){
    var $this = $(this),
        $twzipcode = $this.parents('.twzipcode');
    if ($this.find('option:selected').data('type') == 'tw') { // member tw option selected
      $twzipcode.find('.address:gt(0)').show();
    } else { // member 其它 option selected
      $twzipcode.find('.address:gt(0)').hide();
    }
  });
});
