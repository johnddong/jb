模板主題色系：
1. 藍色: #168de7 (customs-css-blue.css) - 預設
2. 淺紅: #ed635f (customs-css-lightred.css)
3. 綠色: #00b900 (customs-css-green.css)
4. 深灰: #222222 (customs-css-darkgrey.css)
5. 橘色: #ff8400 (customs-css-orange.css)

----------

CSS:
1. index / product / category / search 共用：

<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/owl.carousel.min.css" rel="stylesheet" type="text/css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/flaticon.min.css" rel="stylesheet" type="text/css">
<link href="css/animate.min.css" rel="stylesheet">
<link href="css/jquery.scrollbar.min.css" rel="stylesheet">
<link href="css/chosen.min.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="css/customs-css-blue.css" rel="stylesheet">
<link href="css/jollybuy.css" rel="stylesheet">

2. 其它內頁：
<link rel='shortcut icon' type='image/x-icon' href='favicon.ico' />
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/flaticon.min.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet">
<link href="css/customs-css-blue.css" rel="stylesheet">
<link href="css/jollybuy.css" rel="stylesheet">

----------

JS:
1. index / product / category / search 共用：

放置在<head>結尾前
<head>
  <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
</head>

放置在<body>結尾前
<body>
  <script type="text/javascript" src="js/bootstrap.min.js" ></script>
  <script type="text/javascript" src="js/bootstrap-notify.min.js"></script>
  <script type="text/javascript" src="js/owl.carousel.min.js"></script>
  <script type="text/javascript" src="js/owl.thumbs.min.js"></script>
  <script type="text/javascript" src="js/magnific-popup.min.js"></script>
  <script type="text/javascript" src="js/mobilemenu.min.js"></script>
  <script type="text/javascript" src="js/imagesloaded.pkgd.min.js"></script>
  <script type="text/javascript" src="js/isotope.pkgd.min.js"></script>
  <script type="text/javascript" src="js/masonry.min.js"></script>
  <script type="text/javascript" src="js/chosen.min.js"></script>
  <script type="text/javascript" src="js/jquery.scrollbar.min.js"></script>
  <script type="text/javascript" src="js/frontend.js"></script>
  <script type="text/javascript" src="js/jollybuy.js"></script>
</body>

2. 其它內頁：

放置在<head>結尾前
<head>
  <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
</head>

放置在<body>結尾前
<body>
  <script type="text/javascript" src="js/bootstrap.min.js" ></script>
  <script type="text/javascript" src="js/bootstrap-notify.min.js"></script>
  <script type="text/javascript" src="js/owl.carousel.min.js"></script>
  <script type="text/javascript" src="js/mobilemenu.min.js"></script>
  <script type="text/javascript" src="js/chosen.min.js"></script>
  <script type="text/javascript" src="js/jquery.scrollbar.min.js"></script>
  <script type="text/javascript" src="js/jquery.validate.min.js"></script>
  <script type="text/javascript" src="js/localization/messages_zh_TW.min.js"></script>
  <script type="text/javascript" src="js/frontend.js"></script>
  <script type="text/javascript" src="js/jollybuy.js"></script>
</body>

----------

Header 下拉選單：
下拉選單樣式以滿版顯示， class 加上 mega-menu
ex: <ul class="submenu mega-menu">

Footer:
footer 置右對齊，class 加上 align-right
ex: <div class="widget custom-menu align-right">

-----------

加入購物車&立即結帳串接格式：

1. js/jollybuy.js -> under add func's ajaxUrl 變數 -> 替換你的 API 路徑
2. post 格式：
{
  "sku": "12345",
  "qty": "1",
  "spec[]": [
    "11111",
    "22222"
  ]
}
3. callback 回傳格式：
{
  "success": true,
  "status": "0000",  // "0000" -> 未登入, "0001" -> 已登入
  "qty": "1",
  "msg": "xxxxx"     // 尚未登入xxx訊息, 已加入購物車xxx訊息
}

加入我的最愛串接格式：

1. js/jollybuy.js -> under wish func's ajaxUrl 變數 -> 替換你的 API 路徑
2. post 格式：
{
  "sku": "12345",
  "status": "add"  // "add" -> 加入, "del" -> 移除
}
3. callback 回傳格式：
{
  "success": true,
  "msg": "xxxxx"  // 已加入我的最愛xxx訊息, 已移除我的最愛xxx訊息
}



------------------------------------------------------------------------------------

/**
* Date: 2017/10/02
* 更動項目： a - f：
* 主題色系CSS更新 - a
* 全站的一支script移除 - b
* 商品頁的一支script新增- c
* 結帳首頁的購物車移除&折扣序號串接 - d, e, f
*/

a. 更新主題色系的CSS:
  1. customs-css-blue.css
  2. customs-css-darkgrey.css
  3. customs-css-green.css
  4. customs-css-lightred.css
  5. customs-css-orange.css

b. 全站移除這支script: jollybuy.js

c. 商品頁新增一支 cart.js, 引入位置：
  放置在<body>結尾前
  <body>
    .....
    <script type="text/javascript" src="js/cart.js"></script>
  </body>

d. 結帳首頁新增一支 pay.js，引入位置：
  放置在<body>結尾前
  <body>
    .....
    <script type="text/javascript" src="js/pay.js"></script>
  </body>

e. 結帳首頁移除購物車串接格式：

  1. js/pay.js -> 搜尋 ajaxUrl.remove 變數 -> 替換你的 API 路徑
  2. post 格式：
  {
    orderId: orderId
  }
  3. callback：
  　//成功回傳格式：
    {
      "success": true,
      "msg": ""
    }
    //失敗回傳格式：
    {
      "success": false,
      "msg": "系統異常，xxx錯誤訊息"
    }

f. 結帳首頁折扣序號串接格式：

  1. js/pay.js -> 搜尋 ajaxUrl.coupon 變數 -> 替換你的 API 路徑
  2. post 格式：
  {
    couponCode: couponCode
  }
  3. callback：
  　//成功回傳格式：
    {
      "success": true,
      "msg": "折抵",
      "unit": "NT",
      "discount": -100
    }
    //失敗回傳格式：
    {
      "success": false,
      "msg": "請輸入正確且有效的折價券序號"
    }




------------------------------------------------------------------------------------

/**
* Date: 2017/10/09
* 更新項目如下所示
*/

1. 更新 fonts 資料夾 (新增 fonts)
2. 更新 images 資料夾 (新增 images)
3. 更新 CSS 資料夾 (新增 datepicker3.min.css & 更新jollybuy.css, custom-css-[color].css)
4. 更新 JS 資料夾 (新增 script code)
5. 結帳第二步新增：
   <!-- 日期選單 -->
	 <link href="css/bootstrap-datepicker3.min.css" rel="stylesheet">
   <script type="text/javascript" src="js/bootstrap-datepicker.min.js"></script>
   <! -- 欄位驗證 -->
   <script type="text/javascript" src="js/jquery.validate.min.js"></script>
 	 <script type="text/javascript" src="js/localization/messages_zh_TW.min.js"></script>
   <! -- 地址 -->
   <script type="text/javascript" src="js/twzipcode/jquery.twzipcode.min.js"></script>
6. 超商 icon class: seven-eleven, family-mart, ok-mart, hi-life
   ex: <span class="icon-store seven-eleven"></span>
7. 結帳第二步的購物清單預設展開, class 加上 active
   ex: <div class="summary active">
8. 備註：結帳第二步的橘子支欄位只在手機跟平板顯示，若為電腦版則會判斷隱藏，但在結帳第三步時會以 QR CODE 畫面呈現供掃描進行支付
9. 新增首頁模板 - skyline.html (名稱暫取，再請Quinn提供)


/**
* Date: 2017/10/11
* 頁面: 結帳流程 (更新版)
*/

1. fix bug, 更新 pay.js
2. 結帳第二步的購物清單預設關閉, class 移除 active
   ex: <div class="summary active">
   更新：css/jollybuy.css
3. 商品頁：規格下拉選單下方截斷 & 商品補貨中按鈕間距微調
   更新：css/jollybuy.css
4. 更新地址 script
   移除: js/twzipcode.js
   換上: js/twzipcode/jquery.twzipcode.min.js


/**
* Date: 2017/10/16
* 頁面：會員更新
*/

1. 引入新版住址 script:
   <script type="text/javascript" src="js/twzipcode/jquery.twzipcode.min.js"></script>
2. 引入 member script (for 會員資料post, 電話、地址動態產生):
   <script type="text/javascript" src="js/member.js"></script>
3. 更新：css/jollybuy.css
4. 新增：images/temp (暫時圖片，上線時可不用上傳)
5. 會員儲存變送出 via AJAX, 串接格式：
  　a. js/member.js -> 搜尋 Member ajaxUrl.update 變數 -> 替換你的 API 路徑
    b. post 格式：
    {
      data: data
    }
    c. callback：
  　//成功回傳格式：
    {
      "success": true,
      "msg": "儲存變更成功"
    }
    //失敗回傳格式：
    {
      "success": false,
      "msg": "系統異常，xxx錯誤訊息"
    }


/**
* Date: 2017/10/16 (v2)
* 頁面： 結帳首頁更新 & 登入取得動態密碼按鈕調整樣式
*/

1. 商品數量改為透過點擊箭頭增加/減少 (非下拉方式)
   更新：css/jollybuy.css
        js/pay.js
2. 字樣調整: 購物金 => JPoint
3. 登入取得動態密碼按鈕調整樣式
   按鈕元素加上 class="submit"
   ex: <button id="send" class="submit" type="button" onclick="getDynamicPassword()">取得動態密碼</button>


/**
* Date: 2017/10/17
* 頁面：會員查詢
*/

1. 透過參數 list=1 開啟結帳第三步的購物清單
   訂單查詢頁的查閱按鈕網址須帶上 list = 1, ex: url?list=1

2. 更新：css/jollybuy.css & js/pay.js



/**
* Date: 2017/10/18
* 頁面：1. 訂單查詢 2. 會員資訊
*/

1. 加上訂單查詢無任何訂單的元素
2. 移除修改密碼
3. 更新：css/jollybuy.css & js/member.js



/**
* Date: 2017/10/19
* 頁面： 會員資訊
*/

1. 加上會員頁面載入時顯示儲存的購買人電話&收件人資訊
   頁面載入時, 會先請求資料 via AJAX, 串接格式：
  　a. js/member.js -> 搜尋 Member 的 ajaxUrl.get 變數 -> 替換你的 API 路徑
    b. post 格式：
    {

    }
    c. callback：
  　//成功回傳格式：
    {
      "success": true,
      "buyer_phone": [
        {
          "phone": "091234567"
        }
      ],
      "receiver_address": [
        {
          "name": "David",
          "phone": "091234567",
          "county": "臺北市",
          "area": "內湖區",
          "address": "瑞光路258巷35號9樓",
          "default": false
        }
      ]
    }
    //失敗回傳格式：
    {
      "success": false,
      "msg": "系統異常，xxx錯誤訊息"
    }
3. 更新：css/jollybuy.css & js/member.js



/**
* Date: 2017/10/20
* 頁面： 訂購第二步驟 & 訂單查詢
*/


1. 收件人連絡電話欄位 加上 class="receiver-mobile"
2. 訂購人資料下方加上同時更新到會員中心 checkbox 欄位
3. 點選收件人資料與訂購人資料相同時，會須請求 AJAX 取回資料, 串接格式：
  a. js/pay.js -> 搜尋 syncData 的 ajaxUrl 變數 -> 替換你的 API 路徑
  b. post 格式：
  {

  }
  c. callback：
　//成功回傳格式：
  {
    "success": true,
    "receiver_address": [
      {
        "name": "David",
        "phone": "091234567",
        "county": "臺北市",
        "area": "內湖區",
        "address": "瑞光路258巷35號9樓",
        "default": false
      }
    ]
  }
  //失敗回傳格式：
  {
    "success": false,
    "msg": "系統異常，xxx錯誤訊息"
  }
4. 更新：css/jollybuy.css & js/pay.js
5. 訂單查詢頁加上 分頁




/**
* Date: 2017/10/21
* 頁面： JPoint (共三頁)
* 首頁: jpoint.html
* 可使用JPoint積點： jpoint-confirmed.html
* 待生效JPoint積點： jpoint-pending.html
*/

1. 引入 js/jpoint.js
2. 已綁定BeanGo時的狀態, overlay彈跳視窗 加上 class="verified"
   ex: <div id="myModal" class="verified modal fade cart-content">
3. JPoint table 無記錄時，加上 class="no-record"
   ex: <div class="detail no-record">
4. 點選overlay"帳戶綁定"按鈕時，會須請求 AJAX 取回資料, 串接格式：
    a. js/jpoint.js -> 搜尋 JPoint 的 ajaxUrl.verify 變數 -> 替換你的 API 路徑
    b. post 格式：
    {
      data: data // 表單 input
    }
    c. callback：
  　//成功回傳格式：
    {
      "success": true,
      "status": "verified",
      "beangoPoint": 300,
      "msg": "帳戶綁定完成"
    }
    //失敗回傳格式：
    {
      "success": false,
      "msg": "系統異常，xxx錯誤訊息"
    }
5. 點選overlay"確認轉點"按鈕時，會須請求 AJAX 取回資料, 串接格式：
    a. js/jpoint.js -> 搜尋 JPoint 的 ajaxUrl.transfer 變數 -> 替換你的 API 路徑
    b. post 格式：
    {
      data: data // 表單 input
    }
    c. callback：
  　//成功回傳格式：
    {
      "success": true,
      "status": "verified",
      "msg": "轉點已完成",
      "beangoPoint": 320,
      "jpointLeft": 0,
      "list": [
        {
          "date": "2017-10-21",
          "item": "轉至BeanGo",
          "link": "pay03.html?list=1",
          "amount": "-20"
        }
      ]
    }
    //失敗回傳格式：
    {
      "success": false,
      "msg": "系統異常，xxx錯誤訊息"
    }
6. 更新：css/jollybuy.css



/**
* Date: 2017/10/23
* 頁面： JPoint (bug fix)
*/

1. 點選overlay"確認轉點"按鈕時, 回傳(callback)格式新增兩個欄位：
　 "expiredDate": "2018-01-17",
   "availableDate": "2017-10-15"
   ex:
   //成功回傳格式：
   {
     "success": true,
     "status": "verified",
     "msg": "轉點已完成",
     "beangoPoint": 320,
     "jpointLeft": 0,
     "list": [
       {
         "date": "2017-10-21",
         "item": "轉至BeanGo",
         "link": "pay03.html?list=1",
         "amount": "-20",
         "expiredDate": "2018-01-17",
         "availableDate": "2017-10-15"
       }
     ]
   }
2. 更新 js/api-temp/jpoint-transfer-success.json & js/jpoint.js
3. 轉出至BeanGo按鈕加上 data-status 屬性
   可使用 JPoint 積點頁：
   <a href="javascript:void(0);" class="submit" data-status="availablePoints">轉出至BeanGo</a>
   待生效 JPoint 積點頁：
   <a href="javascript:void(0);" class="submit" data-status="pendingPoints">轉出至BeanGo</a>
4. 新增 images/icons



/**
* Date: 2017/10/23
* 頁面： 文章模板(框架)
*/

1. 檔名：blog.html



/**
* Date: 2017/10/24
* 頁面： 我的珍藏 & 第四個首頁模板 (curtain)
*/

1. 我的珍藏檔名：favorite.html
2. 首頁模板檔名：curtain.html



/**
* Date: 2017/10/26
* 頁面： JPoint (v2)
*/

1. include  js/jpoint.js & qrious.js
2. 綁定BeanGo按鈕的<a>標籤帶上下列屬性：
　 ex: <a href="javascript:void(0);" class="submit" data-type="" data-service-id="" data-identity-code="" data-auth-code=""><span>綁定BeanGo</span><img src="images/icons/beango.png" alt="BeanGo!"></a>
3. 已綁定BeanGo時的狀態, overlay彈跳視窗 加上 class="verified"
   ex: <div id="myModal" class="verified modal fade cart-content">
4. JPoint table 無記錄時，加上 class="no-record"
   ex: <div class="detail no-record">
5. 點選overlay"確認轉點"按鈕時，會須請求 AJAX 取回資料, 串接格式：
       a. js/jpoint.js -> 搜尋 JPoint 的 ajaxUrl.transfer 變數 -> 替換你的 API 路徑
       b. post 格式：
       {
         data: data // 表單 input
       }
       c. callback：
     　//成功回傳格式：
       {
         "success": true,
         "status": "verified",
         "msg": "轉點已完成",
         "beangoPoint": 320,
         "jpointLeft": 0,
         "list": [
           {
             "date": "2017-10-21",
             "item": "轉至BeanGo",
             "link": "pay03.html?list=1",
             "amount": "-20"
           }
         ]
       }
       //失敗回傳格式：
       {
         "success": false,
         "msg": "系統異常，xxx錯誤訊息"
       }
6. 更新：css/jollybuy.css



/**
* Date: 2017/10/26
* 頁面： 結帳第二步&結帳第三步 橘子支支付調整
*/

1. 結帳第二步：移除橘子支欄位
2. 結帳第三步：PC 下顯示QRCode, 手機下顯示QrCode 和橘子支支付按鈕



/**
* Date: 2017/10/30
* 頁面： 搜尋結果頁
*/

1. 檔名：search.html
2. 引入：js/cart.js
3. 更新：css/jollybuy.css
4. 確認全站 <meta> viewpoint 的屬性有加入 user-scalable=no
   ex: <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
5. 加入我的最愛串接格式：
    1. js/cart.js -> 找到 wish func's ajaxUrl 變數 -> 替換你的 API 路徑
    2. post 格式：
    {
      "sku": "12345",
      "status": "add"  // "add" -> 加入, "del" -> 移除
    }
    3. callback 回傳格式：
    {
      "success": true,
      "msg": "xxxxx"  // 已加入我的最愛xxx訊息, 已移除我的最愛xxx訊息
    }
6. 模板 - skyline: 移除搜尋bar分類和微調搜尋bar樣式



/**
* Date: 2017/10/31
* 頁面： 首頁第五個模板 (section)
*/

1. 檔名：section.html
2. 更新: css/jollybuy.css & css/style.css



/**
* Date: 2017/11/3
* 全站 script： special_banner() &  kt_innit_carousel()
* 頁面: 商品頁
*/

1. 新增: 判斷有該元素存在時，才觸發
2. 更新: js/frontend.js
3. 商品頁: 新增 max & min 數量屬性



/**
* Date: 2017/11/6
* 頁面: 首頁模板 - electronics
*/

1. 檔名：electronics.html
2. 更新: css/jollybuy.css
3. 更新結帳步驟的 icons (6張), 路徑：images/pay-steps



/**
* Date: 2017/11/6
* 頁面: 登入 (v2)
*/

1. 引入 js/login.js
2. 更新 css/jollybuy.css
3. 調整layout&加上-取得動態密碼&圖形驗證碼的前台驗證



/**
* Date: 2017/11/8
* 調整：全站登入前後的會員中心下拉選單內容調整
*/

1. 修改位置：全站 header 下的會員中心下拉選單 (包含目前的6個首頁模板)
2. 下拉內容的mockup:
<a href="javascript:void(0);">會員中心</a>
<!-- 登入前 -->
<ul class="submenu">
  <li><a href="login.html">登入</a></li>
  <li><a href="register">註冊</a></li>
  <li><a href="member.html">會員資訊</a></li>
  <li><a href="search.html">訂單查詢</a></li>
  <li><a href="jpoint.html">JPoint</a></li>
</ul>
<!--/ 登入前 -->
<!-- 登入後 -->
<!--
<ul class="submenu">
  <li><a href="">登出</a></li>
  <li><a href="member.html">會員資訊</a></li>
  <li><a href="search.html">訂單查詢</a></li>
  <li><a href="jpoint.html">JPoint</a></li>
</ul>
-->
<!--/ 登入後 -->



/**
* Date: 2017/11/8
* 內容：第7個首頁模板 (Feature)
*/

1. 檔名: feature.html
2. 引入：js/cart.js
3. 加入我的最愛串接格式：
    1. 加入我的最愛 mockup 加上 wishlist class 和 data-sku & data-type 屬性
       ex: <a href="javascript:void(0);" class="wishlist-button wishlist" data-sku="12345" data-type="wishlist"></a>
    2. js/cart.js -> 找到 wish func's ajaxUrl 變數 -> 替換你的 API 路徑
    3. post 格式：
    {
      "sku": "12345",
      "status": "add"  // "add" -> 加入, "del" -> 移除
    }
    4. callback 回傳格式：
    {
      "success": true,
      "msg": "xxxxx"  // 已加入我的最愛xxx訊息, 已移除我的最愛xxx訊息
    }



/**
* Date: 2017/11/8
* 內容：BeanGo 分享
*/

1. 檔名: product.html (line 211)
2. 更新 css/jollybuy.css



/**
*Date: 2017/11/9
*內容：更新結帳步驟 icons (6張)
*/

1. 更新：css/jollybuy.css
2. 圖檔路徑：images/pay-steps



/**
*Date: 2017/11/9
*內容：目前7個模板電視牆的PC&手機套連結方式修改
*/

1. 調整：目前7個模板的電視牆mockup: PC版連結套整張圖;手機版連結套前往按鈕
2. 更新：css/style.css & jollybuy.css



/**
*Date: 2017/11/10
*內容: JPoint 字樣改成JUPoint
*/

1. 檔名：jpoint.html & jpoint-confirmed.html & jpoint-pending.html


/**
*Date: 2017/11/11
*內容：結帳第二步樣式&欄位調整
*/

1. 檔名：pay02.html
2. 更新: css/jollybuy.css & js/pay.js
3. 欄位變動／新增：
變動：
<h4 class="subtitle margin-clear"><input id="member_update" name="member_update" type="checkbox" value="1" /> <label for="member_update">更新會員資訊</label></h4>
<h4 class="subtitle margin-clear"><input id="buyer_sync" name="member_info" type="radio" /> <label for="buyer_sync">同訂購人</label></h4>
<h4 class="subtitle margin-clear"><input id="member_sync" name="member_info" type="radio" /> <label for="member_sync">同會員中心</label></h4>
新增：
<h4 class="subtitle"><input id="address_add" type="checkbox" /> <label for="address_add">儲存地址到會員中心</label></h4>



/**
*Date: 2017/11/11
*內容：首頁＆商品頁間距/font/color微調
*/

1. 更新：css/jollybuy.css



/**
*Date: 2017/11/21
*內容：加購商品
*/

1. 更新：
   js/owl.carousel.min.js
   js/cart.js
   css/jollybuy.css
2. 套版：加購數量的 max & min 請套上
3. 頁面：product.html



/**
*Date: 2017/11/22
*內容：分享
*/

1. 加上： images/icons/share
2. 更新： css/jollybuy.css
3. FB & LINE 分享串接格式
   FB:
   http://www.facebook.com/share.php?u={商品網址};
   LINE:
   http://line.naver.jp/R/msg/text/?{商品標題}.'%20%0a'.{商品網址};
4. 頁面：product.html



/**
*Date: 2017/11/27
*內容：加購品
*/

1. 頁面：pay.html
2. 加上屬性：
   <!-- 主商品 tr tag -->
   <tr class="each-item" data-orderid="">
   <!-- 加購品 tr tag -->
   <tr class="each-item" data-relatedid="" data-orderid="">
   data-orderid: 帶入訂單編號
   data-relatedid 帶入主商品的訂單編號
3. mockup 變動
   主商品／加購標題：
   <td class="product-name" data-title="商品名稱">
     <div class="flash">加購商品</div>
     <!-- 主商品 -->
     <a href="#" class="product-title" target="_blank">經典藍色 T-Shirt</a>
     <!-- 加購商品 -->
     <div class="product-title">加購經典 Jeans</div>
   </td>
   加購數量：
   <td class="quantity-item" data-title="數量">
     <div class="quantity">1</div>
   </td>
4. 更新：
　 css/jollybuy.css
   js/pay.js



/**
*Date: 2017/11/30
*內容: 商品頁和結帳頁的數量選取優化
*/

1. 頁面：　
   1.1 product.html
　 1.2 pay.html
2. pay.html 引入：
   <script type="text/javascript" src="js/cart.js"></script>
3. 更新：
   css/jollybuy.css
   js/pay.js
   js/cart.js
4. mockup 變動：
    <!-- 數量 -->
    <div class="quantity-btn">
      <div class="qty_box">
        <div class="minus btn-primary disable">&#45;</div>
        <input class="qty" name="qty" type="tel" value="1" min="1" max="5" maxlength="3" autocomplete="off">
        <div class="plus btn-primary">&#43;</div>
      </div>
    </div>



/**
*Date: 2017/1204
*內容：列表商品圖大小不一呈現調整 (圖至底對齊)
*/

1. 更新：css/jollybuy.css




/**
*Date: 2017/12/05
*內容: 結帳頁商品排列手機RWD版面調整
*備註: 購物清單移除order-grid class，手機版購物清單UI以初始樣板呈現
*/

1. 頁面：　
　 pay.html
   favorite.html

2. 更新：
   css/jollybuy.css
   js/pay.js

3. pay.html 的 mockup 變動：
<!-- 購物清單 -->
<div id="order-list" class="order-grid">
  <!-- 購物清單概要 -->
  <!-- 第一步不顯示(請隱藏)
  <div class="summary active">
    <div>合計：NT$1,840</div>
    <div class="cart-qty">購物車：2件</div>
    <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i>
  </div>
  -->
  <!--/ 購物清單概要 -->
  <div class="table shopping-cart-content">
    <div class="tr title">
      <div class="td delete-item">移除</div>
      <div class="td product-thumb">商品圖片</div>
      <div class="td product-name">商品名稱</div>
      <div class="td quantity-item">數量</div>
      <div class="td price">單價</div>
      <div class="td total">小計</div>
    </div>
    <div class="tr each-item" data-orderid="11111">
      <div class="td delete-item" data-title="移除" title="商品移除"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>
      <div class="td product-thumb" data-title="商品圖片"><a href="#"><img src="images/270x270.jpg" alt="" /></a></div>
      <div class="td product-name" data-title="商品名稱">
        <a href="#" class="product-title" target="_blank">經典藍色 T-Shirt</a>
        <div>黑色</div>
        <div>總重: 0.00 KG</div>
      </div>
      <div class="td quantity-item" data-title="數量">
        <div class="quantity-btn">
          <div class="qty_box">
            <div class="minus btn-primary disable">&#45;</div>
            <input class="qty" name="qty" type="tel" value="1" min="1" max="5" maxlength="3" autocomplete="off">
            <div class="plus btn-primary">&#43;</div>
          </div>
        </div>
      </div>
      <div class="td price" data-title="單價">NT$<span>1,000</span></div>
      <div class="td total" data-title="小計">NT$<span>1,000</span></div>
    </div>
    <div class="tr each-item" data-orderid="22222">
      <div class="td delete-item" data-title="移除" title="商品移除"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>
      <div class="td product-thumb" data-title="商品圖片"><a href="#"><img src="images/270x270.jpg" alt="" /></a></div>
      <div class="td product-name" data-title="商品名稱">
        <a href="#" class="product-title" target="_blank">經典藍色 T-Shirt</a>
      </div>
      <div class="td quantity-item" data-title="數量">
        <!-- <div class="quantity">
          <input class="input-text qty text" type="text" size="4" value="1" name="qty" max="10" min="1" maxlength="2">
          <div class="group-quantity-button">
            <a class="plus" href="#"><i class="fa fa-sort-asc" aria-hidden="true"></i></a>
            <a class="minus" href="#"><i class="fa fa-sort-desc" aria-hidden="true"></i></a>
          </div>
        </div> -->
        <div class="quantity-btn">
          <div class="qty_box">
            <div class="minus btn-primary disable">&#45;</div>
            <input class="qty" name="qty" type="tel" value="1" min="1" max="5" maxlength="3" autocomplete="off">
            <div class="plus btn-primary">&#43;</div>
          </div>
        </div>
      </div>
      <div class="td price" data-title="單價">NT$<span>2,000</span></div>
      <div class="td total" data-title="小計">NT$<span>2,000</span></div>
    </div>
    <div class="tr each-item" data-relatedid="22222" data-orderid="33333">
      <div class="td delete-item" data-title="移除" title="商品移除"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>
      <div class="td product-thumb" data-title="商品圖片"><img src="images/270x270.jpg" alt="" /></div>
      <div class="td product-name" data-title="商品名稱">
        <div class="flash">加購商品</div>
        <div class="product-title">加購經典 Jeans</div>
      </div>
      <div class="td quantity-item" data-title="數量">
        <div class="quantity">1</div>
      </div>
      <div class="td price" data-title="單價">NT$<span>100</span></div>
      <div class="td total" data-title="小計">NT$<span>100</span></div>
    </div>
  </div>
  <div class="shopping-cart-checkout table">
    <div class="tr">
      <div class="td left">
        <a href="#" class="continue-shopping submit">繼續購物</a>
      </div>
      <div class="td right">
        <span class="flash">優惠促銷</span>
        <div class="news">全館滿2500免運費</div>
        <div class="promo">已享用之優惠</div>
      </div>
    </div>
  </div>
</div>
<!--/ 購物清單 -->

4. favorite.html 的 mockup 變動：
<!-- 購物清單 -->
<div id="order-list" class="order-grid">
  <!-- 購物清單概要 -->
  <!-- 第一步不顯示(請隱藏)
  <div class="summary active">
    <div>合計：NT$1,840</div>
    <div class="cart-qty">購物車：2件</div>
    <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i>
  </div>
  -->
  <!--/ 購物清單概要 -->
  <div class="table shopping-cart-content">
    <div class="tr title">
      <div class="td delete-item">移除</div>
      <div class="td product-thumb">商品圖片</div>
      <div class="td product-name">商品名稱</div>
      <div class="td price">單價</div>
      <div class="td total">商品詳情</div>
    </div>
    <div class="tr each-item" data-orderid='12345'>
      <div class="td delete-item" data-title="移除" title="商品移除"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>
      <div class="td product-thumb" data-title="商品圖片"><a href="product.html"><img src="images/270x270.jpg" alt="" /></a></div>
      <div class="td product-name" data-title="商品名稱">
        <a href="td product.html" class="product-name">經典藍色 T-Shirt</a>
        <div class="spec">
          <span>尺寸：S</span>
          <span>顏色：波西米白</span>
        </div>
      </div>
      <div class="td price" data-title="單價">NT$<span>1,750</span></div>
      <div class="td total" data-title="商品詳情"><a href="product.html" class="continue-shopping submit">商品詳情</a></div>
    </div>
    <div class="tr each-item" data-orderId='12345'>
      <div class="td delete-item" data-title="移除" title="商品移除"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>
      <div class="td product-thumb" data-title="商品圖片"><a href="product.html"><img src="images/270x270.jpg" alt="" /></a></div>
      <div class="td product-name" data-title="商品名稱"><a href="product.html" class="product-name">經典藍色 T-Shirt</a></div>
      <div class="td price" data-title="單價">NT$<span>75</span></div>
      <div class="td total" data-title="商品詳情"><a href="product.html" class="continue-shopping submit">商品詳情</a></div>
    </div>
  </div>
  <div class="shopping-cart-checkout table">
    <div class="tr">
      <div class="td"><a href="index.html" class="continue-shopping submit">繼續購物</a></div>
    </div>
  </div>
</div>
<!--/ 購物清單 -->



/**
*Date: 2017/12/07
*內容：header 模組改版 for 模板2 / 模板4 / 模板6
*/

1. 頁面：
　 1.1 autumn.html (模板2)
   1.2 curtain.html (模板4)
   1.3 electronics.html (模板6)

2. 更新：
   1.1 css/customs-css-darkgrey.css
   1.2 css/jollybuy.css
   1.3 images/header

3. 「全站」引入：
　　<script type="text/javascript" src="js/jquery.validate.min.js"></script>
  　<script type="text/javascript" src="js/localization/messages_zh_TW.min.js"></script>

4. markup 變動：
   請重新套入 header for 模板2 / 模板4 / 模板6
　　<!-- heaer -->
    header markup ...
    <!--/header -->　

5. 注意：logo 建議尺寸 150x60，請於後台上傳的位置備註



/**
*Date: 2017/12/11
*內容：列表中的商品圖依寬或高等比縮 (contain method)
*/

1. 更新：
　 1.1 css/style.css
   1.2 css/jollybuy.css

/**
*Date: 2017/12/12
*內容：訂單明細頁_1.確認收貨 2.評價商品
*/

1. 頁面：
 order.html

2. 更新：
  css/jollybuy.css

3. 新增:
  js/order.js
  images/icons/chart.png
  images/icons/chart_o.png

3.「order.html」引入：
  <script type="text/javascript" src="js/order.js"></script>

4. markup 變動：
<table class="shopping-cart-content">
  <tr class="title">
    <td class="order-date">訂單日期</td>
    <td class="order-number">訂單號碼</td>
    <td class="order-status">訂單狀態</td>
    <td class="order-total">合計</td>
    <td class="order-return">訂單取消/退貨</td>
    <td class="order-chart">商品敲敲話</td>
    <td class="order-eval">評價</td>
    <td class="product-status">收貨狀態</td>
  </tr>
  <tr class="each-item">
    <td data-title="訂單日期" class="order-date">2017-11-30</td>
    <td data-title="訂單號碼" class="order-number"><a href="pay03.html?list=1">2017101502550041</a></td>
    <td data-title="訂單狀態" class="order-status">處理中</td>
    <td data-title="合計" class="order-total">
      $620
    </td>
    <td data-title="訂單取消/退貨" class="order-return"><a href="">訂單取消</a></td>
    <td data-title="商品敲敲話" class="btn-chart"><a href="javascript:void(0)"></a></td>
    <td data-title="評價" class="order-eval">
    <!-- 訂單未評價顯示下方mockup -->
      <a href="javascript:void(0)">未評價</a>
    <!-- end -->
    </td>
    <td data-title="收貨狀態" class="product-status">
    <!-- 尚未收貨時顯示這個按鈕↓ -->
      <a href="javascript:void(0)" class="btn-receiving submit">確認收貨</a>
    <!-- end -->
    </td>
  </tr>
  <tr class="each-item">
    <td data-title="訂單日期" class="order-date">2017-11-30</td>
    <td data-title="訂單號碼" class="order-number"><a href="pay03.html?list=1">2017101502550045</a></td>
    <td data-title="訂單狀態" class="order-status">處理中</td>
    <td data-title="合計" class="order-total">
      $620
    </td>
    <td data-title="訂單取消/退貨" class="order-return"><a href="">訂單取消</a></td>
    <td data-title="商品敲敲話" class="btn-chart"><a href="javascript:void(0)"></a></td>
    <td data-title="評價" class="order-eval">
    <!-- 訂單評價過顯示下方mockup -->
      <a href="javascript:void(0)">已評價</a>
    <!-- end -->
    </td>
    <td data-title="收貨狀態" class="product-status">
      <!-- 已完成收貨顯示下方文字↓ -->
      完成收貨
      <!-- end -->
    </td>
  </tr>
  <tr class="each-item">
    <td data-title="訂單日期" class="order-date">2017-11-30</td>
    <td data-title="訂單號碼" class="order-number"><a href="pay03.html?list=1">2017101502550045</a></td>
    <td data-title="訂單狀態" class="order-status">處理中</td>
    <td data-title="合計" class="order-total">
      $620
    </td>
    <td data-title="訂單取消/退貨" class="order-return"><a href="">訂單取消</a></td>
    <td data-title="商品敲敲話" class="btn-chart"><a href="javascript:void(0)"></a></td>
    <td data-title="評價" class="order-eval">
    <!-- 訂單已完成且期滿三個月,顯示下方mockup -->
      已評價
    <!-- end -->
    </td>
    <td data-title="收貨狀態" class="product-status">
      完成收貨
    </td>
  </tr>
</table>

<!-- Modal -->
<div id="myModal" class="modal fade">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-confirm">確定</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-eval disable" disabled="true">送出評價</button>
				<div class="tip">
					* 系統將於訂單狀態「已完成」30天後自動以５顆星(優良) 評價賣家，但仍保留買家「三個月」編輯修改的權利。</div>
      </div>
    </div>
  </div>
</div>
<!--/ Modal -->

取訂單商品資訊
5-1. js/order.js -> ajaxUrl ={
    list:''-> 替換你的 API 路徑
  }
5-2. post 格式：
{orderNumber:"2017101502550041"}

5-3. callback 回傳格式：
{
  "success": true,
  "msg":"評價完成",
  "qty": 2,
  "product": [
    {
      "name":"墨西哥來的玉米片墨西哥玉米片",
      "skuCode":"J070000000000812",
      "score":0,
      "suggestion":"",
      "selected":"default"
    },
    {
      "name":"經典藍色 T-Shirt",
      "skuCode":"J070000000000813",
      "score":0,
      "suggestion":"",
      "selected":"default"
    }
  ],
  "comment":["出貨速度讚","商品品質讚","服務態度讚","CP值讚"]
}

完成收貨
5-1. js/order.js -> ajaxUrl ={
    evaluation:''-> 替換你的 API 路徑
  }
5-2. post 格式：
$('.eval-form').serialize()

5-3. callback 回傳格式：
{
  "success": true,
  "msg": "完成評價"
}



/**
*Date: 2017/12/13
*內容：商品運送狀態顯示
*/

1. 頁面：
   pay03.html

2. 更新：
　 1.1 js/pay.js
   1.2 css/jollybuy.CSS

2. markup 變動 & JS 觸發：
<!-- 運送貨態 -->
<div class="shipping-status">
  <div class="summary">全家付款完成 <i class="fa fa-angle-down fa-lg ease" aria-hidden="true"></i></div>
  <div class="detail ease">
    <ul class="submenu">
      <li class="current fa fa-check" aria-hidden="true"><span>訂單成立 11/27 22:54</span></li>
      <li class="current fa fa-check" aria-hidden="true"><span>付款完成 11/27 22:58</span></li>
      <li><span>訂單處理中</span></li>
      <li><span>商品已出貨</span></li>
      <li><span>商品送達門市</span></li>
      <li><span>買家取件完成</span></li>
    </ul>
  </div>
</div>
<!--/ 運送貨態 -->

// 貨態 toggle
$(function() {
  $('.shipping-status').toggleExp();
});

備註說明：已完成狀態，<li> 帶入 current fa fa-check" aria-hidden="true"
ex:
<li class="current fa fa-check" aria-hidden="true"><span>訂單成立 11/27 22:54</span></li>

/**
*Date: 2017/12/13
*內容：取消訂單，確認退貨
*/
1.調整頁面:
  order.html

2.新增頁面:
  return.html
  return02.html

3. 更新：
  css/jollybuy.css
  js/order.js
  js/pay.js

4. 新增:
  js/return.js

5. markup 變動：
<table class="shopping-cart-content">
  <tr class="title">
    <td class="order-date">訂單日期</td>
    <td class="order-number">訂單號碼</td>
    <td class="order-status">訂單狀態</td>
    <td class="order-total">合計</td>
    <td class="order-return">訂單取消/退貨</td>
    <td class="order-chart">商品敲敲話</td>
    <td class="order-eval">評價</td>
    <td class="product-status">收貨狀態</td>
  </tr>
  <tr class="each-item">
    <td data-title="訂單日期" class="order-date">2017-11-30</td>
    <td data-title="訂單號碼" class="order-number"><a href="pay03.html?list=1">2017101502550045</a></td>
    <td data-title="訂單狀態" class="order-status">處理中</td>
    <td data-title="合計" class="order-total">
      $620
    </td>
    <td data-title="訂單取消/退貨" class="order-return">
      <!-- 訂單已取消 -->
      已取消
      <!-- /訂單已取消 -->
    </td>
    <td data-title="商品敲敲話" class="btn-chart"><a href="javascript:void(0)"></a></td>
    <td data-title="評價" class="order-eval"></td>
    <td data-title="收貨狀態" class="product-status"></td>
  </tr>
  <tr class="each-item">
    <td data-title="訂單日期" class="order-date">2017-11-30</td>
    <td data-title="訂單號碼" class="order-number"><a href="pay03.html?list=1">2017101502550045</a></td>
    <td data-title="訂單狀態" class="order-status">處理中</td>
    <td data-title="合計" class="order-total">
      $620
    </td>
    <td data-title="訂單取消/退貨" class="order-return">
      <!-- 訂單未付款未取消 -->
      <a href="javascript:void(0)" class="cancel-order">訂單取消</a>
      <!-- /訂單未付款未取消 -->
      <!-- 訂單已取消 -->
      <!-- 已取消 -->
      <!-- /訂單已取消 -->
    </td>
    <td data-title="商品敲敲話" class="btn-chart"><a href="javascript:void(0)"></a></td>
    <td data-title="評價" class="order-eval"></td>
    <td data-title="收貨狀態" class="product-status"></td>
  </tr>
  <tr class="each-item">
    <td data-title="訂單日期" class="order-date">2017-11-30</td>
    <td data-title="訂單號碼" class="order-number"><a href="pay03.html?list=1">2017101502550041</a></td>
    <td data-title="訂單狀態" class="order-status">已出貨</td>
    <td data-title="合計" class="order-total">
      $620
    </td>
    <td data-title="訂單取消/退貨" class="order-return">
      <!-- 訂單已付款 -->
      <a href="return.html?list=1">我要退貨</a>
      <!-- /訂單已付款 -->
    </td>
    <td data-title="商品敲敲話" class="btn-chart"><a href="javascript:void(0)"></a></td>
    <td data-title="評價" class="order-eval">
    <!-- 訂單未評價顯示下方mockup -->
      <a href="javascript:void(0)">未評價</a>
    <!-- end -->
    </td>
    <td data-title="收貨狀態" class="product-status">
    <!-- 尚未收貨時顯示這個按鈕↓ -->
      <a href="javascript:void(0)" class="btn-receiving submit">確認收貨</a>
    <!-- end -->
    </td>
  </tr>
  <tr class="each-item">
    <td data-title="訂單日期" class="order-date">2017-11-30</td>
    <td data-title="訂單號碼" class="order-number"><a href="pay03.html?list=1">2017101502550045</a></td>
    <td data-title="訂單狀態" class="order-status">已出貨</td>
    <td data-title="合計" class="order-total">
      $620
    </td>
    <td data-title="訂單取消/退貨" class="order-return"><a href="return.html?list=1">我要退貨</a></td>
    <td data-title="商品敲敲話" class="btn-chart"><a href="javascript:void(0)"></a></td>
    <td data-title="評價" class="order-eval">
    <!-- 訂單評價過顯示下方mockup -->
      <a href="javascript:void(0)">已評價</a>
    <!-- end -->
    </td>
    <td data-title="收貨狀態" class="product-status">
      <!-- 已完成收貨顯示下方文字↓ -->
      完成收貨
      <!-- end -->
    </td>
  </tr>
  <tr class="each-item">
    <td data-title="訂單日期" class="order-date">2017-11-30</td>
    <td data-title="訂單號碼" class="order-number"><a href="pay03.html?list=1">2017101502550045</a></td>
    <td data-title="訂單狀態" class="order-status">已出貨</td>
    <td data-title="合計" class="order-total">
      $620
    </td>
    <td data-title="訂單取消/退貨" class="order-return">
    <!-- 訂單商品全退 -->
      已退貨
    <!-- /訂單商品全退 -->
    </td>
    <td data-title="商品敲敲話" class="btn-chart"><a href="javascript:void(0)"></a></td>
    <td data-title="評價" class="order-eval">
    <!-- 訂單已完成且期滿三個月,顯示下方mockup -->
      已評價
    <!-- end -->
    </td>
    <td data-title="收貨狀態" class="product-status">
      完成收貨
    </td>
  </tr>
</table>


訂單取消
6-1. js/order.js -> 'js/api-temp/order-cacel-success.json' 替換你的 API 路徑

6-2. post 格式：
{orderNumber:"2017101502550041"}

6-3. callback 回傳格式：
{
  "success": true,
  "msg": "訂單取消完成"
}




/**
*Date: 2017/12/13
*內容：顯示JUpoint所賺點數
*備註：目前只加在結帳step01，待step02 & step03 購物車的UI 改版同步後，會再加上
*/

1. 頁面：
　 pay.html

2. 更新：
　 css/jollybuy.css

3. markup 變動：
<!-- 獲得 JUpoint 顯示 -->
<div class="jupoint-gain table">
  <div class="tr">
    <div class="td right">
      <i class="fa fa-usd" aria-hidden="true"></i> <span>可賺JUpoint點數 (於訂單完成後) NT$ <span>20</span></span>
    </div>
  </div>
</div>
<!--/ 獲得 JUpoint 顯示 -->



/**
*Date: 2017/12/14
*內容：敲敲話
*/

1: 顯示流程：
   開啟敲敲話overlay -> 提問 -> 同overlay下顯示 teaxarea -> 輸入問題或上傳圖片 -> 傳送 -> 回到上一步敲敲話 overlay -> 自動卷軸置底 -> 觀看最新提問的問題或圖片 -> 關閉

2. 頁面：
   　 chat.html
      product.html
      order.html
3. 更新：
   css/jollybuy.css
   images/buttons
   images/icons
   images/2x

4. script 新增:
   js/rotate.js
   js/chat.js

5. chat.html 引入：
  <script type="text/javascript" src="js/rotate.js"></script>
  <script type="text/javascript" src="js/chat.js"></script>

  order.html & product.html 引入：
  <script type="text/javascript" src="js/chat.js"></script>

6. chat.html 判斷列表敲敲話狀態是否已讀或未讀：
　　已讀 class 加上 read
   ex：
   <tr class="each-item read">
   ...
   </tr>

7. 敲敲話的markup:
   備注：提問帶 request class
         ex:  <div class="request"></div>
         回覆帶 reply class
         ex:  <div class="reply"></div>

  <!-- 敲敲話對話窗 -->
  <div class="chat-dialog">
    <div class="content">
      <div class="ob_head">
        <!-- 訂單標題 -->
        <div class="photo">訂單編號</div>
        <div class="info">JB0171114130759648</div>
        <!--/ 訂單標題 -->
        <!-- 商品標題 -->
        <!-- <div class="title">【預購】重低音頭戴式發光耳機帶麥克風話筒</div> -->
        <!--/ 商品標題 -->
      </div>
      <div class="ob_body">
        <div class="content">
          <div class="messages">
            <!-- 未提問 -->
            <div>尚未提問</div>
            <!--/ 未提問 -->
            <!-- 已提問 -->
            <div class="request">
              <div class="message">
              水氣仍多、天氣一樣溼冷，直到下週二天氣才會回暖，高溫恐達30度，有「秋老虎」的味道。
              </div>
              <div class="date">
                2017/11/23 16:48
              </div>
            </div>
            <div class="request">
              <div class="message">
                <img src="images/temp/building.jpg" alt="">
              </div>
              <div class="date">
                2017/11/23 16:48
              </div>
            </div>
            <div class="reply">
              <div class="message">
              明日開始到週五是冷空氣最強的時間，週六、週日水氣仍多、天氣一樣溼冷，直到下週二天氣才會回暖，高溫恐達30度，有「秋老虎」的味道。
              </div>
              <div class="date">
                2017/11/23 16:48
              </div>
            </div>
            <div class="reply">
              <div class="message">
                <img src="images/temp/product17.jpg" alt="">
              </div>
              <div class="date">
                2017/11/23 16:48
              </div>
            </div>
            <!-- 已提問 -->
          </div>
          <div class="textarea">
            <form action="">
              <textarea name=""></textarea>
            </form>
          </div>
          <div class="upload">
            <a href="javascript:void(0);" title="上傳圖片"></a>
          </div>
        </div>
      </div>
      <div class="ob_foot">
      </div>
    </div>
  </div>
  <!--/ 敲敲話對話窗 -->



/**
*Date: 2017/12/21
*內容：模板7_Feature_修改(圓標、品名移除)
*TKT: #63266
*/

1. 頁面：
　 feature.html

2. 更新:
　 css/jollybuy.css

3. 熱銷商品 markup 變動：
   3.1 body 加上 id="feature"
   ex: <body id="feature">

   3.2 移除
   <!-- 熱銷商品 -->
   <div class="price">
     <span class="ins">$275</span>
   </div>
   <div class="info">
     <a href="#" class="product-name">全能運動跑車(碟煞版)</a>
   </div>



 /**
 *Date: 2017/12/21
 *內容：header03 模組開發
 *TKT: #63813
 */

 1. 頁面：
 　 1.1 index.html (模板01)
    1.2 skyline.html (模板03)
    1.3 feature.html (模板07)

 2. 更新：
    1.2 css/jollybuy.css

 3. 「全站」引入：
 　　<script type="text/javascript" src="js/jquery.validate.min.js"></script>
   　<script type="text/javascript" src="js/localization/messages_zh_TW.min.js"></script>

 4. markup 變動：
    4.1 請重新套入 header for 模板01 / 模板03 / 模板07
 　　<!-- heaer -->
     header markup ...
     <!--/header -->　
    4.2
     body 加上 id 模板名稱 (若之前已加上，可忽略 4.2)
     ex: 模板01 <body id="basic">
         模板03 <body id="skyline">
         模板07 <body id="feature">

 5. 注意：logo 建議尺寸 150x60，請於後台上傳的位置備註



 /**
 *Date: 2017/12/22
 *內容：模板6_Electronics_修改(價格刪除)
 *TKT: #63813
 */

 1. 頁面：
    feature.html

 2. 移除價格 markup:
    <span class="text">價格:</span>




/**
*Date: 2017/12/22
*內容：footer模板修改 (7個模板套用)
*TKT: #63276
*/

1. 頁面：
　 7 個模板的 footer

2. 更新：
　 css/jollybuy.css

3. markup:
<!--Footer -->
<footer>
  <div class="footer layout1 ">
    <div class="container">
      <div class="main-footer">
        <div class="row">
          <div class="col-xs-6">
            <div class="widget custom-menu">
              <h3 class="widgettitle">購物導引</h3>
              <ul>
                <li><a href="#">商店介紹</a></li>
                <li><a href="#">退換貨政策</a></li>
                <li><a href="#">條款及細節</a></li>
                <li><a href="#">聯絡我們</a></li>
              </ul>
            </div>
          </div>
          <div class="col-xs-6">
            <div class="widget custom-menu align-right">
              <h3 class="widgettitle">購物導引</h3>
              <ul>
                <li><a href="#">商店介紹</a></li>
                <li><a href="#">退換貨政策</a></li>
                <li><a href="#">條款及細節</a></li>
                <li><a href="#">聯絡我們</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-note">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 left-content">
            <div class="logo logo-footer">
              <img src="images/main-logo6.png" alt="">
            </div>
            <div class="coppy-right">
              <h3 class="content">© 2017 <span class="site-name">JollyBuy</span></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
<!--/Footer -->



/**
*Date: 2017/12/25
*內容：1. 電視牆商品尺寸不規則處理
*     2. 商品主圖不規則處理
*TKT: #63277 & #62965
*/

1. 更新：
　　css/jollybuy.css


/**
*Date: 2017/12/27
*內容：Skyline 左側選單, PC 模式模式下連結可被點擊; 手機模式下連結 disable
*TKT: N/A
*/

1. 更新：
　 js/frontend.js



/**
*Date: 2017/12/29
*內容：header04 模組開發
*TKT: #63851
*/

1. 頁面：
　 section.html (模板05)

2. 更新：
   css/jollybuy.css

3. 「全站」引入：
　　<script type="text/javascript" src="js/jquery.validate.min.js"></script>
  　<script type="text/javascript" src="js/localization/messages_zh_TW.min.js"></script>

4. markup 變動：
   4.1 請重新套入 header for 模板05
　　<!-- heaer -->
    header markup ...
    <!--/header -->　
   4.2
    body 加上 id 模板名稱 (若之前已加上，可忽略 4.2)
    ex: 模板05 <body id="section">

5. 注意：logo 建議尺寸 150x60，請於後台上傳的位置備註



/**
*Date: 2018/01/01
*內容：店鋪裝修圖片聚焦
*TKT: #65797
*/

1. 後台
   1.1 判斷：圖片寬度 >= 576 才顯示 radio 選項
   1.2 CSS：.column-4 寬度請改為 100% (讓上傳圖片等比填滿)
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

2. 前台
   模板 01(Basic)、02(Autumn)、03(Skyline)、07(Feature) 電視牆套上：
   2.1. style="background-position: left;" (radio value = 0)
   2.2. 為預設值, markup 不變 (radio value = 1)
   2.3. style="background-position: right;" (radio value = 2)
   ex:
   <div class="slide-item item-background" data-background="images/slide25.jpg" style="background-position: left;">



/**
*Date: 2017/01/05
*內容：模板04 banner限高&手機以瀑布流效果呈現
*TKT: #65472
*/

1. 頁面：
　 curtain.html (模板05)

2. 更新：
   css/jollybuy.css
   js/frontend.js


/**
*Date: 2017/01/08
*內容：模板03 菜單優化
*TKT: #61359#16
*/

1. 更新：
　 js/frontend.js



/**
*Date: 2017/01/08
*內容：模板08 (tpl08)
*TKT: #66670
*/

1. 頁面： tpl08.html
2. 更新：
   css/jollybuy.css
3. 新增：
   images/temp/tpl08



/**
*Date: 2017/01/17
*內容：banner 可視範圍由「遮罩」改為「圖框」效果呈現
*TKT: #66731
*/

1. 更新：
   1.1 mask.js
2. 調整：
   2.1 圖片寬度 < 576 時，不顯示手機展示範圍radio選項
   2.2 手機可見範圍字樣改為手機展示範圍
   2.3 手機展示範圍選項位置移至到名稱上方 (見示意圖)



 /**
 *Date: 2017/01/17
 *內容： 橘子支付款功能
 *TKT: #67305
 */

1. 頁面： pay03.html

2. 新增：
   2.1 gama-pay.js
   2.2 引入 <script type="text/javascript" src="gama-pay.js"></script>

3. 更新： jollybuy.css

4. 新增markup:
<!-- Modal -->
<div id="myModal" class="modal fade cart-content">
  <div class="modal-dialog orther-info" role="document">
    <div class="modal-content login-page">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body login">
        <form name="login" action="" method="post">
          <h5 class="text-label">橘子支帳號<span></span></h5>
          <input type="text" name="account" class="input-info" maxlength="20" placeholder="請輸入橘子支帳號">
          <button class="account submit" type="submit">取得支付密碼</button>
          <h5 class="text-label">支付密碼<span></span></h5>
          <input type="password" name="password" class="input-info" placeholder="請輸入支付密碼">
          <div class="btn-box">
            <button type="submit" class="btn btn-primary">支付</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!--/ Modal -->




/**
*Date: 2017/01/18
*內容： 前台 - banner 聚焦/全景顯示
*TKT: #67219
*/

1. 頁面：
  1.1 index.html
  1.2 autumn.html
  1.3 skyline.html
  1.4 electronics.html
  1.5 feature.html
  1.6 tpl08.html

2. 更新：
  1.1 jollybuy.css
  1.2 frontend.js

3. 套版 (2.3 FYI, 可略過):
  2.1 tpl01、tpl02、tpl03、tpl07、tpl08 (聚焦&全景模式) => 見 4.1
  2.2 tpl06 (只有全景模式) => 見 4.2
  2.3 tpl04、tpl05 (無聚焦或全景模式，無須重套)

4. markup
  4.1
  <!-- 聚焦模式 -->
  <div class="owl-carousel dots-style1 nav-style2" data-autoplay="true" data-nav="true" data-dots="true" data-loop="true" data-slidespeed="800" data-margin="0" data-autoheight="false" data-responsive = '{"0":{"items":1}, "640":{"items":1}, "768":{"items":1}, "1024":{"items":1}, "1200":{"items":1}}' data-height="400">
    <div class="slide-item item-background" data-background="images/temp/tpl08/banner01.jpg">
      <div class="slide-img"><a href=""><img src="images/temp/tpl08/banner01.jpg" alt=""></a></div>
      <div class="slide-content-1">
        <a href="#" class="button view">前往</a>
      </div>
    </div>
    <div class="slide-item item-background" data-background="images/temp/tpl08/banner02.jpg">
      <div class="slide-img"><a href=""><img src="images/temp/tpl08/banner02.jpg" alt=""></a></div>
      <div class="slide-content-1">
        <a href="#" class="button view">前往</a>
      </div>
    </div>
    <div class="slide-item item-background" data-background="images/temp/tpl08/banner03.jpg">
      <div class="slide-img"><a href=""><img src="images/temp/tpl08/banner03.jpg" alt=""></a></div>
      <div class="slide-content-1">
        <a href="#" class="button view">前往</a>
      </div>
    </div>
  </div>
  <!--/ 聚焦模式 -->
  <!-- 全景模式 -->
  <div class="owl-carousel dots-style1 nav-style2" data-autoplay="true" data-nav="true" data-dots="true" data-loop="true" data-slidespeed="800" data-margin="0" data-autoheight="true" data-responsive = '{"0":{"items":1}, "640":{"items":1}, "768":{"items":1}, "1024":{"items":1}, "1200":{"items":1}}'>
    <div class="slide-item">
      <div class="slide-img"><a href=""><img src="images/temp/tpl08/banner01.jpg" alt=""></a></div>
    </div>
    <div class="slide-item">
      <div class="slide-img"><a href=""><img src="images/temp/tpl08/list02.jpg" alt=""></a></div>
    </div>
    <div class="slide-item">
      <div class="slide-img"><a href=""><img src="images/temp/tpl08/banner03.jpg" alt=""></a></div>
    </div>
  </div>
  <!--/ 全景模式 -->

  4.2
  <!-- 全景模式 -->
  <div class="owl-carousel dots-style1 nav-style2" data-autoplay="true" data-nav="true" data-dots="false" data-loop="true" data-slidespeed="800" data-margin="15" data-autoheight="true" data-responsive = '{"0":{"items":1}, "640":{"items":1}, "768":{"items":2}, "1024":{"items":3}, "1200":{"items":3}}'>
    <div class="slide-item">
      <div class="slide-img"><a href=""><img src="images/temp/tpl08/banner01.jpg" alt=""></a></div>
    </div>
    <div class="slide-item">
      <div class="slide-img"><a href=""><img src="images/temp/tpl08/list02.jpg" alt=""></a></div>
    </div>
    <div class="slide-item">
      <div class="slide-img"><a href=""><img src="images/temp/tpl08/banner03.jpg" alt=""></a></div>
    </div>
  </div>
  <!--/ 全景模式 -->

5. 備註提醒
  聚焦模式時：
  模板 tpl01、tpl02、tpl03、tpl07、tpl08 banner須套上：
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



/**
*Date: 2017/01/23
*內容： 敲敲話icon優化
*TKT: #67185
*/

1. 頁面：
  1.1 product.html　=> 見 3.1
  1.2 order.html => 見 3.2

2. 更新：
  jollybuy.css

3. markup更新：
  3.1 商品頁
  目前：
    移除 <span class="btn-chat"><a href="javascript:void(0);" title="敲敲話"></a></span>
  改成：
    將下方markup放置在 <a class="product-name" href="#">經典藍色 T-Shirt</a> 「之前」
    <span class="fa-stack btn-chat" title="敲敲話">
      <i class="fa fa-square fa-stack-2x"></i>
      <i class="fa fa-comments fa-stack-1x fa-inverse"></i>
    </span>

  3.2 訂單查詢
  目前：
    <td data-title="商品敲敲話" class="btn-chat"><a href="javascript:void(0)"></a></td>
  改成：
    <td data-title="商品敲敲話">
      <span class="fa-stack btn-chat" title="敲敲話">
        <i class="fa fa-square fa-stack-2x"></i>
        <i class="fa fa-comments fa-stack-1x fa-inverse"></i>
      </span>
    </td>



/**
*Date: 2017/01/24
*內容： step02 購物車開立發票資訊
*TKT: #65466
*/

1. 頁面：
  pay02.html　=> 見 3.1

2. 更新：
  jollybuy.css

3. markup：
新增markup 至<!-- 門市  -->下方
<!-- 發票開立方式 -->
<div class="shipping">
  <div class="quantity invoice">
    <h5 class="text-label">發票開立方式<span></span></h5>
    <select id="invoice" name="invoice" class="chosen-select">
      <option value="" selected>發票開立方式</option>
      <option data-option="carrier" value="0">載具</option>
      <option data-option="donate" value="1">捐贈</option>
      <option data-option="triplicate" value="2">三聯式</option>
    </select>
  </div>
  <!-- 發票開立方式：載具 -->
  <div class="quantity carrier invoice-type">
    <h5 class="text-label">載具方式<span></span></h5>
    <select id="carrier" name="carrier" class="chosen-select">
      <option value="" selected>載具方式</option>
      <option data-option="mobile-carrier" value="3J0002">手機條碼載具</option>
      <option data-option="citizen-barcode" value="CQ0001">自然人憑證條碼</option>
      <option data-option="member-carrier" value="ER0017">會員載具</option>
    </select>
    <!-- 載具方式：手機條碼 -->
    <div class="mobile-carrier carrier-type">
      <h5 class="text-label">手機條碼<span></span></h5>
      <input type="text" name="mobile_carrier"  id="mobile_carrier" class="input-info" placeholder="請填入手機條碼(共八碼)">
      <h5 class="text-label">確認手機條碼<span></span></h5>
      <input type="text" name="re_mobile_carrier" class="input-info" placeholder="請再填入手機條碼(確認用)">
      <div class="product-name">
        <a class="align-right" href="https://www.einvoice.nat.gov.tw/APMEMBERVAN/GeneralCarrier/generalCarrier!apply?CSRT=950772956056491589" target="_blank">沒有手機條碼？點這裡申請</a>
      </div>
    </div>
    <!-- 載具方式：自然人憑證條碼 -->
    <div class="citizen-carrier carrier-type">
      <h5 class="text-label">自然人憑證條碼<span></span></h5>
      <input type="text" name="citizen_barcode" id="citizen_barcode" class="input-info" placeholder="請填入自然人憑證條碼(共16碼)">
      <h5 class="text-label">確認自然人憑證條碼<span></span></h5>
      <input type="text" name="re_citizen_barcode" class="input-info" placeholder="請再填入自然人憑證條碼(確認用)">
      <a class="align-right" href="https://www.einvoice.nat.gov.tw/APMEMBERVAN/NPCBarcode/NPCBarcode!pwdApply" target="_blank">沒有自然人憑證條碼？點這裡申請</a>
    </div>
  </div>
  <!-- 發票開立方式：捐贈 -->
  <div class="donate-barcode invoice-type">
    <h5 class="text-label">請填入愛心條碼<span></span></h5>
    <input type="text" name="donate_barcode" class="input-info" placeholder="請填入愛心條碼">
    <div class="children-fdn">
      <span>若無指定社福團體，<a href="javascript:void(0);" data-fdn-code="885521">兒童福利聯盟文教基金會</a></span>
      <a class="align-right" href="https://www.einvoice.nat.gov.tw/APMEMBERVAN/XcaOrgPreserveCodeQuery/XcaOrgPreserveCodeQuery?CSRT=2194166228579422277" target="_blank">愛心條碼查詢</a>
    </div>
  </div>
  <!-- 發票開立方式：三聯式 -->
  <div class="invoice-id invoice-type">
    <h5 class="text-label">統一編號<span></span></h5>
    <input type="text" name="invoice_id" class="input-info" placeholder="請填入統一編號">
    <h5 class="text-label">發票抬頭<span></span></h5>
    <input type="text" name="invoice_title" class="input-info" placeholder="請填入發票抬頭(統一編號之公司名稱)">
  </div>
</div>
<!-- 發票開立方式 -->


/**
*Date: 2017/01/26
*內容： 模板03、06、07首頁展示商品標題-
*TKT:  #68260
*/

1.模板03
頁面: skyline.html
markup：
<div class="products-show special-products">
  <h3 class="supper-title">優惠商品</h3>
  (<p class="section-des">優惠商品敘述xxxxxxxxx</p> → 刪除 )

2.模板06
頁面:electronics.html
markup:
<!--/ 電視牆 -->

<div class="special-container">
  <div class="row">
    <div class="col-xs-12">
    <!-- 熱門商品 -->
    <div class="featured-products">
        <h3 class="supper-title">熱門商品</h3>
      <div class="owl-carousel products-list nav-style2" data-autoplay="false" data-nav="true" data-dots="false" data-loop="true" data-slidespeed="800" data-margin="30"  data-responsive = '{"0":{"items":1}, "640":{"items":2}, "768":{"items":3}, "1024":{"items":5}, "1200":{"items":6}}'>
        <div class="product-item layout6">

  3.模板07
  頁面:feature.html
  markup1:
  <!-- 熱銷商品 -->
  <div class="top-selling">
    <div class="special-container">
      <h3 class="title supper-title">熱銷商品</h3>
      <div class="owl-carousel products-list layout2" data-autoplay="false" data-nav="false" data-dots="false" data-loop="true" data-slidespeed="800" data-margin="50"  data-responsive = '{"0":{"items":1,"margin":30}, "640":{"items":2,"margin":30}, "768":{"items":3,"margin":30}, "1024":{"items":3,"margin":30}, "1200":{"items":3}}'>
        <div class="product-item layout3">

    -----------------------------------

    markup2:
    <!--/ 熱銷商品 -->
		<div class="container">
			<!-- 熱門商品  -->
			<div class="feature-products">
				<h3 class="supper-title">熱門商品</h3>
				<div class="owl-carousel products-list nav-style1" data-autoplay="false" data-nav="true" data-dots="false" data-loop="true" data-slidespeed="800" data-margin="30"  data-responsive = '{"0":{"items":1}, "640":{"items":2}, "768":{"items":3}, "1024":{"items":3}, "1200":{"items":3}}'>
					<div class="product-item layout4">



/**
*Date: 2017/01/29
*內容：模板09 (tpl09)
*TKT: #68409
*/

1. 頁面： tpl09.html
2. 更新：
   css/jollybuy.css
3. 新增：
   images/temp/tpl09 (測試用，勿上傳)



/**
*Date: 2017/01/31
*內容：模板09 (tpl10)
*TKT: #69221
*/

1. 頁面
  1.1 tpl10.html

2. 更新：
  css/jollybuy.css

3. 新增：
  images/temp/tpl10 (測試用，勿上傳)




/**
*Date: 2017/02/2
*內容：header 樣式微調&色系更新
*TKT: 69577
*/

1. CSS色系檔名更換&檔案更新：
  1.1 css/customs-css-blue.css => theme-1.css
  1.2 css/customs-css-lightred.css => theme-2.css
  1.3 css/customs-css-green.css => theme-3.css
  1.4 css/customs-css-darkgrey.css => theme-4.css
  1.5 css/customs-css-orange.css => theme-5.css

2. 更新 jollybuy.css



/**
*Date: 2017/02/6
*內容：敲敲話第二點對話框優化
*TKT: #67185
*/

1. 頁面：
  1.1 chat.html
  1.2 order.html
  1.3 product.html

2. 更新：
  2.1 jollybuy.css
  2.2 chat.js

3. markup 套版更新：
<!-- Modal -->
<div id="myModal" class="chat-modal modal fade">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- 敲敲話對話窗 -->
        <div class="chat-dialog">
          <div class="content">
            <div class="ob_head">
              <!-- 訂單標題 -->
              <div class="photo">訂單編號</div>
              <div class="info">JB0171114130759648</div>
              <!--/ 訂單標題 -->
              <!-- 商品標題 -->
              <!-- <div class="title">【預購】重低音頭戴式發光耳機帶麥克風話筒</div> -->
              <!--/ 商品標題 -->
            </div>
            <div class="ob_body">
              <div class="content">
                <div class="messages">
                  <!-- 未提問 -->
                  <div>尚未提問</div>
                  <!--/ 未提問 -->
                  <!-- 已提問 -->
                  <div class="request">
                    <div class="message">
                    水氣仍多、天氣一樣溼冷，直到下週二天氣才會回暖，高溫恐達30度，有「秋老虎」的味道。
                    </div>
                    <div class="date">
                      2017/11/23 16:48
                    </div>
                  </div>
                  <div class="reply">
                    <div class="message">
                    明日開始到週五是冷空氣最強的時間，週六、週日水氣仍多、天氣一樣溼冷，直到下週二天氣才會回暖，高溫恐達30度，有「秋老虎」的味道。
                    </div>
                    <div class="date">
                      2017/11/23 16:48
                    </div>
                  </div>
                  <!-- 已提問 -->
                </div>
              </div>
            </div>
            <div class="ob_foot">
            </div>
          </div>
        </div>
        <!--/ 敲敲話對話窗 -->
      </div>
      <div class="modal-footer">
        <div class="textarea-block">
          <div class="upload">
            <a href="javascript:void(0);" title="上傳圖片"></a>
          </div>
          <div class="textarea">
            <form action="">
              <textarea name=""></textarea>
            </form>
          </div>
        </div>
        <!-- 提問 -->
        <div class="request-btn">
          <button type="button" class="btn btn-primary">提問</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</div>
<!--/ Modal -->



/**
*Date: 2017/02/07
*內容： 前台商品圖片取消顯示3張限制_需顯示多張圖 & 後台SKU上傳規格圖片時_前台點擊選項需對應圖片
*TKT:  #65484 #65485
*/

1.頁面: product.html

※參數 data-spec=''
規格下拉選單項目帶入的參數，要和對應的圖片帶入相同的參數。


markup1:
<div class="details-thumb">
	<div id="sync1" class="owl-carousel">
		<div class="details-item" data-spec='cart'>
		<div class="main-img">
		  <img src="images/temp/470x470/images01.jpg" alt="">
		</div>
	  </div>
		<div class="details-item" data-spec='cap'>
		<div class="main-img">
		  <img src="images/temp/470x470/images02.jpg" alt="">
		</div>
	  </div>
		<div class="details-item" data-spec='trozk'>
		<div class="main-img">
		  <img src="images/temp/470x470/images03.jpg" alt="">
		</div>
	  </div>
	  <div class="details-item" data-spec='headset'>
		<div class="main-img">
		  <img src="images/temp/470x470/images04.jpg" alt="">
		</div>
	  </div>
	  <div class="details-item" data-spec='pen'>
		<div class="main-img">
		  <img src="images/temp/470x470/images05.jpg" alt="">
		</div>
	  </div>
	</div>
	<div id="sync2" class="owl-carousel nav-style1" >
		<div class="details-item" data-spec='cart'>
			<img src="images/temp/470x470/images01.jpg" alt="">
		</div>
		<div class="details-item" data-spec='cap'>
			<img src="images/temp/470x470/images02.jpg" alt="">
		</div>
		<div class="details-item" data-spec='trozk'>
			<img src="images/temp/470x470/images03.jpg" alt="">
		</div>
		<div class="details-item" data-spec='headset'>
			<img src="images/temp/470x470/images04.jpg" alt="">
		</div>
		<div class="details-item" data-spec='pen'>
			<img src="images/temp/470x470/images05.jpg" alt="">
		</div>
	</div>
</div>

  ---------------------------------------------------

markup2:
<div class="quantity spec">
	<select name="color" class="chosen-select">
		<option value="">尺寸</option>
		<option value="111111" data-spec="cart">行動電源</option>
		<option value="222222" data-spec="cap">開瓶器</option>
		<option value="333333" data-spec="trozk">甜甜圈</option>
		<option value="222222" data-spec="headset">耳機</option>
		<option value="333333" data-spec="pen">筆</option>
		<option value="111111" data-spec="">S</option>
		<option value="222222" data-spec="">M</option>
		<option value="333333" data-spec="">L</option>
	</select>
</div>
<div class="quantity spec">
	<select name="size" class="chosen-select">
		<option value="false">顏色</option>
		<option value="111111" data-spec="cart">行動電源</option>
		<option value="222222" data-spec="cap">開瓶器</option>
		<option value="333333" data-spec="trozk">甜甜圈</option>
		<option value="222222" data-spec="headset">耳機</option>
		<option value="333333" data-spec="pen">筆</option>
		<option value="44444" data-spec="">波西米白</option>
		<option value="55555" data-spec="">地中海藍</option>
		<option value="666666" data-spec="">俄羅斯紅</option>
	</select>
</div>

2.更新:
jollybuy.css
cart.js



/**
*Date: 2017/02/8
*內容：模板tpl11
*TKT: #70360
*/

1. 頁面
  1.1 tpl11.html

2. 更新：
  css/jollybuy.css

3. 新增：
  images/temp/tpl11 (測試用，勿上傳)



/**
*Date: 2017/02/21
*內容：模板tpl12
*TKT: #70362
*/

1. 頁面
1.1 tpl12.html

2. 更新：
css/jollybuy.css



/**
* Date: 2018/02/22
*內容： Jollybuy前台_購物車開立發票資訊
*TKT:  #69583
*/

1.頁面-member.html:
    1-1 markup:
    <input type="text" name="buyer_email" class="input-info" placeholder="E-mail帳號">
		<h5 class="text-label">生日日期(選填)<span></span></h5>
		<div id="datepicker" class="input-group date">
			<input id="buyer_birthday" type="text" name="buyer_birthday" class="form-control buyer-birthday" value="" placeholder="YYYY/MM/DD" data-date-end-date="0d"/>
			<div class="input-group-addon">
				<span class="glyphicon glyphicon-th"></span>
			</div>
		</div>
		<h5 class="text-label">聯絡地址<span></span></h5>
		<!-- 會員地址 -->
		<div class="twzipcode">
			<div class="address">
				<div data-role="county" data-name="receiver_county" data-style="receiver-county"></div>
				<i class="fa fa-angle-down" aria-hidden="true"></i>
			</div>
			<div class="address">
				<div data-role="district" data-name="receiver_area" data-style="receiver-area"></div>
				<i class="fa fa-angle-down" aria-hidden="true"></i>
			</div>
			<div data-role="zipcode" data-name="receiver_zipcode" data-style="receiver-zipcode"></div>
			<input class="input-info receiver-address" name="receiver_address" type="text" value="" placeholder="收件人地址" />
		</div>
		<!-- / 會員地址 -->

    1-2 javascript:

    新增JS在$(function() { 下方

	  //member birthday 生日
		$('#datepicker').datepicker({
			format: 'yyyy/mm/dd',
			todayHighlight: true,
			autoclose: true,
			endDate:'today'
		});

		//member address
		/*狀態一:有預設地址*/
		$('#member').twzipcode({
			'zipcodeSel'  : '106', //郵遞區號
		  'countySel'   : '臺北市', //縣市
		  'districtSel' : '大安區' //鄉鎮市
		});

		/*狀態二:沒有預設地址*/
		// $('#member').twzipcode();

-----------------------------

    修改validate 語法:
    // validate
					$('form[name="member"]').validate({
						event: 'keyup',
						ignore: '',
						errorClass: 'invalid',
						rules: {
							buyer_name: {
								required: true
							},
							buyer_nickname: {
								required: true
							},
							buyer_email: {
								required: true,
								email: true
							},
							receiver_county: {
								required: true
							},
							receiver_area: {
								required: true
							},
							receiver_address: {
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
						},
						submitHandler: function(form) {
							// submit via ajax
							Member.update($(form).serialize());
						}
					});

    3-1 引入 <script type="text/javascript" src="js/bootstrap-datepicker.min.js"></script>

 2.頁面-pay02.html

  2-1 markup1:
  <!-- 訂購人資料 -->
  ..
  <input type="text" name="buyer_mobile" class="input-info" placeholder="聯絡電話" value="">
  --------------------新增----------------------
  <!-- 會員地址 -->
  <div class="twzipcode">
    <div class="address">
      <div data-role="county" data-name="receiver_county" data-style="receiver-county"></div>
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </div>
    <div class="address">
      <div data-role="district" data-name="receiver_area" data-style="receiver-area"></div>
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </div>
    <div data-role="zipcode" data-name="receiver_zipcode" data-style="receiver-zipcode"></div>
    <input class="input-info receiver-address" name="receiver_address" type="text" value="" placeholder="收件人地址" />
  </div>
  <!-- / 會員地址 -->
  --------------------/新增----------------------

  2-2 markup2:
  <div class="sync">
    <h4 class="subtitle margin-clear"><input id="buyer_sync" name="member_info" type="checkbox" /> <label for="buyer_sync">同訂購人</label></h4> →修改type="checkbox"
    <h4 class="subtitle margin-clear"><input id="member_sync" name="member_info" type="radio" /> <label for="member_sync">同會員中心</label></h4> → 刪除
  </div>

  2-3 markup3:
    <input class="input-info receiver-address" name="receiver_address" type="text" value="" placeholder="收件人地址" />
  </div>
  <!-- / 會員地址 -->

  ---------- 刪除 ----------
  <h3 class="title supper-title margin-top">訂單備註</h3>
  <div class="buyer-note">
    <textarea class="input-info" name="buyer_note" rows="3" cols="100%" placeholder="備註文字"></textarea>
  </div>

  ---------- /刪除 ----------

  --------------- 新增 ---------------
  <!-- 發票開立方式 -->
  <div class="shipping">
    <div class="quantity invoice">
      <h5 class="text-label">發票開立方式<span></span></h5>
      <select id="invoice" name="invoice" class="chosen-select">
        <option value="" selected>發票開立方式</option>
        <option data-option="carrier" value="0">載具</option>
        <option data-option="donate" value="1">捐贈</option>
        <option data-option="triplicate" value="2">三聯式</option>
      </select>
    </div>
    <!-- 發票開立方式：載具 -->
    <div class="quantity carrier invoice-type">
      <h5 class="text-label">載具方式<span></span></h5>
      <select id="carrier" name="carrier" class="chosen-select">
        <option value="" selected>載具方式</option>
        <option data-option="mobile-carrier" value="3J0002">手機條碼載具</option>
        <option data-option="citizen-barcode" value="CQ0001">自然人憑證條碼</option>
        <option data-option="member-carrier" value="ER0017">會員載具</option>
      </select>
      <!-- 載具方式：手機條碼 -->
      <div class="mobile-carrier carrier-type">
        <h5 class="text-label">手機條碼<span></span></h5>
        <input type="text" name="mobile_carrier"  id="mobile_carrier" class="input-info" placeholder="請填入手機條碼(共八碼)">
        <h5 class="text-label">確認手機條碼<span></span></h5>
        <input type="text" name="re_mobile_carrier" class="input-info" placeholder="請再填入手機條碼(確認用)">
        <div class="product-name">
          <a class="align-right" href="https://www.einvoice.nat.gov.tw/APMEMBERVAN/GeneralCarrier/generalCarrier!apply?CSRT=950772956056491589" target="_blank">沒有手機條碼？點這裡申請</a>
        </div>
      </div>
      <!-- 載具方式：自然人憑證條碼 -->
      <div class="citizen-carrier carrier-type">
        <h5 class="text-label">自然人憑證條碼<span></span></h5>
        <input type="text" name="citizen_barcode" id="citizen_barcode" class="input-info" placeholder="請填入自然人憑證條碼(共16碼)">
        <h5 class="text-label">確認自然人憑證條碼<span></span></h5>
        <input type="text" name="re_citizen_barcode" class="input-info" placeholder="請再填入自然人憑證條碼(確認用)">
        <a class="align-right" href="https://www.einvoice.nat.gov.tw/APMEMBERVAN/NPCBarcode/NPCBarcode!pwdApply" target="_blank">沒有自然人憑證條碼？點這裡申請</a>
      </div>
    </div>
    <!-- 發票開立方式：捐贈 -->
    <div class="donate-barcode invoice-type">
      <h5 class="text-label">請填入愛心條碼<span></span></h5>
      <input type="text" name="donate_barcode" class="input-info" placeholder="請填入愛心條碼">
      <div class="children-fdn">
        <span>若無指定社福團體，默認捐贈給<a href="javascript:void(0);" data-fdn-code="885521">兒童福利聯盟文教基金會</a>&nbsp;</span>
        <a class="align-right" href="https://www.einvoice.nat.gov.tw/APMEMBERVAN/XcaOrgPreserveCodeQuery/XcaOrgPreserveCodeQuery?CSRT=2194166228579422277" target="_blank">愛心條碼查詢</a>
      </div>
    </div>
    <!-- 發票開立方式：三聯式 -->
    <div class="invoice-id invoice-type">
      <h5 class="text-label">統一編號<span></span></h5>
      <input type="text" name="invoice_id" class="input-info" placeholder="請填入統一編號">
      <h5 class="text-label">發票抬頭<span></span></h5>
      <input type="text" name="invoice_title" class="input-info" placeholder="請填入發票抬頭(統一編號之公司名稱)">
    </div>
  </div>
  <!-- 發票開立方式 -->
  --------------- /新增 ---------------

  2-4 markup4:
  <!--/ 付款人資料 -->
  --------------- 刪除 ---------------
  <!-- 發票開立方式 -->
  <div class="shipping">
    <div class="quantity invoice">
      <h5 class="text-label">發票開立方式<span></span></h5>
      ...
      ...
    <!-- 發票開立方式：三聯式 -->
    <div class="invoice-id invoice-type">
      <h5 class="text-label">統一編號<span></span></h5>
      <input type="text" name="invoice_id" class="input-info" placeholder="請填入統一編號">
      <h5 class="text-label">發票抬頭<span></span></h5>
      <input type="text" name="invoice_title" class="input-info" placeholder="請填入發票抬頭(統一編號之公司名稱)">
    </div>
  </div>
  <!-- 發票開立方式 -->
  --------------- /刪除 ---------------

  ---------- 新增 ----------
  <h3 class="title supper-title margin-top">訂單備註</h3>
  <div class="buyer-note">
    <textarea class="input-info" name="buyer_note" rows="3" cols="100%" placeholder="備註文字"></textarea>
  </div>

  ---------- /新增 ----------

  2-5 javascript:

  // receiver address 下方
  $ortherInfo.twzipcode(); →刪除
  ------------- 新增↓----------------
	$('.shipping-method').twzipcode();

	 /*狀態一:有預設地址*/
	 $('.customer-info').twzipcode({
		'zipcodeSel'  : '106', //郵遞區號
		'countySel'   : '臺北市', //縣市
		'districtSel' : '大安區' //鄉鎮市
	 });

	 /*狀態二:沒有預設地址*/
		// $('.customer-info').twzipcode();
   ---------- /新增 ----------

2.更新:
jollybuy.css
pay.js



/**
* Date: 2018/02/26
*內容： 模板tpl13
*TKT:  #70660
*/

1.頁面: tpl13.html
2.新增 images/temp/tpl13
3.更新 jollybuy.css



/**
* Date: 2018/02/26
*內容： 模板tpl14
*TKT:  #70661
*/

1.頁面: tpl14.html
2.新增 images/temp/tpl14
3.更新 jollybuy.css



/**
* Date: 2018/03/01
*內容： 新版 footer
*TKT:  #71390
*/

1.頁面: 全站 footer, 以index.html為範例
2.更新 jollybuy.css
3. foooter markup:
<!--Footer -->
<footer>
  <div class="footer layout1 ">
    <div class="container">
      <div class="main-footer">
        <div class="widget custom-menu">
          <ul>
            <li><a href="#">商店介紹</a></li>
            <li><a href="#">退換貨政策</a></li>
            <li><a href="#">條款及細節</a></li>
            <li><a href="#">聯絡我們</a></li>
          </ul>
          <div class="coppy-right">
            <h3 class="content">© 2017 Powered By Jollywiz</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
<!--/Footer -->



/**
* Date: 2018/03/02
*內容： 模板tpl15
*TKT:  #70663
*/

1.頁面: tpl15.html
2.新增 images/temp/tpl15 (測試用，勿上傳)
3.更新 jollybuy.css



/**
* Date: 2018/03/06
*內容： 回有閑首頁選單特效
*TKT:  #71698
*/

1. markup (放置在 <footer> 之後):

<!-- floater -->
<div id="floater">
  <div class="icon open animated zoomIn">
    <div class="inner-open"><img src="images/floater/icon-plus.png" alt=""></div>
  </div>
  <div class="icon home"><a href="https://dev-www.jollybuy.com/beango/"><img src="images/floater/icon-home.png" alt=""></a></div>
  <div class="icon setting"><a href="https://admin.jollybuy.com/Home/Index"><img src="images/floater/icon-setting.png" alt=""></a></div>
</div>
<!--/ floater-->

2. 新增：
  animate.css
  floater.css
  floater.js
  floater (圖檔資料夾)

3. 引入 (引入位置請參考 index.html)：
  <!-- floater -->
  <link href="css/promo/animate.css" rel="stylesheet" tyle="text/css">
  <link href="css/promo/floater.css" rel="stylesheet" tyle="text/css">
  <!--/ floater -->
  <!-- floater -->
  <script type="text/javascript" src="js/promo/floater.js"></script>
  <!--/ floater -->

4. 備註
  請加上判斷，在APP上才引入上方敘述 floater 相關的css/js檔案和markup


/**
* Date: 2018/03/08
*內容： 前台_購物車刪除鈕消失問題
*TKT:  #71399
*/
1.更新 jollybuy.css



/**
*Date: 2018/03/13
*內容： 首頁新增商品展示切換功能
*TKT:  #71858
*/

1.頁面：
  1.1 index.html
  1.2 autumn.html
  1.3 skyline.html
  1.4 tpl09.html
  1.5 tpl10.html
  1.6 tpl13.html
  1.7 tpl15.html

  markup (放置位置請參考上方對應頁面):
  <!-- display mode -->
  <div id="view-type">
    <ul>
      <li><div class="icon icon-brick" data-type="brick"></div></li>
      <li><div class="icon icon-grid" data-type="grid"></div></li>
      <li><div class="icon icon-list" data-type="list"></div></li>
    </ul>
  </div>
  <!--/ display mode -->

2.新增：
  2.1 tab.css (之後會合併至 jollybuy.css)
  2.2 tab.js
  2.3 images/icons/view-type

3. 引入至首頁 (引入位置請參考 index.html):
  3.1 <link href="css/tab.css" rel="stylesheet" type="text/css">
  3.2 <script type="text/javascript" src="js/tab.js"></script>


/**
*Date: 2018/03/16
*內容：前台退款頁面_ATM退款與取貨付款 退款銀行資料填寫欄位修改成下拉式選單
*TKT:  #72344
*/

1.頁面:
return.html

markup:
<!-- ATM轉帳 -->
<div class="refund-info panel panel-default">
	<div class="panel-heading"><h2>ATM轉帳 退款資料</h2></div>
	<div class="panel-body">
		<div class="row orther-info">
			<div class="col-xs-12 col-sm-6">
				<h3 class="title supper-title">退款資料</h3>
	--------------------------------新增↓---------------------------------
				<div class="quantity">
					<select name="bank_name">
						<option value="">銀行名稱</option>
						<option value="0">台灣銀行(004)</option>
						<option value="1">第一銀行(007)</option>
					</select>
					<i class="fa fa-angle-down" aria-hidden="true"></i>
				</div>
				<div class="quantity">
					<select name="branch_name">
						<option value="">分行名稱</option>
						<option value="0">臺灣銀行館前分行(0040071)</option>
						<option value="1">臺灣銀行臺南分行(0040093)</option>
					</select>
					<i class="fa fa-angle-down" aria-hidden="true"></i>
			    </div>
	--------------------------------新增↑---------------------------------
	--------------------------------刪除↓---------------------------------
				<input type="text" name="bank_name" class="input-info" placeholder="銀行名稱" value="">
				<input type="text" name="branch_name" class="input-info" placeholder="分行名稱" value="">
	--------------------------------刪除↑---------------------------------
				<input type="text" name="account_name" class="input-info" placeholder="帳戶名稱" value="">
				<input type="text" name="account_number" class="input-info" placeholder="帳戶" value="">
			</div>

2.更新: fix.css (暫套，請見第三點)

3.待前台套版進度與台北前端提供的專案進度一致時,更新jollybuy.css,並移除fix.css



/**
*Date: 2018/03/20
*內容：改版首頁
*TKT: #71740
*/

/**** 首頁 ****/
1. markup 異動：
更新每個模板的價格markup, 除模板04, 模板05 不變
<div class="price">
  <span class="del"><span>12345</span></span>
  <span class="ins">$<span>16789</span></span>
</div>

2. 移除下方模板引入的 tab.css:
  2.1 index.html
  2.2 autumn.html
  2.3 skyline.html
  2.4 tpl09.html
  2.5 tpl10.html
  2.6 tpl13.html
  2.7 tpl15.html




/**
*Date: 2018/03/26
*內容：店鋪商品加入動態載入功能
*TKT: na
*/

1. 流程說明:
  1.1 滑動至底載入動態商品資料，一次回傳10筆
  1.2 頁面載入當下，依網址的page參數載入對應的筆數 (網址列的page參數會動態產生)
    ex: URL (沒帶page參數) => 預設載入前10筆，滑動至底取第11-20筆
        URL?page=2 => 預設載入前 20筆，滑動至底取第 21-30筆
        URL?page=3 => 預設載入前 30筆，滑動至底取第 31-40筆

2. 套用模板：
  模板01、模板02、模板09

3. markup 新增：
  2.1<input type="hidden" name="pageSize" value="" />　=> value 套入總共的頁數 (放置位置請參考 index.html)
  2.2 動態元素：
	'<div class="'+colClass+'col-xs-6 col-sm-4 col-md-4 col-lg-3">'+
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

  備註： 單宮格&列表 => colClass = 'col-ss-12'
        雙宮格 => colClass = 'col-ss-6'

4. 引入 script
  <script type="text/javascript" src="js/infiniteScroll.js"></script>

5. 呼叫方式
  $(function() {
	  /* infinite scroll */
		infiniteScroll.init({_this: 'product-grid'});
	});

6. 新增圖片
  images/spinner/spinner.gif (ajax request 等待時，顯示的圖示)


/**
*Date: 2018/03/27
*內容：改版商品頁
*TKT: #71741
*/

1.頁面 product.html:
不須異動 markup:
(1)  #sync1 & #sync2 區塊 (2) footer 區塊 (3) Model 區塊
其他部分請依照 product.html 調整 markup。

2.更新:
jollybuy.css
frontend.js



/**
*Date: 2018/04/10
*內容：合併購物車step001
*TKT: #73071
*/

1. 更新：
  1.1 cart.js
  1.2 pay.js
  1.3 jollybuy.css

2. 新增
  images/pay/pay-steps

3. 頁面markup
  pay.html

4. 反饋調整：
  4.1 移除天&地 
  4.2 加購品新增 fixed-num class
  ex: <div class="qty_box fixed-num">
  4.3 規格 
    4.3.1 註解 dropdown class
    4.3.2 替換<div>元素
    ex:
    <div>顏色：圓領白色</div>
	  <div>尺寸：S</div>
  4.4 欄位名稱修改
    4.4.1 「商品圖片」欄位名稱改為商品
    4.4.2 「商品名稱」欄位名稱移除所有文字



/**
*Date: 2018/04/16
*內容：合併購物車step02
*TKT: #73072
*/

1. 更新：
  1.1 pay.js
  1.2 jollybuy.css

2. 新增
  images/icons/store

3. 頁面markup
  pay02.html

4. 反饋調整
  4.1 更新：
    4.1.1 js/frontend.js
    4.1.2 js/pay.js
    4.1.3 css/jollybuy.css
  4.2 markup 調整
    4.2.1
    愛心條碼 input value 填上 885521
    ex:
    <input type="text" name="donate_barcode" class="input-info" placeholder="請填入愛心條碼" value="885521">
    4.2.2
    開立方票樣式調整
    原來：
    <h3 class="title supper-title text-label">發票開立方式<span></span></h3>
    替換：
		<h5 class="text-label">發票開立方式<span></span></h5>
    4.2.3
    移除JS：
    // 國家切換
    $('.twzipcode').find('.buyer-country, .receiver-country').on('change', function() {
      var type = $(this).find(':selected').data('type')
        , $countrySel = $(this).parents('.twzipcode').eq(0).find('.address:gt(0)');
      switch (type) {
        case 'tw': 
          $countrySel.show();
        break;
        case 'other': 
          $countrySel.hide();
        break;
      }
    });
	4.2.4
	 原來radio樣式
	 <input class="add-address" type="radio"  name="XXXXXX">
	 改為:
	 <label class="radio-cont">
		<input type="radio" name="XXXXX(保留原來的name)">
		<span class="checkmark"></span>
	 </label>



/**
*Date: 2018/04/19
*內容：熱門商品和規則分類調整
*TKT: #70660
*/

1.頁面 tpl13.html:

markup:
<!-- 分類 -->
	<div class="special-container rules-box">
		<div class="box-has-content featrue-box-list owl-carousel nav-style1" data-autoplay="false" data-nav="false" data-dots="true" data-loop="false" data-slidespeed="800" data-margin="15" data-autoheight="true" data-responsive = '{"0":{"items":1}, "640":{"items":2}, "768":{"items":3}, "1024":{"items":4}, "1200":{"items":4}}'>

2.jollybuy.css:
目前暫不更新，為了避免影響現有版面，等到合併購物車完成後一併更新。



/**
*Date: 2018/04/18
*內容：合併購物車step03
*TKT: #73073
*/

1. 更新
  jollybuy.css

2. 新增
  images/pay/gama-pay.png
  js/clipboard.min.js

3. 頁面 markup
  pay03.html



/**
*Date: 2018/04/22
*內容：合併商城會員中心 – 首頁
*TKT: #73602
*/

1. 新增
  images/member/index

2. 更新
  css/jollybuy.css

3. 頁面 markup
  member-center.html



/**
*Date: 2018/04/24
*內容：合併商城會員中心 – 我的珍藏
*TKT: #73604
*/

1. 更新
  css/jollybuy.css

2. 頁面 markup
  favorite.html



/**
*Date: 2018/04/27
*內容：合併商城會員中心 – 敲敲話
*TKT: #73604
*/

1. 更新
  css/jollybuy.css

2. 頁面 markup
  chat.html
  
/**
*Date: 2018/05/3
*內容：店鋪首頁商品展示及商品頁面UI(修改原介面及增加資訊)
*TKT: #73818
*/
1.markup:
	1.1 頁面: index.html 、 autumn.html、tpl13.html
	商品區塊移除sale標記:
		<div class="product-item layout1">
			<div class="product-inner">
				<div class="thumb">
			/*------------------------ 移除↓ --------------------------*/	
					<div class="group-flash">
						<span class="flash sale">sale</span>
					</div>
			/*------------------------ 移除↑ --------------------------*/
					<div class="group-button">
						<a href="#" class="wishlist-button"></a>
					</div>
					<a href="#"><img src="images/product-details-470x470.jpg" alt=""></a>
				</div>
	
	1.2 product.html
	移除:
		1.2.1 <h3 class="sub-title"><span>顏色</span></h3>
		1.2.2 <h3 class="sub-title"><span>尺寸</span></h3>
		1.2.3 <h3 class="sub-title"><span>數量</span></h3>
		
		1.2.4
			<div class="price">
				<span class="del">399 </span>
				$<span class="ins">280</span>
			</div>
			/*----------------------新增↓-------------------------*/
			<div class="shipping-info">
				<span class="float-left">銷量:99</span>
				<span class="float-right">付款後將於xx天內出貨</span>
			</div>
			<div class="activity-info">
				<span>店鋪活動</span>
				<div>母親節多件好禮商品買一送一</div>
				<div>限時下殺85折</div>
				<div>單筆消費滿千免運</div>
			</div>
			/*----------------------新增↑-------------------------*/
		1.3.2 
			<div class="quantity-btn">
				<div class="qty_box">
					<div class="btns btns-minus disable">&#45;</div>
					<input class="qty" name="qty" type="tel" value="1" min="1" max="5" maxlength="3" autocomplete="off">
					<div class="btns btns-plus">&#43;</div>
				</div>
			</div>
			/*----------------------新增↓-------------------------*/
			<div class="delivery-method-side">
				<div class="row header" data-target="#delivery-method" data-toggle="collapse">
					<div class="col-6 col-sm-6">運費</div>
					<div class="col-6 col-sm-6">$0-$120
						<i class="fa fa-angle-down" aria-hidden="true"></i>
					</div>
				</div>
				<div id="delivery-method" class="collapse bodyer row">
					<div class="col-6 col-sm-6">
						<ul>
							<li>宅配</li>
							<li>宅配(按重量收費)</li>
							<li>全家取貨付款</li>
							<li>7-11取貨付款</li>
						</ul>
					</div>
					<div class="col-6 col-sm-6">
						<ul>
							<li>$0</li>
							<li>$80</li>
							<li>$120起</li>
							<li>$30</li>
						</ul>
					</div>
				</div>
			</div>
			/*----------------------新增↑-------------------------*/
		1.3.3 修改數量按鈕:
			<div class="qty_box">
				<div class="btns btns-minus disable">&#45;</div>
				<input class="qty" name="qty" type="tel" value="1" min="1" max="5" maxlength="3" autocomplete="off">
				<div class="btns btns-plus">&#43;</div>
			</div>
2.更新: jollybuy.css

/**
*Date: 2018/05/4
*內容：合併商城會員中心-會員資訊-反饋調整
*TKT: #73603
*/
1.頁面: member.html
markup:
 1.1
		<form name="member" action="" method="post">
			<!-- 會員姓名/Email/訂閱 -->
			<div class="customer-info">
				<h3 class="title supper-title">會員資訊</h3>
				<h5 class="text-label">姓名<span></span></h5>
				<input type="text" name="buyer_name" class="input-info" placeholder="請填寫真實中文姓名">
				<h5 class="text-label">暱稱<span></span></h5>
				<input type="text" name="buyer_nickname" class="input-info" placeholder="請填寫暱稱">
				<h5 class="text-label">E-mail<span></span></h5>
				<input type="text" name="buyer_email" class="input-info" placeholder="請填寫有效E-mail">
				<h5 class="text-label">手機號碼<span></span></h5>
				<input type="text" name="buyer_mobile" class="input-info" placeholder="請填寫手機號碼">
				<h5 class="text-label">生日<span></span></h5>
				<div id="datepicker" class="input-group date">
					<input id="buyer_birthday" type="text" name="buyer_birthday" class="form-control buyer-birthday" value="" placeholder="請選擇生日" data-date-end-date="0d"/>
					<div class="input-group-addon">
						<i class="fa fa-calendar" aria-hidden="true"></i>
					</div>
				</div>
				<h5 class="text-label">聯絡地址<span></span></h5>
				<!-- 會員地址 -->
				<div class="twzipcode">
					<div class="address">
						<div class="shipping">
							<select name="buyer-country" class="buyer-country">
								<option value="" data-type="tw">台灣</option>
								<option value="" data-type="other">其他</option>
							</select>
							<i class="fa fa-angle-down" aria-hidden="true"></i>
						</div>
					</div>
					<div class="address">
						<div data-role="county" data-name="buyer_county" data-style="buyer-county"></div>
						<i class="fa fa-angle-down" aria-hidden="true"></i>
					</div>
					<div class="address">
						<div data-role="district" data-name="buyer_area" data-style="buyer-area"></div>
						<i class="fa fa-angle-down" aria-hidden="true"></i>
					</div>
					<div data-role="zipcode" data-name="buyer_zipcode" data-style="buyer-zipcode"></div>
					<input class="input-info buyer-address" name="buyer_address" type="text" value="" placeholder="聯絡地址" />
				</div>
				<!--/ 會員地址 -->
			</div>
			<!--/ 會員姓名/Email/訂閱 -->
			<!-- 取消/送出按鈕 -->
			<div class="note">
				<!-- 已與Facebook連結 -->
				<div class="fb-connected">
					<h3 class="title">快速登入</h3>
					<img src="images/temp/avatar.gif" alt="">
					<span>
						<i class="fa fa-facebook-official fa-2x" aria-hidden="true"></i> 已與Facebook連結
					</span>
				</div>
				<!--/ 已與Facebook連結 -->
					<!-- <button type="button" class="btns">取消</button> -->
					<div class="btn-wrapper">
						<button type="submit" class="btns">儲存變更</button>
					</div>
			</div>
			<!--/ 取消/送出按鈕 -->
		</form>
 1.2 送貨門市:
	1.2.1 收件人姓名預設文字修改
		  <input type="text" name="receiver_name[]" class="input-info receiver-name" placeholder="請填寫真實姓名" value="">
	1.2.2 按鈕文字修改
		  <button type="submit" class="btns btn-submit">儲存新增</button>
 1.3快速登入:
	<h5>快速登入</h5>
2. 更新:
	member.js
	jollybuy.css