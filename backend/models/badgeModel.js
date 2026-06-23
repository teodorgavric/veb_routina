import mongoose from "mongoose";

const badgeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        enum: ['first_step', 'on_a_roll', 'unstoppable', 'variety_pack', 'century', 'perfectionist', 'goal_reached']
    },
    habitName: { type: String },
    targetDays: { type: Number },
}, {
    timestamps: true
});

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;