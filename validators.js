const cnicValidator = (value) => {
    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
    return cnicRegex.test(value) &&  value.length === 15;
  };

  const phoneNumberValidator = (value) => {
    const phoneNumberRegex = /^[0-9]{4}-[0-9]{7}$/;
    return phoneNumberRegex.test(value) && value.length === 12;
  };
  
  const emailValidator = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const passwordValidator = (value) => {
    
    const lengthCheck = value.length >= 8;
    const uppercaseCheck = /[A-Z]/.test(value);
    const lowercaseCheck = /[a-z]/.test(value);
    const digitCheck = /[0-9]/.test(value);
  
    return lengthCheck && uppercaseCheck && lowercaseCheck && digitCheck;
  };

  module.exports = {
    cnicValidator,
    phoneNumberValidator,
    emailValidator,
    passwordValidator,
  };