window.addEventListener('load', (event) => {
	var isBaiduMap = document.location.href.startsWith(
		'https://api.map.baidu.com/'
	);
	if (isBaiduMap) {
		console.log('是百度地图');
		document.getElementById('localvalue').value =
			'121.50637688128666,31.24510501795234';
		document.getElementById('pointLabel').checked = true;
	}
});
