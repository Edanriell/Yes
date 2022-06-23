import { postData } from "../../services/requests";
import { Spinner } from "../spinner/spinner";
import { ErrorMessage } from "../notifications/errorMessage";
import { SuccessMessage } from "../notifications/successMessage";

class Forms {
	errorMessage = new ErrorMessage({
		messageText: "Нам не удалось отправить ваши данные на сервер, повторите попытку позже.",
		messageTypeText: "Ошибка передачи данных.",
		timeoutDelay: 5000
	});

	successMessage = new SuccessMessage({
		messageText: "Данные успешно отправлены, в кратчайшие сроки они будут обработаны.",
		messageTypeText: "Успех.",
		timeoutDelay: 5000
	});

	constructor({ formSelector, submitButton, hostName, databasePort, databaseName }) {
		this.form = document.querySelector(formSelector);
		this.sendDataButton = document.querySelector(submitButton);
		this.host = hostName || "localhost";
		this.port = databasePort || 3000;
		this.database = databaseName;
		this.inputs = this.form.querySelectorAll("input");
	}

	init() {
		this.form.addEventListener("submit", event => {
			this.#sendData(event, this.form, this.host, this.port, this.database);
		});
	}

	#sendData(event, form, host, port, database) {
		event.preventDefault();
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		const spinner = Spinner.getInstance();

		spinner.hideButtonText({
			button: this.sendDataButton.children,
			hide: true
		});
		spinner.showSpinner(this.sendDataButton);

		postData({
			url: `http://${host}:${port}/${database}`,
			data
		})
			.then(() => {
				spinner.hideSpinner();
				spinner.hideButtonText({
					button: this.sendDataButton.children,
					show: true,
					animationDelay: 1.8
				});
				this.successMessage.init();
			})
			.catch(() => {
				spinner.hideSpinner();
				spinner.hideButtonText({
					button: this.sendDataButton.children,
					show: true,
					animationDelay: 0.4
				});
				this.errorMessage.init();
			})
			.finally(() => {
				form.reset();
			});
	}
}

export { Forms };
