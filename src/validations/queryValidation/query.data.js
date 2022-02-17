import joi from "joi";

export const queryData = joi.object({
  senderName: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required(),
  message: joi.string().required(),
  subject: joi.string().required(),
});
