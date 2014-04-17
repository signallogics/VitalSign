define(["controller/Mediator"], function(Mediator){
	var heartRateConnection = null;
	//connect to the USB
	chrome.serial.getDevices(function(devices){
		devices.forEach(function(device){
			if (device.path === "/dev/tty.SLAB_USBtoUART"){
				chrome.serial.connect(device.path, {bitrate:19200}, function(connection){
					heartRateConnection = connection;
				})
			}
		})
	});

	chrome.serial.onReceive.addListener(onReceiveCallback);

	function onReceiveCallback(info){
		var vals = new DataView(info.data);
		for (var i = 0; i < vals.byteLength; i++){
			collectValue(vals.getUint8(i));
		}
	}

	var calibrated = false;

	function findStart(){
		for (var i = 0; i < 5; i++){
			//this is the starting value when nothing is 
			if (lastFive[i]===128) {
				fiveIndex = i;
			}
		}
	}

	var fiveIndex = 0;
	var lastFive = [];

	var heartRate = 0;
	var beatHeight = 0;
	var connectionNumber = 0;

	function collectValue(val){
		lastFive[fiveIndex++] = val;
		fiveIndex = fiveIndex % 5;
		if (!calibrated){
			if (val === 128){
				fiveIndex = 0;
				calibrated = true;				
			}
		}
	}

	function fingerDetected(){
		return calibrated && lastFive[4] > 128;
	}

	function getHeartRate(){
		return lastFive[2];
	}

	function getGraphPosition(){
		return lastFive[1] / 10;
	}

	//MEDIATOR MESSAGES//

	var hasFinger = false;
	var hasHeartRate = false;
	Mediator.route("update", function(){
		if (fingerDetected() && !hasFinger){
			Mediator.send("fingerstart");
			hasFinger = true;
		} else if (!fingerDetected() && hasFinger){
			Mediator.send("fingerend");
			hasFinger = false;
			hasHeartRate = false;
		}

		//send the beats if it has a finger
		if (hasFinger){
			var heartRate = getHeartRate();
			if (heartRate > 0){
				Mediator.send("heartrate", getHeartRate());
				if (!hasHeartRate){
					Mediator.send("heartratestart", getHeartRate());
					hasHeartRate = true;
				}
			}
			Mediator.send("waveform", getGraphPosition());
		}
	});

	return {
		
	}
});