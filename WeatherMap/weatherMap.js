import { MAP_BOX_KEY, OPEN_WEATHER_APPID } from "./key.js";

(function () {
  "use strict";

  $("#inputSubmit").on("click", () => {
    console.log("click");
    console.log($("#cityInput").val());
    const input = $("#cityInput").val();
    geocode(input, MAP_BOX_KEY); // Using the MAP_BOX_KEY from keys.js
  });

  //   const getWeatherData = (lon, lat, key) => {
  //     $.get(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_APPID}`,
  //       {
  //         APPID: key, // Using the key parameter passed to the function
  //         lat: lat,
  //         lon: lon,
  //         units: "imperial",
  //       }
  //     ).done(function (data) {
  //       console.log(data);
  //       let markUp = "";
  //       data = JSON.parse(data);
  //       data.forEach((day, i) => {
  //         if (i < 5) {
  //           const dayTemp = day.temp.day;
  //           const dayMin = day.temp.min;
  //           const dayMax = day.temp.max;
  //           const dayHumidity = day.humidity;
  //           const dayIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
  //           const dayMain = day.weather[0].main;
  //           const dayDate = day.dt;

  //           const date = new Date(dayDate * 1000);

  //           markUp += `
  //               <div class="card text-center">
  //                 <div class="card-header">
  //                   ${date}
  //                 </div>
  //                 <div class="card-body">
  //                   <img src="${dayIcon}">
  //                   <h1>${dayTemp}&#8457;</h1>
  //                   <p>Minimum: ${dayMin}&#8457; </p>
  //                   <p>Maximum: ${dayMax}&#8457; </p>
  //                   <p>Humidity: ${dayHumidity}%;</p>
  //                 </div>
  //               </div>
  //             `;
  //         }
  //       });
  //       $(".weatherCards").html(markUp);
  //     });
  //   };

  const getWeatherData = (lon, lat, key) => {
    $.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
    )
      .done(function (data) {
        console.log(data);
        let markUp = "";

        data.list.forEach((day, i) => {
          if (i % 8 === 0 && i < 40) {
            // Adjust to get one forecast per day
            const dayTemp = day.main.temp;
            const dayMin = day.main.temp_min;
            const dayMax = day.main.temp_max;
            const dayHumidity = day.main.humidity;
            const dayIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
            const dayMain = day.weather[0].main;
            const dayDate = day.dt;

            const date = new Date(dayDate * 1000);

            markUp += `
            <div class="card text-center">
              <div class="card-header">
                ${date.toLocaleDateString()} ${date.toLocaleTimeString()}
              </div>
              <div class="card-body">
                <img src="${dayIcon}">
                <h1>${dayTemp}&#8457;</h1>
                <p>Minimum: ${dayMin}&#8457; </p>
                <p>Maximum: ${dayMax}&#8457; </p>
                <p>Humidity: ${dayHumidity}%;</p>
              </div>
            </div>
          `;
          }
        });
        $(".weatherCards").html(markUp);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Error fetching weather data:", textStatus, errorThrown);
      });
  };

  mapboxgl.accessToken = MAP_BOX_KEY; // Using the MAP_BOX_KEY from keys.js
  var map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    zoom: 16, // starting zoom
    center: [-73.93315, 40.85044], // [lng, lat]
  });
  let marker;
  marker = new mapboxgl.Marker().setLngLat([-73.93315, 40.85044]).addTo(map);

  map.on("click", (e) => {
    console.log(e);
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;

    let coordinate = [lng, lat];

    if (marker) {
      marker.remove();
    }

    marker = new mapboxgl.Marker().setLngLat(coordinate).addTo(map);
    getWeatherData(lng, lat, OPEN_WEATHER_APPID); // Using the OPEN_WEATHER_APPID from keys.js
  });

  const btnInput = $("#buttonAddress");
  btnInput.on("click", function (e) {
    e.preventDefault();

    const addressInput = $("#inputAddress").val();
    console.log($("#inputAddress"));
    console.log("click");
    console.log(addressInput);
    geocodeAddressMarker(addressInput, MAP_BOX_KEY); // Using the MAP_BOX_KEY from keys.js
  });

  function geocodeAddressMarker(address, token) {
    geocode(address, token).then((res) => {
      if (marker) {
        marker.remove();
      }
      marker = new mapboxgl.Marker().setLngLat(res).addTo(map);
      map.setCenter(res);
      map.setZoom(16);
      console.log(res);

      const lon = res[0];
      const lat = res[1];

      getWeatherData(lon, lat, OPEN_WEATHER_APPID); // Using the OPEN_WEATHER_APPID from keys.js
    });
  }

  map.addControl(new mapboxgl.NavigationControl());
  getWeatherData(-73.93315, 40.85044, OPEN_WEATHER_APPID); // Using the OPEN_WEATHER_APPID from keys.js
})();
