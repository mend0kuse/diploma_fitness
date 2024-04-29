export const EMAIL_REGEXP = /^\S+@\S+$/;
export const isValidEmail = (email: string) => EMAIL_REGEXP.test(email);

export const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
export const isValidPassword = (password: string) => password.length > 1;
