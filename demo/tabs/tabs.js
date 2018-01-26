!(function(w){
  var global = w;
  var once = 0;
  function Tab(config){
    this.config = config;
    this.tag = config.tag;
    this.currentId = 0;
    this.navContainerEl = {};
    if(this.config && this.config.tabList && this.config.navContainer){
      this.navContainerEl = document.querySelector(this.config.navContainer);
      this.navContainerEl.classList.add(this.tag+'_tag_container');
      this.createTabNav();
      this.onClickNavButton()
    }else{
      return console.log('no find tabList attr in config ! ' + this.tag)
    }
  }
  Tab.prototype = {
    constructor: Tab,
    createTabNav: function(){
      var navTpl = '';
      if(!this.navContainerEl){
        return console.log('no find navContainer El !')
      }
      for(var navInx in this.config.tabList){
        var nav = this.config.tabList[navInx];
        navTpl += this.createTabNavElementTpl(navInx, nav);
      }
      this.navContainerEl.innerHTML = navTpl;
      var currentCharacteristic = this.createCharacteristic(this.navContainerEl.firstElementChild);
      currentCharacteristic && this.changeCurrentNav(currentCharacteristic);
    },
    createCharacteristic: function(currentEl){
      var currentClickId = currentEl.id.split('_')[2];
      var currentCharacteristic = {
        navTag: this.tag,
        navItemIndex: currentClickId,
        currentEl: currentEl,
        name: currentEl.innerText
      };
      return currentCharacteristic
    },
    onClickNavButton: function(){
      var self = this;
      this.navContainerEl && this.navContainerEl.addEventListener('click', function(e){
        var clickNavItemEl = e.path[0];
        var currentCharacteristic = this.createCharacteristic(clickNavItemEl);
        var beforeStatue = true;
        beforeStatue = this.config.beforeClickNav && this.config.beforeClickNav(currentCharacteristic)
        if(beforeStatue){
          this.changeCurrentNav(currentCharacteristic);
          this.config.afterClickNav && this.config.afterClickNav(currentCharacteristic)
        }
      }.bind(this))
    },
    changeCurrentNav: function(clickNode){
      this.currentId = clickNode.navItemIndex;
      var navEls = this.navContainerEl.children;
      for(var chilInx=0; chilInx < navEls.length; chilInx++){
        var chil = navEls[chilInx];
        var chilId = chil.id.split('_')[2];
        if(this.currentId === chilId){
          !chil.classList.contains('tab_nav_focus') && chil.classList.add('tab_nav_focus');
        }else{
          chil.classList.contains('tab_nav_focus') && chil.classList.remove('tab_nav_focus');
        }
      }
      // debugger
      // console.log(4455, navEls.length)
    },
    createTabNavElementTpl: function(index, cnav){
      var tpl = '';
      tpl += '<div class="'+this.config.tag+'_nav_item" id="'+this.config.tag+'_nav_'+index+'" title="'+cnav.title+'">'+cnav.label+'</div>';
      return tpl
    },
    createTabNavElement: function(index, cnav){
      var ele = document.createElement('div');
      ele.class = this.config.tag+'_nav_item';
      ele.id = this.config.tag+'_nav_' + index;
      ele.title = cnav.title;
      ele.innerText = cnav.label;
      return ele
    },
    add: function(tabConfig){
      if(!tabConfig){
        return
      }
      if(!tabConfig.title){
        tabConfig.title = tabConfig.label;
      }
      var navTpl = '';
      var conLastChild = this.navContainerEl.lastChild;
      var currentId = conLastChild.id.split('_')[2];
      navTpl = this.createTabNavElement(currentId, tabConfig);
      this.navContainerEl.appendChild(navTpl);
      debugger
    },
    remove: function(index){
      var
    }
  }
  var newTabs = function(config){
    if(!config || typeof config != 'object'){
      return console.log('tab init config erro !')
    }
    config['tag'] = 'tag'+ (config.tag || (++once));
    return new Tab(config)
  }
  var initTabs = function(){
    if('tabs' in global){

    }else{
      global['tabs'] = newTabs;
    }
    return tabs
  }
  initTabs()
})(window)
