import { fileURLToPath } from "node:url";
import handlebars from "handlebars";
import fs from "node:fs";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getEmailTemplate = (subEventName, firstName, lastName) => {
	let templatePath = "";

	if (subEventName.toLowerCase().includes("wedding")) {
		templatePath = path.join(
			__dirname,
			"..",
			"..",
			"assets",
			"email",
			"wedding.html",
		);
	} else {
		templatePath = path.join(
			__dirname,
			"..",
			"..",
			"assets",
			"email",
			"sangeet.html",
		);
	}

	const source = fs.readFileSync(templatePath, "utf8");
	const template = handlebars.compile(source);

	const data = {
		firstName,
		lastName,
	};

	const htmlContent = template(data);

	return htmlContent;
};
