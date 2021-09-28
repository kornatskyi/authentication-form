export const emailValidation = {
  required: { value: true, message: 'Input your email!' },
  maxLength: {
    value: 30,
    message: 'Field length should be less then 254 chars!',
  },
}

export const passwordValidation = {
  required: { value: true, message: 'Choose your password' },
  maxLength: {
    value: 30,
    message: 'Field length should be less then 30 chars!',
  },
}
