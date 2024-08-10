import { LandingPage } from "../models/LandingPage.js";

/**
 * A middleware that checks if the request landing pages exists and that the 
 * user requesting it is the owner of the page.
 */
export async function pageAuthorization(req, res, next) {
	const user = req.user;
	const pageID = req.params.pageID;

	// Confirm if page exists:
	if (!(await LandingPage.doesPageExist(pageID))) {
		return res.status(404).send({ message: 'This page does not exist.' });
	}

    // Confirm is user is the owner of this page:
    if (!(await LandingPage.doesUserOwnPage(user.USER_ID, pageID))) {
		return res.status(403).send({ message: 'You have no access to this page.' });
	}

    req.pageID = pageID;
    return next();
}
