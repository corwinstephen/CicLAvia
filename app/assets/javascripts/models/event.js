(function(Ciclavia, _){
  "use strict";

  Ciclavia.Models.Event = Stapes.subclass({
    constructor: function(options){
      if(_.isString(options)){
        options = $.parseJSON(options);
      }
      this.options = options;
      this.name = null;
      this.routes = [];
      this.active = false;

      this._parseOptions();
    },

    _parseOptions: function(){
      this.id = this.options.id;
      this.name = this.options.name;
      this.active = this.options.active;

      this.set({
        id: this.options.id,
        name: this.options.name,
        active: this.options.active
      });

      if(this.options.routes){
        _.each(this.options.routes, function(routeData){
          this.routes.push(new Ciclavia.Models.Route(routeData));
        }.bind(this));
      }
    }
  });

})(Ciclavia, _);
