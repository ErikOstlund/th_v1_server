import { ObjectId } from 'mongodb';
import { IResolvers } from 'apollo-server-express';
import { Listing, Database } from '../lib/types';

export const resolvers: IResolvers = {
	Query: {
		listings: async (
			_root: undefined,
			_args: unknown, // using 'unknown' instead of {} cause of eslint
			{ db }: { db: Database }
		): Promise<Listing[]> => {
			return await db.listings.find({}).toArray();
		}
	},
	Mutation: {
		deleteListing: async (
			_root: undefined,
			{ id }: { id: string },
			{ db }: { db: Database }
		): Promise<Listing> => {
			const deleteItem = await db.listings.findOneAndDelete({
				_id: new ObjectId(id)
			});

			if (!deleteItem.value) {
				throw new Error('Listing not found. Nothing deleted.');
			}

			return deleteItem.value;
		}
	},
	Listing: {
		id: (listing: Listing): string => listing._id.toString()
	}
};
