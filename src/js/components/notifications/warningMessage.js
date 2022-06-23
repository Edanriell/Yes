import { Notifications } from "./notifications";
import WarningIcon from "../../../images/icons/notifications/warning.svg";

class WarningMessage extends Notifications {
	constructor({ messageText, messageTypeText, timeoutDelay }) {
		super(timeoutDelay);
		this.timeoutDelay = timeoutDelay;
		this.text = messageText;
		this.typeText = messageTypeText;
		this.icon = WarningIcon;
	}

	init() {
		this.#createMessage();
	}

	#createMessage() {
		const messageWrapper = document.createElement("div");

		messageWrapper.innerHTML = `
		<div class="Notification">
			<div class="Notification-IconWrapper Notification-IconWrapper_color_red">
				<img 
					class="Notification-Icon"
					src=${this.icon} 
					width="40" 
					height="40" 
					alt="Иконка оповещения"
				/>
			</div>
			<div class="Notification-Content">
				<strong class="Notification-TypeText">${this.typeText}</strong>
				<p class="Notification-Text Notification-Text_color_red">${this.text}</p>
			</div>
			<button class="Notification-Close" type="button">
				<span class="VisuallyHidden">
					Закрыть оповещение
				</span>
			</button>
            <div class="Notification-TimeBar">
                <div class="Notification-TimeBarCurrent 
					Notification-TimeBarCurrent_color_blue"></div>
                <div class="Notification-TimeBarTotal 
					Notification-TimeBarTotal_color_blue"></div>
            </div>
		</div>
		`;

		messageWrapper.classList.add("Notification-Wrapper");

		document.querySelector(".NotificationList").append(messageWrapper);

		this.showNotification();
		this.removeOnClick({
			notification: messageWrapper,
			triggerButton: ".Notification-Close"
		});
		this.removeAfterTimeout({
			notification: messageWrapper,
			timeout: true
		});
		this.setStyles({
			notificationSelector: ".Notification"
		});
		this.initLoadingBar({
			selector: ".Notification-TimeBarCurrent"
		});
	}
}

export { WarningMessage };
