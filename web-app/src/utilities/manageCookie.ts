export const createCookie = (
  name: string,
  value: string,
  path: string = "/",
  expires: string = "Thu, 01 Jan 2970 00:00:00 UTC"
) => {
  document.cookie = `${name}=${value};expires=${expires};path=${path}`;
};

export const clearCookie = (name: string, path: string = "/") => {
  document.cookie = `${name}=none;expires=Thu, 01 Jan 1980 00:00:00 UTC;path=${path}`;
};
