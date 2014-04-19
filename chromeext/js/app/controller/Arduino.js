define(["controller/Mediator"], function(Mediator){
	var arduinoConnection = null;
	//connect to the Arduino
	chrome.serial.getDevices(function(devices){
		devices.forEach(function(device){
			if (device.path === "/dev/tty.usbmodem12341"){
				chrome.serial.connect(device.path, {bitrate:19200}, function(connection){
					console.log("arduino connected");
					arduinoConnection = connection;
				})
			}
		})
	});

	setTimeout(function(msg){
		var data = new ArrayBuffer(1);
		data[0] = 50;
		if (arduinoConnection){
			chrome.serial.send(arduinoConnection.connectionId, data, function(){});
		}
	}, 100);

	/*Mediator.route("waveform", function(msg){
		var rate = Math.min(parseInt(msg.data * 255, 10), 255);
		var data = new ArrayBuffer(1);
		data[0] = 50;
		if (arduinoConnection){
			chrome.serial.send(arduinoConnection.connectionId, data, function(){});
		}
	});*/
});