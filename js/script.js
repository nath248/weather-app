window.addEventListener("load", () => {
    let long;
    let lat;
    let tempDescription = document.querySelector(".temp-description");
    let tempDegree = document.querySelector(".temp-degree");
    let tempDegreeMin = document.querySelector(".temp-degree-min");
    let tempDegreeMax = document.querySelector(".temp-degree-max");
    let locationTimezone = document.querySelector(".location-timezone");
    let iconImg = document.querySelector(".img");
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
                    const { description, icon } = data.weather[0];
                    tempDegree.textContent = Math.floor(temp);
                    tempDegreeMin.textContent = Math.floor(temp_min);
                    tempDegreeMax.textContent = Math.floor(temp_max);
                    tempDescription.textContent = description;
                    locationTimezone.textContent = data.name;
                    console.log(icon);
                    iconImg.innerHTML = `<p class=img><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
                    </p>`;
                });

        });

    }
})