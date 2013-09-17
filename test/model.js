exports.statics = {
	"prop": "val"
};

exports.dataModel = {
	firstName: "Planet",
	lastName: "Earth",
	fullName: function() {
		return this.firstName() + " " + this.lastName();
	}
};

exports.methods = {
	capitalizeLastName: function() {
		var currentVal = this.lastName();
		this.lastName(currentVal.toUpperCase());
	},
	init: function(){
		console.log('Helloka!');
	}
};

exports.validation = {
	firstName: { required: true, type: "alphanum" },
	lastName: { notblank: true, type: "alphanum" }
};
