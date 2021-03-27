export const getPlanFromCookie = () => {
  if (!document.cookie) {
    return [];
  }

  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = decodeURIComponent(cookies[i]).trim().split("=");

    if (name === "@plan") {
      return JSON.parse(value);
    }
  }

  return [];
};
