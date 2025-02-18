chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log('Received from popup: ' + JSON.stringify(request.params));
	const params = request.params;
	const mapType = request.mapType;
	let baseUrl = '';
	if (mapType === 'amap') {
		baseUrl = 'https://lbs.amap.com/tools/picker';
		chrome.tabs.create({
			url: baseUrl + '?lat=' + params.sourceLat + '&lon=' + params.sourceLng,
		});
	} else if (mapType === 'baidu') {
		baseUrl = 'https://api.map.baidu.com/lbsapi/getpoint/index.html';
		chrome.tabs.create({
			url: baseUrl + '?lat=' + params.sourceLat + '&lon=' + params.sourceLng,
		});
	} else if (mapType === 'google') {
		baseUrl =
			'https://maps.google.com/maps?q=' +
			params.sourceLat +
			',' +
			params.sourceLng +
			'&z=15';
		chrome.tabs.create({
			url: baseUrl,
		});
	}
	sendResponse('handle response');
});
