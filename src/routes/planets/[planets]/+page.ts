export async function load({ params, fetch }) {
	const planetName = params.planets;
	const api_key = '1JMQnEy0RPLJV4tBNDZCow==0istE6CwLcnJjg1s';
	// const nasa_key = 'km8FS5jn2LDHOLlTXBfJR9HcXJwN8ww3zATqnwRi';

	const res = await fetch(`https://api.api-ninjas.com/v1/planets?name=${planetName}`, {
		method: "GET",
		headers: {
			"X-API-Key": api_key,
			"Content-Type": "application/json;charset=utf-8",
		},
	});
	const planet = await res.json();

	const imageRes = await fetch(`https://images-api.nasa.gov/search?q=${planetName}`, {
		method: "GET",
		headers: {
			"Content-Type": "appliation/json;charset=utf-8",
		},
	});
	const image = await imageRes.json();
	let imageLink: string;
	if (image.collection.items.length === 0) {
		imageLink = '/no_results.webp';
	} else {
		const index = Math.floor(Math.random() * image.collection.items.length);
		imageLink = image.collection.items[index].links[0].href;
	}
	console.log(image);

	return {
		planet: {
			name: planet[0].name,
			mass: planet[0].mass,
			radius: planet[0].radius,
			temperature: planet[0].temperature,
			distance: planet[0].distance_light_year,
			period: planet[0].period,
			image: imageLink,
		},
	};
}