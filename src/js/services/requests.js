const getData = async ({ url }) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Данные по адресу ${url} получить не удалось, статус: ${response.status}`);
	}
	const type = response.headers.get("content-type");
	if (type !== "application/json; charset=utf-8") {
		throw new TypeError(
			`Ошибка несовместимости типов данных, 
			 ожидаемы данные формата JSON, 
			 получены ${type} типа`
		);
	}
	return response.json();
};

const postData = async ({ url, data }) => {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(data)
	});
	return response.json();
};

export { postData, getData };
