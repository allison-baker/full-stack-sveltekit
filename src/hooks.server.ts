import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '$lib/mongodb/mongodb.client';

if (!clientPromise) {
	throw new Error('Client promise is undefined');
}

const githubConfig = {
	clientID: process.env.GITHUB_ID,
	clientSecret: process.env.GITHUB_SECRET
};

export const handle = SvelteKitAuth({
	providers: [GitHub(githubConfig)],
	adapter: MongoDBAdapter(clientPromise, {
		databaseName: 'dwdd-3780-database'
	})
});
