import { LandingPage } from '../../../models/LandingPage.js';

export const get = async (req, res) => {
	let pageID = req.params.pageID;

	//? NOTE: still need to test
    // need to ensure only a hash is given
	if (isNaN(pageID)) {
		pageID = decodeNum(pageID);
	}

	// Confirm if page exists:
	if (!(await LandingPage.doesPageExist(pageID))) {
		return res.status(404).send({ message: 'This page does not exist.' });
	}

	const result = await LandingPage.getPageDetails(pageID);

	return res.status(200).send({ message: 'Landing page details found.', value: result });
};
