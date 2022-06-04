import { useEffect, useState } from "react";

export default function CurrentDay() {

    const currentDate = new Date();

    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    const date = currentDate.toLocaleDateString('en-us', options);

    let currentDateElements = date.split(',');

    let API_KEY = "a015ab34c13dab2b0522affa8d4ab3ce";

    const [weatherState, setWeatherState] = useState(null);




    async function getWeatherData(lat, long) {
        // let lat = lat;
        // let long = long;
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${API_KEY}`;

        const weatherData = await fetch((weatherURL)).then(
            res => res.json()
        );
        console.log(weatherData)
        setWeatherState(weatherData)
    }


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const p = position.coords;
            console.log(p.latitude, p.longitude);
            let lat = p.latitude;
            let long = p.longitude;
            getWeatherData(lat, long)
        })
    }, [])



    return (
        <div className="weather-day-details">

            <div id="current-day">
                <h2 className="day">It's {`${currentDateElements[0]}`}</h2>
                <h3 className="day">{`${new Date().toLocaleDateString('en-US')}`}</h3>
            </div>
            {weatherState && <div>
                <h3 className="day">{weatherState.name}</h3>
            </div>}
            {weatherState && <div>
                <h3 className="day">{weatherState.main.temp}&deg;F</h3>
                <h3 className="day">{weatherState.weather[0].main}</h3>
            </div>}

        </div>


    );
}