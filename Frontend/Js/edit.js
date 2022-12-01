export const cookie = document.cookie;
const editData = document.getElementById("editform");
const editid = document.getElementById("edit");
const editButton = document.getElementById("ebtn");
const formElements = Array.from(editData.elements);

const contactNumber = document.getElementById("contactnumber");

// Function to decode the HTTP Cookie which is parsed in the JWT Token
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

// Function created to validate the Phone Number
function validatePhoneNumber(inputtxt) {
  var phoneno = /^\d{10}$/;
  return inputtxt.match(phoneno);
}
var decode = parseJwt(cookie);
const owner_id = decode.user_id;

// URL to route and edit the details of the individual owner with respect to the owner ID
const url = `http://127.0.0.1:8000/editdonor/${owner_id}`;

//URL to fetch the details of the donor with the respective ownder ID
const eachdonorurl = `http://127.0.0.1:8000/donor/${owner_id}`;

editButton.addEventListener("click", (e) => fetchUserDetails(e));

// Function which is used to fetch the details of the user in the respective donor URL.
const fetchUserDetails = async function (e) {
  let userDetails = await fetch(eachdonorurl);
  userDetails = await userDetails.json();
  formElements.forEach((element) => {
    element.value = userDetails[element.name];
  });
};

// Function used to register the details of the donor once updated.
export const editListner = function () {
  if (editData) {
    editid.addEventListener("click", (e) => onSubmitRegister(e, editData));
  }
};

// Function to perform PUT operation on the user's details so that the details are updated in the database
export const onSubmitRegister = async function (e, editData) {
  e.preventDefault();
  const edit = new FormData(editData).entries();
  // TODO: update API with production path operation
  const out = document.getElementById("editresult");
  if (!validatePhoneNumber(contactNumber.value)) {
    out.innerHTML = "Enter valid conatct number";
  } else {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie,
      },
      body: JSON.stringify(Object.fromEntries(edit)),
    });
    checkStatus(res);
  }
};

// Function to validate the status of the page and return the respective status code.
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
  } else if (res.status == 500) {
    out.innerHTML = "Session Expired";
    window.location.replace("/Frontend/index.html");
  } else {
    out.innerHTML = "Changes are saved";
    setTimeout(() => window.location.reload(), 1200);
  }
};

editListner();
