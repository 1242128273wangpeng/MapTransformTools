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

let map;
// 初始化地图
function initMap() {
	if (map === undefined) {
		const mapDiv = document.getElementById('map');
		// 检查地图容器是否存在
		if (!mapDiv) {
			console.error('找不到地图容器');
			return;
		}
		// 使用 HTTPS 协议
		map = L.map('map').setView([51.23125, 112.34234], zoom);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			maxZoom: 18,
			minZoom: 16,
			id: 'osm.tiles',
		}).addTo(map);

		L.marker([51.2123, 112.23239])
			.addTo(map)
			.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
			.openPopup();
	}
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
			initMap();
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
}

document.addEventListener('DOMContentLoaded', function () {
	addEventListener(); // 保留原有的事件监听器
});
