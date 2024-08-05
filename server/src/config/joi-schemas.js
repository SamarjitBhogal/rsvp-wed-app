import Joi from 'joi';

const USERNAME_MINLEN = 8;
const USERNAME_MAXLEN = 30;
const USER_EMAIL_MAXLEN = 125;

const PAGETITLE_MAXLEN = 50;
const PAGEDESC_MAXLEN = 350;
const PAGECOLOR_MAXLEN = 7;
const PAGEIMGLINK_MAXLEN = 250;

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
		.max(USER_EMAIL_MAXLEN)
		.required()
		.messages({
			'string.base': 'Email must be of type string.',
			'string.email': 'The string is not a valid email.',
			'string.max': `Email must be no more than ${USER_EMAIL_MAXLEN} characters long`,
			'any.required': 'An email is required.',
		}),
	password: Joi.string().required(),
});

export const userLogInSchema = Joi.object({
	userEmail: Joi.string()
		.email()
		.trim()
		.max(USER_EMAIL_MAXLEN)
		.required()
		.messages({
			'string.base': 'Email must be of type string.',
			'string.email': 'The string is not a valid email.',
			'string.max': `Email must be no more than ${USER_EMAIL_MAXLEN} characters long.`,
			'any.required': 'An email is required.',
		}),
	password: Joi.string().required(),
});

export const createPageSchema = Joi.object({
	pageTitle: Joi.string()
		.trim()
		.max(PAGETITLE_MAXLEN)
		.required()
		.messages({
			'string.base': 'The page title must be of type string.',
			'string.max': `The page title must be no more than ${PAGETITLE_MAXLEN} characters long.`,
			'any.required': 'The page title is required.',
		}),
	pageDesc: Joi.string()
		.trim()
		.max(PAGEDESC_MAXLEN)
		.required()
		.messages({
			'string.base': 'The page description must be of type string.',
			'string.max': `A page description must be no more than ${PAGEDESC_MAXLEN} characters long.`,
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
});
