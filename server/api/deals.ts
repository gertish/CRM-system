import { PrismaClient } from "@prisma/client";
import { defineEventHandler, readMultipartFormData, sendError, getQuery } from "h3";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	const method = event.node.req.method;

	if (method === "GET") {
		try {
			const deals = await prisma.deal.findMany({
				include: {
					customer: true,
				},
			});
			return deals;
		} catch (error) {
			console.error("Ошибка при загрузке сделок:", error);
			return sendError(event, new Error("Ошибка при получении сделок"));
		}
	}

	if (method === "POST") {
		const formData = await readMultipartFormData(event);

		if (!formData) {
			return sendError(event, new Error("Некорректная форма"));
		}

		const dealData: Record<string, any> = {};
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
					dealData.avatar = `/uploads/${sanitizedFilename}`;
				} catch (err) {
					return sendError(event, new Error("Не удалось сохранить аватар"));
				}
			} else if (typeof data === "string" || Buffer.isBuffer(data)) {
				dealData[name] = data.toString();
			}
		}

		const finalDealData = {
			customerId: dealData.customerId || "",
			streetAddress: dealData.streetAddress || "",
			city: dealData.city || "",
			state: dealData.state || "",
			zipCode: dealData.zipCode || "",
			roomArea: parseFloat(dealData.roomArea || "0"),
			numberOfPeople: parseInt(dealData.numberOfPeople || "0", 10),
			appointmentDate: new Date(dealData.appointmentDate || ""),
			specialInstructions: dealData.specialInstructions || "",
			roomAccess: dealData.roomAccess || "",
			price: parseFloat(dealData.price || "0"),
			status: dealData.status || "In Progress",
			avatar: dealData.avatar || null,
		};
		try {
			const deal = await prisma.deal.create({
				data: finalDealData,
			});
			return deal
		} catch (error) {
			console.error("Ошибка при сохранении сделки:", error);
		}
	}
});
