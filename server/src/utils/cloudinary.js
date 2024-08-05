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

export async function uploadImg(imgURL) {
	// Upload an image
	console.log(imgURL);
	const uploadResult = await cloudinary.uploader.upload(imgURL).catch((error) => {
		console.log(error);
	});

	console.log(uploadResult);
	return uploadResult.public_id;
}

export async function getImgURL(publicId) {
	// Optimize delivery by resizing and applying auto-format and auto-quality
	const optimizeUrl = cloudinary.url(publicId, {
		fetch_format: 'auto',
		quality: 'auto',
	});

	console.log(optimizeUrl);
	return optimizeUrl;
}
