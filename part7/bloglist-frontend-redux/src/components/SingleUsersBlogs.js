import React from "react";
import { useSelector } from "react-redux";

const SingleUsersBlogs = ({ selectedUser }) => {
  const userList = useSelector((state) => state.userList);

  if (userList === null || selectedUser === null) {
    return <div></div>;
  }
  const blogs = userList.filter((user) => user.name === selectedUser)[0].blogs;
  //console.log("found", blogs);
  if (blogs === null || blogs === undefined) {
    return (
      <div>
        <h2>{selectedUser}</h2>
        <h4>no added blogs</h4>
      </div>
    );
  }
  return (
    <div>
      <h2>{selectedUser}</h2>
      <h4>added blogs</h4>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleUsersBlogs;
