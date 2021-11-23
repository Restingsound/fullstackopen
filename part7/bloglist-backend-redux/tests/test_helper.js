/* eslint-disable no-underscore-dangle */
const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Blog Title 1 For Send Request",
    author: "Mark Zuckerburg",
    url: "http://www.facebook.com/",
    likes: 1,
  },
  {
    title: "Blog Title 3 For Send Request",
    author: "Mark Zuckerburg",
    url: "http://www.facebook.com/",
    likes: 2,
  },
  {
    title: "How to do stuff in Javascript",
    author: "Alan Turing",
    url: "http://www.oxford.com/",
    likes: 3,
  },
];

const initialUsers = [
  {
    notes: [],
    username: "JJohnson",
    name: "Jack Johnson",
    password: "jjpassword",
  },
  {
    notes: [],
    username: "AArmstrongTry2",
    name: "Alex Armstrong",
    password: "aapassword",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon", date: new Date() });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
