!(function(w){
  var global = w;
  var once = 0;
  function Tab(config){
    this.config = config;
    this.tag = config.tag;
    this.currentId = 
    if(this.config.tabList && this.config.navContainer){
      this.navContainerEl = document.querySelector(this.config.navContainer);
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
        navTpl += '<div class="'+this.config.tag+'_nav_item" id="'+this.config.tag+'_nav_'+navInx+'" title="'+nav.title+'">'+nav.label+'</div>';
      }
      this.navContainerEl.innerHTML = navTpl;
    },
    onClickNavButton: function(){
      var self = this;
      this.navContainerEl && this.navContainerEl.addEventListener('click', function(e){
        var clickNavItemEl = e.path[0];
        var currentClickId = clickNavItemEl.id.split('_')[2];
        var currentCharacteristic = {
          navTag: self.tag,
          navItemIndex: currentClickId,
          name: clickNavItemEl.innerText
        };
        var beforeStatue = self.config.beforeClickNav && self.config.beforeClickNav(currentCharacteristic)
        if(beforeStatue){
          this.changeCurrentNav()
        }
        debugger
      })
    },
    changeCurrentNav: function(){

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
