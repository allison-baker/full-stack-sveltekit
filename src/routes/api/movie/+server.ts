//import { MongoClient, ObjectId } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

//const uri = process.env.MONGODB_URI;
//const client = new MongoClient(uri);

export async function GET(request: Request) {
    // const body = await request.json()
    // console.log(body)
    return new Response('Hello world')
}
