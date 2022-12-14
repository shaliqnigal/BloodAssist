// fucntion which has listener on feedback form submission
export const feedbackListner = function () {
  let feedbackdata = document.getElementById("feedback_form");
  const fid = document.getElementById("fb");
  if (feedbackdata) {
    fb.addEventListener("click", (e) => {
      onSubmit(e, feedbackdata);
    });
  } else {
    return;
  }
};

// function the run on submit of feedback form
export const onSubmit = async function (e, sign) {
  e.preventDefault();
  const data = new FormData(sign).entries();
  // TODO: update API with production path
  // API where the feedback data is saved
  const response = await fetch("http://127.0.0.1:8000/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(data)),
  });
  checkStatus(response);
};

// checks the response of API call and gives the status to user
export const checkStatus = async (response) => {
  const output = document.getElementById("feedbackresult");
  const result = await response.json();
  if (response.status == 422) {
    output.innerHTML = "Please enter valid email address";
  } else if (response.status == 400) {
    output.innerHTML = "Enter all details";
  } else {
    output.innerHTML = "Thank you for your valuable feedback";
  }
};

feedbackListner();
