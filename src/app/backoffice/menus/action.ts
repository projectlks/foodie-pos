"use server"

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function createMenu(formData: FormData) {

    const name = formData.get('name');
    const price = formData.get('price');
    const isAvailable = formData.get('isAvailable')




    await prisma.menus.create({
        data: {
            name: String(name),
            price: Number(price),
            isAvailable: isAvailable === "on" ? true : false,
        },
    });

    redirect("/backoffice/menus");

}


export async function updateMenu(formData: FormData) {
    const id = formData.get('id')
    const name = formData.get('name');
    const price = formData.get('price');
    const isAvailable = formData.get('isAvailable')

    await prisma.menus.update({
        where: { id: Number(id) },
        data: {
            name: String(name),
            price: Number(price),
            isAvailable: isAvailable === "on" ? true : false,
        },
    });

    redirect("/backoffice/menus");

}

export async function deleteMenu(formData: FormData) {

    const id = formData.get('id')

    await prisma.menuCategoriesMenus.deleteMany({
        where: {
            menuId: Number(id)
        }
    })
    await prisma.menus.delete({
        where: {
            id: Number(id)
        }
    })
    redirect("/backoffice/menus");
}