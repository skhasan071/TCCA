// const { number, required } = require("joi");
// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const CollegeSchema = new Schema({
//   name: { type: String, required: true, minlength: 3, maxlength: 100 },
//   location: { type: String, required: true, minlength: 10, maxlength: 100 },
//   ranking: { type: Number, required: true },
//   averagepackage: { type: Number, required: true },
// });

// const CollegeAuthSchema = new Schema({
//   collegename: { type: String, required: true },
//   collegeemail: { type: String, required: true, unique: true },
//   collegepassword: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const StudentdetailsSchema = new Schema({
//   studentname: { type: String, required: true },
//   studentemail: { type: String, required: true },
//   studentlocation: { type: String, required: true },
//   studentphoneno: { type: Number, required: true },
// });

// const ReviewSchema = new Schema({
//   studentemail: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//   },
//   reviewtext: {
//     type: String,
//     required: true,
//   },
//   pros: {
//     type: String,
//     required: true,
//   },
//   cons: {
//     type: String,
//     required: true,
//   },
// });

// const Cutoffs = new Schema({
//   collegename: {
//     type: String,
//     required: true,
//   },
//   coursename: {
//     type: String,
//     required: true,
//   },
//   examname: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   // home state OR other state
//   quota: {
//     type: String,
//     required: true,
//   },
//   cutoffrank: {
//     type: Number,
//     required: true,
//   },
//   admissionyear: {
//     type: Number,
//     required: true,
//   },
// });

// const Scholarships = new Schema({
//   ScholarshipName: {
//     type: String,
//     required: true,
//   },
//   ScholarshipMoney: {
//     type: Number,
//     required: true,
//   },
//   ScholarshipDescription: {
//     type: String,
//     required: true,
//   },
// });

// const UserModel = mongoose.model("students", UserSchema);
// const CollegeModel = mongoose.model("College", CollegeSchema);
// const CollegeAuthModel = mongoose.model("collegeauth", CollegeAuthSchema);
// const StudentdetailsModel = mongoose.model(
//   "studentdetail",
//   StudentdetailsSchema
// );
// const ReviewModel = mongoose.model("reviews", ReviewSchema);
// const CutoffModel = mongoose.model("cutoffs", Cutoffs);
// const ScholarshipModel = mongoose.model("scholarship", Scholarships);

// module.exports = {
//   UserModel,
//   CollegeModel,
//   CollegeAuthModel,
//   StudentdetailsModel,
//   ReviewModel,
//   ScholarshipModel,
//   CutoffModel,
// };

// ---------------------------------------

import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CollegeAuthSchema = new Schema({
  collegename: { type: String, required: true },
  collegeemail: { type: String, required: true, unique: true },
  collegepassword: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});



const ReviewSchema = new Schema({
  studentemail: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewtext: { type: String, required: true },
  pros: { type: String, required: true },
  cons: { type: String, required: true },
});

const CutoffsSchema = new Schema({
  collegename: { type: String, required: true },
  coursename: { type: String, required: true },
  examname: { type: String, required: true },
  category: { type: String, required: true },
  quota: { type: String, required: true }, // home state OR other state
  cutoffrank: { type: Number, required: true },
  admissionyear: { type: Number, required: true },
});

const ScholarshipsSchema = new Schema({
  ScholarshipName: { type: String, required: true },
  ScholarshipMoney: { type: Number, required: true },
  ScholarshipDescription: { type: String, required: true },
});

const filterbyrank = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    nirf_ranking: { type: Number, required: true },
    collegeinfo: { type: String, required: true },
  },
  { timestamps: true }
);

const filterbycountrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    nirf_ranking: { type: Number, required: true },
    collegeinfo: { type: String, required: true },
  },
  { timestamps: true }
);

export const Filterbycountry = mongoose.model(
  "Filterbycountry",
  filterbycountrySchema
);

const UserModel = mongoose.model("students", UserSchema);
const CollegeAuthModel = mongoose.model("collegeauth", CollegeAuthSchema);
const Filterbyrank = mongoose.model("filterbyrank", filterbyrank);
const ReviewModel = mongoose.model("reviews", ReviewSchema);
const CutoffModel = mongoose.model("cutoffs", CutoffsSchema);
const ScholarshipModel = mongoose.model("scholarship", ScholarshipsSchema);

export default { Filterbyrank };
// export default ;
export {
  UserModel,
  // CollegeModel,
  CollegeAuthModel,
  ReviewModel,
  CutoffModel,
  ScholarshipModel,
};
