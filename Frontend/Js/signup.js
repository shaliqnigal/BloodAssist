function SendMail() {
  var params = {
    from_name: document.getElementById("firstname")?.value,
    email_id: document.getElementById("email")?.value,
  };
  emailjs.send("service_0p65cy8", "template_1g27wlj", params);
}
export const signUpListner = function () {
  let signupData = document.getElementById("userDetails");
  if (signupData) {
    signupData.addEventListener("submit", (e) => onSubmit(e, signupData));
  } else {
    return;
  }
};
export const onSubmit = async function (e, sign) {
  e.preventDefault();
  const userData = new FormData(sign).entries();
  // TODO: update API with production path operation
  const response = await fetch("http://127.0.0.1:8000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(userData)),
  });
  checkStatus(response);
};

export const checkStatus = async (response) => {
  const output = document.getElementById("result");
  const result = await response.json();
  if (response.status == 409) {
    output.innerHTML = result.detail;
  } else if (response.status == 422) {
    output.innerHTML = "Please enter valid email address";
  } else if (response.status == 400) {
    output.innerHTML = "Enter all details";
  } else {
    output.innerHTML = result;
    setTimeout(() => window.location.reload(), 1200);
    SendMail();
  }
};

signUpListner();
