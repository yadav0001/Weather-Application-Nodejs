const info = document.querySelector('.lower')
const details = document.querySelector('.details')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const city = document.querySelectorAll('.city');

const forecast = (loc)=>{
    details.textContent = 'Loading...'
    fetch('/weather?address=' + loc).then((response) =>{
    response.json().then((data)=>{
        if(data.error){
            details.textContent = data.error;
            info.textContent = data.error;
        }
        else{
            info.innerHTML=`
            <p class="temp">${data.temperature}<sup>o</sup>C</p>
            <p class="loc">${data.city}<span class="country">${data.country}</span> </p>
            <p class="mood">${data.description}</p>` ;

            details.innerHTML =`<div class="detail"><p>Apparent Temperature</p><p class="value">${data.feelslike}<sup>o</sup>C</p></div>
            <div class="detail"><p>Humidity</p><p class="value">${data.humidity}%</p></div>
            <div class="detail"><p>Wind</p><p class="value">${data.wind}km/h</p></div>
            <div class="detail"><p>UV Index</p><p class="value">${data.uv}</p></div>
            <div class="detail"><p>Visibility</p><p class="value">${data.visibility}km</p></div>
            <div class="detail"><p>Cloudy</p><p class="value">${data.cloud}%</p></div>`

        }
    })
    })
}

weatherForm.addEventListener('submit', (e) => {
                                            e.preventDefault();
                                            forecast(search.value)
                                        });

city.forEach(city => city.addEventListener('click',()=>{forecast(city.innerText)}));
forecast("London");