import { RecipeProps } from "@/types/types";
import Link from "next/link";
import { FC } from "react";

const Recipe: FC<RecipeProps> = ({ recipesData }) => {
  return (
    <>
      {/* Recipe Section */}
      <section className="recipe-section-two">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title centered">
            <div className="title">News & Recipe</div>
            <h2>Popular Recipes</h2>
            <div className="separate"></div>
          </div>
          <div className="row clearfix">
            {/* Recipe Block */}
            {recipesData?.length > 0 &&
              recipesData.map((recipe) => {
                return (
                  <div className="recipe-block-two col-lg-4 col-md-6 col-sm-12" key={recipe._id}>
                    <Link href={`recipes/${recipe._id}`}>
                      <div className="inner-box wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                        <div className="image">
                          <img src={`/assets/images/upload/${recipe.photo}`} alt={recipe.title} />
                        </div>
                        <div className="lower-content">
                          {/* Map through the tags array to create a div for each tag */}
                          {recipe.tags.map((tag, index) => (
                            <div className="category" key={index}>
                              <div className="tag" key={index}>{tag}</div>
                            </div>
                          ))}
                          <h6>{recipe.title}</h6>
                          <ul className="post-info">
                            <li>{recipe.author}</li>
                            <li>{new Date(recipe.createdAt).toDateString()}</li>
                          </ul>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      {/* End Recipe Section Two */}
    </>
  );
};

export default Recipe;
