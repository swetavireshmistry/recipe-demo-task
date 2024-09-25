import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { RecipeProps } from "@/types/types";
import Recipe from "../components/sections/Recipe";

const mockRecipesData: RecipeProps["recipesData"] = [
  {
    _id: "1",
    title: "Spaghetti Carbonara",
    photo: "spaghetti-carbonara.jpg",
    tags: ["Pasta", "Italian"],
    author: "Chef John",
    createdAt: "2024-09-20T12:00:00Z",
  },
  {
    _id: "2",
    title: "Chicken Tikka Masala",
    photo: "chicken-tikka-masala.jpg",
    tags: ["Curry", "Indian"],
    author: "Chef Jane",
    createdAt: "2024-09-21T12:00:00Z",
  },
];

describe("Recipe Component", () => {
  test("renders without crashing", () => {
    render(<Recipe recipesData={mockRecipesData} />);
    
    // Check if the section title is present
    expect(screen.getByText(/Popular Recipes/i)).toBeTruthy();
  });

  test("renders recipe titles", () => {
    render(<Recipe recipesData={mockRecipesData} />);
    
    // Check if both recipe titles are rendered
    expect(screen.getByText(/Spaghetti Carbonara/i)).toBeTruthy();
    expect(screen.getByText(/Chicken Tikka Masala/i)).toBeTruthy();
  });

  test("renders recipe tags", () => {
    render(<Recipe recipesData={mockRecipesData} />);
    
    // Check if the tags for the first recipe are rendered
    expect(screen.getByText(/Pasta/i)).toBeTruthy();
    expect(screen.getByText(/Italian/i)).toBeTruthy();
  });

  test("renders recipe author and creation date", () => {
    render(<Recipe recipesData={mockRecipesData} />);
    
    // Check if author and creation date for the first recipe are rendered
    expect(screen.getByText(/Chef John/i)).toBeTruthy();
    expect(screen.getByText(/Fri Sep 20 2024/i)).toBeTruthy();
  });

  test("renders the correct image source", () => {
    render(<Recipe recipesData={mockRecipesData} />);
    
    // Check if the image source for the first recipe is correct
    const image = screen.getByAltText(/Spaghetti Carbonara/i);
    expect(image).toHaveAttribute("src", "/assets/images/upload/spaghetti-carbonara.jpg");
  });
});
