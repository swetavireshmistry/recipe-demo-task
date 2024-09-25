"use client";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import useAuth from "../../hooks/useAuth";
import { fetchRecipeById, selectError, selectLoading, selectRecipe } from "@/store/slices/recipeSlice";
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from "@/store/types";
import CustomSnackbar from "../../components/Snackbar";
import { CircularProgress } from "@mui/material";

export default function Index() {
    const { isAuthenticated } = useAuth();
    const params = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(selectRecipe);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const id = params.id as string;

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeById(id))
                .unwrap()
                .then(() => {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Recipe loaded successfully');
                    setSnackbarOpen(true);
                })
                .catch(() => {
                    setSnackbarSeverity('error');
                    setSnackbarMessage(error || 'Failed to load the recipe.');
                    setSnackbarOpen(true);
                });
        }
    }, [dispatch, id]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // If not authenticated, return a loading or unauthorized message
    if (!isAuthenticated) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress size={24} />
        </div>;
    }

    return (
        <>
            <Layout>
                {/* Sidebar Page Container */}
                <div className="sidebar-page-container">
                    {/* <div className="icon-layer-one" style={{ backgroundImage: 'url(/assets/images/icon-1.png)' }}></div>
                    <div className="icon-layer-two" style={{ backgroundImage: 'url(/assets/images/icon-2.png)' }}></div>
                    <div className="icon-layer-three" style={{ backgroundImage: 'url(/assets/images/icon-3.png)' }}></div> */}
                    <div className="auto-container">
                        <div className="row clearfix">
                            {/* Content Side */}
                            <div className="content-side col-lg-8 col-md-12 col-sm-12">
                                <div className="blog-detail">
                                    <div className="inner-box">
                                        {loading ? (
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <CircularProgress size={24} />
                                            </div>
                                        ) : error ? (
                                            <div className="error">{error}</div>
                                        ) : (
                                            <>
                                                <ul className="post-info">
                                                    <li>{recipe?.createdBy?.username}</li>
                                                    <li>{new Date(recipe?.createdAt ?? "").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                                                </ul>
                                                <div className="image">
                                                    <img src={`/assets/images/upload/${recipe?.photo}`} alt="Recipe" />
                                                </div>
                                                <div className="lower-content">
                                                    <div className="tag-container">
                                                        {recipe?.tags?.map((tag: string) =>
                                                            <div className="category" key={tag}>{tag}</div>
                                                        )}
                                                    </div>
                                                    <h3>{recipe?.title}</h3>
                                                    <ul className="post-info">
                                                        <li>{new Date(recipe?.createdAt ?? "").toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                                                    </ul>
                                                    <div className="text">{recipe?.description}</div>
                                                </div>
                                                {/* Author Box */}
                                                <div className="author-box">
                                                    <div className="box-inner">
                                                        <div className="content">
                                                            <div className="author-image">
                                                                <img src={`/assets/images/upload/${recipe?.createdBy?.image}`} alt="" style={{ height: "103px" }} />
                                                            </div>
                                                            <h6>{recipe?.createdBy?.username}</h6>
                                                            <div className="text">
                                                                {
                                                                    recipe && recipe?.createdBy?.bio?.length > 150 ?
                                                                        `${recipe?.createdBy?.bio.slice(0, 150)}...` :
                                                                        recipe?.createdBy?.bio
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* End Author Box */}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Side */}
                            <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
                                <aside className="sidebar sticky-top">
                                    {/* Recipe Information */}
                                    <div className="sidebar-widget category-widget">
                                        <div className="widget-content">
                                            {/* Recipe Cook Time */}
                                            <div className="sidebar-title">
                                                <h6>Recipe Cook Time</h6>
                                            </div>
                                            <p>{recipe?.cookTime}</p>

                                            {/* Recipe Prep Time */}
                                            <div className="sidebar-title">
                                                <h6>Recipe Prep Time</h6>
                                            </div>
                                            <p>{recipe?.prepTime}</p>

                                            {/* Recipe Difficulty */}
                                            <div className="sidebar-title">
                                                <h6>Recipe Difficulty</h6>
                                            </div>
                                            <p>{recipe?.difficulty}</p>
                                        </div>
                                    </div>

                                    {/* Recipe Ingredients */}
                                    <div className="sidebar-widget category-widget">
                                        <div className="widget-content">
                                            <div className="sidebar-title">
                                                <h6>Recipe Ingredients</h6>
                                            </div>
                                            <ul className="cat-list square-bullet">
                                                {recipe?.ingredients?.map((ingredient: string) => (
                                                    <li key={ingredient}>{ingredient}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Recipe Instructions */}
                                    <div className="sidebar-widget category-widget">
                                        <div className="widget-content">
                                            <div className="sidebar-title">
                                                <h6>Recipe Instructions</h6>
                                            </div>
                                            <ul className="cat-list square-bullet">
                                                {recipe?.instructions?.map((instruction: string) => (
                                                    <li key={instruction}>{instruction}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

            {/* CustomSnackbar for showing Notifications */}
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </>
    );
}
