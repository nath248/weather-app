const key = config.OPEN_WEATHER_API_KEY;

window.addEventListener("load", () => {
    let long;
    let lat;
    let tempDescription = document.querySelector(".temp-description");
    let tempDegree = document.querySelector(".temp-degree");
    let tempDegreeMin = document.querySelector(".temp-degree-min");
    let tempDegreeMax = document.querySelector(".temp-degree-max");
    let locationTimezone = document.querySelector(".location-timezone");
    let iconImg = document.querySelector(".img");


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
                    iconImg.innerHTML = `<p class=img><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
                    </p>`;
                });

        });

    }
})

const input = document.getElementById("input").value;


const apiByCity = async function() {
    const res = await fetch(`api.openweathermap.org/data/2.5/weather?q=${input}&appid=${key}`);
    const data = await res.json();
    console.log(data);
};
apiByCity();

input.addEventListener("input", apiByCity);