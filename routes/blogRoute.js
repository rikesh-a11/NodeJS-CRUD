const { CreateBlog, renderCreateBlog, allBlogs, deleteBlog, renderEditBlog, EditBlog, singleBlog } = require("../controller/blog/blogController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = require("express").Router()

//createBlog ma gayesi k garni vaneko
// app.get('/createBlog',renderCreateBlog)
// app.post('/createBlog',CreateBlog)  
router.route("/").get(allBlogs)
router.route("/createBlog").get(renderCreateBlog).post(isAuthenticated, CreateBlog)
router.route("/single/:id").get(singleBlog)
router.route("/delete/:id").get(deleteBlog)
router.route("/edit/:id").get(renderEditBlog)
router.route("/editBlog/:id").post(EditBlog)



module.exports = router;