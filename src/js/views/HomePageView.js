YUI.add('homepageView', function(Y, name) {

	var HomePageView = Y.Base.create('homePageView', Y.View, [], {

		template : Y.one('#myapp-homeview-template').getHTML(),

		events : {

		},

		initializer : function() {
			
			this.headerView = new Y.MYAPP.HeaderView();
			this.footerView = new Y.MYAPP.FooterView();
		},

		render : function() {
			
			this.headerView.render();
			this.footerView.render();

			this.get('container').setContent(this.template);	

			return this;			
		}

	});

	Y.namespace("MYAPP").HomePageView = HomePageView;

}, '0.0.1', {
	requires : [ 'node', 'view', 'headerView', 'footerView' ]
});