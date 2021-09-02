const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Blog = require("../models/blog");

describe("basic blog tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("testPassword", 10);
    const user = new User({ username: "Test User", passwordHash });

    await user.save();

    const usersAtStart = await helper.usersInDb();
    await Blog.deleteMany({});
    const localBlogs = [
      {
        title: "Blog Title 1 For Send Request",
        author: "Mark Zuckerburg",
        url: "http://www.facebook.com/",
        likes: 1,
        user: usersAtStart[0].id,
      },
      {
        title: "Blog Title 3 For Send Request",
        author: "Mark Zuckerburg",
        url: "http://www.facebook.com/",
        likes: 2,
        user: usersAtStart[0].id,
      },
      {
        title: "How to do stuff in Javascript",
        author: "Alan Turing",
        url: "http://www.oxford.com/",
        likes: 3,
        user: usersAtStart[0].id,
      },
    ];
    const blogObjects = localBlogs.map((blog) => new Blog(blog));
    const blogPromseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(blogPromseArray);
  });

  test("blogs are returned as json AND all blogs are returned", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/u);
    expect(response.body).toHaveLength(3);
  });

  test("unique identifier named id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    expect(blogsAtStart[0].id).toBeDefined();
  });

  test("a valid blog can be added ", async () => {
    const result = await api.post("/api/login").send({
      username: "Test User",
      password: "testPassword",
    });
    const token = result.body.token;
    const usersAtStart = await helper.usersInDb();
    const newBlog = {
      title: "test longer title you idiot",
      author: "Scott Mulderig",
      url: "www.liultimate.com",
      likes: 3,
      user: usersAtStart[0].id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain("test longer title you idiot");
  });

  test("blog cannot post without authorization", async () => {
    const usersAtStart = await helper.usersInDb();
    const newBlog = {
      title: "test longer title you idiot",
      author: "Scott Mulderig",
      url: "www.liultimate.com",
      likes: 3,
      user: usersAtStart[0].id,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("if likes property missing on post default to 0", async () => {
    const result = await api.post("/api/login").send({
      username: "Test User",
      password: "testPassword",
    });
    const token = result.body.token;
    const usersAtStart = await helper.usersInDb();
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = {
      title: "Title of Blog with No Likes",
      author: "Scott Mulderig",
      url: "www.liultimate.com/blog",
      user: usersAtStart[0].id,
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/u);
    const addedBlog = response.body;
    expect(addedBlog.likes).toBeDefined();

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
  });

  test("blog without title or URL is not added", async () => {
    const result = await api.post("/api/login").send({
      username: "Test User",
      password: "testPassword",
    });
    const token = result.body.token;
    const usersAtStart = await helper.usersInDb();
    const blogsAtStart = await helper.blogsInDb();

    const newBlog = {
      author: "Scott Mulderig",
      likes: 5,
      user: usersAtStart[0].id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("a blog can be deleted", async () => {
    const result = await api.post("/api/login").send({
      username: "Test User",
      password: "testPassword",
    });
    const token = result.body.token;
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });

  test("a specific blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];

    const newLikes = blogToUpdate.likes + 5;
    blogToUpdate.likes = newLikes;

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate);

    expect(resultBlog.body.likes).toEqual(newLikes);

    const resultOfLookup = await api
      .get(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    expect(resultOfLookup.body.likes).toEqual(newLikes);
  });

  // test("all blogs are returned", async () => {
  //   const response = await api.get("/api/blogs");
  //   expect(response.body).toHaveLength(helper.initialBlogs.length);
  // });

  // test("a specific blog is within the returned blogs", async () => {
  //   const response = await api.get("/api/blogs");

  //   const titles = response.body.map((r) => r.title);

  //   expect(titles).toContain("Blog Title 1 For Send Request");
  // });

  // test("a specific blog can be viewed", async () => {
  //   const blogsAtStart = await helper.blogsInDb();

  //   const blogToView = blogsAtStart[0];

  //   const resultBlog = await api
  //     .get(`/api/blogs/${blogToView.id}`)
  //     .expect(200)
  //     .expect("Content-Type", /application\/json/u);

  //   const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

  //   expect(resultBlog.body).toEqual(processedBlogToView);
  // });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/u);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/u);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("user creation fails with missing user name", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "Superuser2",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/u);

    expect(result.body.error).toContain("`username` is required");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("user creation fails with short user name", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "Superuser2",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/u);

    expect(result.body.error).toContain(
      "is shorter than the minimum allowed length"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("user creation fails with missing password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root2",
      name: "Superuser2",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/u);

    expect(result.body.error).toContain("password is required");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("user creation fails with short password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root2",
      name: "Superuser2",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/u);

    expect(result.body.error).toContain(
      "is shorter than the minimum allowed length"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
