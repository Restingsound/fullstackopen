const lodash = require("lodash");

const dummy = () => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.reduce((sum, item) => ({ likes: sum.likes + item.likes })).likes;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const mostLikedBlog = lodash.maxBy(blogs, "likes");
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };

  /*
  //Old Method, without Lodash
  let mostLikes = 0;
  for (let element = 0; element < blogs.length; element++) {
    if (blogs[element].likes > blogs[mostLikes].likes) {
      mostLikes = element;
    }
  }
  return {
    title: blogs[mostLikes].title,
    author: blogs[mostLikes].author,
    likes: blogs[mostLikes].likes,
  };
  */
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const countedBlogs = lodash.countBy(blogs, "author");
  const countedBlogsSpread = [];
  lodash.forEach(countedBlogs, (value, key) => {
    countedBlogsSpread.push({ author: key, blogs: value });
  });
  return lodash.maxBy(countedBlogsSpread, "blogs");

  /*//Old Method, without Lodash
  const authorCount = [];

  for (let element = 0; element < blogs.length; element++) {
    let found = false;
    let foundAt = 0;
    for (
      let authorElement = 0;
      authorElement < authorCount.length;
      authorElement++
    ) {
      if (authorCount[authorElement].author === blogs[element].author) {
        found = true;
        foundAt = authorElement;
      }
    }
    if (found) {
      authorCount[foundAt].blogs += 1;
    } else {
      authorCount.push({ author: blogs[element].author, blogs: 1 });
    }
  }

  let countBlogs = 0;
  for (let element = 0; element < authorCount.length; element++) {
    if (authorCount[element].blogs > authorCount[countBlogs].blogs) {
      countBlogs = element;
    }
  }

  return {
    author: authorCount[countBlogs].author,
    blogs: authorCount[countBlogs].blogs,
  };
  */
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const output = lodash(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: lodash.sumBy(objs, "likes"),
    }))
    .value();

  return lodash.maxBy(output, "likes");

  /*
  //Expanded Lodash commands
  const output2 = lodash.groupBy(blogs, "author");
  const output3 = lodash.map(output2, (objs, key) => ({
    author: key,
    likes: lodash.sumBy(objs, "likes"),
  }));

  console.log(output3);

  //Old Method, without Lodash
  const authorCount = [];

  for (let element = 0; element < blogs.length; element++) {
    let found = false;
    let foundAt = 0;
    for (
      let authorElement = 0;
      authorElement < authorCount.length;
      authorElement++
    ) {
      if (authorCount[authorElement].author === blogs[element].author) {
        found = true;
        foundAt = authorElement;
      }
    }
    if (found) {
      authorCount[foundAt].likes += blogs[element].likes;
    } else {
      authorCount.push({
        author: blogs[element].author,
        likes: blogs[element].likes,
      });
    }
  }

  let countLikes = 0;
  for (let element = 0; element < authorCount.length; element++) {
    if (authorCount[element].likes > authorCount[countLikes].likes) {
      countLikes = element;
    }
  }

  return {
    author: authorCount[countLikes].author,
    likes: authorCount[countLikes].likes,
  };
  */
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
