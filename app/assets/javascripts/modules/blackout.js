(function(Stapes){
  Ciclavia.Modules.Blackout = Stapes.subclass({
    FADE_IN_TIME: 200,

    $blackout: null,

    constructor: function(){
      this.$blackout = $("<div id='blackout'>");
      $("body").append(this.$blackout);
    },

    on: function(){
      this.$blackout.fadeIn(this.FADE_IN_TIME);
    },

    off: function(){
      this.$blackout.fadeOut(this.FADE_IN_TIME);
    }
  });

  Ciclavia.Modules.Blackout.extend({
    instance: null,

    on: function(){
      this._initializeIfNeeded();
      this.instance.on();
    },

    off: function(){
      this._initializeIfNeeded();
      this.instance.off();
    },

    _initializeIfNeeded: function(){
      if(!this.instance){
        this.instance = new this();
      }
    }
  });
})(Stapes);