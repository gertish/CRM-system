import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readMultipartFormData, sendError, getRouterParam } from "h3";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    
    const id = getRouterParam(event, "id");
    if (!id) {
        return sendError(event, new Error("Не указан ID сделки"));
    }

    if (method === "GET") {
        try {
        
            const deal = await prisma.deal.findUnique({
                where: { id },
                include: { customer: true },
            });
            if (!deal) {
                return sendError(event, new Error("Сделка не найдена"));
            }
            return deal;
        } catch (error) {
            console.error("Ошибка при получении сделки:", error);
            return sendError(event, new Error("Ошибка при получении сделки"));
        }
    }

    if (method === "PATCH") {
        
        const formData = await readMultipartFormData(event);
        if (!formData) {
            return sendError(event, new Error("Некорректная форма для PATCH"));
        }

        const uploadsDir = path.resolve("public/uploads");
        const updateData: Record<string, any> = {};



        for (const entry of formData) {
            const { name, data, filename } = entry;
            if (!name) continue;

            if (name === "avatar" && data && filename) {
                const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, "");
                const filePath = path.join(uploadsDir, sanitizedFilename);
                try {
                    await fs.mkdir(uploadsDir, { recursive: true });
                    await fs.writeFile(filePath, data);
                    updateData.avatar = `/uploads/${sanitizedFilename}`;
                } catch (err) {
                    return sendError(event, new Error("Не удалось сохранить аватар"));
                }
            } else {
                updateData[name] = data.toString();
            }
        }


        if (updateData.roomArea) {
            updateData.roomArea = parseFloat(updateData.roomArea);
        }
        if (updateData.numberOfPeople) {
            updateData.numberOfPeople = parseInt(updateData.numberOfPeople, 10);
        }
        if (updateData.appointmentDate) {
            updateData.appointmentDate = new Date(updateData.appointmentDate);
        }
        if (updateData.price) {
            updateData.price = parseFloat(updateData.price);
        }

        try {
            const updatedDeal = await prisma.deal.update({
                where: { id },
                data: updateData,
            });
            return updatedDeal;
        } catch (error) {
            console.error("Ошибка при обновлении сделки:", error);
            return sendError(event, new Error("Ошибка при обновлении сделки"));
        }
    }

    if (method === "DELETE") {
        try {
            await prisma.deal.delete({ where: { id } });
            return { message: "Сделка успешно удалена" };
        } catch (error) {
            console.error("Ошибка при удалении сделки:", error);
            return sendError(event, new Error("Ошибка при удалении сделки"));
        }
    }

});
