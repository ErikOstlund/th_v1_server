import express from 'express';
import bodyParser from 'body-parser';
import { listings } from './listings';

const app = express();
const port = 9000;

// apply middleware to parse incoming requests as JSON
app.use(bodyParser.json());

// GET all listings
app.get('/listings', (_req, res) => {
	return res.send(listings);
});

// POST route to delete a listing
app.post('/delete-listing', (req, res) => {
	const id: string = req.body.id;

	for (let i = 0; i < listings.length; i++) {
		if (listings[i].id === id) {
			return res.send(listings.splice(i, 1)[0]);
		}
	}
	// if id can't be found
	return res.send('ERROR: That listing does not exist. Nothing deleted.');
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
