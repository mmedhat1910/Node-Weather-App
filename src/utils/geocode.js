const request = require('request');

const getGeocode = (address, callback) => {
	const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoibW1lZGhhdDE5MTAiLCJhIjoiY2trc21iZzEyMHA2MDJ3cGN0emc5emU5ZyJ9.eL73gGu-SyRK4W9a0z2w-A&limit=1`;

	request({ url: mapbox, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};
module.exports = getGeocode;
