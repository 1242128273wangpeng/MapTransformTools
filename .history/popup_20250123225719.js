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

// 初始化地图
function initMap() {
	const map = L.map('map').setView([36.74675927405943, 118.56252193450929], 13);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);
	const marker = L.marker([36.74675927405943, 118.56252193450929]).addTo(map);
}

function addEventListener() {
	document
		.getElementById('bd09_location')
		.addEventListener('click', function () {
			alert('bd09_location');
		});
	document
		.getElementById('wgs84_location')
		.addEventListener('click', function () {
			alert('wgs84_location');
		});
	document
		.getElementById('gcj02_location')
		.addEventListener('click', function () {
			alert('gcj02_location');
		});
	document
		.getElementById('input_location')
		.addEventListener('click', function () {
			alert('input_location');
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
			};
			data = {
				from: selectedValue,
				coordinateList: [coordinateListValue],
			};
			xhr.send(JSON.stringify(data));
		});
	document.getElementById('map').addEventListener('click', function () {
		initMap();
	});
}

document.addEventListener('DOMContentLoaded', function () {
	addEventListener(); // 保留原有的事件监听器
});
