// fucntion to send mail on successfull registration
function SendMail() {
  var params = {
    from_name: document.getElementById("firstname")?.value,
    email_id: document.getElementById("email")?.value,
  };
  emailjs.send("service_0p65cy8", "template_1g27wlj", params);
}
// listerner on the signup form and submit the form
export const signUpListner = function () {
  let signupData = document.getElementById("userDetails");
  if (signupData) {
    signupData.addEventListener("submit", (e) => onSubmit(e, signupData));
  } else {
    return;
  }
};

function validatepassword(pass) {
  return pass.length >= 6;
}
// function on submit of the signup form
export const onSubmit = async function (e, sign) {
  e.preventDefault();
  const userData = new FormData(sign).entries();
  // TODO: update API with production path operation
  const output = document.getElementById("result");
  const password = document.getElementById("password");

  if (!validatepassword(password?.value)) {
    output.innerHTML = "password must be atleast 6 characters";
  } else {
    const response = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(userData)),
    });
    checkStatus(response);
  }
};

// checks the status of the API call
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
    SendMail();
    setTimeout(() => window.location.reload(), 1200);
  }
};

signUpListner();
