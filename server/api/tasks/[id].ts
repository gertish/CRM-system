import { PrismaClient } from "@prisma/client";
import { defineEventHandler, sendError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;
    const id = event.context.params?.id;

    if (!id) {
        return sendError(event, new Error('Не указан ID задачи'));
    }

    if (method === "GET") {
        try {
            const task = await prisma.task.findUnique({
                where: { id }
            });
            return task;
        } catch (e) {
            console.log('Ошибка при получении задачи:', e);
        }
    }

    if (method === 'PATCH') {
        const body = await readBody(event); 

        const { description, dueDate, status } = body;

        if (!description || !dueDate || !status) {
            return sendError(event, new Error("Укажите описание, дату и статус"));
        }

        try {
            const updateTask = await prisma.task.update({
                where: { id },
                data: {
                    description,
                    dueDate: new Date(dueDate), 
                    status
                }
            });
            return updateTask;
        } catch (e) {
            console.log('Ошибка при обновлении задачи:', e);
        }
    }

    if (method === 'DELETE') {
        try {
            await prisma.task.delete({
                where: { id }
            });
        } catch (e) {
            console.log('Ошибка при удалении задачи:', e);
        }
    }
});
