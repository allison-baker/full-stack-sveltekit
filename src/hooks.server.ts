import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '$lib/mongodb/mongodb.client';

if (!clientPromise) {
	throw new Error('Client promise is undefined');
}

let githubConfig = {
	clientId: process.env.GITHUB_PROD_ID,
	clientSecret: process.env.GITHUB_PROD_SECRET,
	allowDangerousEmailAccountLinking: true
};

if (process.env.NODE_ENV === 'development') {
	githubConfig = {
		clientId: process.env.GITHUB_DEV_ID,
		clientSecret: process.env.GITHUB_DEV_SECRET,
		allowDangerousEmailAccountLinking: true
	};
}

export const { handle } = SvelteKitAuth({
	providers: [GitHub(githubConfig)],
	adapter: MongoDBAdapter(clientPromise, {
		databaseName: 'dwdd-3780-database'
	})
});
