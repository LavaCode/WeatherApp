function kelvinToFahrenheit(kelvin) {
    const celcius = `${Math.round((1.8*(kelvin - 273))+32)}° F`; 
    return celcius;
}

export default kelvinToFahrenheit;