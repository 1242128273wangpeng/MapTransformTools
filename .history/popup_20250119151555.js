document.querySelector('.convert-btn').addEventListener('click', function () {
	try {
		// 1. 获取输入框的值并转换为浮点数
		const inputs = document.querySelectorAll('.coordinate-input');
		const lat = parseFloat(inputs[0].value);
		const lon = parseFloat(inputs[1].value);

		// 验证输入值是否有效
		if (isNaN(lat) || isNaN(lon)) {
			throw new Error('请输入有效的坐标值');
		}

		// 2. 获取当前选择的坐标系
		const currentSystem = document
			.querySelector('input[name="currentCoordType"]:checked')
			.id.replace('current-', '');

		console.log('Converting coordinates...', {
			from: currentSystem,
			lat,
			lon,
		});
	} catch (error) {
		// 5. 错误处理
		alert(error.message);
		console.error('Conversion error:', error);
	}
});
