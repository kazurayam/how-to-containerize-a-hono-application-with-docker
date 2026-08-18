import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
    return c.json({ message: 'Hello from Hono on Bun!' });
})

// Health check endpoint
app.get('/health', (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Bun's built-in server
export default {
    port: 3000,
    fetch: app.fetch,
};
