define(function(){
	
	var allRoutes = {};	

	var properties = {};

	var Mediator = {};

	//@param {string} address
	//@param {*=} data
	//@param {number=} timetag
	//@param {Object=} target
	Mediator.send = function(address, data, timetag, target){
		var msg = new Message(address, data, timetag, target);
		if (msg.timetag > 1){
			addToQueue(msg);
		} else {
			_send(msg);
		}
	}

	//@private
	//@param {Message} msg
	var _send = function(msg){
		if (allRoutes.hasOwnProperty(msg.address)){
			var callbacks = allRoutes[msg.address];
			for (var i = 0; i < callbacks.length; i++){
				var cb = callbacks[i];
				cb(msg);
			}
		}
	}

	//route associates a route with a callback
	//accepts messages
	Mediator.route = function(address, callback){
		if (allRoutes.hasOwnProperty(address)){
			var callbacks = allRoutes[address];
			callbacks.push(callback);
		} else {
			allRoutes[address] = [callback];
		}
	}

	//////////////////////////////////////////////////////////////////////////
	//	PROPERTIES
	///////////////////////////////////////////////////////////////////////////

	//@returns {*} requested property
	Mediator.get = function(prop){
		if (properties.hasOwnProperty(prop)){
			return properties[prop];
		}
	}

	//
	Mediator.set = function(prop, value, time){
		if (time){
			var msg = new Message("_set", function(){
				_set(prop, value);
			}, time);
			addToQueue(msg);
		} else {
			_set(prop, value);
		}
	}

	var _set = function(prop, value){
		properties[prop] = value;
		//trigger a change event
		Mediator.send("change/"+prop, value, 0, Mediator);
	}


	//////////////////////////////////////////////////////////////////////////
	//	MESSAGE
	///////////////////////////////////////////////////////////////////////////

	//@param {string} address
	//@param {*} data
	//@param {number|string=} timetag
	//@param {Object=} target
	var Message = function(address, data, timetag, target){
		this.timetag = typeof timetag === "undefined" ? 1 : timetag + Date.now();
		this.address = address;
		this.data = data;
		this.target = target || null;
	}

	//////////////////////////////////////////////////////////////////////////
	//	UPDATE LOOP
	///////////////////////////////////////////////////////////////////////////

	//paul irish polyfill
	var requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();

	var msgQueue = [];

	var lastUpdate = Date.now();

	var updateMessage = new Message("update", {}, 0, Mediator);

	//process timed messages at 60fps
	function processQueue(){
		requestAnimFrame(processQueue);
		var now = Date.now();
		while (msgQueue.length > 0 && msgQueue[0].timetag < now){
			var first = msgQueue.shift();
			if (first.address === "_set"){
				first.data();
			} else {
				_send(first);
			}
		}
		//send an update message to all the listeners
		updateMessage.data = now - lastUpdate;
		_send(updateMessage);
		lastUpdate = now;
	}

	//process timed messages at 60fps
	function addToQueue(addMsg){
		for (var i = 0; i < msgQueue.length; i++){
			var msg = msgQueue[i];
			if (addMsg.timetag < msg.timetag){
				msgQueue.splice(i, 0, addMsg);
				return;
			}
		}
		//otherwise add it to the end
		msgQueue.push(addMsg);
	}

	//start the loop
	processQueue();

	return Mediator;
});