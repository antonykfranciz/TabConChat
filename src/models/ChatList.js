module.exports = (mongoose) => {
    const chatListSchema = new mongoose.Schema({
        sender: { type: String, required: true },
        receiver: { type: String, required: true },
    }, {
            timestamps: true
        });

    chatListSchema.index({ sender: 1, receiver: 1 }, { unique: true });
    return mongoose.model('Chatlist', chatListSchema);
};