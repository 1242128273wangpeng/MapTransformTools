document.getElementById('myButton').addEventListener('click', function () {
	alert('Button clicked!');
});

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

		// 3. 获取所有结果显示区域
		const resultSections = document.querySelectorAll('.coordinate-system');

		// 4. 更新每个坐标系的显示结果
		resultSections.forEach((section) => {
			const systemName = section.querySelector('h3').textContent;
			const values = section.querySelectorAll('.coordinate-value');

			// TODO: 添加实际的坐标转换逻辑
			// 临时显示原始值
			values[0].textContent = `纬度: ${lat.toFixed(8)}`;
			values[1].textContent = `经度: ${lon.toFixed(8)}`;
		});

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
