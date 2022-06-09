import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function() {
  render(<Carousel />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow)

   // expect the first image to show, but not the second
   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("hides the left arrow when you're on the first image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the left arrow to be hidden
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).not.toBeVisible();

  // expect the right arrow to be visible
  const rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).toBeVisible();
});

it("shows both the left and right arrows when on an image in the middle", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward once in the carousel to the middle image
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the left arrow to be visible
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeVisible();

  // expect the right arrow to be visible
  expect(rightArrow).toBeVisible();
});

it("hides the right arrow when you're on the last image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward twice in the carousel to the last image
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the right arrow to be hidden
  expect(rightArrow).not.toBeVisible();

  // expect the left arrow to be visible
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeVisible();
});
