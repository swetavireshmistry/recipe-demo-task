"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    TextField,
    Button,
    MenuItem,
    Grid,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    IconButton,
    CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from '@/store/types';
import { createRecipe } from '@/store/slices/createrecipe';
import { SelectChangeEvent } from '@mui/material';
import Layout from '@/app/components/layout/layout';
import useAuth from '@/app/hooks/useAuth';
import CustomSnackbar from '@/app/components/Snackbar';

const RecipeForm = () => {
    const { isAuthenticated } = useAuth();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState<File | null>(null);
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [instructions, setInstructions] = useState<string[]>(['']);
    const [tags, setTags] = useState<string[]>(["vegan"]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(!isAuthenticated);
        };
        checkAuth();
    }, [isAuthenticated]);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
        register,
    } = useForm({
        defaultValues: {
            title: '',
            photo: '',
            cookTime: '',
            prepTime: '',
            difficulty: '',
            description: '',
            tags: '',
        },
    });

    const onSubmit = async (data: any) => {
        const recipeData = {
            ...data,
            ingredients: ingredients.filter(ingredient => ingredient !== ''),
            instructions: instructions.filter(instruction => instruction !== ''),
            tags: tags.filter(tag => tag !== ''),
        };

        if (photo) {
            const formData = new FormData();
            formData.append('file', photo);
            formData.append('recipeData', JSON.stringify(recipeData));

            setIsSubmitting(true);
            try {
                const res = await fetch('/api/uploadPhoto', {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    const { image } = await res.json();
                    recipeData.photo = image;
                    await dispatch(createRecipe(recipeData));
                    setMessageType('success');
                    setSnackbarMessage('Recipe submitted successfully!');

                    // Reset form after successful submission
                    reset(); 
                    setIngredients(['']); 
                    setInstructions(['']);
                    setTags(['vegan']); 
                    setPhoto(null); 
                } else {
                    throw new Error('File upload failed.');
                }
            } catch (err) {
                console.log("error", err);
                setMessageType('error');
                setSnackbarMessage(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
            } finally {
                setSnackbarOpen(true);
                setIsSubmitting(false);
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setPhoto(selectedFile);
    };

    const handleAddField = (type: 'ingredients' | 'instructions' | 'tags') => {
        if (type === 'ingredients') {
            setIngredients([...ingredients, '']);
        } else if (type === 'instructions') {
            setInstructions([...instructions, '']);
        } else if (type === 'tags') {
            setTags([...tags, '']);
        }
    };

    const handleRemoveField = (type: 'ingredients' | 'instructions' | 'tags', index: number) => {
        if (type === 'ingredients') {
            const newIngredients = ingredients.filter((_, i) => i !== index);
            setIngredients(newIngredients);
        } else if (type === 'instructions') {
            const newInstructions = instructions.filter((_, i) => i !== index);
            setInstructions(newInstructions);
        } else if (type === 'tags') {
            const newTags = tags.filter((_, i) => i !== index);
            setTags(newTags);
        }
    };

    const handleChange = (type: 'ingredients' | 'instructions' | 'tags', index: number, value: string) => {
        if (type === 'ingredients') {
            const updatedIngredients = [...ingredients];
            updatedIngredients[index] = value;
            setIngredients(updatedIngredients);
        } else if (type === 'instructions') {
            const updatedInstructions = [...instructions];
            updatedInstructions[index] = value;
            setInstructions(updatedInstructions);
        } else if (type === 'tags') {
            const updatedTags = [...tags];
            updatedTags[index] = value;
            setTags(updatedTags);
        }
    };

    const handleTagChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setTags(typeof value === 'string' ? value.split(',') : value);
    };

    if (loading) {
        return <div> <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>             <CircularProgress size={24} />         </div></div>;
    }

    return (
        <Layout>
        <Box 
          sx={{
            display: 'flex',

            gap: '24px',
            maxWidth: 1140,
            mx: 'auto',
            mt: 4,
            padding: {xs: '24px', md: '50px 0'},
            flexDirection: { xs: 'column', md: 'row' }, 
          }}>
            <Box   sx={{
      width: { xs: '100%', md: '50%' }, 
      display: { xs: 'none', md: 'block' },
    }}>
                <div style={{height: '100%'}}>
                   <img style={{maxWidth: '100%', height: '100%', objectFit: "cover"}} 
                   src="https://cdn.pixabay.com/photo/2016/03/31/17/48/essen-1293911_1280.png" alt="" />
                </div>
            </Box>
            <Box  sx={{
      width: { xs: '100%', md: '50%' }, 
    }}>
                <Typography variant="h4" gutterBottom>Create Recipe</Typography>
                <form className='form-wrapper' onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                {...register('title', { required: 'Title is required', minLength: 3 })}
                                error={!!errors.title}
                                helperText={errors.title ? errors.title.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                sx={{ textAlign: 'left' }}
                            >
                                Upload Photo
                                <input type="file" onChange={handleFileChange} accept="image/*" hidden />
                            </Button>
                            {errors.photo && <Typography color="error">Photo is required</Typography>}
                            {photo && <Typography>{photo.name}</Typography>}
                        </Grid>

                        {/* Ingredients */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Ingredients</Typography>
                            {ingredients.map((ingredient, index) => (
                                <Grid sx={{ marginBottom: '10px'}} container spacing={1} key={index} alignItems="center">
                                    <Grid item xs={10}>
                                        <TextField
                                            label={`Ingredient ${index + 1}`}
                                            variant="outlined"
                                            fullWidth
                                            value={ingredient}
                                            onChange={(e) => handleChange('ingredients', index, e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton onClick={() => handleAddField('ingredients')}>
                                            <AddIcon />
                                        </IconButton>
                                        {ingredients.length > 1 && (
                                            <IconButton onClick={() => handleRemoveField('ingredients', index)}>
                                                <RemoveIcon />
                                            </IconButton>
                                        )}
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Instructions */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Instructions</Typography>
                            {instructions.map((instruction, index) => (
                                <Grid sx={{ marginBottom: '10px'}} container spacing={1} key={index} alignItems="center">
                                    <Grid item xs={10}>
                                        <TextField
                                            label={`Instruction ${index + 1}`}
                                            variant="outlined"
                                            fullWidth
                                            value={instruction}
                                            onChange={(e) => handleChange('instructions', index, e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton onClick={() => handleAddField('instructions')}>
                                            <AddIcon />
                                        </IconButton>
                                        {instructions.length > 1 && (
                                            <IconButton onClick={() => handleRemoveField('instructions', index)}>
                                                <RemoveIcon />
                                            </IconButton>
                                        )}
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Tags */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Tags</InputLabel>
                                <Select
                                    multiple
                                    value={tags}
                                    onChange={handleTagChange}
                                    renderValue={(selected) => selected.join(', ')}
                                    error={tags.length === 0}
                                >
                                    <MenuItem value="vegan">Vegan</MenuItem>
                                    <MenuItem value="gluten-free">Gluten Free</MenuItem>
                                    <MenuItem value="dairy-free">Dairy Free</MenuItem>
                                    {/* Add more tags as needed */}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                {...register('description', { required: 'Description is required' })}
                                error={!!errors.description}
                                helperText={errors.description ? errors.description.message : ''}
                            />
                        </Grid>

                        {/* Cook Time */}
                        <Grid item xs={12}>
                            <TextField
                                label="Cook Time"
                                variant="outlined"
                                fullWidth
                                {...register('cookTime', { required: 'Cook Time is required' })}
                                error={!!errors.cookTime}
                                helperText={errors.cookTime ? errors.cookTime.message : ''}
                            />
                        </Grid>

                        {/* Prep Time */}
                        <Grid item xs={12}>
                            <TextField
                                label="Prep Time"
                                variant="outlined"
                                fullWidth
                                {...register('prepTime', { required: 'Prep Time is required' })}
                                error={!!errors.prepTime}
                                helperText={errors.prepTime ? errors.prepTime.message : ''}
                            />
                        </Grid>

                        {/* Difficulty Level */}
                        <Grid item xs={12}>
                            <TextField
                                label="Difficulty"
                                variant="outlined"
                                fullWidth
                                select
                                {...register('difficulty', { required: 'Difficulty is required' })}
                                error={!!errors.difficulty}
                                helperText={errors.difficulty ? errors.difficulty.message : ''}
                            >
                                <MenuItem value="easy">Easy</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="hard">Hard</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} display={'flex'} justifycontent={'center'}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isSubmitting}
                                style={{lineHeight:" 30px",fontWeight: 600, fontSize: '16px',maxWidth:'210px',color: '#fff', margin: "0 auto", background: '#91ad41', }}
                            >
                                {   isSubmitting ? <CircularProgress size={24} /> : 'Submit Recipe'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                {/* Use CustomSnackbar for messages */}
                <CustomSnackbar
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                    severity={messageType}
                />
            </Box>
        </Box>
        </Layout>
        
    );
};

export default RecipeForm;
