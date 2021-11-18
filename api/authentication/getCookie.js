function getCookie(cookieName) {
  const cookies = document.cookie.split(";"); //cookies are separated with ; separator
  let value;
  cookies.forEach(function (i) {
    //for each cookie
    if (i.includes(cookieName)) {
      //if it contains the value coming from parameter,
      value = i.split("=")[1]; // save the expression after '=' as value
    }
  });

  if (value != null) {
    return value;
  } else {
    return null;
  }
}
export { getCookie };
