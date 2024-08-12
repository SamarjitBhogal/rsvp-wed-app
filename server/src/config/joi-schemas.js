import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const USERNAME_MINLEN = 8;
const USERNAME_MAXLEN = 30;
const EMAIL_MAXLEN = 125;

const PAGECOLOR_MAXLEN = 7;
const PAGEIMGLINK_MAXLEN = 250;

const TITLE_MAXLEN = 50;
const DESC_MAXLEN = 350;

const EVENT_MINLEN = 1;

const MAX_HEAD_COUNT = 10;

export const userSignUpSchema = Joi.object({
	userName: Joi.string()
		.trim()
		.min(USERNAME_MINLEN)
		.max(USERNAME_MAXLEN)
		.required()
		.messages({
			'string.base': 'Username must be of type string.',
			'string.min': `Username must be ${USERNAME_MINLEN} characters long`,
			'string.max': `Username must be no more than ${USERNAME_MAXLEN} characters long`,
			'any.required': 'An username is required.',
		}),
	userEmail: Joi.string()
		.email()
		.trim()
		.max(EMAIL_MAXLEN)
		.required()
		.messages({
			'string.base': 'Email must be of type string.',
			'string.email': 'The string is not a valid email.',
			'string.max': `Email must be no more than ${EMAIL_MAXLEN} characters long`,
			'any.required': 'An email is required.',
		}),
	password: Joi.string().required(),
});

export const userLogInSchema = Joi.object({
	userEmail: Joi.string()
		.email()
		.trim()
		.max(EMAIL_MAXLEN)
		.required()
		.messages({
			'string.base': 'Email must be of type string.',
			'string.email': 'The string is not a valid email.',
			'string.max': `Email must be no more than ${EMAIL_MAXLEN} characters long.`,
			'any.required': 'An email is required.',
		}),
	password: Joi.string().required(),
});

//! Using Javascript ISO format for dates. With a space between time and date + no milliseconds
export const createEventSchema = Joi.object({
	eventName: Joi.string()
		.trim()
		.max(TITLE_MAXLEN)
		.required()
		.messages({
			'string.base': 'The event title must be of type string.',
			'string.max': `The event title must be no more than ${TITLE_MAXLEN} characters long.`,
			'any.required': 'An event title is required.',
		}),
	eventDesc: Joi.string()
		.trim()
		.max(DESC_MAXLEN)
		.required()
		.messages({
			'string.base': 'The event description must be of type string.',
			'string.max': `An event description must be no more than ${DESC_MAXLEN} characters long.`,
			'any.required': 'An event description is required.',
		}),
	eventStart: Joi.date().format('YYYY-MM-DD HH:mm:ss').min('now').required().messages({
		'date.base': 'The start period must be a valid date type.',
		'date.min': 'The start period must be a future date.',
		'date.format': 'The date must be in format (YYYY-MM-DD HH:mm:ss).',
		'any.required': 'A date is required.',
	}),
	eventEnd: Joi.date().format('YYYY-MM-DD HH:mm:ss').greater(Joi.ref('eventStart')).required().messages({
		'date.base': 'The end period must be a valid date type.',
		'date.greater': 'The end date must after the starting date.',
		'date.format': 'The date must be in format (YYYY-MM-DD HH:mm:ss).',
		'any.required': 'A date is required.',
	}),
});

export const createPageSchema = Joi.object({
	pageTitle: Joi.string()
		.trim()
		.max(TITLE_MAXLEN)
		.required()
		.messages({
			'string.base': 'The page title must be of type string.',
			'string.max': `The page title must be no more than ${TITLE_MAXLEN} characters long.`,
			'any.required': 'A page title is required.',
		}),
	pageDesc: Joi.string()
		.trim()
		.max(DESC_MAXLEN)
		.required()
		.messages({
			'string.base': 'The page description must be of type string.',
			'string.max': `A page description must be no more than ${DESC_MAXLEN} characters long.`,
			'any.required': 'A page description is required.',
		}),
	pageColor: Joi.string()
		.trim()
		.max(PAGECOLOR_MAXLEN)
		.messages({
			'string.base': 'The page hex color must be of type string.',
			'string.max': `A page hex color must be no more than ${PAGECOLOR_MAXLEN} characters long.`,
		}),
	pageImgLink: Joi.string()
		.trim()
		.max(PAGEIMGLINK_MAXLEN)
		.messages({
			'string.base': 'A page image link must be of type string.',
			'string.max': `A page image link must be no more than ${PAGEIMGLINK_MAXLEN} characters long.`,
		}),
	events: Joi.array()
		.min(EVENT_MINLEN)
		.items(createEventSchema)
		.required()
		.messages({
			'array.base': 'Events must be given as an array.',
			'array.min': `There must be at least ${EVENT_MINLEN} event(s).`,
			'array.includes': 'Events in the array are not proper events.',
			'any.required': 'An events array is required.',
		}),
});

export const createBookingSchema = Joi.object({
	guestName: Joi.string()
		.trim()
		.max(USERNAME_MAXLEN)
		.required()
		.messages({
			'string.base': 'Name must be of type string.',
			'string.max': `A name must be no more than ${USERNAME_MAXLEN} characters long.`,
			'any.required': 'A name is required.',
		}),
	guestEmail: Joi.string()
		.email()
		.trim()
		.max(EMAIL_MAXLEN)
		.required()
		.messages({
			'string.base': 'Email must be of type string.',
			'string.email': 'The string is not a valid email.',
			'string.max': `Email must be no more than ${EMAIL_MAXLEN} characters long.`,
			'any.required': 'An email is required.',
		}),
	headCount: Joi.number()
		.integer()
		.min(1)
		.max(MAX_HEAD_COUNT)
		.required()
		.messages({
			'number.base': 'The number of individuals must be of type integer.',
			'number.min': 'There must be at least 1 individual attending.',
			'number.max': `There can be no more than ${MAX_HEAD_COUNT} individuals attending.`,
			'any.required': 'A body count is required.',
		}),
});
