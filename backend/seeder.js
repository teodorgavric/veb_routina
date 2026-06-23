import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import habitsData from './data/habits.js';
import User from './models/userModel.js';
import Habit from './models/habitModel.js';
import HabitLog from './models/habitLogModel.js';
import Badge from './models/badgeModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await HabitLog.deleteMany();
        await Badge.deleteMany();
        await Habit.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const regularUser = createdUsers.find(u => u.role === 'user')._id;

        const sampleHabits = habitsData.map(h => ({ ...h, user: regularUser }));
        await Habit.insertMany(sampleHabits);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await HabitLog.deleteMany();
        await Badge.deleteMany();
        await Habit.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}