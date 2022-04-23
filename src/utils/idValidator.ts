import Joi from 'joi';

const idSchema = Joi.object({
  id: Joi.string().hex().length(24).messages({
    'string.base': 'Car id must be a string',
    'string.hex': 'Car id must be a hexadecimal string',
    'string.length': 'Car id must be 24 characters long',
  }),
});

export default (body: { id: string }) => {
  const { error } = idSchema.validate(body);

  if (error) return { message: error.message };

  return {};
};