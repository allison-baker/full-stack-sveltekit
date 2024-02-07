import { MongoClient, ObjectId } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function load() {
    let movies
	try {
		const database = client.db('sample_mflix')
        const collection = database.collection('movies')

        const moviesArr = await collection.find({
			$and: [
				{ year: 1985 },
				{$or: [
					{ rated: "PG" },
					{ rated: "PG-13" },
					{ rated: "R" }
				]}
			]
		}).toArray()
        movies = moviesArr.map(movie => {
            return { ...movie, _id: (movie._id as ObjectId).toString() }
        })

        console.log(`Found ${moviesArr.length} movies.`)
	} finally {
		await client.close()
	}
	return {
		status: 200,
		body: movies
	}
}
