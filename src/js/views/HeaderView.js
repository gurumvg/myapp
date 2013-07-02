YUI.add('headerView', function(Y, name) {

	var HeaderView = Y.Base.create('headerView', Y.View, [], {

		template : Y.Handlebars.compile(Y.one('#myapp-header-template').getHTML()),

		events : {

		},

		initializer : function() {

		},

		render : function() {

			var content = this.template({
				title : 'My Application',
				navLinks : [ {
					navUrl : '/myview',
					navLabel : 'View'
				}, {
					navUrl : 'yahoo.com',
					navLabel : 'Yahoo'
				}, {
					navUrl : 'yahoo.com',
					navLabel : 'Yahoo'
				} ]

			});

			this.get('container').setHTML(content);
			return this;
		}

	}, {
		ATTRS : {
			// Override the default container attribute.
			container : {
				valueFn : function() {
					// return Y.Node.create('<div class="header-container"/>');
					return 'div.header-container';
				}
			}

		}
	});

	Y.namespace("MYAPP").HeaderView = HeaderView;

}, '0.0.1', {
	requires : [ 'node', 'view', 'handlebars' ]
});