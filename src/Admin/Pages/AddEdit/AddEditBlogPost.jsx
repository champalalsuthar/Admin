import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router";
import ImageUpload from "../../Components/ImageUpload";
import { fetchBlogPostById } from "../../../API/blogPost/fetchBlogPostById";
import { addBlogPost } from "../../../API/blogPost/addBlogPost";
import { editBlogPost } from "../../../API/blogPost/editBlogPost";
import { useAuth } from "../../../Context/AuthContext";

const AddEditBlogPost = () => {
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData } = useAuth();

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        status: "active",
        author: "",
        tags: [],
        categories: [],
        featuredImage: "",
    });


    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchPostData = async () => {
                try {
                    setLoading(true);
                    const data = await fetchBlogPostById(id);
                    setPostData(data?.data);
                } catch (error) {
                    console.error("Error fetching post data:", error);
                    toast.error("Failed to fetch post data");
                } finally {
                    setLoading(false);
                }
            };
            fetchPostData();
        }
    }, [id]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        if (name === "tags" || name === "categories") {
            setPostData({
                ...postData,
                [name]: value.split(",").map((item) => item.trim()),
            });
        } else {
            setPostData({
                ...postData,
                [name]: value,
            });
        }
    };

    const handleEditorChange = (value) => {
        setPostData({
            ...postData,
            content: value,
        });
    };

    const validate = () => {
        let isValid = true;
        const tempErrors = {};

        if (postData.title.trim() === "") {
            tempErrors.title = "Title is required";
            isValid = false;
        }
        if (postData.author.trim() === "") {
            tempErrors.author = "Author is required";
            isValid = false;
        }
        if (postData.tags.length === 0) {
            tempErrors.tags = "At least one tag is required";
            isValid = false;
        }
        if (postData.categories.length === 0) {
            tempErrors.categories = "At least one category is required";
            isValid = false;
        }

        if (postData.content.trim() === "") {
            tempErrors.content = "Content is required";
            isValid = false;
        }

        if (postData.status === "") {
            tempErrors.status = "Status is required";
            isValid = false;
        }
        if (postData.featuredImage === "") {
            tempErrors.featuredImage = "Featured image is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const result = id
                    ? await editBlogPost({ ...postData })
                    : await addBlogPost({ ...postData });

                if (result.success || result.message === "Success") {
                    setSuccessDialogOpen(true);
                } else {
                    toast.error(result.message || "Operation failed");
                }
            } catch (error) {
                console.error("Error submitting post data:", error);
                toast.error(error.message || "An error occurred");
            }
        }
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
        navigate("/crm/home/blogpost/table");
    };

    const handleImageSet = (value, name) => {
        setPostData({ ...postData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };
    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", blockSize: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Button
                onClick={() => navigate("/crm/home/blogpost/table")}
                sx={{
                    color: "#1976d2",
                    position: "sticky",
                    insetBlockStart: "15%",
                    zIndex: 1000,
                }}
            >
                <ArrowBackIcon />
                back
            </Button>
            <Container
                sx={{
                    inlineSize: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    padding: 5,
                }}
            >
                <Box
                    sx={{
                        inlineSize: "80%",
                        padding: 5,
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" sx={{ margin: "20px 0" }}>
                        {id ? "Edit Blog Post" : "Add New Blog Post"}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            marginBlockEnd: 3,
                        }}
                    >
                        <Box sx={{ inlineSize: "100%", sm: "48%" }}>
                            <TextField
                                label="Title"
                                name="title"
                                variant="outlined"
                                onChange={handleOnChange}
                                value={postData.title}
                                error={!!errors.title}
                                helperText={errors.title}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box sx={{ inlineSize: "100%", sm: "48%" }}>
                            <TextField
                                label="Status"
                                name="status"
                                variant="outlined"
                                value={postData.status}
                                onChange={handleOnChange}
                                error={!!errors.status}
                                helperText={errors.status}
                                fullWidth
                                required
                                select
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </TextField>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            inlineSize: '100%', marginBlockEnd: 3
                        }}
                    >
                        <TextField
                            label="Tags (comma separated)"
                            name="tags"
                            variant="outlined"
                            onChange={handleOnChange}
                            value={postData.tags.join(", ")}
                            fullWidth
                            error={!!errors.tags}
                            helperText={errors.tags}
                        />
                        <TextField
                            label="Categories (comma separated)"
                            name="categories"
                            variant="outlined"
                            onChange={handleOnChange}
                            value={postData.categories.join(", ")}
                            fullWidth
                            error={!!errors.categories}
                            helperText={errors.categories}
                        />
                    </Box>

                    <Box
                        sx={{
                            inlineSize: '100%', marginBlockEnd: 3
                        }}
                    >
                        <TextField
                            label="Author"
                            name="author"
                            variant="outlined"
                            onChange={handleOnChange}
                            value={postData.author}
                            fullWidth
                            error={!!errors.author}
                            helperText={errors.author}
                        />
                    </Box>

                    <Box sx={{ inlineSize: '100%', marginBlockEnd: '20px' }}>
                        <Typography variant="h6" sx={{ insetBlockStart: 3 }}>
                            Content
                        </Typography>
                        <ReactQuill
                            value={postData.content}
                            onChange={handleEditorChange}
                            theme="snow"
                            sx={{
                                blockSize: '300px',
                                marginBlockEnd: '40px',
                            }}
                        />
                        {errors.content && (
                            <Typography sx={{ color: 'red', fontSize: '12px', insetBlockStart: '8px' }}>
                                {errors.content}
                            </Typography>
                        )}
                    </Box>


                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",

                        }}
                    >
                        <Typography variant="h6">Upload Featured Image</Typography>

                        {errors.featuredImage !== "" && (
                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                {errors.featuredImage}
                            </Typography>
                        )}

                        <ImageUpload
                            width="250px"
                            blockSize="250px"
                            handleImageSet={(value) => handleImageSet(value, "featuredImage")}
                            index={0}
                            InitialImage={postData?.featuredImage}
                        />
                    </Box>

                    <Container>
                        <Box textAlign={"center"}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ insetBlockStart: 10 }}
                                onClick={handleSubmit}
                            >
                                {id ? "UPDATE" : "ADD"}
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Container >

            <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography>
                        Blog post successfully {id ? "updated" : "added"}!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddEditBlogPost;