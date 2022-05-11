var message = new Array(9);
var socket = io();
function setup() {
	//createCanvas(windowWidth, windowHeight);
	// put setup code here
	socket.on('msg',gotData);

	message[0]=20;

	function gotData(data){
		var firstChar = "";
		if(data.length > 0){
			firstChar = data[0];
			switch (firstChar){
				case "a":
					//console.log(data.substring(1));
					incomeData = data.substring(1);
					incomeData = incomeData.replace(/[\n\r]+/g, ' ');
					incomeData = incomeData.split('a')[0]; 
					incomeData = incomeData * 9000 /1023;
					data_val_1=incomeData;
					$('#speedometer-1').val(Math.round(data_val_1));
					$('#speedometer-1').keyup();
					break;
				case "b":
					incomeData = data.substring(1);
					incomeData = incomeData.replace(/[\n\r]+/g, ' ');
					incomeData = incomeData.split('b')[0]; 
					incomeData = incomeData * 9000 /1023;
					data_val_2=incomeData;
					$('#speedometer-2').val(Math.round(data_val_2));
					$('#speedometer-2').keyup();
					break;
				case "c":
					incomeData = data.substring(1);
					incomeData = incomeData.replace(/[\n\r]+/g, ' ');
					incomeData = incomeData.split('c')[0]; 
					incomeData = incomeData * 3000 /1023;
					data_val_3=incomeData;
					$('#speedometer-3').val(Math.round(data_val_3));
					$('#speedometer-3').keyup();
					break;
				case "d":
					incomeData = data.substring(1);
					incomeData = incomeData.replace(/[\n\r]+/g, ' ');
					incomeData = incomeData.split('d')[0]; 
					incomeData = incomeData * 9000 /1023;
					data_val_4=incomeData;
					$('#speedometer-4').val(Math.round(data_val_4));
					$('#speedometer-4').keyup();
					break;
				case "e":
					incomeData = data.substring(1);
					incomeData = incomeData.replace(/[\n\r]+/g, ' ');
					incomeData = incomeData.split('e')[0]; 
					incomeData = incomeData * 30 /1023;
					battery_level=incomeData;
					$('#battery-level').text(battery_level.toFixed(1));
					break;		
				case "f":
					incomeData = data.substring(1);
					incomeData = incomeData.replace(/[\n\r]+/g, ' ');
					incomeData = incomeData.split('f')[0]; 
					incomeData = incomeData * 100 /1023;
					fuel_level=incomeData;
					$('#fuel-level').text(Math.round(fuel_level));
					break;				
				case "g":
					incomeData = data.substring(1);
					incomeData = incomeData.replace(/[\n\r]+/g, ' ');
					incomeData = incomeData.split('g')[0]; 
					incomeData1 = incomeData * 100 /1023;
					incomeData2 = incomeData * 20 /1023;
					$("#carriage-postion-level").gaugeMeter({percent:incomeData1.toFixed(1),text:incomeData2.toFixed(1)});
					break;
				case "h":
					incomeData = data.substring(1);
					incomeData = incomeData.replace(/[\n\r]+/g, ' ');
					incomeData = incomeData.split('h')[0]; 
					incomeData = incomeData * 100 /1023;
					rotary_rpm=incomeData;
					$("#rotary-rpm-level").gaugeMeter({percent:Math.round(rotary_rpm),text:Math.round(rotary_rpm)});
					break;
 				default:
					console.log("");
			}			
		}
	}

}

function draw() {
	// put drawing code here
	socket.emit('msg',message[0]);
}
