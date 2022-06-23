import { gsap } from "gsap";

class Modal {
	timeline = gsap.timeline({ deleay: 0.4, ease: "power2.out" });

	isShowed = false;

	modalState = "hide";

	constructor({ trigger, timeout = null, scroll = null, modal, underlay, closeButton }) {
		this.triggerButton = document.querySelectorAll(trigger);
		this.modalSelector = document.querySelector(modal);
		this.modalUnderlay = document.querySelector(underlay);
		this.closeModalButton = document.querySelector(closeButton);
		this.clientWidth = document.querySelector("body").clientWidth;
		this.timeout = timeout;
		this.modalScroll = scroll;
	}

	init() {
		this.triggerButton.forEach(button => {
			button.addEventListener("click", event => {
				event.preventDefault();
				this.#showModal();
			});
		});
		this.modalUnderlay.addEventListener("click", event => {
			if (this.modalUnderlay === event.target) {
				this.#hideModal();
			} else if (this.closeModalButton === event.target) {
				this.#hideModal();
			}
		});
		if (this.timeout && this.timeout.action === "show" && !this.isShowed)
			this.#modalTimeout({ action: this.timeout.action, timeout: this.timeout.delay });
		window.addEventListener("scroll", () => {
			if (this.modalScroll && window.scrollY >= this.modalScroll) {
				this.#scrollModal();
			}
		});
	}

	#showModal() {
		document.querySelector("body").style.overflow = "hidden";
		this.#toggleScrollBar({ initialClientWidth: this.clientWidth, action: "hide" });
		this.isShowed = true;
		this.modalState = "show";
		gsap.set(this.modalUnderlay, { display: "block" });
		this.timeline.fromTo(this.modalUnderlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
		this.timeline.fromTo(
			this.modalSelector,
			{ opacity: 0, y: -50 },
			{ opacity: 1, y: 0, duration: 0.6 }
		);
		if (this.timeout && this.timeout.action === "hide")
			this.#modalTimeout({ action: this.timeout.action, timeout: this.timeout.delay });
	}

	#hideModal() {
		// document.querySelector("body").style.overflow = "auto";
		this.#toggleScrollBar({ initialClientWidth: this.clientWidth, action: "show" });
		this.modalState = "hide";
		this.timeline.fromTo(
			this.modalSelector,
			{ opacity: 1, y: 0 },
			{ opacity: 0, y: -50, duration: 0.6 }
		);
		this.timeline.fromTo(this.modalUnderlay, { opacity: 1 }, { opacity: 0, duration: 0.3 });
		this.timeline.set(this.modalUnderlay, { display: "none" });
		this.timeline.set("body", { overflow: "auto", paddingRight: "0px" }); // fix jump
	}

	#modalTimeout({ action, timeout }) {
		switch (action) {
			case "hide":
				setTimeout(() => {
					this.#hideModal();
				}, timeout);
				break;
			case "show":
				setTimeout(() => {
					if (this.isShowed) return;
					this.#showModal();
				}, timeout);
				break;
			default:
				break;
		}
	}

	#scrollModal() {
		if (!this.isShowed) this.#showModal();
	}

	#toggleScrollBar({ initialClientWidth, action }) {
		const { clientWidth } = document.querySelector("body");
		const barWidth = clientWidth - initialClientWidth;

		switch (action) {
			case "hide":
				document.querySelector("body").style.paddingRight = `${barWidth}px`;
				break;
			case "show":
				document.querySelector("body").style.paddingRight = `-${barWidth}px`;
				break;
			default:
				break;
		}
	}
}

export { Modal };
