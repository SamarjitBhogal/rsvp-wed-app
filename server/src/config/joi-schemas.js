import Joi from 'joi';

const USERNAME_MIN_LEN = 8;
const USERNAME_MAX_LEN = 30;
const USER_EMAIL_MAX_LEN = 125;

export const userSignUpSchema = Joi.object({
	userName: Joi.string()
		.trim()
		.min(USERNAME_MIN_LEN)
		.max(USERNAME_MAX_LEN)
		.required()
		.messages({
			'string.base': 'Username must be of type string.',
			'string.min': `Username must be ${USERNAME_MIN_LEN} characters long`,
			'string.max': `Username must be no more than ${USERNAME_MAX_LEN} characters long`,
			'any.required': 'An username is required.',
		}),
	userEmail: Joi.string()
		.email()
		.trim()
		.max(USER_EMAIL_MAX_LEN)
		.required()
		.messages({
			'string.base': 'Email must be of type string.',
			'string.email': 'The string is not a valid email.',
			'string.max': `Email must be no more than ${USER_EMAIL_MAX_LEN} characters long`,
			'any.required': 'An email is required.',
		}),
	password: Joi.string().required(),
});

export const userLogInSchema = Joi.object({
	userEmail: Joi.string()
		.email()
		.trim()
		.max(USER_EMAIL_MAX_LEN)
		.required()
		.messages({
			'string.base': 'Email must be of type string.',
			'string.email': 'The string is not a valid email.',
			'string.max': `Email must be no more than ${USER_EMAIL_MAX_LEN} characters long`,
			'any.required': 'An email is required.',
		}),
	password: Joi.string().required(),
});
