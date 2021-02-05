const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicPath));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Mohamed Medhat',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Mohamed Medhat',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		name: 'Mohamed Medhat',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.status(404).send({
			error: 'You must provide an Address',
		});
	}
	// res.status(200).send({
	// 	address: req.query.address,
	// });
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.status(404).send({ error });
		}
		forecast(latitude, longitude, (error, forecastData, icon) => {
			if (error) {
				return res.status(400).send({ error });
			}
			res.status(200).send({
				forecast: forecastData,
				location: location,
				address: req.query.address,
				icon: icon,
			});
		});
	});
});

app.get('*', (req, res) => {
	res.status(404).render('404', {});
});

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
