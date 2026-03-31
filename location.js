window.onload = () => {
  //getting a reference to longitude and latitude p tags
  const lonTag = document.getElementById("lon_tag");
  const latTag = document.getElementById("lat_tag");

  const displayMap = (pos) => {
    console.log(pos);

    //getting coordinates to 3 decimal places from pos object
    const lon = pos.coords.longitude.toFixed(3);
    const lat = pos.coords.latitude.toFixed(3);

    //adding values to p tags
    lonTag.innerText = `${lon}°`;
    latTag.innerText = `${lat}°`;

    //creating the map
    var map = L.map("map", {
      scrollWheelZoom: false,
    }).setView([lat, lon], 13);

    //creating a tile
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    //creating the popup for the marker

    //creating a marker
    const marker = L.marker([lat, lon])
      .on("mouseover", () => {
        displayPopup();
      })
      .addTo(map);

    const displayPopup = () => {
      marker.bindPopup("You are here!").openPopup();
    };
  };

  const onError = (err) => {
    console.log(err);
  };

  navigator.geolocation.getCurrentPosition(displayMap, onError);
};
