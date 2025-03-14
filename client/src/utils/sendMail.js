import axios from "./axios";
import { toast } from "react-toastify";

export async function sendMail(
	subEvents,
	eventName,
	email,
	firstName,
	lastName,
) {
	try {
		await axios.post(`/event/PriyaWedding/sendMail`, {
			firstName: 'samarjit',
			lastName: 'bhogal',
			email: 'samarjit.v.bhogal@gmail.com',
			subEventName: 'Ladies Party',
		});
	} catch (error) {
		console.error(error);
		toast.error(
			"An error occurred while sending the email. Please try again.",
		);
	}
	// for (const subEvent of subEvents) {
	// 	try {
	// 		await axios.post(`/event/${eventName}/sendMail`, {
	// 			firstName,
	// 			lastName,
	// 			email,
	// 			subEventName: subEvent.name,
	// 		});
	// 	} catch (error) {
	// 		console.error(error);
	// 		toast.error(
	// 			"An error occurred while sending the email. Please try again.",
	// 		);
	// 	}
	// }
}
