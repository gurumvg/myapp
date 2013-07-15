YUI.add('formView', function(Y, name) {

	var FormView = Y.Base.create('formView', Y.View, [], {

		template : Y.one("#myapp-form-template").getHTML(),

		data: new Y.ModelList(),

		events : {
			"#user-add-form": {submit: 'addUser'}
		},

		initializer : function() {

		},

		render : function() {
			this.get('container').setHTML(this.template);
			this.createDataTable();
			return this;
		},

		createDataTable: function() {

			var self = this;

			var table = new Y.DataTable({
			    columns: ["username", "email", "password"],
			    data: self.data,

			    // Optionally configure your table with a caption
			    caption: "User DataTable",

			    // and/or a summary (table attribute)
			    summary: "User DataTable showing basic information of users."
			});

			table.render(this.get('container').one("#datatable-container"));

		},

		addUser: function(evt) {
			evt.preventDefault();
			var form = evt.target,
				oUser = {};
			oUser.username = form.one("#uName").get('value');
			oUser.email = form.one("#email").get('value');
			oUser.password = form.one("#password").get('value');
			//debugger;

			//this will even add row to the datatable.	
			this.data.add(oUser);
		}

	});

	Y.namespace("MYAPP").FormView = FormView;

}, '0.0.1', {
	requires : [ 'node', 'view', 'model-list', 'datatable' ]
});