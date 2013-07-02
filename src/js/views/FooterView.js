YUI.add('footerView', function(Y, name) {

	var FooterView = Y.Base.create('footerView', Y.View, [], {

		template : Y.one('#myapp-footer-template').getHTML(),

		events : {

		},

		initializer : function() {

		},

		render : function() {
			var content = Y.Lang.sub(this.template, {
				footerContent: 'copyright @2013'
			});
			this.get('container').setHTML(content);
			return this;
		}

	}, {
		ATTRS : {
			// Override the default container attribute.
			container : {
				valueFn : function() {
					return "div.footer-container";
				}
			}
		}

	});

	Y.namespace("MYAPP").FooterView = FooterView;

}, '0.0.1', {
	requires : [ 'node', 'view' ]
});