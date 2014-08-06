(function(Stapes, $){
  Ciclavia.Modules.RouteDialogue = Stapes.subclass({
    CSS: {
      closeButton: ".dialogue-close",
      description: ".dialogue-description",
      descriptionTextarea: ".dialogue-descriptioninput",
      hiddenClass: "hidden"
    },

    template: 'route-dialogue',

    dialogue: null,
    $dialogue: null,

    constructor: function(route){
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

      // Edit description
      this.$dialogue.find(this.CSS.description)
        .click(this._descriptionClicked.bind(this));
      this.$dialogue.find(this.CSS.descriptionTextarea)
        .blur(this._descriptionBlurred.bind(this));
        

    },

    _descriptionClicked: function(){
      this._enterEditDescriptionMode();
    },

    _descriptionBlurred: function(){
      this._leaveEditDescriptionMode();
    },

    _enterEditDescriptionMode: function(){
      $(this.CSS.description).addClass(this.CSS.hiddenClass);
      $(this.CSS.descriptionTextarea)
        .removeClass(this.CSS.hiddenClass)
        .select();
    },

    _leaveEditDescriptionMode: function(){
      $(this.CSS.description).removeClass(this.CSS.hiddenClass);
      $(this.CSS.descriptionTextarea).addClass(this.CSS.hiddenClass);
    },

    _closeButtonClicked: function(){
      this.hide();
    }
  });
})(Stapes, $);