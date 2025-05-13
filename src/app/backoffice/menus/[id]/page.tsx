"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { config } from "@/config";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { MenuCategories, MenuCategoriesMenus, Menus } from "@prisma/client";
import MultiSelect from "@/components/MultiSelect";

interface Props {
  params: {
    id: string;
  };
}

export default function MenuUpdatePage({ params }: Props) {
  const [menu, setMenu] = useState<Menus>();
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      getMenu();
      getMenuCategories();
    }
  }, [id]);

  const getMenu = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menus/${id}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    const dataFromServer = await response.json();
    const { menu } = dataFromServer;
    const selected = menu.menuCategoriesMenus.map(
      (item: MenuCategoriesMenus) => item.menuCategoryId
    );
    setSelected(selected);
    setMenu(menu);
  };

  const getMenuCategories = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menu-categories`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
  };

  const handleUpdateMenu = async () => {
    await fetch(`${config.backofficeApiUrl}/menus`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...menu, menuCategoryIds: selected }),
    });
    router.push("/backoffice/menus");
  };

  const handleDeleteMenu = async () => {
    await fetch(`${config.backofficeApiUrl}/menus/${id}`, {
      headers: { "content-type": "application/json" },
      method: "DELETE",
    });
    router.push("/backoffice/menus");
  };

  if (!menu) return null;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          color="error"
          onClick={handleDeleteMenu}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          value={menu.name}
          onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
        />
        <TextField
          value={menu.price}
          sx={{ my: 2 }}
          onChange={(evt) =>
            setMenu({ ...menu, price: Number(evt.target.value) })
          }
        />
        <MultiSelect
          title="Menu Category"
          selected={selected}
          setSelected={setSelected}
          items={menuCategories}
        />
        <FormControlLabel
          control={<Checkbox checked={menu.isAvailable ? true : false} />}
          label="Available"
          onChange={(evt, value) => setMenu({ ...menu, isAvailable: value })}
        />

        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 3 }}
          onClick={handleUpdateMenu}
        >
          Update
        </Button>
      </Box>
    </>
  );
}
