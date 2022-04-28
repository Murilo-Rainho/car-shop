import Joi from 'joi';
import { Motorcycle } from '../interfaces';

const motorcycleRequestSchemaObject = {
  _id: Joi.string().hex().length(24).messages({
    'string.base': 'Motorcycle id must be a string',
    'string.hex': 'Motorcycle id must be a hexadecimal string',
    'string.length': 'Motorcycle id must be 24 characters long',
  }),
  model: Joi.string().trim().min(3).required()
    .messages({
      'string.base': 'Model must be a string',
      'string.empty': 'Model is required',
      'string.min': 'Model must be at least 3 characters long',
      'any.required': 'Model is required',
    }),
  year: Joi.number().integer().min(1900).max(2022)
    .required()
    .messages({
      'number.base': 'Year must be a number',
      'number.integer': 'Year must be an integer',
      'number.min': 'Year must be at least 1900',
      'number.max': 'Year must be at most 2022',
      'any.required': 'Year is required',
    }),
  color: Joi.string().trim().min(3).required()
    .messages({
      'string.base': 'Color must be a string',
      'string.empty': 'Color is required',
      'string.min': 'Color must be at least 3 characters long',
      'any.required': 'Color is required',
    }),
  status: Joi.boolean().messages({
    'boolean.base': 'Status must be a boolean',
  }),
  buyValue: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Buy value must be a number',
      'number.integer': 'Buy value must be an integer',
      'number.positive': 'Buy value must be a positive number',
      'any.required': 'Buy value is required',
    }),
  category: Joi.string().trim().valid('Street', 'Custom', 'Trail').required()
    .messages({
      'string.base': 'Category must be a string',
      'string.empty': 'Category is required',
      'any.only': 'Category must be Street, Custom or Trail',
      'any.required': 'Category is required',
    }),
  engineCapacity: Joi.number().integer().positive().max(2500)
    .required()
    .messages({
      'number.base': 'Engine capacity must be a number',
      'number.integer': 'Engine capacity must be an integer',
      'number.positive': 'Engine capacity must be a positive number',
      'number.max': 'Engine capacity must be at most 2500',
      'any.required': 'Engine capacity is required',
    }),
};

const motorcycleRequestSchema = Joi.object(motorcycleRequestSchemaObject);

export default (body: Motorcycle) => {
  const { error } = motorcycleRequestSchema.validate(body);

  if (error) return { message: error.message };

  return {};
};
