import mongoose from "mongoose";

const habitLogSchema = mongoose.Schema({
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Habit'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: { type: String, required: true }, // YYYY-MM-DD format
}, {
    timestamps: true
});

habitLogSchema.index({ habit: 1, date: 1 }, { unique: true });

const HabitLog = mongoose.model('HabitLog', habitLogSchema);
export default HabitLog;