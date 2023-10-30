const { CreateBlog, renderCreateBlog, allBlogs, deleteBlog, renderEditBlog, EditBlog, singleBlog, renderMyBlogs } = require("../controller/blog/blogController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = require("express").Router()

const { multer, storage } = require("../middleware/multerConfig");
const { isValidUser } = require("../middleware/validUser");
const catchError = require("../services/catchError");
const upload = multer({ storage: storage });

//createBlog ma gayesi k garni vaneko
// app.get('/createBlog',renderCreateBlog)
// app.post('/createBlog',CreateBlog)  
router.route("/").get(allBlogs)
router.route("/createBlog").get(catchError(isAuthenticated),catchError(renderCreateBlog)).post(isAuthenticated,upload.single('image'),CreateBlog)
router.route("/single/:id").get(singleBlog)
router.route("/delete/:id").get(isAuthenticated,deleteBlog)
router.route("/edit/:id").get(isAuthenticated,renderEditBlog)
router.route("/editBlog/:id").post(isAuthenticated,isValidUser,upload.single('image'),EditBlog)
router.route("/myBlogs").get(isAuthenticated,renderMyBlogs)


module.exports = router;