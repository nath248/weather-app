window.addEventListener("load", () => {
    let long;
    let lat;
    let tempDescription = document.querySelector(".temp-description");
    let tempDegree = document.querySelector(".temp-degree");
    let tempDegreeMin = document.querySelector(".temp-degree-min");
    let tempDegreeMax = document.querySelector(".temp-degree-max");
    let locationTimezone = document.querySelector(".location-timezone");
    const key = config.OPEN_WEATHER_API_KEY;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temp, temp_max, temp_min } = data.main;
                    const { description } = data.weather[0];
                    tempDegree.textContent = temp;
                    tempDegreeMin.textContent = temp_min;
                    tempDegreeMax.textContent = temp_max;
                    tempDescription.textContent = description;
                    locationTimezone.textContent = data.name;
                });

        });

    } else {
        h1.textContent
    }
})