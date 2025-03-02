// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library
import mongoose from 'mongoose';

type DuplicatedUsers = {
    email: string
}

async function manageUsers(): Promise<DuplicatedUsers[]> {
    const User = mongoose.model('User');

    const duplicates = await User.aggregate([
        {
            $group: {
                _id: '$email',
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { $gt: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                email: '$_id'
            }
        }
    ]);

    return duplicates;
}

module.exports = { manageUsers }