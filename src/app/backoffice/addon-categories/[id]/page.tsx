import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { deleteAddonCategory, updateAddonCategory } from "../action";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdateAddonCategoryPage({ params }: Props) {
  const { id } = await params
  const addonCategory = await prisma.addonCategories.findUnique({
    where: { id: Number(id) },
    include: { menuAddonCategories: true },
  });

  if (!addonCategory) {
    return (
      <Typography color="error" mt={4}>
        Addon Category not found.
      </Typography>
    );
  }

  const menus = await prisma.menus.findMany();
  const selectedMenuIds = addonCategory.menuAddonCategories.map((data) =>
    Number(data.menuId)
  );

  return (
    <Paper elevation={2} sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Update Addon Category
      </Typography>

      {/* Delete Form */}
      <Box
        component="form"
        action={deleteAddonCategory}
        sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}
      >
        <input type="hidden" name="id" value={id} />
        <Button variant="outlined" color="error" type="submit">
          Delete Category
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Update Form */}
      <Box
        component="form"
        action={updateAddonCategory}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <input type="hidden" name="id" value={id} />

        <TextField
          name="name"
          label="Category Name"
          defaultValue={addonCategory.name}
          required
        />

        <Box>
          <Typography fontWeight={500} gutterBottom>
            Select Menus
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              padding: 2,
              backgroundColor: "#fafafa",
            }}
          >
            {menus.map((menu) => (
              <FormControlLabel
                key={menu.id}
                control={
                  <Checkbox
                    name="menus"
                    value={menu.id}
                    defaultChecked={selectedMenuIds.includes(Number(menu.id))}
                  />
                }
                label={menu.name}
              />
            ))}
          </Box>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              name="isRequired"
              defaultChecked={addonCategory.isRequired ?? false}
            />
          }
          label="Is Required"
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            alignSelf: "flex-start",
            bgcolor: "#1D3557",
            "&:hover": { bgcolor: "#2d4466" },
          }}
        >
          Update Addon Category
        </Button>
      </Box>
    </Paper>
  );
}
