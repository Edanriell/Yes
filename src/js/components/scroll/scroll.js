import { gsap } from "gsap";

class Scroll {
	isDisplayed = false;

	constructor({ triggerButton, targetHeight }) {
		this.trigger = document.querySelector(triggerButton);
		this.height = targetHeight;
	}

	init() {
		this.trigger.addEventListener("click", () => {
			this.#scrollToTop();
		});
		window.addEventListener("scroll", () => {
			if (window.scrollY >= this.height) {
				this.#showButton(this.trigger, this.isDisplayed);
				this.isDisplayed = true;
			}
			if (window.scrollY < this.height) {
				this.#hideButton(this.trigger, this.isDisplayed);
				this.isDisplayed = false;
			}
		});
	}

	#showButton(button, buttonState) {
		if (buttonState) return;
		gsap.fromTo(
			button,
			{ opacity: 0, display: "none", y: -20 },
			{ opacity: 1, display: "block", duration: 1, y: 0, ease: "power3.out" }
		);
	}

	#hideButton(button, buttonState) {
		if (!buttonState) return;
		gsap.fromTo(
			button,
			{ opacity: 1, display: "block", y: 0 },
			{ opacity: 0, display: "none", duration: 1, y: -20, ease: "power3.out" }
		);
	}

	#scrollToTop() {
		window.scrollTo(0, 0);
	}
}

export { Scroll };
