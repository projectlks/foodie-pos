"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { config } from "@/config";
import { useRouter } from "next/navigation";
import { MenuCategories, Menus } from "@prisma/client";
import MultiSelect from "@/components/MultiSelect";

export default function NewMenuPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const defaultMenu = { name: "", price: 0, isAvailable: true };
  const [newMenu, setNewMenu] = useState<Partial<Menus>>(defaultMenu);
  const router = useRouter();

  useEffect(() => {
    getMenuCategories();
  }, []);

  const getMenuCategories = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menu-categories`);
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
  };

  const handleCreateMenu = async () => {
    const isValid = newMenu.name && selected;
    if (!isValid) return alert("Required menu name and menu category");
    await fetch(`${config.backofficeApiUrl}/menus`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...newMenu, menuCategoryIds: selected }),
    });
    router.push("/backoffice/menus");
  };

  return (
    <>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          placeholder="Name"
          onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
        />
        <TextField
          placeholder="Price"
          sx={{ my: 2 }}
          onChange={(evt) =>
            setNewMenu({ ...newMenu, price: Number(evt.target.value) })
          }
        />
        <MultiSelect
          title="Menu Category"
          selected={selected}
          setSelected={setSelected}
          items={menuCategories}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Available"
          onChange={(evt, value) =>
            setNewMenu({ ...newMenu, isAvailable: value })
          }
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 3 }}
          onClick={handleCreateMenu}
        >
          Create
        </Button>
      </Box>
    </>
  );
}
