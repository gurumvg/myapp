YUI.add('myApp', function(Y, name) {

	var MyApp = Y.Base.create('myApp', Y.App, [], {

		views : {
			homePage : {
				type : Y.MYAPP.HomePageView
			},

			headerView : {
				type : Y.MYAPP.HeaderView
			},

			footerView : {
				type : Y.MYAPP.FooterView
			},
			
			myView: {
				type : Y.MYAPP.MyView,
				parent : 'homePage',
				preserve : true
				
			}
			
		},

		events : {

		},

		initializer : function() {

		},

		showHomePage : function() {
			this.showView('homePage');
		},
		
		showMyView : function () {
			this.showView('myView');
		}
		

	}, {
		ATTRS : {
			routes : {
				value : [ {
					path : '/',
					callbacks : 'showHomePage'
				}, {
					path: '/myview',
					callbacks : 'showMyView'
				} ]
			}
		}
	});

	Y.namespace("MYAPP").MyApp = MyApp;

}, '0.0.1', {
	requires : [ 'node', 'app', /*'models',*/ 'views' ]
});