const getCookie = (keyName) => {
  const cookies = document.cookie.split("; ");
  for (cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === keyName) {
      return decodeURIComponent(value);
    }

    return null;
  }
};

export { getCookie };
