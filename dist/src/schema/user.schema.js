"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSessionSchema = exports.createUserSchema = void 0;
const yup_1 = require("yup");
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required('Name is required'),
        password: (0, yup_1.string)()
            .required('Password is required')
            .min(8, 'Password is too short, should be 8 chars minimum')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~^*()_+{}[\]])[A-Za-z\d@$!%*?&~^*()_+{}[\]]{8,}$/, 'password should be minimum 8 chars long, and contain at least one upper-case, one lowercase English letter, one digit, one symbol from the list ( ~!@#$%^&*()_+{}[] )'),
        age: (0, yup_1.number)()
            .moreThan(0, 'Age must be greater then 0')
            .required('Age is required'),
        passwordConfirmation: (0, yup_1.string)().oneOf([(0, yup_1.ref)('password'), null], 'Passwords must match'),
        email: (0, yup_1.string)()
            .email('Must be a valid email')
            .required('Email is required'),
    }),
});
exports.createUserSessionSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        password: (0, yup_1.string)()
            .required('Password is required')
            .min(8, 'Password is too short, should be 8 chars minimum')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~^*()_+{}])[A-Za-z\d@$!%*?&~^*()_+{}]{8,}$/, 'password should be minimum 8 chars long, and contain at least one upper-case, one lowercase English letter, one digit, one symbol from the list ( ~!@#$%^&*()_+{}[] )'),
        email: (0, yup_1.string)()
            .email('Must be a valid email')
            .required('Email is required'),
    }),
});
