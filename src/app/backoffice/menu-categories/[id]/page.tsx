import { prisma } from "@/libs/prisma";
import { Box, Button, TextField, Typography } from "@mui/material";
import { deleteMenuCategory, updateMenuCategory } from "../action";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdateMenuCategoryPage(props: Props) {
  const menuCategory = await prisma.menuCategories.findFirst({
    where: { id: Number(props.params.id) },
  });

  if (!menuCategory) {
    return <div>Menu category not found.</div>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Update Category
      </Typography>

      {/* Update Category Form */}
      <form action={updateMenuCategory}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <input type="hidden" name="id" value={props.params.id} />
          <TextField
            name="categoryName"
            defaultValue={menuCategory.name}
            placeholder="Enter category name"
            fullWidth
            variant="outlined"
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#1D3557",
              width: "100%",
              "&:hover": { bgcolor: "#2d4466" },
            }}
          >
            Update Category
          </Button>
        </Box>
      </form>

      {/* Delete Category Button */}
      <Box
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        component="form"
        action={deleteMenuCategory}
      >
        <input type="hidden" name="id" value={props.params.id} />
        <Button
          type="submit"
          variant="outlined"
          color="error"
          sx={{
            width: "100%",
            "&:hover": { bgcolor: "#E91E63", color: "#fff" },
          }}
        >
          Delete Category
        </Button>
      </Box>
    </Box>
  );
}
