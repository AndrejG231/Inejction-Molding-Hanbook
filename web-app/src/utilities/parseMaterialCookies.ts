export const parseMaterialCookies = () => {
  if (!document.cookie) {
    return [];
  }

  const cookies = document.cookie.split(";");

  const cookieArray = [];

  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = decodeURIComponent(cookies[i]).trim().split("=");
    const [material, info] = value.split("@info@");

    if (name.trim().startsWith("@mat-")) {
      cookieArray.push({
        name: name.slice(5),
        material: material,
        info: info,
      });
    }
  }

  return cookieArray;
};
