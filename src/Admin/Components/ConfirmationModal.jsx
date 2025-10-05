import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
const ConfirmationModal = ({ open, onClose, onConfirm, editData }) => {
  const handleConfirm = () => {
    onConfirm(editData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Backdrop
        open={open}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              insetBlockStart: "50%",
              insetInlineStart: "50%",
              transform: "translate(-50%, -50%)",
              inlineSize: 400,
              bgcolor: "background.paper",
              boxShadow: 3,
              p: 8,
              borderRadius: 4,
              zIndex: 1300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Are you sure?
            </Typography>
            <Typography variant="body1" gutterBottom>
              Change the status to
              <strong> {editData.status}</strong>?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirm}
                sx={{ mr: 2 }}
              >
                Confirm
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Backdrop>
    </Modal>
  );
};

export default ConfirmationModal;
