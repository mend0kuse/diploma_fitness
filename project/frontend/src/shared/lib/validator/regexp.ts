export const EMAIL_REGEXP = /^\S+@\S+$/;
export const isValidEmail = (email: string) => EMAIL_REGEXP.test(email);

export const isValidPassword = (password: string) => password.length >= 7;
