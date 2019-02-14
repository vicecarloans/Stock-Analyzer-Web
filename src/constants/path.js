export const ANONYMOUS_ROUTES = /\/*\blogin|\/*\bregister|\/*\bforgotPassword\/\w*/g;

export const AUTHORIZED_ROUTES = /(\/dashboard|stock|news|profile|portfolio)*\/\w+/g;
