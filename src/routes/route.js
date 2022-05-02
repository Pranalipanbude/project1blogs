const express = require('express');
const router = express.Router();


const authorController= require("../controller/authorController")
const blogController= require("../controller/blogController")
const loginController = require("../controller/loginController") 
const authMiddlerware= require("../middleware/authMiddlerware")



router.post("/authors",authorController.createAuthor)

router.post("/blogs",authMiddlerware.authentication,authMiddlerware.authorization,blogController.createBlogger)
 
router.get("/getBlogs",authMiddlerware.authentication,blogController.getBlogs)  
    
router.put("/blogss/:blogId",authMiddlerware.authentication,authMiddlerware.authorization,blogController.Bloggs)

router.delete("/blogs/:blogId",authMiddlerware.authentication,authMiddlerware.authorization,blogController.deleteblog)

router.delete("/deleteByElement",authMiddlerware.authentication,authMiddlerware.authorization,blogController.deleteByElement)

router.post("/login",loginController.loginUser)



module.exports = router;