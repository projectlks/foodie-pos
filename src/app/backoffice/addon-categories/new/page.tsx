import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { prisma } from "@/libs/prisma";
import { createAddonCategory } from "../action";

export default async function NewAddonCategoryPage() {
  const menus = await prisma.menus.findMany();

  return (
    <Box
      component={"form"}
      action={createAddonCategory}
      sx={{ mt: 2, display: "flex", flexDirection: "column" }}
    >
      <TextField placeholder="Name" name="name" />
      <Box sx={{ my: 2 }}>
        <Typography>Menus</Typography>
        <Box
          sx={{
            border: "1px solid lightgray",
            px: 1.2,
            py: 1,
            borderRadius: 1,
          }}
        >
          {menus.map((menu) => (
            <FormControlLabel
              key={menu.id}
              control={<Checkbox name="menus" value={menu.id} />}
              label={menu.name}
            />
          ))}
        </Box>
      </Box>
      <FormControlLabel
        control={<Checkbox defaultChecked name="isRequired" />}
        label="is Required"
      />
      <Button
        variant="contained"
        type="submit"
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
  );
}
