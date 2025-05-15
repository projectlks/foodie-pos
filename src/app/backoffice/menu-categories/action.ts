"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

// Update existing menu category
export async function updateMenuCategory(formData: FormData) {
    const id = formData.get("id");
    const name = formData.get("categoryName");

    // Ensure that 'id' and 'name' are valid
    if (!id || !name || typeof name !== "string") {
        throw new Error("Invalid form data");
    }

    await prisma.menuCategories.update({
        where: {
            id: Number(id), // Convert id to number
        },
        data: {
            name: name.trim(), // Ensure no leading/trailing spaces
        },
    });

    // Redirect after updating
    redirect("/backoffice/menu-categories");
}

// Create a new menu category
export async function newMenuCategory(formData: FormData) {
    const name = formData.get("menuCategory");

    // Validate that the name is a valid string
    if (!name || typeof name !== "string") {
        throw new Error("Invalid category name");
    }

    await prisma.menuCategories.create({
        data: {
            name: name.trim(),
        },
    });

    redirect("/backoffice/menu-categories");
}


export async function deleteMenuCategory(formData: FormData) {

    const id = formData.get("id")

    

    await prisma.menuCategoriesMenus.deleteMany(
        {
            where: {
                menuCategoryId: Number(id)
            }
        }
    )


    await prisma.menuCategories.delete({
        where: { id: Number(id) }
    })
    redirect("/backoffice/menu-categories");

}