// 获取勾选的单选按钮的值
function getSelectedCoordinateType() {
	const radios = document.getElementsByName('currentCoordType');
	let selectedValue;
	for (const radio of radios) {
		if (radio.checked) {
			selectedValue = radio.value;
			break;
		}
	}
	console.log(selectedValue);
	return selectedValue;
}

function getCoordinateValues() {
	const sourceLat = document.getElementById('coordinateInputLat').value;
	const sourceLng = document.getElementById('coordinateInputLon').value;
	return { sourceLat, sourceLng };
}

function sendMsgCoordinateValues(mapType) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var coordinateListValue = getCoordinateValues();
		var message = { params: coordinateListValue, mapType: mapType };
		chrome.runtime.sendMessage(message, function (response) {
			console.log('Received from background: ' + response);
		});
	});
}

function copy(str, mimeType) {
	document.oncopy = function (event) {
		event.clipboardData.setData(mimeType, str);
		event.preventDefault();
	};
	try {
		var successful = document.execCommand('copy', false, null);
		console.log('Copying text command was ' + str);
		if (!successful) {
			navigator.clipboard.writeText(str).then(
				function () {
					console.log('successful');
				},
				function () {
					console.log('unsuccessful');
				}
			);
		}
	} catch (ex) {
		console.log('Wow! Clipboard Exeption.\n' + ex);
	}
}

function updateCopyIcon(eleId) {
	let imgEle = document.createElement('img');
	imgEle.src = './image/done.png';
	imgEle.id = eleId;
	imgEle.style.width = '20px';
	imgEle.style.height = '20px';
	imgEle.style.marginBottom = '-4px';
	document.getElementById(eleId).replaceWith(imgEle);
	setTimeout(() => {
		imgEle.src = './image/copy.png';
		const targetElem = document.getElementById(eleId);
		targetElem.replaceWith(imgEle);
		targetElem.addEventListener('click', function () {
			updateCopyIcon(eleId);
		});
	}, 500);
}

function copyBD09LatLon(swap = false) {
	let res = '';
	const lat = document
		.getElementById('bd09-lat')
		.textContent.replace('纬度: ', '');
	const lng = document
		.getElementById('bd09-lon')
		.textContent.replace('经度: ', '');

	res = swap === true ? lng + ',' + lat : lat + ',' + lng;
	copy(res, 'text/plain');
	updateCopyIcon(swap === true ? 'copy_swap_bd09' : 'copy_bd09');
	updateCopyIcon('copy_bd09');
}

function copyGCJ02LatLon(swap) {
	let res = '';
	const lat = document
		.getElementById('gcj02-lat')
		.textContent.replace('纬度: ', '');
	``;
	const lng = document
		.getElementById('gcj02-lon')
		.textContent.replace('经度: ', '');
	res = swap === true ? lng + ',' + lat : lat + ',' + lng;
	copy(res, 'text/plain');
	updateCopyIcon(swap === true ? 'copy_swap_gcj02' : 'copy_gcj02');
}

function copyWGS84LatLon(swap) {
	let res = '';
	const lat = document
		.getElementById('wgs84-lat')
		.textContent.replace('纬度: ', '');
	const lng = document
		.getElementById('wgs84-lon')
		.textContent.replace('经度: ', '');
	res = swap === true ? lng + ',' + lat : lat + ',' + lng;
	copy(res, 'text/plain');
	updateCopyIcon(swap === true ? 'copy_swap_wgs84' : 'copy_wgs84');
}

function addEventListener() {
	document.getElementById('copy_bd09').addEventListener('click', function () {
		copyBD09LatLon();
	});
	document.getElementById('copy_wgs84').addEventListener('click', function () {
		copyWGS84LatLon();
	});
	document.getElementById('copy_gcj02').addEventListener('click', function () {
		copyGCJ02LatLon();
	});
	document
		.getElementById('copy_swap_bd09')
		.addEventListener('click', function () {
			copyBD09LatLon(true);
		});
	document
		.getElementById('copy_swap_wgs84')
		.addEventListener('click', function () {
			copyWGS84LatLon(true);
		});
	document
		.getElementById('copy_swap_gcj02')
		.addEventListener('click', function () {
			copyGCJ02LatLon(true);
		});
	document
		.getElementById('bd09_location')
		.addEventListener('click', function () {
			sendMsgCoordinateValues('baidu');
		});
	document
		.getElementById('wgs84_location')
		.addEventListener('click', function () {
			sendMsgCoordinateValues('google');
		});
	document
		.getElementById('gcj02_location')
		.addEventListener('click', function () {
			sendMsgCoordinateValues('amap');
		});
	document
		.querySelector('.convert-btn')
		?.addEventListener('click', function () {
			var xhr = new XMLHttpRequest();
			var data = {};
			xhr.open(
				'POST',
				'https://openapi.lddgo.net/base/gtool/api/v1/CoordinateTransform',
				true
			);
			var selectedValue = getSelectedCoordinateType();
			var coordinateListValue = getCoordinateValues();
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						try {
							var response = JSON.parse(xhr.responseText);
							var coordinates = response.data.coordinateList[0];
							document.getElementById('wgs84-lat').textContent =
								'纬度: ' + coordinates.wLat;
							document.getElementById('wgs84-lon').textContent =
								'经度: ' + coordinates.wLng;
							document.getElementById('gcj02-lat').textContent =
								'纬度: ' + coordinates.gLat;
							document.getElementById('gcj02-lon').textContent =
								'经度: ' + coordinates.gLng;
							document.getElementById('bd09-lat').textContent =
								'纬度: ' + coordinates.bLat;
							document.getElementById('bd09-lon').textContent =
								'经度: ' + coordinates.bLng;
						} catch (e) {
							console.error('Error parsing JSON:', e);
						}
					} else {
						console.error('Request failed with status:', xhr.status);
					}
				}
			};
			data = {
				from: selectedValue,
				coordinateList: [coordinateListValue],
			};
			xhr.send(JSON.stringify(data));
		});
}

document.addEventListener('DOMContentLoaded', function () {
	addEventListener(); // 保留原有的事件监听器
});
