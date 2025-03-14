import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

const NAME_MAXLEN = 30;
const EMAIL_MAXLEN = 125;
const MAX_HEAD_COUNT = 10;
const MIN_HEAD_COUNT = 0;

export const createGuestsSchema = Joi.object({
	firstName: Joi.string()
		.trim()
		.max(NAME_MAXLEN)
		.required()
		.messages({
			"string.base": "First name must be a string.",
			"string.max": `Your first name must be no more than ${NAME_MAXLEN} characters long.`,
			"any.required": "A first name is required.",
		}),
	lastName: Joi.string()
		.trim()
		.max(NAME_MAXLEN)
		.required()
		.messages({
			"string.base": "Last name must be a string.",
			"string.max": `Your last name must be no more than ${NAME_MAXLEN} characters long.`,
			"any.required": "A last name is required.",
		}),
	email: Joi.string()
		.email()
		.trim()
		.max(EMAIL_MAXLEN)
		.required()
		.messages({
			"string.base": "Email must be of type string.",
			"string.email": "The string is not a valid email.",
			"string.max": `Email must be no more than ${EMAIL_MAXLEN} characters long.`,
			"any.required": "An email is required.",
		}),
	subEvents: Joi.array()
		.min(1)
		.max(2)
		.items(
			Joi.object({
				ID: Joi.number().integer().required(),
				name: Joi.string().required(),
				headCount: Joi.number()
					.integer()
					.min(MIN_HEAD_COUNT)
					.max(MAX_HEAD_COUNT)
					.required(),
			}),
		)
		.messages({
			"number.min": "You must select at least 1 event to RSVP.",
			"number.max": "Cannot RSVP for more than the listed events.",
		}),
});

export const accessRequestSchema = Joi.object({
	accessCode: Joi.string().trim().required().messages({
		"string.base": "The access code must be of type string.",
		"any.required": "An access code is required.",
	}),
});

export const eventFinderSchema = Joi.object({
	eventName: Joi.string().trim().required().messages({
		"string.base": "The event name must be of type string.",
		"any.required": "An event name code is required.",
	}),
});

export const sendMailSchema = Joi.object({
	firstName: Joi.string()
		.trim()
		.max(NAME_MAXLEN)
		.required()
		.messages({
			"string.base": "First name must be a string.",
			"string.max": `Your first name must be no more than ${NAME_MAXLEN} characters long.`,
			"any.required": "A first name is required.",
		}),
	lastName: Joi.string()
		.trim()
		.max(NAME_MAXLEN)
		.required()
		.messages({
			"string.base": "Last name must be a string.",
			"string.max": `Your last name must be no more than ${NAME_MAXLEN} characters long.`,
			"any.required": "A last name is required.",
		}),
	email: Joi.string().email().trim().required().messages({
		"string.base": "Email must be of type string.",
		"string.email": "The string is not a valid email.",
		"any.required": "An email is required.",
	}),
	subEventName: Joi.string().trim().required().messages({
		"string.base": "The sub event name must be of type string.",
		"any.required": "A sub event name is required.",
	}),
});
