const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest();
	const data = new FormData();

	if (options.method === 'GET') {
		let url = options.url + '?';

		for (let key in options.data) {
			url += key + '=' + options.data[key] + '&';
		}

		url.slice(0, -1);

		xhr.open('GET', url);
		xhr.send();
	} else {
		for (let key in options.data) {
			data.append(key, options.data[key]);
		}

		xhr.open(options.method, options.url);
		xhr.send(data);
	}

	xhr.responseType = 'json';

	xhr.addEventListener('readystatechange', () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			options.callback(null, xhr.response);
		} else if (xhr.readyState === 4 && xhr.status !== 200) {
			options.callback(xhr.status, null);
		}
		return xhr;
	});
};