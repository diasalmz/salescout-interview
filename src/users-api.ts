// Create an API using Node.js and Express:
// 1. POST /user - adds a user.
// 2. GET /users - returns all users.

// Use Express library

import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());

const users: { name: string }[] = [];

app.post('/user', (req: Request, res: Response): void => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }
    users.push({ name });
    res.status(200).send();
});

app.get('/users', (_req: Request, res: Response): void => {
    res.status(200).json(users);
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
