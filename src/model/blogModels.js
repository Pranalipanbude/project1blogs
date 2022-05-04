const mongoose = require("mongoose")
const moment = require("moment")
const { required } = require("nodemon/lib/config")
const ObjectId = mongoose.Schema.Types.ObjectId


let date = moment().format('DD/MM/YYYY');
console.log(date)


const blogSchema = new mongoose.Schema({

    "title": {
        type: String,
        required:  "title is required",
        trim: true,
    },


    "body": {
        type: String,
        required: "body is required",
        trim: true
    },


    "authorId": {
        type: ObjectId,
        ref: "author",
        required: "authorId is required"
    },


    "tags": [{ type: String, trim:true }],
    "category": {
        type: String,
        trim:true,
        required: "blog category is required",
        // examples :[technology,entertainment,life style,food,fashion]
    },



    "subcategory": [{ type: String , trim:true}],
    "isPublished": {
        type: Boolean,
        default: false
    },


    "publishedAt": Date, 
    date: {
        type: String,
        default: null
    },


    "isDeleted": {
        type: Boolean,
        default: false
    },


    "deletedAt": Date, // if deleted is true deletedAt will have a date 2021-09-17T04:25:07.803Z,

}, { timestamps: true })

module.exports = mongoose.model("blogs", blogSchema)



 