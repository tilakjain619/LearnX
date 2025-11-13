import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const uri = process.env.MONGODB_URI || '';
const dbName = 'learnx';

export async function connectToDatabase() {
    if (!uri) {
        throw new Error('Please add your MONGODB_URI to .env.local');
    }

    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);

        cachedClient = client;
        cachedDb = db;

        console.log('Connected to MongoDB');
        return { client, db };
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

export async function getLearningPathsCollection() {
    const { db } = await connectToDatabase();
    return db.collection('learning_paths');
}