const request = require('request');

const getWeather = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=6326792a57783c29f6c4feb9350f969c&query=${lat},${long}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			callback(
				undefined,
				`It is currently ${body.current.temperature} degress out. There is a ${body.current.precip}% chance of rain.`,
				body.current.weather_icons[0]
			);
		}
	});
};

module.exports = getWeather;
