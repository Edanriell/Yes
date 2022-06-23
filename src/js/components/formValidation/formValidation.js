class FormValidation {
	formState = {};

	constructor({ inputs, submitButton, form, initialInputStyle }) {
		this.form = form;
		this.inputsArray = inputs;
		this.initialInputStyle = initialInputStyle;
		this.button = document.querySelector(submitButton);
	}

	init() {
		this.#createInitialState(this.inputsArray);
		for (const input of this.inputsArray) {
			document.querySelector(input.selector).addEventListener("input", event => {
				this.#checkInputValue({
					inputName: input.uniqueName,
					inputStyle: input.style,
					targetInput: event.target,
					inputValue: event.target.value,
					regExp: input.testRegExp,
					errorMessage: input.errorMessage
				});
			});
		}
		this.button.addEventListener("click", () => {
			this.#resetState();
		});
	}

	#checkInputValue({ inputName, inputStyle, targetInput, inputValue, regExp, errorMessage }) {
		const validationResult = regExp.test(inputValue);
		this.#changeInputStyles(inputStyle, targetInput, validationResult);
		this.#displayErrorMessage(targetInput, errorMessage, validationResult);
		this.formState = {
			...this.formState,
			[inputName]: validationResult
		};
		this.#checkState();
	}

	#createInitialState(inputsArray) {
		const inputNames = [];
		const state = {};
		inputsArray.forEach(input => {
			inputNames.push(input.uniqueName);
		});
		for (const propertyName of inputNames) {
			state[propertyName] = false;
		}
		this.formState = state;
	}

	#checkState() {
		switch (!Object.values(this.formState).includes(false)) {
			case true:
				this.button.disabled = false;
				this.button.style.filter = "grayscale(0)";
				break;
			case false:
				this.button.disabled = true;
				this.button.style.filter = "grayscale(100%)";
				break;
			default:
				this.button.disabled = true;
				this.button.style.filter = "grayscale(100%)";
				break;
		}
	}

	#resetState() {
		this.#createInitialState(this.inputsArray);
		const form = document.querySelector(`${this.form}`);
		const inputs = form.querySelectorAll("input");
		inputs.forEach(input => {
			input.classList.remove("Input-Invalid");
			input.classList.remove("Input-Valid");
			input.style.cssText = this.initialInputStyle;
		});
	}

	#changeInputStyles(style, input, isValid) {
		switch (isValid) {
			case true:
				input.classList.remove("Input-Invalid");
				input.classList.add("Input-Valid");
				input.style.cssText = style.valid;
				break;
			case false:
				input.classList.add("Input-Invalid");
				input.classList.remove("Input-Valid");
				input.style.cssText = style.unvalid;
				break;
			default:
				break;
		}
	}

	#displayErrorMessage(targetInput, message, isValid) {
		switch (isValid) {
			case true:
				this.#removeErrorMessage(targetInput);
				break;
			case false:
				this.#createErrorMessage(targetInput, message);
				break;
			default:
				break;
		}
	}

	#removeErrorMessage(input) {
		const errorMessage = input.parentNode.querySelector(".ModalForm-ErrorMessage");
		if (errorMessage) errorMessage.remove();
	}

	#createErrorMessage(input, { messageText, messageStyle }) {
		if (input.parentNode.querySelector(".ModalForm-ErrorMessage")) return;
		const errorMessage = document.createElement("span");
		errorMessage.innerText = messageText;
		errorMessage.style.cssText = messageStyle;
		errorMessage.classList.add("ModalForm-ErrorMessage");
		input.parentNode.append(errorMessage);
	}
}

export { FormValidation };
