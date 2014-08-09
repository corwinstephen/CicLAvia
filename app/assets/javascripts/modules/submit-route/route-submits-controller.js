(function(){
  Ciclavia.Modules.RouteSubmitsController = Stapes.subclass({
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

    constructor: function(){
      this._setListeners();
      this.set("step", 0);
    },

    advanceToNextStep: function(){
      this.set("step", this.get("step") + 1);
    },

    render: function(){
      this._clearOtherStepsFromDOM();

      var currentStepName = this.currentStepName();
      if(currentStepName === "instructions"){
        // Step 1
        Ciclavia.Modules.Blackout.on();
        var renderedTemplate = HandlebarsTemplates[this.TEMPLATES.instructions]();
        $("body").append(renderedTemplate);
      } else if(currentStepName === "clickPoints"){
        // Step 2
        Ciclavia.Modules.Blackout.off();
      }
    },

    currentStepName: function(){
      return this.STEPS[this.get("step")];
    },

    _setListeners: function(){
      $(document).on("click", this.CSS.INSTRUCTIONS.okayButton, this.advanceToNextStep.bind(this));

      this.on("change:step", this.render.bind(this));
    },

    _clearOtherStepsFromDOM: function(){
      // Step 1
      $(this.CSS.INSTRUCTIONS.container).remove();
    }
  });

  Ciclavia.Modules.RouteSubmitsController.extend({
    start: function(){
      new this();
    }
  });
})();