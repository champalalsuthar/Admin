import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography, Box, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/system";
import SITE_CONFIG from "../../Controller/SiteController";
import { toast } from "react-toastify";

const InputStyled = styled("input")({
  display: "none",
});

const ImagePreview = styled("img")(() => ({
  inlineSize: "100%",
  blockSize: "100%",
  objectFit: "cover",
  borderRadius: "8px",
}));

const UploadContainer = styled(Box)(({ width, height, dragOver }) => ({
  inlineSize: width || "300px",
  blockSize: height || "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  cursor: "pointer",
  backgroundColor: "#f9f9f9",
  position: "relative",
  transition: "background-color 0.3s ease",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
  "&.drag-over": {
    backgroundColor: "#e0e0e0",
    borderColor: "#bbb",
  },
}));

const RemoveButton = styled(IconButton)({
  position: "absolute",
  insetBlockStart: "0px",
  insetInlineEnd: "0px",
});

const AddButton = styled(Button)({
  zIndex: 1,
});

const ImageUpload = ({
  InitialImage = null,
  handleImageSet,
  maxSizeMB = 2,
  onUploadSuccess,
  width,
  height,
  index,
}) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const { apiIPMongo, apiToken } = SITE_CONFIG;
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (InitialImage) {
      setImage(InitialImage);
    }
  }, [InitialImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB.`);
      return;
    }
    setError(null);
    uploadImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    handleImageSet("");
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await axios.post(`${apiIPMongo}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          AuthToken: AuthToken,
          "Content-Type": "multipart/form-data",
        },
      });
      setUploading(false);

      if (response.data.message === "Success") {
        setImage(response.data.url);
        handleImageSet(response.data.url);
        toast.success(`Image Uploaded Successfully`, { autoClose: 500 });
        setError(null);
        if (onUploadSuccess) onUploadSuccess(response.data);
      } else {
        setError("Failed to upload image. Please try again.");
        toast.error(`${response.data.message}`, { autoClose: 500 });
      }
    } catch (err) {
      setUploading(false);
      setError("Failed to upload image. Please try again.");
      toast.error(`${err.message}`, { autoClose: 500 });
    }
  };

  return (
    <UploadContainer
      width={width}
      height={height}
      className={dragOver ? "drag-over" : ""}
      onDrop={handleDrop}
      onDragOver={(event) => {
        event.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
    >
      <label htmlFor={`file-upload-${index}`}>
        <InputStyled
          accept={"image/*"}
          id={`file-upload-${index}`}
          type="file"
          onChange={handleFileChange}
        />
        {!image && (
          <AddButton
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            component="span"
            disabled={uploading}
          >
            Upload Image
          </AddButton>
        )}
        {image && (
          <>
            <ImagePreview
              src={`${image}`}
              alt="Preview"
              width={width}
              height={height}
            />
            <RemoveButton color="error" onClick={handleRemoveImage}>
              <CancelIcon />
            </RemoveButton>
          </>
        )}
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </label>
    </UploadContainer>
  );
};

export default ImageUpload;
