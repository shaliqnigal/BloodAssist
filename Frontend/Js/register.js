export const cookie = document.cookie;
const registerData = document.getElementById("registerDetails");
const registerid = document.getElementById("register");
const cn = document.getElementById("contact_number");

function validatePhoneNumber(inputtxt) {
  var phoneno = /^\d{10}$/;
  return inputtxt.match(phoneno);
}
export const registerListner = function () {
  if (registerData) {
    registerid.addEventListener("click", (e) =>
      onSubmitRegister(e, registerData)
    );
  }
};

export const onSubmitRegister = async function (e, registerData) {
  e.preventDefault();
  const register = new FormData(registerData).entries();
  // TODO: update API with production path operation
  const res = await fetch("http://127.0.0.1:8000/register_donor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookie,
    },
    body: JSON.stringify(Object.fromEntries(register)),
  });
  checkStatus(res);
};

export const checkStatus = async (res) => {
  const out = document.getElementById("registerresult");
  //   const result = await res.json();
  if (!validatePhoneNumber(cn.value)) {
    out.innerHTML = "Enter valid Contact number ";
  } else if (res.status == 422) {
    out.innerHTML = "please enter valid details";
  } else if (res.status == 409) {
    out.innerHTML = "You are already registered";
  } else if (res.status == 403) {
    out.innerHTML = "Use same email you are logged in with";
  } else if (res.status == 400) {
    out.innerHTML = "Enter all details";
  } else {
    out.innerHTML = "Thank you for registering";
  }
};

registerListner();
