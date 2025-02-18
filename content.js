function setBaiduLatLon(lat, lon) {
	document.getElementById('localvalue').value = lon + ',' + lat;
	document.getElementById('pointLabel').checked = true;
	setTimeout(() => {
		const localsearch = document.getElementById('localsearch');
		localsearch.click();
	}, 1000);
}

function setAmapLatLon(lat, lon) {
	document.getElementById('txtSearch').value = lon + ',' + lat;
	document.getElementsByName('searchType')[1].checked = true;
	setTimeout(() => {
		const localsearch = document.getElementsByClassName(
			'picker-btn btn-search'
		)[0];
		localsearch.click();
	}, 1000);
}

function getLatLon() {
	const splitRes = document.location.href.split('?');
	const params = splitRes[splitRes.length - 1].split('&');
	let lat = 0;
	let lon = 0;
	params.forEach((element) => {
		const items = element.split('=');
		if (items[0].startsWith('lat')) {
			lat = items[1];
		} else if (items[0].startsWith('lon')) {
			lon = items[1];
		}
	});
	return { lat, lon };
}

window.addEventListener('load', (event) => {
	var isBaiduMap = document.location.href.startsWith(
		'https://api.map.baidu.com/lbsapi'
	);
	var isAMap = document.location.href.startsWith(
		'https://lbs.amap.com/tools/picker'
	);
	const { lat, lon } = getLatLon();
	if (isBaiduMap) {
		setBaiduLatLon(lat, lon);
	} else if (isAMap) {
		setAmapLatLon(lat, lon);
	}
});
