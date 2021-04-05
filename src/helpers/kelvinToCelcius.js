function kelvinToCelcius(kelvin) {
    const celcius = `${Math.round(kelvin - 273.15)}° C`; 
    return celcius;
}

export default kelvinToCelcius;