import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const NAME_MAXLEN = 30;
const EMAIL_MAXLEN = 125;
const MAX_HEAD_COUNT = 10;
const MIN_HEAD_COUNT = 0;

export const createGuestsSchema = Joi.object({
	eventID: Joi.number().integer().required().messages({
		'number.base': 'The eventID must be of type integer.',
		'any.required': 'An eventID is required.',
	}),
	firstName: Joi.string()
		.trim()
		.max(NAME_MAXLEN)
		.required()
		.messages({
			'string.base': 'First name must be a string.',
			'string.max': `Your first name must be no more than ${NAME_MAXLEN} characters long.`,
			'any.required': 'A first name is required.',
		}),
	lastName: Joi.string()
		.trim()
		.max(NAME_MAXLEN)
		.required()
		.messages({
			'string.base': 'Last name must be a string.',
			'string.max': `Your last name must be no more than ${NAME_MAXLEN} characters long.`,
			'any.required': 'A last name is required.',
		}),
	email: Joi.string()
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
	accompanyingHeadCount: Joi.number()
		.integer()
		.min(0)
		.max(MAX_HEAD_COUNT)
		.required()
		.messages({
			'number.base': 'The number of individuals must be of type integer.',
			'number.min': `There cannot be less than ${MIN_HEAD_COUNT} individuals attending.`,
			'number.max': `There can be no more than ${MAX_HEAD_COUNT} individuals attending.`,
			'any.required': 'A head count is required.',
		}),
});

export const accessRequestSchema = Joi.object({
	accessCode: Joi.string()
		.trim()
		.required()
		.messages({
			'string.base': 'The access code must be of type string.',
			'any.required': 'An access code is required.',
		}),
});
