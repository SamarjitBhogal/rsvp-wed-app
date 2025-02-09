// TODO: make a send mail route called seperatly. util from client will prepare html and send it to a api call which will call this route

import { accessGuard } from "../../../../middleware/authenticate.js";
import StatusCodes from 'http-status-codes';

export const post = [
    accessGuard,
    async (req, res) => {
        // joi verified

        const { email, html } = req.body;

        try {
            await sendEventMail(email, html);
            return res.status(StatusCodes.OK).send({ message: 'An email has been sent for your RSVP.' });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).send({ message: error });
        }
    }
]