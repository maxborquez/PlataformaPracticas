import React from "react";
import { Card, CardContent, IconButton, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const CardAddBitacora = ({ onClick }) => {
  return (
    <Card
      sx={{
        bgcolor: "#F0F0F0",
        width: "150px",
        height: "160px",
        marginTop: "45px",
        marginBottom: "15px",
        marginLeft: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "border 0.3s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          border: "1px solid black",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "100%",
        }}
      >
        <IconButton
          color="primary"
          onClick={onClick}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            '&:hover': {
              backgroundColor: "#1565c0",
            },
            marginBottom: "45px"
          }}
        >
          <AddIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CardAddBitacora;