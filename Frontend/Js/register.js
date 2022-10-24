export const cookie = document.cookie;
const registerData = document.getElementById("registerDetails");
export const registerListner = function () {
  if (registerData) {
    registerData.addEventListener("click", (e) =>
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
  if (res.status == 200) {
    out.innerHTML = "Thank you for registering";
  } else {
    out.innerHTML = "please enter valid details";
  }
};

registerListner();