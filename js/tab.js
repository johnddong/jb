/**
* Date: 2018/3/12
* Dec: 商品列表呈現模式 (預設 grid)
* @param: URL?type= (brick, grid, list)
*/

var Tab = (function() {
  var
    $viewType = $('#view-type')
  , $productGrid = $('.product-grid')
  , c = {
    active: 'active',
    brick: 'brick',
    grid: {
      name: 'grid',
      active: 'col-ss-6',
      inactive: 'col-ss-12'
    },
    list: 'list'
  },
  activeIconsArr = [],

  /* _get */
  _get = function(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return results[1];
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

  iconPreload = function() {
    var activeIcons = ['icon-brick-active.png', 'icon-grid-active.png', 'icon-list-active.png'];
    for(var i = 0; i < activeIcons.length; i++) {
      activeIconsArr[i] = new Image();
      activeIconsArr[i].src = 'images/icons/view-type/'+activeIcons[i];
    }
  },

  setDisplay = function(_this, type) {
    /* rm content active */
    if ($productGrid.hasClass(c.brick)) {$productGrid.removeClass(c.brick);}
    if ($productGrid.hasClass(c.grid.name)) {$productGrid.removeClass(c.grid.name);}
    if ($productGrid.hasClass(c.list)) {$productGrid.removeClass(c.list);}
    /* add content active */
    $productGrid.addClass(type);
    /* add icon active */
    $viewType.find('li').removeClass(c.active);
    $(_this).parent().addClass(c.active);
    /* reset bootstrap for grid display */
    if (type == c.grid.name) {
      $productGrid.find('.'+c.grid.inactive).each(function() {
        $(this).removeClass(c.grid.inactive).addClass(c.grid.active);
      });
    } else {
      $productGrid.find('.'+c.grid.active).each(function() {
        $(this).removeClass(c.grid.active).addClass(c.grid.inactive);
      });
    }
  },

  init = function(_this, type) {
    if ($viewType.length == 0) return; 
    /* icons preload */
    iconPreload();
    type = (_get('type') != '') ? _get('type') : c.grid.name;
    /* init display */
    $viewType.find('li .icon').each(function() {
      if ($(this).data('type') == type) { // display type from URL arg
        setDisplay(this, type);
        return false;
      } else if ($(this).data('type') == c.grid.name) { // default display
        setDisplay(this, c.grid.name);
      }
    });
    /* click display */
    $viewType.find('li .icon').on('click', function() {
      var type = $(this).data('type');
      setDisplay(this, type);
      // set type arg to URL
      var url = addParam(location.href, 'type', type);
      history.replaceState({}, '', url);
    });
  };

  init();

  return {
    init: init
  };

})();
