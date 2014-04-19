define(["controller/Mediator"], function(Mediator){
	var arduinoConnection = null;
	//connect to the Arduino
	chrome.serial.getDevices(function(devices){
		devices.forEach(function(device){
			if (device.path === "/dev/tty.usbmodemfa141"){
				chrome.serial.connect(device.path, {bitrate:19200}, function(connection){
					arduinoConnection = connection;
				})
			}
		})
	});

	Mediator.route("waveform", function(msg){
		var rate = Math.max(parseInt(msg.data, 10)*25, 255);
		var data = new ArrayBuffer(1);
		data[0] = rate;
		if (arduinoConnection){
			chrome.serial.send(arduinoConnection.connectionId, data, function(){});
		}
	});
});