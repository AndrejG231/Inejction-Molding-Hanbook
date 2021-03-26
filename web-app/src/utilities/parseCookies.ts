export const parseMaterialCookies = () => {
  console.log(document.cookie);
  if (!document.cookie) {
    return [];
  }

  const cookies = document.cookie.split(";");

  const cookieArray = [];

  for (let i = 0; i < cookies.length; i++) {
    console.log(cookies[i]);
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

  console.log(cookieArray);
  return cookieArray;
};
