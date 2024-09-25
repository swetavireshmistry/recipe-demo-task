"use server"
import axios from "axios";
import Layout from "./components/layout/layout";
import Banner from "./components/sections/Banner";
import Recipe from "./components/sections/Recipe";
import { FC } from "react";

const Home: FC = async () => {
  let recipes = []
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/recipes`);
    recipes = response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error", error.message);
    } else {
      console.log("Unknown error occurred", error);
    }
  }
  const popularRecipes = recipes.slice(0, 3)

  return (
    <>
      <Layout>
        <Banner popularRecipesData={popularRecipes} />
        <Recipe recipesData={recipes} />
      </Layout>
    </>
  );
};

export default Home;
