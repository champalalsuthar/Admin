import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    MenuItem,
    Select,
    TableRow,
    Paper,
    Container,
    InputAdornment,
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../../Components/ConfirmationModal";
import SideMenu from "../../Components/SideMenu";
import { getallBlogPost } from "../../../API/blogPost/getallBlogPost";
import { editBlogPost } from "../../../API/blogPost/editBlogPost";

const BlogPostTable = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            id: "title",
            label: "Title",
            inlineSize: 170,
            align: "center",
        },
        {
            id: "tags",
            label: "Tags",
            inlineSize: 150,
            align: "center",
        },
        {
            id: "categories",
            label: "Categories",
            inlineSize: 150,
            align: "center",
        },
        {
            id: "status",
            label: "Status",
            inlineSize: 100,
            align: "center",
        },
        {
            id: "action",
            label: "Action",
            inlineSize: 100,
            align: "center",
        },
    ];

    const filterData = () => {
        let filtered = postData || [];
        if (searchTerm) {
            filtered = filtered.filter(
                (item) =>
                    (item?.title &&
                        item?.title.toLowerCase().includes(searchTerm.toLowerCase())) ||

                    (item?.tags &&
                        item?.tags.some(tag =>
                            tag.toLowerCase().includes(searchTerm.toLowerCase())
                        )) ||
                    (item?.categories &&
                        item?.categories.some(category =>
                            category.toLowerCase().includes(searchTerm.toLowerCase())
                        ))
            );
        }
        if (statusFilter) {
            filtered = filtered.filter((item) => item?.status === statusFilter);
        }
        return filtered;
    };

    const getAllPostsFunction = async () => {
        setLoading(true);
        try {
            const data = await getallBlogPost();
            setPostData(data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching post data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPostsFunction();
    }, []);

    useEffect(() => {
        setFilteredData(filterData());
    }, [postData, searchTerm, statusFilter]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const newFilteredData = filterData();
        setFilteredData(newFilteredData);
    };

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleOpenModal = (id, title, value, type) => {
        setEditData({});
        if (type === "status") {
            setEditData((prev) => ({ ...prev, title: title, _id: id, status: value }));
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmation = async (payload) => {
        try {
            const result = await editBlogPost(payload);
            if (result.success) {
                toast.success(`Status updated!`);
                getAllPostsFunction();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error updating post status:", error);
            toast.error("Failed to update post status");
        }
    };

    return (
        <>
            <SideMenu />
            <Container>
                <h1 style={{ textAlign: "center", margin: "20px 0", color: "#1976d2" }}>
                    BLOG POSTS
                </h1>

                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        insetBlockEnd: 5,
                        insetBlockStart: 5,
                    }}
                >
                    <TextField
                        id="search"
                        type="search"
                        label="Search Blog Post"
                        value={searchTerm}
                        onChange={handleSearch}
                        sx={{ inlineSize: { xs: 350, sm: 500, md: 800 } }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AiOutlineSearch />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Container>

                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        insetBlockEnd: 5,
                        insetBlockStart: 5,
                    }}
                >
                    <Typography
                        variant="h6"
                        textAlign="center"
                        color="#1976d2"
                        fontWeight="bold"
                    >
                        Add New Blog Post
                    </Typography>
                    <Link to={`/crm/home/blogpost/add`}>
                        <Button
                            sx={{
                                fontSize: 15,
                                backgroundColor: "#b71c1c",
                                color: "white",
                                border: "none",
                                borderRadius: 1,
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#8e0000",
                                },
                            }}
                        >
                            CREATE NEW
                        </Button>
                    </Link>
                </Container>

                <Container
                    sx={{
                        inlineSize: "100%",
                        blockSize: "600px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ inlineSize: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                        <Paper
                            style={{
                                overflow: "auto",
                                blockSize: "500px",
                            }}
                        >
                            <TableContainer sx={{ blockSize: "500px" }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead sx={{ position: "sticky", insetBlockStart: 0 }}>
                                        <TableRow>
                                            {columns.map((column) => {
                                                if ("status" === column.id) {
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{
                                                                inlineSize: column.inlineSize,
                                                                color: "#1976d2",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            <Select
                                                                value={statusFilter}
                                                                onChange={handleStatusChange}
                                                                displayEmpty
                                                                sx={{
                                                                    inlineSize: column.inlineSize,
                                                                    color: "#1976d2",
                                                                    fontWeight: "bold",
                                                                    border: "none",
                                                                    ".MuiSelect-select": {
                                                                        border: "none",
                                                                    },
                                                                    ".MuiOutlinedInput-notchedOutline": {
                                                                        border: "none",
                                                                    },
                                                                }}
                                                            >
                                                                <MenuItem value="" style={{ border: "none" }}>
                                                                    All Status
                                                                </MenuItem>
                                                                <MenuItem value="active">Active</MenuItem>
                                                                <MenuItem value="inactive">Inactive</MenuItem>
                                                            </Select>
                                                        </TableCell>
                                                    );
                                                }
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            inlineSize: column.inlineSize,
                                                            color: "#1976d2",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={columns.length}>
                                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                                        <h4>Loading...</h4>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : filteredData.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={columns.length}>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <h4>No blog posts found.</h4>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredData?.map((post) => (
                                                <TableRow key={post._id}>
                                                    <TableCell align="center">{post.title}</TableCell>

                                                    <TableCell align="center">{post.tags.join(", ")}</TableCell>
                                                    <TableCell align="center">{post.categories.join(", ")}</TableCell>
                                                    <TableCell align="center">
                                                        <Button
                                                            variant="contained"
                                                            color={post.status === "active" ? "primary" : "error"}
                                                            style={{
                                                                position: "static",
                                                                borderRadius: "20px",
                                                            }}
                                                            onClick={() =>
                                                                handleOpenModal(
                                                                    post._id,
                                                                    post.title,
                                                                    post.status === "active" ? "inactive" : "active",
                                                                    "status"
                                                                )
                                                            }
                                                        >
                                                            {post.status === "inactive" ? "Deactivate" : "Activate"}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Link to={`/crm/home/blogpost/${post._id}`}>
                                                            <Button
                                                                sx={{
                                                                    position: "static",
                                                                    borderRadius: "20px",
                                                                    border: "1px solid green",
                                                                    color: "green",
                                                                    "&:hover": {
                                                                        backgroundColor: "rgba(0, 255, 0, 0.1)",
                                                                        border: "1px solid darkgreen",
                                                                    },
                                                                }}
                                                            >
                                                                View
                                                            </Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                </Container>

                <ConfirmationModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmation}
                    editData={editData}
                />
            </Container>
        </>
    );
};

export default BlogPostTable;
