const { Schema, model } = require('mongoose');
// const Joi = require('joi');
const {handleMongooseError} = require('../helpers');

const clientSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      product: {
        type: String,
        enum: ["Курс для держслужбовців", "Видноколо"],
        required: true,
      },
      payment: {
        type: Schema.Types.Object,
        default: {},
      }
}, {versionKey: false, timestamps: true});

clientSchema.post('save', handleMongooseError);

const Client = model('Client', clientSchema);

module.exports = {Client};