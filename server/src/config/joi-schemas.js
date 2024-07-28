import Joi from "joi";

export const userSchema = Joi.object({
	userName: Joi.string().trim().min(8).max(30).required(),
	userEmail: Joi.string().email().trim().max(125).required(),
	password: Joi.string().required().messages(),
});
