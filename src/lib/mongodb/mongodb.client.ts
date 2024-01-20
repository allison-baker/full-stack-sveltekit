import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
let clientPromise: Promise<MongoClient> | undefined;

// Create a MongoClient with a MongoClientOptions object to set the Stable API Version
try {
	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true
		}
	});
	clientPromise = client.connect().catch((e) => {
		console.error('Failed to connect to MongoDB', e);
		throw e;
	});
} catch (err) {
	console.error(err);
}

// Create a client promise that will resolve to the MongoDB client whenever other parts of our code ask for it
export default clientPromise;
