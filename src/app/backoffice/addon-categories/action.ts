"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

// Create new addon category with associated menus
export async function createAddonCategory(formdata: FormData) {
    const name = formdata.get("name");
    const menus = formdata.getAll("menus");
    const isRequired = formdata.get("isRequired") != null;

    if (typeof name !== "string" || !name.trim()) {
        throw new Error("Invalid name provided");
    }

    const addonCategory = await prisma.addonCategories.create({
        data: {
            name: name.trim(),
            isRequired,
        },
    });

    const menuIds = menus.map((id) => Number(id)).filter((id) => !isNaN(id));

    if (menuIds.length === 0) return;

    const data = menuIds.map((menuId) => ({
        menuId,
        addonCategoryId: addonCategory.id,
    }));

    await prisma.menusAddonCategories.createMany({ data });

    redirect("/backoffice/addon-categories");
}

// Delete addon category and associated menu relations
export async function deleteAddonCategory(formdata: FormData) {
    const id = formdata.get("id");

    if (!id || typeof id !== "string") return;

    const addonCategoryId = Number(id);
    if (isNaN(addonCategoryId)) return;

    await prisma.menusAddonCategories.deleteMany({
        where: { addonCategoryId },
    });

    await prisma.addonCategories.delete({
        where: { id: addonCategoryId },
    });

    redirect("/backoffice/addon-categories");
}

// Update addon category info and sync associated menus
export async function updateAddonCategory(formdata: FormData) {
    const id = formdata.get("id");
    const name = formdata.get("name") as string;
    const isRequired = formdata.get("isRequired") != null;
    const updateMenusArray = formdata
        .getAll("menus")
        .map((id) => Number(id))
        .filter((id) => !isNaN(id));

    if (!id || typeof name !== "string") return;

    const addonCategoryId = Number(id);

    // Fetch existing menu relations for this addonCategory
    const existingData = await prisma.menusAddonCategories.findMany({
        where: { addonCategoryId },
    });

    const existingMenus = existingData.map((item) => item.menuId);

    // Check if menus arrays are the same
    const isSame =
        updateMenusArray.length === existingMenus.length &&
        updateMenusArray.every((id) => existingMenus.includes(id));

    if (!isSame) {
        // Menus to add and remove
        const toAdd = updateMenusArray.filter((id) => !existingMenus.includes(id));
        const toRemove = existingMenus.filter((id) => !updateMenusArray.includes(id));

        if (toAdd.length > 0) {
            const addData = toAdd.map((menuId) => ({
                menuId,
                addonCategoryId,
            }));

            await prisma.menusAddonCategories.createMany({
                data: addData,
            });
        }

        if (toRemove.length > 0) {
            await prisma.menusAddonCategories.deleteMany({
                where: {
                    addonCategoryId,
                    menuId: {
                        in: toRemove,
                    },
                },
            });
        }
    }

    // Update the addon category itself
    await prisma.addonCategories.update({
        where: { id: addonCategoryId },
        data: {
            name: name.trim(),
            isRequired,
        },
    });

    redirect("/backoffice/addon-categories");
}
