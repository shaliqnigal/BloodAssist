const cookie = document.cookie;
const unregisterBtn = document.getElementById("unregisteryes");
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
var decode = parseJwt(cookie);
const owner_id = decode.user_id;

const url = `http://127.0.0.1:8000/deletedonor/${owner_id}`;

const onYes = async function (e) {
  e.preventDefault();
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookie,
    },
  });
  checkUnregister(response);
};

unregisterBtn.addEventListener("click", (e) => onYes(e));

const checkUnregister = async function (response) {
  const output = document.getElementById("unregisterstatus");
  if (response.status == 200) {
    output.innerHTML = "Unregistered Successfully!";
  } else if (response.status == 404) {
    output.innerHTML = "Not yet registered";
  }
};
