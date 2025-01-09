import joi from "joi";

export const orderRetutnValidation = (payload) => {
  const schema = joi.object({
    date: joi.date().required(),
    note: joi.string().trim().required(),
    userId: joi.number().required(),
    orderId: joi.number().required(),
    detail: joi.array().required(),
  });
  return schema.validate(payload);
};
