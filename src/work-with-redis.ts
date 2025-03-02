// Write a script that:
// 1. Connects to Redis.
// 2. Saves the keys with their values.
// 3. Reads and outputs values for a given key.

// Use redis library

const redis = require('redis');

type RedisClient = {
    set: (key: string, value: string, callback: (err: Error | null, reply?: string) => void) => void;
    get: (key: string, callback: (err: Error | null, reply?: string) => void) => void;
    quit: () => void;
};

async function manageRedis(testClient: RedisClient | null = null) {
    const client = testClient || redis.createClient();

    try {
        await new Promise<void>((resolve, reject) => {
            client.set('key', 'value', (err: Error | null, reply?: string) => {
                if (err) reject(err);
                resolve();
            });
        });

        const value = await new Promise<string>((resolve, reject) => {
            client.get('key', (err: Error | null, reply?: string) => {
                if (err) reject(err);
                if (reply) resolve(reply);
                else reject(new Error('No value found'));
            });
        });

        return value;
    } finally {
        if (!testClient) {
            client.quit();
        }
    }
}

export { manageRedis };