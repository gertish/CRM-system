import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readMultipartFormData, sendError } from "h3";
import { promises as fs } from "fs";
import * as path from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	const method = event.node.req.method;
	const id = event.context.params?.id;

	if (method === "GET") {
		try {
			const customer = await prisma.customer.findUnique({
				where: { id },
			});
			return customer;
		} catch (error) {
			return sendError(event, new Error("Ошибка при получении клиента"));
		}
	}

	if (method === "DELETE") {
		try {
			await prisma.customer.delete({
				where: { id },
			});
			return { success: true };
		} catch (error) {
			return sendError(event, new Error("Ошибка при удалении клиента"));
		}
	}

	if (method === "PATCH" || method === "PUT") {
		const formData = await readMultipartFormData(event);

		if (!formData) {
			return sendError(event, new Error("Некорректная форма (FormData)"));
		}

		let newAvatarPath: string | undefined;

		for (const entry of formData) {
			const { name, data, filename } = entry;

			if (name === "avatar" && data && filename) {
				const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, "");
				const uploadsDir = path.resolve("public/uploads");
				const filePath = path.join(uploadsDir, sanitizedFilename);

				try {
					await fs.mkdir(uploadsDir, { recursive: true });
					await fs.writeFile(filePath, data);
					newAvatarPath = `/uploads/${sanitizedFilename}`;
				} catch (err) {
					return sendError(event, new Error("Ошибка при сохранении аватара"));
				}
			}
		}

		try {
			const updatedCustomer = await prisma.customer.update({
				where: { id },
				data: {
					...(newAvatarPath && { avatar: newAvatarPath }),
				},
			});
			return updatedCustomer;
		} catch (error) {
			return sendError(event, new Error("Ошибка при обновлении клиента"));
		}
	}

	return sendError(event, new Error(`Метод ${method} не поддерживается.`));
});
