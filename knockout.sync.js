/// Knockout Sync plugin v0.6.1
/// (c) 2013 Imre Fazekas
/// License: MIT (http://www.opensource.org/licenses/mit-license.php)
(function (factory) {
	// Module systems magic dance.
	if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// CommonJS or Node: hard-coded dependency on "knockout"
		factory(require('knockout'), require('funcsync'), require('socket.io'), exports);
	} else if (typeof define === 'function' && define.amd) {
		// AMD anonymous module with hard-coded dependency on "knockout"
		define(['knockout', 'funcsync', 'socket.io', 'exports'], factory);
	} else {
		// <script> tag: use the global `ko` object, attaching a `mapping` property
		factory(ko, funcsync, io, ko.mapping = {});
	}
}(
	function (ko, funcsync, io, exports) {
		var theRealModel = ko.observable();

		var theViewModel = {};
		var thePrototype;
		var firstMapping = true;
		var socket;
		var options;
		var timestamp;

		function updateModel( data, self ){
			timestamp = data.timestamp || Date.now();
			var S = data.statics;
			var model = data.dataModel;
			var V = data.validation;
			var methods = data.methods;

			var M = funcsync.functify(model, self);
			var F = funcsync.functify(methods, self);

			thePrototype = M;

			ko.mapObject( self, M, V, F, S );

			theRealModel( self );

			if( firstMapping ){
				ko.applyBindings( theRealModel );
				firstMapping = false;
			}
		}

		exports.keepInSync = ko.keepInSync = function( _options ){
			options = _options;

			socket = io.connect( options.URI );
			if( options.VM )
				updateModel( options.VM, theViewModel );

			socket.on( options.modelMessage || 'updateModel', function (data) {
				if( options.versioned && data.timestamp && data.timestamp <= timestamp )
					return;
				updateModel( data, theViewModel );
			});
			socket.on( options.dataMessage || 'updateData', function (data) {
				if( options.versioned && data.timestamp && data.timestamp <= timestamp )
					return;
				ko.updateViewModel( theRealModel(), data.data );
			});
		};

		exports.doSync = ko.doSync = function(){
			if( socket && thePrototype )
				socket.emit( options.shareMessage || 'share', { data: ko.toJSONByPrototype( theRealModel(), thePrototype) } );
		};
	}
));