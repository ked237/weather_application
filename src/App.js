import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

//useeffect tells our component appto do somethimg after rendering
function App() {
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState({
    city:'',
    country:'',
    temperature:'',
    minTemperature:'',
    humidity:'',
    weatherIcons:''
  })

  useEffect(()=> {
    //we add what we want to happen after rendering
    //fetch the database information the API call of the weather
    fetchData()
  },[])

  const fetchData = async (city) => {
    //try and catch error handling
    try{
    //You will to create your own key and paste it for the app to work
    const APIKEY = 'create your personnal key'
    //axios is a library which allow us to make requests to the
    //backend promises
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`)
    setAllData({
      city: result.data.name,
      country: result.data.sys.country,
      temperature: result.data.main.temp,
      minTemperature: result.data.main.temp_min,
      humidity: result.data.main.humidity,
      weatherIcons: result.data.weather[0].icon
    })
  } catch (e) {
    console.log('API did not load properly or loaded for the first time')
  }
  }
  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault()
    fetchData(search)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }


  return (
    //Div is for component container, the section tag in react is for sections and the 
    //main tag is for main container
    //Under main we will have section for the form and for the displaying result
    <main>
    <div className="form">

      <form onSubmit = {handleSubmit}>
        <input
        //since search is dynamic, we put in {} to signify JS
        value = {search}
        type = 'text'
        name = 'city'
        placeholder = 'Location'
        onChange = {handleChange}
        />
        <button for='city'>Search</button>
      </form>
      <section>
        <div className='header-div'>
          <div>
            <div className='data'>
          <img src={'http://openweathermap.org/img/wn/'
          +allData.weatherIcons+'@2x.png'}/>

        <h1 className='title'>{allData.city}</h1>
        <h2 className='location'>{allData.country}</h2>
          <div className='weather-description'>
            <div>
        <h3>HUMIDITY</h3>
          <p>{allData.humidity}%</p>
            </div>
            <div>
        <h3>TEMPERATURE</h3>
          <p>{allData.temperature}°F</p>
            </div>
            <div>
        <h3>MIN TEMPERATURE</h3>
          <p>{allData.minTemperature}°F</p>
            </div> 
            </div>
            </div> 
          </div>
        </div>
      </section>

    </div>
    </main>
  );
}

export default App;
