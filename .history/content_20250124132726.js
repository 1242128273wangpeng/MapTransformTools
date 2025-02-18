window.addEventListener('load', (event) => {
	var isBaiduMap = document.location.href.startsWith(
		'https://api.map.baidu.com/'
	);
	if (isBaiduMap) {
		console.log('是百度地图');
	}
});
