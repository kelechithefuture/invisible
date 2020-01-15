class Locations {

  private locations: string[]
  private api_key: string  = "120eadfa8f706a87027a47798c49294c"
  private locationData: any = []

  constructor(public location: Array<string>) {
      this.locations = location
  }
    
  public getLocationInfo() {
    this.locations.map((location) => {
      try {
        fetch(`http://api.weatherstack.com/current?access_key=${this.api_key}&query=${location}`)
          .then((response) => {
            if (response.status !== 200) {
              console.log(`Looks like there was a problem.`)
              return
            }

            response.json().then((data) => {

              if(data.success === false) {
                console.log(`There was a problem. ${data.error.info}`)
                return             
              }

              let {humidity, temperature, wind_speed} = data.current
              const local_time = data.location.localtime.split(" ")
              
              let locationData = {
                [location]: {
                  current_time: local_time[1],
                  weather: {
                    humidity: humidity,
                    temperature: temperature,
                    wind_speed: wind_speed,
                  }
                }
              }

              this.locationData.push(locationData)

            })
          })
          .catch(function(err) {
            console.log(err)
          })
      } catch(err) {
        console.log(`Looks like there was a problem. See: ${err}`)
      }
    })

    return this.locationData
    
  }

}

//Location of inputs
const locations = new Locations([
  "New York",
  "10005",
  "Tokyo",
  "São Paulo",
  "Pluto",
  "Nigeria",
  "Ghana"
])

const locationData = locations.getLocationInfo()

console.log(locationData)
