const { Schema, Types } = require('mongoose');
const moment  = require('moment');

// Used as the reaction's subdoc schema in the Thought model
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            validate: [({ length }) => length <= 280, 'Reactions cannot be more than 280 characters long!']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal)
        }
    }
)

module.exports = ReactionSchema;