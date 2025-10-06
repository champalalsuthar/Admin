import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    MenuItem,
    InputAdornment,
    Stack,
    CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import { editAdmin } from "../../../API/admin/editAdmin";
import { addAdmin } from "../../../API/admin/addAdmin";
import { fetchAdminById } from "../../../API/admin/fetchAdminById";

const AddEditAdmins = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const [adminData, setAdminData] = useState({
        Username: "",
        email: "",
        password: "",
        mobile: "",
        role: "admin",
        status: "active",
    });

    useEffect(() => {
        if (id) {
            const fetchAdminData = async () => {
                try {
                    setLoading(true);
                    const data = await fetchAdminById(id);
                    setAdminData(data?.data);
                } catch (error) {
                    console.error("Error fetching admin data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAdminData();
        }
    }, [id]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === "mobile") {
            const newValue = value.replace(/\D/g, '');
            setAdminData({ ...adminData, [name]: newValue });
        } else {
            setAdminData({ ...adminData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                let finalAdminData = { ...adminData };
                const result = id
                    ? await editAdmin(finalAdminData)
                    : await addAdmin(finalAdminData);
                if (result.success || result.message === "Success") {
                    toast.success(`Admin ${id ? "updated" : "added"} successfully!`);
                    navigate("/crm/home/admin/table");
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error("Error submitting admin data:", error);
                toast.error(error.message);
            }
        }
    };

    const validate = () => {
        let isValid = true;
        const tempErrors = {};

        if (adminData.Username?.trim() === "") {
            tempErrors.Username = "User Name is required";
            isValid = false;
        }

        if (adminData.email?.trim() === "") {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(adminData.email)) {
            tempErrors.email = "Email is invalid";
            isValid = false;
        }

        if (adminData.password?.trim() === "") {
            tempErrors.password = "Password is required";
            isValid = false;
        }

        if (adminData.mobile?.trim() === "") {
            tempErrors.mobile = "Mobile number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(adminData.mobile)) {
            tempErrors.mobile = "Mobile number must be 10 digits";
            isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
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
                onClick={() => navigate("/crm/home/admin/table")}
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
                        {id ? "Manage Admin" : "Add New Admin"}
                    </Typography>


                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                            <TextField
                                label="User Name"
                                name="Username"
                                variant="outlined"
                                onChange={handleOnChange}
                                value={adminData.Username}
                                error={!!errors.Username}
                                helperText={errors.Username}
                                disabled={!!id}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Email"
                                name="email"
                                variant="outlined"
                                onChange={handleOnChange}
                                value={adminData.email}
                                error={!!errors.email}
                                helperText={errors.email}
                                fullWidth
                                required
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                            <TextField
                                required
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                value={adminData.password}
                                onChange={handleOnChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                onClick={handleClickShowPassword}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                fullWidth
                            />
                            <TextField
                                label="Contact No"
                                name="mobile"
                                variant="outlined"
                                value={adminData.mobile}
                                onChange={handleOnChange}
                                error={!!errors.mobile}
                                helperText={errors.mobile}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                            <TextField
                                select
                                label="Status"
                                name="status"
                                variant="outlined"
                                value={adminData.status}
                                onChange={handleOnChange}
                                error={!!errors.status}
                                helperText={errors.status}
                                fullWidth
                                required
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="deactive">Deactive</MenuItem>
                            </TextField>
                        </Box>

                        <Box textAlign={"center"}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ insetBlockStart: 2 }}
                                onClick={handleSubmit}
                            >
                                {id ? "UPDATE" : "ADD"}
                            </Button>
                        </Box>
                    </Stack>

                </Box>
            </Container>
        </>
    );
};

export default AddEditAdmins;
