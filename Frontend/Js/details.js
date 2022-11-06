const pagelimit = 6;
let currentpage = 1;
let detailsData = [];
let details = [];

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
  cards(detailsData);
};

renderCard();
