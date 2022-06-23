import "../sass/style.scss";

import "swiper/css";

import Swiper, { Pagination, Autoplay, Keyboard, Mousewheel } from "swiper";

import { Modal } from "./components/modal/modal";
import { Forms } from "./components/forms/forms";
import { FormValidation } from "./components/formValidation/formValidation";
import { Scroll } from "./components/scroll/scroll";
import { InputMask } from "./components/inputMask/inputMask";

Swiper.use([Pagination, Autoplay, Keyboard, Mousewheel]);

window.addEventListener("DOMContentLoaded", () => {
	const reviewsSlider = new Swiper(".ReviewsSlider", {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		pagination: {
			el: ".ReviewsSlider-ProgressBar",
			type: "progressbar",
			progressbarFillClass: "ReviewsSlider-ProgressBar_fillColor_red"
		},
		keyboard: {
			enabled: true
		},
		grabCursor: true,
		mousewheel: true,
		loop: true
	});

	const modal = new Modal({
		trigger: "[data-modal]",
		modal: ".Modal",
		underlay: ".Modal-Underlay",
		closeButton: ".Modal-CloseModalButton"
	});

	const modalForm = new Forms({
		formSelector: ".ModalForm",
		submitButton: ".ModalForm-Button",
		databaseName: "phoneNumbers"
	});

	const scroll = new Scroll({
		triggerButton: ".Scroll",
		targetHeight: 1000
	});

	const modalFormValidation = new FormValidation({
		form: ".ModalForm",
		inputs: [
			{
				uniqueName: "phoneNumber",
				selector: ".ModalForm-PhoneInput",
				testRegExp:
					// eslint-disable-next-line max-len
					/([^\w\d])+/g,
				style: {
					valid: `
						border: 0.1rem solid green;
					`,
					unvalid: `
						border: 0.1rem solid red;
					`
				},
				errorMessage: {
					messageText: "Неверный формат номера",
					messageStyle: `
						color: red;
						position: absolute;
						font-size: 1.1rem;
						bottom: 0.2rem;
						right: 3rem;
						z-index: 4;
						font-family: var(--ff-normal-300);
					`
				}
			}
		],
		initialInputStyle: `
			border: solid 0.1rem hsl(0, 0%, 73%);
		`,
		submitButton: ".ModalForm-Button"
	});

	const phoneNumberMask = new InputMask({
		targetInputSelector: "[name='customer-phoneNumber']"
	});

	reviewsSlider.init();
	modal.init();
	modalForm.init();
	scroll.init();
	modalFormValidation.init();
	phoneNumberMask.init();
});
