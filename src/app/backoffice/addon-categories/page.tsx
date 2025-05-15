import ItemCard from "@/components/ItemCard";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import ClassIcon from "@mui/icons-material/Class";
import { prisma } from "@/libs/prisma";

export default async function AddonCategories() {
  const addonCategories = await prisma.addonCategories.findMany();
  return (
    <>
      <Box
        sx={{
          display: "flex",

          justifyContent: "flex-end",
        }}
      >
        <Link href={"/backoffice/addon-categories/new"}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1D3557",
              "&:hover": { bgcolor: "#2d4466" },
            }}
          >
            New addon category
          </Button>
        </Link>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
        {addonCategories.map((addonCategory) => (
          <ItemCard
            key={addonCategory.id}
            icon={<ClassIcon fontSize="large" />}
            title={addonCategory.name}
            href={`/backoffice/addon-categories/${addonCategory.id}`}
            isAvailable
          />
        ))}
      </Box>
    </>
  );
}
