import joi from "joi";

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().max(11).required(),
    cpf: joi.string().min(11).max(11).required(),
   birthday: joi.date().required()
})