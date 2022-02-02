import joi from "@hapi/joi";

export const userSchema = joi.object({
  username: joi.string().required().messages({
    "string.base": "Please Enter Username!",
    "string.empty": "Please Enter Username!",
    "any.required": "Please Enter Username!",
  }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required()
    .messages({
      "any.required": "Please Enter a Valid Email!",
    }),
  password: joi
    .string()
    .min(8)
    .max(16)
    .pattern(
      new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password Must Contain At Least One Special Character, Upper Case and A Number!",
      "string.empty": "Please Enter Password!",
      "string.min": "Password Must Be At Least 8 Characters Long",
      "string.max": "Maximum Characters For Password Is 16.",
    }),
});
