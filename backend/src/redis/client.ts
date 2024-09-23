import {createClient} from "redis";
const client = createClient({
    url: 'redis://redis:6379',
});

// Connect to Redis
client.connect();
client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

export default client;