import mongoose from "mongoose";

const habitSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: { type: String, required: true },
    description: { type: String },
    category: {
        type: String,
        required: true,
        enum: ['Health', 'Fitness', 'Study', 'Work', 'Mindfulness', 'Other']
    },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    targetDays: { type: Number },
    reminderTime: { type: String },
    archivedAt: { type: Date, default: null },
}, {
    timestamps: true
});

const Habit = mongoose.model('Habit', habitSchema);
export default Habit;