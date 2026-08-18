import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { serve } from '@hono/node-server';

const app = new Hono();

// Enable request logging (output to stdout, captured by Docker logs)
app.use('*', logger());

// Enable CORS using environment variable for allowed origins
app.use('*', cors({
    origin: process.env.CORS_ORIGIN || '*',
}));

// Pretty print JSON responses in development
if (process.env.NODE_ENV != 'production') {
    app.use('*', prettyJSON());
}

// API routes
const api = new Hono();
api.get('/users', (c) => c.json({ users: [] });
api.get('/users/:id', (c) => {
    const id = c.req.param('id');
    return c.json({ user: { id } });
});

// Mount API routes
app.route('/api', api);

// Global error handler
app.onError((err, c) => {
    console.error('Unhandled error:', err);
    return c.json({error: 'Internal Server Error'}, 500);
});

app.get('/', (c) => {
    return c.json({ message: 'Hello from Hono on Bun!' });
})

// Health check endpoint
app.get('/health', (c) => {
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Bun's built-in server
//export default {
//    port: 3000,
//    fetch: app.fetch,
//};

serve({
    fetch: app.fetch,
    port: 3000,
});
