// Career schema

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// This schema is subject to change. Potential additions:
// * Job listings (pulled from LinkedIn or Indeed API if available?)
// * Pay range (only add if can pull from a 3rd party API that updates; might not be a DB call)
const CareerSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    unique: true
  },
  description: { type: String, required: true, minLength: 2 },
  attributes: { type: [String], required: true, minItems: 3 },
  certifications: { type: [String] },
  job_photo: { type: String },
  bio_photo: { type: String },
  bio_quote: { type: String }
});

export default mongoose.model('Career', CareerSchema);
