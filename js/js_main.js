var allData = [];
var allLinks = document.getElementsByClassName("nav-link");
var category = "general";
getData(category);
for (var i = 0; i < allLinks.length; i++) {
  allLinks[i].addEventListener("click", function (e) {
    category = e.target.text;
    // console.log(e.target.text);
    getData(category);
  });
}

function getData(selectedCategory) {
  var httpReq = new XMLHttpRequest();
  httpReq.open(
    "GET",
    "http://newsapi.org/v2/top-headlines?country=eg&category=" +
      selectedCategory +
      "&apiKey=debf8de896e0414691b6751fcc3978b8"
  );
  httpReq.send();
  httpReq.onreadystatechange = function () {
    if (httpReq.readyState == 4 && httpReq.status == 200) {
      allData = JSON.parse(httpReq.response);
      allData = allData.articles;
      display();
    }
  };
}

function display() {
  var temp = "";
  for (var i = 0; i < allData.length; i++) {
    temp +=
      `<div class="col-md-4 mb-5"><div class="card" style="width: 18rem;">
  <img src="` +
      allData[i].urlToImage +
      `"class="card-img-top" >
  <div class="card-body">
    <h5 class="card-title">` +
      allData[i].title +
      `</h5>
    <p class="card-text">` +
      allData[i].description +
      `</p>
    <a href="` +
      allData[i].url +
      `" class="btn btn-info">READ MORE</a>
  </div>
  </div>
</div>`;
  }
  document.getElementById("displaydata").innerHTML = temp;
}
