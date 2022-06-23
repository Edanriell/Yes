import { gsap } from "gsap";

class Spinner {
	static #instance;

	static #tlSpinner = gsap.timeline({ duration: 1 });

	static #tlButton = gsap.timeline({ duration: 1, ease: "power2.out" });

	static getInstance() {
		if (!Spinner.#instance) {
			Spinner.#instance = new Spinner();
		}
		return Spinner.#instance;
	}

	showSpinner(position) {
		this.#createSpinner(position);
	}

	hideSpinner() {
		this.#spinnerAnimations({
			hideSpinner: true
		});
	}

	removeSpinner() {
		const spinner = document.querySelector(".Spinner");
		spinner.remove();
	}

	#createSpinner(position) {
		const spinnerContainer = document.createElement("div");
		spinnerContainer.classList.add("Spinner");
		spinnerContainer.innerHTML = `
        <span class="Spinner-Image">
            <span class="VisuallyHidden">Загрузга</span>
        </span>
        `;
		position.append(spinnerContainer);
		this.#spinnerAnimations({
			showSpinner: true
		});
	}

	#spinnerAnimations({ showSpinner = false, hideSpinner = false }) {
		if (showSpinner && hideSpinner) return;
		if (!showSpinner && !hideSpinner) return;
		if (showSpinner) {
			Spinner.#tlSpinner.fromTo(
				".Spinner",
				{ opacity: 0, scale: 1 },
				{ opacity: 1, scale: 1.2, duration: 1.6, ease: "elastic.out(3.8, 1)", delay: 0.4 }
			);
		}
		if (hideSpinner) {
			Spinner.#tlSpinner.fromTo(
				".Spinner",
				{ opacity: 1, scale: 1.2 },
				{ opacity: 0, scale: 0.4, duration: 0.4, onComplete: this.removeSpinner }
			);
		}
	}

	hideButtonText({ button, hide = false, show = false, animationDelay = 0 }) {
		if (button && hide) {
			Spinner.#tlButton.fromTo(
				button,
				{ opacity: 1 },
				{ opacity: 0, scale: 0.8, duration: 0.6, ease: "power2.out" }
			);
		} else if (button && show) {
			Spinner.#tlButton.fromTo(
				button,
				{ opacity: 0, scale: 0.8 },
				{ opacity: 1, scale: 1, duration: 0.3, ease: "power2.out", delay: animationDelay }
			);
		}
	}
}

export { Spinner };
