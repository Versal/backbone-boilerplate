var AppView = Backbone.View.extend({
  events: {
    'change [name=greeting]' : 'onGreetingChange',
    'change [name=learnerName]': 'onLearnerNameChange'
  },

  initialize: function(options){
    this.player = options.player;

    //avoid using $(document) as much as possible
    //but have to use it to get the template from versal.html
    this.template = $(document).find('#template-app').html();

    this.player.on('attributesChanged', function(data){
      if(data.greeting) {
        this.setGreeting(data.greeting);
      }
    }.bind(this));

    this.player.on('learnerStateChanged', function(data){
      if(data.learnerName) {
        this.setLearnerName(data.learnerName);
      }
    }.bind(this));

    this.player.on('editableChanged', function(editable){
      var editableFlag = editable.editable;
      if(editableFlag){
        this.$('[name=greeting]').removeAttr('readonly');
        this.$('[name=learnerName]').attr('readonly', 'true');
      }else{
        this.$('[name=greeting]').attr('readonly', 'true');
        this.$('[name=learnerName]').removeAttr('readonly');
      }
    }.bind(this));

    this.player.setHeight(60);
    this.player.startListening();
  },

  setGreeting: function(input){
    this.$('[name=greeting]').val(input);
  },

  setLearnerName: function(input){
    this.$('[name=learnerName]').val(input);
  },

  onGreetingChange: function(event){
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.player.setAttributes(obj);
  },

  onLearnerNameChange: function(event){
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.player.setLearnerState(obj);
  },

  render: function(){
    this.$el.html( this.template );
    this.delegateEvents();
    return this;
  }
});

module.exports = AppView;
