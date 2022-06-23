import { gsap } from "gsap";

class Notifications {
	timeline = gsap.timeline();

	constructor({
		timeoutDelay = 3000,
		windowWidth = 500,
		windowHeight = 150,
		notificationSelector = ".Notification-Wrapper"
	}) {
		this.timeoutDelay = timeoutDelay;
		this.windowWidth = windowWidth;
		this.windowHeight = windowHeight;
		this.notificationSelector = notificationSelector;
	}

	showNotification() {
		this.timeline.fromTo(
			this.notificationSelector,
			{ opacity: 0, y: 40 },
			{ opacity: 1, y: 0, duration: 1, ease: "power3.out" }
		);
	}

	#hideNotification() {
		this.timeline.fromTo(
			this.notificationSelector,
			{ opacity: 1, y: 0 },
			{
				opacity: 0,
				y: 40,
				duration: 1,
				ease: "power3.out",
				delay: 0.5,
				onComplete: this.removeNotification
			}
		);
	}

	removeNotification() {
		const notification = document.querySelector(".Notification-Wrapper");
		notification?.remove();
	}

	removeOnClick({ notification, triggerButton }) {
		const removeNotificationBtn = notification.querySelector(triggerButton);
		removeNotificationBtn.addEventListener("click", () => {
			this.#hideNotification();
		});
	}

	removeAfterTimeout({ timeout = false }) {
		if (timeout) {
			setTimeout(() => {
				this.#hideNotification();
			}, this.timeoutDelay);
		}
	}

	setStyles({ notificationSelector }) {
		const notification = document.querySelector(notificationSelector);
		notification.style.cssText = `
		width: ${this.windowWidth}px; 
		min-height: ${this.windowHeight}px
	`;
	}

	initLoadingBar({ selector }) {
		const loadingBar = document.querySelector(selector);
		const time = this.timeoutDelay;
		const { width } = getComputedStyle(loadingBar);
		const barWidthPart = (parseFloat(width) / (time / 1000)) * 0.3;
		this.#updateLoadingBar(loadingBar, width, barWidthPart);
	}

	#updateLoadingBar(loadingBar, barWidth, barWidthPart) {
		let currentBarWidth = parseFloat(barWidth);
		const updateBarWidth = setInterval(() => {
			decrementBarWidth(barWidthPart);
			loadingBar.style.cssText = `
				width: ${currentBarWidth}px;
				`;
		}, 300);
		function decrementBarWidth(width) {
			if (currentBarWidth - width <= 0) {
				currentBarWidth = 0;
				clearInterval(updateBarWidth);
				return currentBarWidth;
			}
			currentBarWidth -= width;
			return currentBarWidth;
		}
	}
}

export { Notifications };
