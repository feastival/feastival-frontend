import { getCookie } from './cookies';

const checkLogin = (): boolean => {
  const token = getCookie('token');
  if (token?.length) return true;
  return false;
};

export { checkLogin };
