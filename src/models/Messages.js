module.exports = (mongoose) => {
    const messageSchema = new mongoose.Schema({
        type: { type: String, default: 'text', required: true },
        chatId: { type: String, required: true },
        message: { type: String, required: true },
    }, {
            timestamps: true
        }
    );

    messageSchema.index({ type: 1, chatId: 1 }, { unique: true });
    return mongoose.model('Messages', messageSchema);
};