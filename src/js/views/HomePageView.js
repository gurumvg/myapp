YUI.add('homepageView', function(Y, name) {

	var HomePageView = Y.Base.create('homePageView', Y.View, [], {

		template : null,

		events : {

		},

		initializer : function() {
			
			this.headerView = new Y.MYAPP.HeaderView();
			this.footerView = new Y.MYAPP.FooterView();
		},

		render : function() {
			
			this.headerView.render();
			this.footerView.render();

			this.get('container').setContent("Hey welcome");	

			return this;			
		}

	});

	Y.namespace("MYAPP").HomePageView = HomePageView;

}, '0.0.1', {
	requires : [ 'node', 'view', 'headerView', 'footerView' ]
});