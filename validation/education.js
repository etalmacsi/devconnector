const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExpInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "Title field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Company field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
