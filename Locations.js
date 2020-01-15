var Locations = /** @class */ (function () {
    function Locations(location) {
        this.location = location;
        this.api_key = "120eadfa8f706a87027a47798c49294c";
        this.locationData = [];
        this.locations = location;
    }
    Locations.prototype.getLocationInfo = function () {
        var _this = this;
        this.locations.map(function (location) {
            try {
                fetch("http://api.weatherstack.com/current?access_key=" + _this.api_key + "&query=" + location)
                    .then(function (response) {
                    if (response.status !== 200) {
                        console.log("Looks like there was a problem.");
                        return;
                    }
                    response.json().then(function (data) {
                        var _a;
                        if (data.success === false) {
                            console.log("There was a problem. " + data.error.info);
                            return;
                        }
                        var _b = data.current, humidity = _b.humidity, temperature = _b.temperature, wind_speed = _b.wind_speed;
                        var local_time = data.location.localtime.split(" ");
                        var locationData = (_a = {},
                            _a[location] = {
                                current_time: local_time[1],
                                weather: {
                                    humidity: humidity,
                                    temperature: temperature,
                                    wind_speed: wind_speed
                                }
                            },
                            _a);
                        _this.locationData.push(locationData);
                    });
                })["catch"](function (err) {
                    console.log(err);
                });
            }
            catch (err) {
                console.log("Looks like there was a problem. See: " + err);
            }
        });
        return this.locationData;
    };
    return Locations;
}());
//Location of inputs
var locations = new Locations([
    "New York",
    "10005",
    "Tokyo",
    "São Paulo",
    "Pluto",
    "Nigeria",
    "Ghana"
]);
var locationData = locations.getLocationInfo();
console.log(locationData);
