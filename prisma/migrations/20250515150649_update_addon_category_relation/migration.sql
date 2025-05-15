/*
  Warnings:

  - You are about to drop the `Addon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuAddonCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Addon" DROP CONSTRAINT "Addon_addonCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuAddonCategories" DROP CONSTRAINT "MenuAddonCategories_addonCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuAddonCategories" DROP CONSTRAINT "MenuAddonCategories_menuId_fkey";

-- AlterTable
ALTER TABLE "AddonCategories" ADD COLUMN     "isRequired" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Addon";

-- DropTable
DROP TABLE "MenuAddonCategories";

-- CreateTable
CREATE TABLE "Addons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "addonCategoryId" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Addons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenusAddonCategories" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "addonCategoryId" INTEGER NOT NULL,

    CONSTRAINT "MenusAddonCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Addons" ADD CONSTRAINT "Addons_addonCategoryId_fkey" FOREIGN KEY ("addonCategoryId") REFERENCES "AddonCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenusAddonCategories" ADD CONSTRAINT "MenusAddonCategories_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenusAddonCategories" ADD CONSTRAINT "MenusAddonCategories_addonCategoryId_fkey" FOREIGN KEY ("addonCategoryId") REFERENCES "AddonCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
