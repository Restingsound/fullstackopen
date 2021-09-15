import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
//import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

  const currentUser = {
    username: "Jack",
    name: "Name of user",
  };
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Matt Donnelly",
    url: "test-url.com",
    likes: 0,
    user: {
      username: "Jack",
      name: "Name of user2",
    },
  };

  const putLike = jest.fn();
  const deleteBlog = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        putLike={putLike}
        currentUser={currentUser}
        deleteBlog={deleteBlog}
      />
    );
  });

  test("renders title and author but not likes or url", () => {
    //component.debug();
    const div = component.container.querySelector(".blog");
    expect(div).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );
    expect(div).toHaveTextContent("Matt Donnelly");
    const detailDiv = component.container.querySelector(".blogDetails");
    expect(detailDiv).toHaveTextContent("test-url.com");
    expect(detailDiv).toHaveTextContent("likes");
    expect(detailDiv).toHaveStyle("display: none");
  });

  test("url and likes shown when view is clicked", () => {
    const detailDiv = component.container.querySelector(".blogDetails");
    expect(detailDiv).toHaveStyle("display: none");
    const viewButton = component.getByText("view");
    fireEvent.click(viewButton);
    expect(detailDiv).not.toHaveStyle("display: none");
    expect(detailDiv).toHaveTextContent("test-url.com");
    expect(detailDiv).toHaveTextContent("likes");
  });

  test("clicking the like button twice calls event handler twice", () => {
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(putLike.mock.calls).toHaveLength(2);
  });
});
