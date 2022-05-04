//const { regexpToText } = require("nodemon/lib/utils")
const authorModels = require("../model/authorModels")
const blogModels = require("../model/blogModels")
const moment = require("moment");
const authMiddleware= require("../middleware/authMiddlerware")





const createBlogger = async function (req, res) {
    try {
        const id = req.body.authorId;
       if(!id){
           res.status(404).send({msg:'Id is compullsary'})
       }
        const checkId = await authorModels.findById(id);
        if (!checkId)
            return res.status(400).send({ status: false, msg: "provide valid author id" });

        const blogData = req.body;
        if (blogData.isPublished === false) {

            const blogCreation = await blogModels.create(blogData);
            return res.status(201).send({ status: true, data: blogCreation });
        } 
        const{title, body, authorId, tags, category, subcategory,}=blogData

            if(!title){
                return res.status(400).send({msg:'title is required'})
            }

            if(!body){
                return res.status(400).send({msg:'body is required'})
            }

            
            if(!authorId){
                return res.status(400).send({msg:'authorId is required'})
            }
            
            if(!tags){
                return res.status(400).send({msg:'tags is required'})
            }

            
            if(!category){
                return res.status(400).send({msg:'category is required'})
            }
            
            if(!subcategory){
                return res.status(400).send({msg:'subcategory is required'})
            }

        else {

            blogData.publishedAt = new Date();
            const blogCreation = await blogModels.create(blogData);

            res.status(201).send({ status: true, data: blogCreation });
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};






const getBlogs = async function (req, res) {
    try {
        let data = req.query;
        let datablog = await blogModels.find({ deleted: false, isPublished: true, ...data })
        if(!datablog)return res.status(404).send({msg:"no such data"})
        if(datablog.length ==0){
            return res.status(404).send({msg: "no blogs are present"})
        }
        res.status(200).send({ msg: datablog })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}





const Bloggs = async function(req, res) {
    try {
        let data = req.body
        let blogId = req.params.blogId

        if (!blogId) return res.status(400).send({ status: false, msg: "blogid is required" })
        let findblog = await blogModels.findById(blogId)
        if (!findblog) return res.status(404).send({ msg: "blogid invalid" })
        if (findblog.isDeleted == true) return res.status(404).send({ msg: "Blog is already deleted " })
        if (findblog.isDeleted == false) {
            let updatedBlog = await blogModels.findOneAndUpdate({ _id: blogId},{ 
                $set: {
                    title: data.title,
                    body: data.body,
                    category: data.category,
                    publishedAt:moment().format(),
                    isPublished: true
                },
               $push:  {
                    tags: req.body.tags,
                    subcategory: req.body.subcategory
                }
            }, { new: true, upsert: true })
            return res.status(200).send(updatedBlog)
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}



const deleteblog = async function (req, res) {

    try {
        let Blogid = req.params.blogId
        if (!Blogid) return res.status(404).send({ msg: "Blogid is required" })

        let check = await blogModels.findOne({ _id: Blogid })
        if (!check) return res.status(404).send('Blog not exist')

        let checking = check.deleted
        if (checking == false) {
            let deleteBlog = await blogModels.findOneAndUpdate({ _id: Blogid }, { deleted: true, deletedAt: new Date() }, { new: true })
            return res.status(200).send({ msg: deleteBlog })
        } else {
            res.status(404).send({
                status: false,
                msg: "Already deleted"
            })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }

}

const deleteByElement = async function (req, res) {
    try {
        let data = req.query
        if (!data) return res.status(404).send({ msg: " data is required in query params" })
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "not a vaild input" })

        let check = await blogModels.find(data)
        if (!check) return res.status(404).send('Blog not exist')
        console.log(check)

        const deleteBYquery = await blogModels.updateMany({ $and: [data, { deleted: false }, { isPublished: false }] }, { $set: { deleted: true, deletedAt: new Date() } })
        if (deleteBYquery.modifiedCount == 0) return res.status(400).send('user already deleted')

        if (!deleteBYquery) return res.status(404).send({ status: false, msg: "blog not exist" })
        res.status(200).send({ status: true, msg: deleteBYquery })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: "error", err: err.message })

    }
}





module.exports.createBlogger = createBlogger
module.exports.getBlogs = getBlogs
module.exports.Bloggs = Bloggs
module.exports.deleteblog = deleteblog
module.exports.deleteByElement = deleteByElement