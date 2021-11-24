import { object, string, ref } from 'yup';

export const createUserSchema = object({
  body: object({
    name: string().required('Name is required'),
    password: string()
      .required('Password is required')
      .min(8, 'Password is too short, should be 8 chars minimum')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~^*()_+{}])[A-Za-z\d@$!%*?&~^*()_+{}]{8,}$/,
        'password should be minimum 8 chars long, and contain at least one upper-case, one lowercase English letter, one digit, one symbol from the list ( ~!@#$%^&*()_+{}[] )',
      ),
    passwordConfirmation: string()
      .oneOf([ref('password'), null], 'Password must match'),
    email: string()
      .email('Must be a valid email address')
      .required('Email is required'),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required('Password is required')
      .min(8, 'Password is too short, should be 8 chars minimum')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~^*()_+{}])[A-Za-z\d@$!%*?&~^*()_+{}]{8,}$/,
        'password should be minimum 8 chars long, and contain at least one upper-case, one lowercase English letter, one digit, one symbol from the list ( ~!@#$%^&*()_+{}[] )',
      ),
    email: string()
      .email('Must be a valid email address')
      .required('Email is required'),
  }),
});
