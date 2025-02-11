const Joi = require("joi");
const validation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.string()
      .length(11)
      .pattern(/^\d{1}-\d{3}-\d{2}-\d{2}$/)
      .rule({ message: "phone number must be in format 1-111-11-11" })
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    favorite: Joi.boolean().default(false),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

const validationPatch = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    phone: Joi.string()
      .length(11)
      .pattern(/^\d{1}-\d{3}-\d{2}-\d{2}$/)
      .rule({ message: "phone number must be in format 1-111-11-11" }),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    favorite: Joi.boolean().default(false),
  });
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    subscription: Joi.any().valid("starter", "pro", "business").optional(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

const userValidationSubscript = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.any()
      .valid("starter", "pro", "business")
      .optional()
      .required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};
const userValidationVerify = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "ua", "ru", "gov", "ca"] },
      })
      .pattern(
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
      )
      .required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};
module.exports = {
  validation,
  validationPatch,
  userValidation,
  userValidationSubscript,
  userValidationVerify,
};
