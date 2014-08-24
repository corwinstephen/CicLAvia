(function(Stapes, $){
  Ciclavia.Modules.NewRouteDialogue = Stapes.subclass({
    CSS: {
      closeButton: ".dialogue-close",
      hiddenClass: "hidden",
      titleInput: ".dialogue-routetitleinput",
      descriptionTextarea: ".dialogue-descriptioninput",
      submitButton: ".dialogue-submitbutton"
    },

    EVENTS: {
      submitButtonClicked: "submitButtonClicked"
    },

    template: 'new-route-dialogue',

    dialogue: null,
    $dialogue: null,

    constructor: function(route){
      this.route = route;
      
      this.dialogue = HandlebarsTemplates[this.template](this._routeAttributesForTemplate(route));
      this.$dialogue = $(this.dialogue);

      this._setEvents();
    },

    show: function(){
      Ciclavia.Modules.Blackout.on();
      $("body").append(this.$dialogue);
    },

    hide: function(){
      Ciclavia.Modules.Blackout.off();
      this.$dialogue.remove();
    },

    destroy: function(){
      this.$dialogue.remove();
    },

    _routeAttributesForTemplate: function(route){
      var departureDate = new Date(route.get("departsAt"));
      var ampm = (departureDate.getHours() < 12) ? "am" : "pm";
      var departureTime = (departureDate.getHours() % 12).toString() + ":" + departureDate.getMinutes().toString() + ampm;

      return {
        name: route.get("name"),
        description: route.get("description"),
        meetingPoint: route.get("meetingPoint"),
        departsAt: $.datepicker.formatDate('M d, yy', departureDate) + " at " + departureTime
      };
    },

    _setEvents: function(){
      // Close dialogue button
      this.$dialogue.find(this.CSS.closeButton).click(this._closeButtonClicked.bind(this));

      // Submit Button
      this.$dialogue.find(this.CSS.submitButton).click(this._submitButtonClicked.bind(this));
    },

    _submitButtonClicked: function(){
      this.emit(this.EVENTS.submitButtonClicked, this._routeAttrsFromDOM());
    },

    _closeButtonClicked: function(){
      this.hide();
    },

    _routeAttrsFromDOM: function(){
      return {
        name: this.$dialogue.find(this.CSS.titleInput).val(),
        description: this.$dialogue.find(this.CSS.descriptionTextarea).val()
      };
    }
  });
})(Stapes, $);