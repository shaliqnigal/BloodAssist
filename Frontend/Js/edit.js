export const cookie = document.cookie;
const editData = document.getElementById("editform");
const editid = document.getElementById("edit");
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
console.log(decode);
const owner_id = decode.user_id;

const url = `http://127.0.0.1:8000/editdonor/${owner_id}`;
export const editListner = function () {
  if (editData) {
    editid.addEventListener("click", (e) => onSubmitRegister(e, editData));
  }
};

export const onSubmitRegister = async function (e, editData) {
  e.preventDefault();
  const edit = new FormData(editData).entries();
  // TODO: update API with production path operation
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookie,
    },
    body: JSON.stringify(Object.fromEntries(edit)),
  });
  checkStatus(res);
};

export const checkStatus = async (res) => {
  const out = document.getElementById("editresult");
  //   const result = await res.json();
  if (res.status == 422) {
    out.innerHTML = "please enter valid details";
  } else if (res.status == 404) {
    out.innerHTML = "You are not yet registered";
  } else if (res.status == 400) {
    out.innerHTML = "Use same email you are logged in with";
  } else if (res.status == 403) {
    out.innerHTML = "You are not authorized";
  } else {
    out.innerHTML = "Changes are saved";
    window.location.reload();
  }
};

editListner();