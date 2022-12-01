const pagelimit = 6;
let currentpage = 1;
let detailsData = [];
let details = [];
const applyId = document.getElementById("applyId");
const filterblood = document.getElementById("filterValue");
const filterstate = document.getElementById("filterstate");
const filtercity = document.getElementById("cityfilter");
export async function getData() {
  try {
    const response = await fetch("http://127.0.0.1:8000/alldonors"); // fetching list of donors
    details = await response.json();
    detailsData = details;
    detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at)); // sorting the lsit of details based on timestamp user is registered
  } catch (err) {}
}

//Function to render each card and pass it to HTML
export function cards() {
  var carddetail = "";
  detailsData
    .filter((row, index) => {
      // logic that sets the limit of 6 cards to be present in the page
      let start = (currentpage - 1) * pagelimit;
      let end = currentpage * pagelimit;
      if (index >= start && index < end) return true;
    })
    .forEach((detail) => {
      carddetail += `<div class ="col-4">`;
      carddetail += `<div class="card">`;
      carddetail += `<div class="card-body">`;
      carddetail += `<h4 class="card-title">${detail.firstname} ${detail.lastname}</h4>`;
      carddetail += `<p class="card-text">Email:${detail.email}</p>`;
      carddetail += `<p class="card-text">Blood Group:${detail.bloodgroup}</p>`;
      carddetail += `<p class="card-text">State:${detail.state}</p>`;
      carddetail += `<p class="card-text">City:${detail.city}</p>`;
      carddetail += `<p class="card-text">Contact Number:${detail.contact_number}</p>`;
      carddetail += `</div>`;
      carddetail += `<div class = "card-footer" >`;
      carddetail += `<small class="text-muted">Last updated ${toDate(
        detail.created_at
      )}</small>`;
      carddetail += `</div>`;
      carddetail += `</div>`;
      carddetail += `</div>`;
    });
  document.getElementById("data").innerHTML = carddetail;
}

// changing the timestamp to readable
export const toDate = function (timestamp) {
  let date = new Date(timestamp);
  let formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  return formattedDate;
};

//rendering all the cards data
export const renderCard = async function (page = 1) {
  await getData();
  if (page == 1) {
    previous.style.visibility = "hidden"; // on page 1 hide previous btn
  } else {
    previous.style.visibility = "visible";
  }

  if (page == numPages()) {
    nextb.style.visibility = "hidden"; // on last page hide next btn
  } else {
    nextb.style.visibility = "visible";
  }

  cards();
};

//function to go to previous page
export function previousPage() {
  if (currentpage > 1) {
    currentpage--;
    renderCard(currentpage);
  }
}

// function to go to next page
export function nextPage() {
  if (currentpage * pagelimit < detailsData.length) {
    currentpage++;
    renderCard(currentpage);
  }
}

export function numPages() {
  return Math.ceil(detailsData.length / pagelimit);
}

const nextb = document.querySelector("#nextb");

nextb?.addEventListener("click", nextPage, false);

const previous = document.querySelector("#previous");

previous?.addEventListener("click", previousPage, false);

renderCard();

// function to filter based on bloodgroup
function filterbloodgroup(grp) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter((det) => det.bloodgroup == grp);
  detailsData = filterdata;
  cards();
}

// function to filter based on city
function filterByCity(city) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter((det) => det.city == city);
  detailsData = filterdata;
  cards();
}

// fucntion to filter based on state
function filterstatefn(st) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter((det) => det.state == st);
  detailsData = filterdata;
  cards();
}

//function to filter based on state and bloodgroup
function filterstateandgrp(st, grp) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter(
    (det) => det.state == st && det.bloodgroup == grp
  );
  detailsData = filterdata;
  cards();
}

//fucntion to filter based on bloodgroup and city
function filterBldgrpAndCity(city, grp) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter(
    (det) => det.city == city && det.bloodgroup == grp
  );
  detailsData = filterdata;
  cards();
}

// function to filter based on state and city
function filterStateAndCity(city, state) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter(
    (det) => det.city == city && det.state == state
  );
  detailsData = filterdata;
  cards();
}
// filter based on all details
function filterall(grp, city, state) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter(
    (det) => det.city == city && det.state == state && det.bloodgroup == grp
  );
  detailsData = filterdata;
  cards();
}
applyId?.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    filterblood.value &&
    filtercity.value &&
    filterblood.valuee &&
    filterblood.value
  ) {
    filterstateandgrp(filterstate.value, filterblood.value);
  } else if (filterstate.value && filtercity.value) {
    filterStateAndCity(filtercity.value, filterstate.value);
  } else if (filterblood.value && filtercity.value) {
    filterBldgrpAndCity(filtercity.value, filterblood.value);
  } else if (filterblood.value && filtercity.value && filterstate.value) {
    filterall(filterblood.value, filtercity.value, filterstate.value);
  } else if (filterblood.value) {
    filterbloodgroup(filterblood.value);
  } else if (filtercity.value) {
    filterByCity(filtercity.value);
  } else {
    filterstatefn(filterstate.value);
  }
});
