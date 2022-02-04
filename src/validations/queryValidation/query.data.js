import joi from "joi";

export const queryData = joi.object({
  senderName: joi.string().min(3).max(45).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required(),
  message: joi.string().min(5).max(1000).required(),
});
