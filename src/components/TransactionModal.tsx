import { Modal, Box, TextField, Typography, Button } from "@mui/material";

import { useState } from "react";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (value: any) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [savedamount, setSavedamount] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: any) => {
    setSavedamount(e.target.value);
    setError("");
  };

  const handleSaveClick = () => {
    if (!savedamount) {
      setError("Please enter a deposit value.");
    } else {
      onSave(savedamount);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 2,
          width: 300,
          bgcolor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Deposit Form
        </Typography>
        {/* <form onSubmit={handleSubmit(handleUpdateSavedAmount)}> */}
        <TextField
          type="number"
          label="Deposit Value"
          value={savedamount}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error}
        />
        {/* </form> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button variant="outlined" onClick={handleSaveClick}>
            Deposit
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
