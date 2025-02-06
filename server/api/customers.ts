import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readMultipartFormData, sendError } from "h3";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	const method = event.node.req.method;

	if (method === "GET") {
		try{
			const customers = await prisma.customer.findMany();
			return customers;
		} catch (e) {
			console.log("Ошибка при загрузке заказчиков:", e);
		}
	}

	if (method === "POST") {
		const formData = await readMultipartFormData(event);

		if (!formData) {
			return sendError(event, new Error("Некорректная форма"));
		}

		const customerData: Record<string, any> = {};
		const uploadsDir = path.resolve("public/uploads");

		for (const entry of formData) {
			const { name, data, filename } = entry;

			if (!name) continue;

			if (name === "avatar" && data && filename) {
				const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, "");
				const filePath = path.join(uploadsDir, sanitizedFilename);

				try {
					await fs.mkdir(uploadsDir, { recursive: true });
					await fs.writeFile(filePath, data);
					customerData.avatar = `/uploads/${sanitizedFilename}`;
				} catch (err) {
					return sendError(event, new Error("Не удалось сохранить аватар"));
				}
			} else if (typeof data === "string" || Buffer.isBuffer(data)) {
				customerData[name] = data.toString();
			}
		}

		const finalData = {
			firstName: customerData.firstName || "",
			lastName: customerData.lastName || "",
			email: customerData.email || "",
			phone: customerData.phone || "",
			avatar: customerData.avatar || null,
			streetAddress: customerData.streetAddress || "",
			city: customerData.city || "",
			state: customerData.state || "",
			zipCode: customerData.zipCode || "",
		};

		try {
			const customer = await prisma.customer.create({
				data: finalData,
			});
			return customer;
		} catch (e) {
			console.log("Ошибка при сохранении заказчика:", e);
		}
	}
});
