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
			
			formView: {
				type : Y.MYAPP.FormView,
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
		
		showFormView : function () {
			this.showView('formView');
		}
		

	}, {
		ATTRS : {
			routes : {
				value : [ {
					path : '/',
					callbacks : 'showHomePage'
				}, {
					path: '/form',
					callbacks : 'showFormView'
				} ]
			}
		}
	});

	Y.namespace("MYAPP").MyApp = MyApp;

}, '0.0.1', {
	requires : [ 'node', 'app', /*'models',*/ 'views' ]
});