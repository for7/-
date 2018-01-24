!(function(w){
  var global = w;
  var once = 0;
  function Tab(config){
    this.tag = config.tag
    if(!config.tabList){
      return console.log('no find tabList attr in config !')
    }
    this.createTabNav()
  }
  Tab.prototype = {
    constructor: Tab,
    createTabNav: function(){

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
