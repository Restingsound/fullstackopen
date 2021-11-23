const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;

    const user = request.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
      comments: [],
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    const returnBlog = await Blog.findById(savedBlog._id).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(returnBlog);
  }
);

blogsRouter.post(
  "/:id/comments",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;
    const foundBlog = await Blog.findById(request.params.id);
    const updatedBlog = foundBlog;
    updatedBlog.comments.push(body.comment);

    const resultBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      {
        new: true,
      }
    );
    response.json(resultBlog);
  }
);

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    const user = request.user;
    if (blog.user.toString() === user.id) {
      //console.log("found match allow delete");
    } else {
      return response.status(401).json({
        error: "blogs may only be deleted by the user who posted them",
      });
    }
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

blogsRouter.put(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      userid: body.userid,
      comments: body.comments,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  }
);

module.exports = blogsRouter;
