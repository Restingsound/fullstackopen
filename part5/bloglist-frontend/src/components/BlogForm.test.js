import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  let component;

  const createBlog = jest.fn();

  beforeEach(() => {
    component = render(<BlogForm createBlog={createBlog} />);
  });

  test("form calls the event handler with right details when a new blog is created", () => {
    //component.debug();
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    const form = component.container.querySelector("form");
    fireEvent.change(title, {
      target: { value: "title of test blog" },
    });
    fireEvent.change(author, {
      target: { value: "George Washington" },
    });
    fireEvent.change(url, {
      target: { value: "www.whitehouse.gov" },
    });
    fireEvent.submit(form);
    expect(createBlog.mock.calls).toHaveLength(1);
    //console.log(createBlog.mock.calls);
    expect(createBlog.mock.calls[0][0].title).toBe("title of test blog");
    expect(createBlog.mock.calls[0][0].author).toBe("George Washington");
    expect(createBlog.mock.calls[0][0].url).toBe("www.whitehouse.gov");
  });
});
