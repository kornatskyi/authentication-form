//Validation schemas
export const emailValidation = () => ({
  required: { value: true, message: 'Input your email!' },
  maxLength: {
    value: 30,
    message: 'Field length should be less then 254 chars!',
  },
})
export const nameValidation = () => ({
  required: { value: true, message: 'Choose your user name!' },
  maxLength: {
    value: 30,
    message: 'Field length should be less then 30 chars!',
  },
})
export const passwordValidation = () => ({
  required: { value: true, message: 'Choose your password' },
  maxLength: {
    value: 30,
    message: 'Field length should be less then 30 chars!',
  },
})
export const repeatPasswordValidation = (password: React.MutableRefObject<string>) => ({
  required: { value: true, message: 'Repeat your password' },
  maxLength: {
    value: 30,
    message: 'Field length should be less then 30 chars!',
  },
  validate: (value: string) => value === password.current || 'The passwords do not match',
})
