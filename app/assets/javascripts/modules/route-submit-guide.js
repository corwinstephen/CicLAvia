(function(){
  Ciclavia.Modules.RouteSubmitGuide = Stapes.subclass({
    STEPS: ["instructions", "clickPoints"],
    TEMPLATES: {
      instructions: "route-submits/instructions"
    },

    CSS: {
      INSTRUCTIONS: {
        container: ".infoconfirm",
        okayButton: ".infoconfirm .okay"
      }
    },

    constructor: function(map){
      this.map = map;
      this.routeCreator = new Ciclavia.Modules.RouteCreator();
      this._setListeners();
    },

    advanceToNextStep: function(){
      this.set("step", this.get("step") + 1);
    },

    resetAll: function(){
      this._clearAllStepsFromDOM();
      this.map.mapnav.show();
    },

    render: function(){
      this._clearAllStepsFromDOM();

      var currentStepName = this.currentStepName();
      if(currentStepName === "instructions"){

        // Step 0
        Ciclavia.Modules.Blackout.on();
        var renderedTemplate = HandlebarsTemplates[this.TEMPLATES.instructions]();
        $("body").append(renderedTemplate);

      } else if(currentStepName === "clickPoints"){

        // Step 1
        Ciclavia.Modules.Blackout.off();
        this.map.mapnav.hide();
      }
    },

    currentStepName: function(){
      return this.STEPS[this.get("step")];
    },

    _setListeners: function(){
      $(document).on("click", this.CSS.INSTRUCTIONS.okayButton, this.advanceToNextStep.bind(this));

      this.on("change:step", this.render.bind(this));
      this.map.on("change:mode", this._modeChanged.bind(this));
      this.map.on("mapClick", this._mapClicked.bind(this));
    },

    _mapClicked: function(clickEvent){
      if(this.currentStepName() === "clickPoints"){
        var latlng = clickEvent.latlng;
        this.routeCreator.addPoint([latlng.lat, latlng.lng]);
        this.map.addElement(this.routeCreator.lineElementForMap());
      }
    },

    _modeChanged: function(mode){
      if(mode === "submit"){
        this.set("step", 0);
      } else if(mode === "view") {
        this.resetAll();
      } else {
        throw "Map changed to unknown mode";
      }
    },

    _clearAllStepsFromDOM: function(){
      $(this.CSS.INSTRUCTIONS.container).remove();
    }
  });

})();