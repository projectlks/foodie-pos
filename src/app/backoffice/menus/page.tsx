"use client";

import MenuCard from "@/components/MenuCard";
import { config } from "@/config";
import { Box, Button } from "@mui/material";
import { Menus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenusPage() {
  const [menus, setMenus] = useState<Menus[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menus`);
    const dataFromServer = await response.json();
    const { menus } = dataFromServer;
    setMenus(menus);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1D3557",
            "&:hover": { bgcolor: "#2d4466" },
          }}
          onClick={() => router.push("/backoffice/menus/new")}
        >
          New menu
        </Button>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </Box>
    </>
  );
}
