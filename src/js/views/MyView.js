YUI.add('myView', function(Y, name) {

	var MyView = Y.Base.create('myView', Y.View, [], {

		template : Y.one('#myapp-myview-template').getHTML(),

		events : {

		},

		initializer : function() {

		},

		render : function() {
			this.get('container').setHTML(this.template);
			return this;
		}

	});

	Y.namespace("MYAPP").MyView = MyView;

}, '0.0.1', {
	requires : [ 'node', 'view' ]
});