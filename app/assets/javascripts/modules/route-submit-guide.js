(function(){
  Ciclavia.Modules.RouteSubmitGuide = Stapes.subclass({
    STEPS: ["instructions", "clickPoints", "enterInfo"],
    TEMPLATES: {
      instructions: "route-submits/instructions"
    },

    CSS: {
      INSTRUCTIONS: {
        container: ".infoconfirm",
        okayButton: ".infoconfirm .okay"
      },

      BUTTONS: {
        submitModeButton: "#submit-mode-button",
        submitModeCancelButton: "#submit-mode-cancel-button",
        submitModeDoneButton: "#submit-mode-done-button"
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
      this.map.mapnav.show();
      this.map.removeElement(this.routeCreator.currentLineElementForMap());
      this._showButtonsFor(["submit mode"]);
      this.routeCreator.reset();
    },

    render: function(){
      var currentStepName = this.currentStepName();
      if(currentStepName === "instructions"){

        // Step 0
        Ciclavia.Modules.Blackout.on();
        var renderedTemplate = HandlebarsTemplates[this.TEMPLATES.instructions]();
        $("body").append(renderedTemplate);
        this._showButtonsFor([]);

      } else if(currentStepName === "clickPoints"){

        // Step 1
        $(this.CSS.INSTRUCTIONS.container).remove();
        Ciclavia.Modules.Blackout.off();
        this.map.mapnav.hide();
        this._showButtonsFor(["cancel submit", "done submitting"]);

      } else if (currentStepName === "enterInfo"){
        
        // Step 2
        
      }
    },

    currentStepName: function(){
      return this.STEPS[this.get("step")];
    },

    _setListeners: function(){
      $(document).on("click", this.CSS.INSTRUCTIONS.okayButton, this.advanceToNextStep.bind(this));

      this._bindtoSubmitModeButton();
      this._bindtoCancelSubmitModeButton();

      this.on("change:step", this.render.bind(this));
      this.map.on("change:mode", this._modeChanged.bind(this));
      this.map.on("mapClick", this._mapClicked.bind(this));
    },

    _mapClicked: function(clickEvent){
      if(this.currentStepName() === "clickPoints"){
        var latlng = clickEvent.latlng;
        this.routeCreator.addPoint([latlng.lat, latlng.lng]);
        this.map
          .removeElement(this.routeCreator.lastLineElementForMap())
          .addElement(this.routeCreator.currentLineElementForMap());
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

    _bindtoSubmitModeButton: function(){
      var $button = $(this.CSS.BUTTONS.submitModeButton);
      $button.click(function(){
        this.emit("submitModeButtonClicked");
      }.bind(this));
    },

    _bindtoCancelSubmitModeButton: function(){
      $(this.CSS.BUTTONS.submitModeCancelButton).click(function(){
        this.emit("submitModeCancelButtonClicked");
      }.bind(this));
    },

    _showButtonsFor: function(arrayOfButtonNames){
      var mapping = {
        "submit mode": $(this.CSS.BUTTONS.submitModeButton),
        "cancel submit": $(this.CSS.BUTTONS.submitModeCancelButton),
        "done submitting": $(this.CSS.BUTTONS.submitModeDoneButton)
      };

      _.each(mapping, function($button, key){
        if(_.contains(arrayOfButtonNames, key)){
          $button.removeClass("hidden");
        } else {
          $button.addClass("hidden");
        }
      });
    }
  });

})();