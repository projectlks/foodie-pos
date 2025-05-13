"use client";
import { Box, Button, TextField } from "@mui/material";
import { newMenuCategory } from "../action";

export default function NewMenuPage() {
  return (
    <form action={newMenuCategory}>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
        <TextField placeholder="Name" name="menuCategory" />

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#1D3557",
            width: "fit-content",
            mt: 3,
            "&:hover": { bgcolor: "#2d4466" },
          }}
        >
          Create
        </Button>
      </Box>
    </form>
  );
}
