/*--- global config ---*/
YUI_config = YUI.GlobalConfig = {
	filter: 'debug',
	groups : {
		/*models : {
			root : './js/models/',
			combine : false,
			modules : {
				homepageView : {
					path : 'HomePageView.js'
				},
				headerView : {
					path : 'HeaderView.js'
				},
				footerView : {
					path : 'FooterView.js'
				}
			}
		},*/
		views : {
			base : './js/views/',
			combine : false,
			modules : {
				homepageView : {
					path : 'HomePageView.js',
					requires: ['headerView', 'footerView']
				},
				headerView : {
					path : 'HeaderView.js'
				},
				footerView : {
					path : 'FooterView.js'
				},
				myView : {
					path : 'MyView.js'
				}
			}
		}
	},
	aliases : {
		views: ['homepageView', 'headerView', 'footerView', 'myView'],
	},
	modules : {
		myApp : {
			fullpath : './js/MyApp.js',
			requires: ['views']
		}
	}

};

YUI().use('myApp', function(Y) {
	
	// Create and render a new instance of our `ContributorsApp`!
	var app = new Y.MYAPP.MyApp({
	    // We force this to false for this example app because there is no server.
	    serverRouting: false,

	    // Here we set our app's rendering container, and restrict which links on
	    // the page should cause the app to navigate.
	    //container   : '#main', //defaults to 'body'
	    //linkSelector: '#github-app a',
	    
	    viewContainer: 'div.main-container',

	    // Enable view transitions when users are navigating around the app.
	    transitions: true

	    // We'll define the default GitHub user to be "yui".
	    //user: new User({login: 'yui'})
	}).render();
	
	app.navigate('/');

	
});
