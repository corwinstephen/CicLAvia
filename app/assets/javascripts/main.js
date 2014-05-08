(function($, _){
  // Underscore Mixins
  _.mixin(_.str.exports());

  Ciclavia.init = function(){
    var initByControllerAction = function(){
      var currentController = _.capitalize(Ciclavia.Globals.controllerName);
      var currentAction = _.camelize(Ciclavia.Globals.actionName);

      if(_.isObject(Ciclavia.Controllers[currentController]) && _.isFunction(Ciclavia.Controllers[currentController][currentAction])){
        Ciclavia.Controllers[currentController][currentAction]();
      }
    };

    initByControllerAction();

    // We need this for JS to work with Turbolinks
    $(document).on("page:load", function(){
      initByControllerAction();
    });
  };
})(jQuery, _);