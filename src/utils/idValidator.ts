import Joi from 'joi';

const idSchema = Joi.object({
  _id: Joi.string().hex().length(24).messages({
    'string.base': 'Id must be a string',
    'string.length': 'Id must have 24 hexadecimal characters',
  }),
});

export default (body: { _id: string }) => {
  const { error } = idSchema.validate(body);

  if (error) return { message: error.message };

  return {};
};