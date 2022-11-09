const pagelimit = 6;
let currentpage = 1;
let detailsData = [];
let details = [];
const applyId = document.getElementById("applyId");
const filterblood = document.getElementById("filterValue");
const filterstate = document.getElementById("filterstate");

export async function getData() {
  try {
    const response = await fetch("http://127.0.0.1:8000/alldonors");
    details = await response.json();
    detailsData = details;
    detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  } catch (err) {}
}

export function cards(detailsData) {
  var carddetail = "";
  detailsData
    .filter((row, index) => {
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

export const toDate = function (timestamp) {
  let date = new Date(timestamp);
  let formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  return formattedDate;
};

export const renderCard = async function (page = 1) {
  await getData();
  if (page == 1) {
    previous.style.visibility = "hidden";
  } else {
    previous.style.visibility = "visible";
  }

  if (page == numPages()) {
    nextb.style.visibility = "hidden";
  } else {
    nextb.style.visibility = "visible";
  }

  cards(detailsData);
};

export function previousPage() {
  if (currentpage > 1) {
    currentpage--;
    renderCard(currentpage);
  }
}

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

function filterbloodgroup(grp) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter((det) => det.bloodgroup == grp);
  detailsData = filterdata;
  cards();
}

function filterstatefn(st) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter((det) => det.state ==st );
  detailsData = filterdata;
  cards();
}

function filterstateandgrp(st, grp) {
  detailsData = details;
  detailsData?.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const filterdata = detailsData.filter(
    (det) => det.state == st && det.bloodgroup == grp
  );
  detailsData = filterdata;
  console.log(detailsData);
  cards();
}

applyId?.addEventListener("click", (e) => {
  e.preventDefault();
  if (filterstate.value && filterblood.value) {
    filterstateandgrp(filterstate.value, filterblood.value);
  } else if (filterblood.value) {
    filterbloodgroup(filterblood.value);
  } else {
    filterstate(filterstate.value);
  }
});