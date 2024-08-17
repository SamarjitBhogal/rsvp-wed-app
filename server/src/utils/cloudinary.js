import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();

export const defaultImg = process.env.DEFAULT_LANDINGPG_IMG;

// Configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 * Uploads an image to the cloundinary database.
 *
 * @param {string} imgURL The image URL of it's local location.
 * @returns
 */
export async function uploadImg(imgURL) {
	// Upload an image
	console.log(imgURL);
	const uploadResult = await cloudinary.uploader.upload(imgURL).catch((error) => {
		console.log(error);
	});

	return uploadResult.public_id;
}

/**
 * Retrives an image associated with the given publicId.
 *
 * @param {string} publicId The cloundinary publicId of the image.
 * @returns
 */
export async function getImgURL(publicId) {
	// Optimize delivery by resizing and applying auto-format and auto-quality
	const optimizeUrl = cloudinary.url(publicId, {
		fetch_format: 'auto',
		quality: 'auto',
	});

	return optimizeUrl;
}

/**
 * Deletes the image with the given publicId from the database.
 *
 * @param {string} publicId The cloundinary publicId of the image.
 */
export async function deleteImg(publicId) {
	const result = await cloudinary.uploader.destroy(publicId);
	return result;
}
