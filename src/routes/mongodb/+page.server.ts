import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});

export async function load() {
	try {
		// Connect the client to the server
		await client.db('dwdd-3780-database').command({ ping: 1 });
		console.log('Pinged your deployment. You successfully connected to MongoDB!');
	} finally {
		await client.close();
	}
	return {
		status: 200,
		body: {
			message: 'MongoDB connection successful'
		}
	};
}

// async function run() {
// 	try {
// 		// Connect the client to the server	(optional starting in v4.7)
// 		await client.connect();
// 		// Send a ping to confirm a successful connection
// 		await client.db('dwdd-3780-database').command({ ping: 1 });
// 		console.log('Pinged your deployment. You successfully connected to MongoDB!');
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await client.close();
// 	}
// }
// run().catch(console.dir);
