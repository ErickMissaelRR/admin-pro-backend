const { Schema, model } = require('mongoose');

const medicSchema = Schema({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'hospital',
        required: true,
    },


});

medicSchema.method('toJSON', function() {

    const { __v, ...object } = this.toObject();
    return object

})

module.exports = model( 'medic', medicSchema)