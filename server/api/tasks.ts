import { PrismaClient } from "@prisma/client";
import { defineEventHandler, sendError, readBody } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	const method = event.node.req.method;

	if (method === "GET") {
		try {
			const tasks = await prisma.task.findMany();
			return tasks;
		} catch (error) {
			console.error("Ошибка загрузки задач:", error);
		}
	}

	if (method === "POST") {
		try {
			const body = await readBody(event);

			const { description, dueDate, status } = body;

			if (!description || !dueDate) {
				return sendError(event, new Error("Описание и дата выполнения обязательны"));
			}

			const task = await prisma.task.create({
				data: {
					description,
					dueDate: new Date(dueDate),
					status: status || "Pending",
				},
			});
			return task;
		} catch (error) {
			console.error("Ошибка при создании задачи:", error);
		}
	}
});
