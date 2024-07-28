import { User } from "../../models/user.js";
import { userSchema } from "../../config/joi-schemas.js";

export const post = async (req, res) => {
  // do Joi input handling and send status responses for client error
  const result = userSchema.validate(req.body);
  if (result.error) return res.status(400).send({ message: "Could not signup.", error: result.error });

  try {
    let user = new User("test", "test@email.com", "123456");
    await user.createUser();
    console.log(result);
  } catch (error) {
    // database error
    return res
      .status(500)
      .send({ message: "Failed to create user.", error: error });
  }
  return res.status(201).send({ message: "Signup successfull." });
};
