class InputMask {
	constructor({ targetInputSelector, customMatrix }) {
		this.inputs = document.querySelectorAll(targetInputSelector);
		this.customMatrix = customMatrix ?? "+7 (___) ___-___-___";
	}

	init() {
		this.inputs.forEach(input => {
			input.addEventListener("input", event => {
				this.#createMask(event);
			});
			input.addEventListener("focus", event => {
				this.#createMask(event);
			});
			input.addEventListener("blur", event => {
				this.#createMask(event);
			});
		});
	}

	#createMask(event) {
		const matrix = this.customMatrix;
		let i = 0;
		const def = matrix.replace(/\D/g, "");
		let val = event.target.value.replace(/\D/g, "");
		if (def.length >= val.length) {
			val = def;
		}
		event.target.value = matrix.replace(/./g, character => {
			return /[_\d]/.test(character) && i < val.length
				? val.charAt(i++)
				: i >= val.length
				? ""
				: character;
		});
		if (event.type === "blur") {
			if (event.target.value.length === 2) {
				event.target.value = "";
			}
		} else {
			this.#setCursorPosition(event.target.value.length, event.target);
		}
	}

	#setCursorPosition(position, element) {
		element.focus();
		element.addEventListener("click", () => {
			element.selectionStart = element.value.length;
			element.selectionEnd = element.value.length;
		});
		if (element.setSelectionRange) {
			element.setSelectionRange(position, position);
		} else if (element.createTextRange) {
			const range = element.createTextRange();
			range.collapse(true);
			range.moveEnd("character", position);
			range.moveStart("character", position);
			range.select();
		}
	}
}

export { InputMask };
