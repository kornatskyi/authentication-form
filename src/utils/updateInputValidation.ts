//Validation schemas
export const emailValidation = () => ({
  maxLength: {
    value: 30,
    message: 'Field length should be less then 254 chars!',
  },
})
export const nameValidation = () => ({
  maxLength: {
    value: 30,
    message: 'Field length should be less then 30 chars!',
  },
})
export const passwordValidation = () => ({
  maxLength: {
    value: 30,
    message: 'Field length should be less then 30 chars!',
  },
})
export const repeatPasswordValidation = (password: React.MutableRefObject<string>) => ({
  maxLength: {
    value: 30,
    message: 'Field length should be less then 30 chars!',
  },
  validate: (value: string) => value === password.current || 'The passwords do not match',
})
