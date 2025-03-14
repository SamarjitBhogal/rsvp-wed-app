import { useNavigate, useParams } from 'react-router-dom';

import styles from './landing-page.module.css';
import ENGAGEMENT_PHOTO from '../../assets/engagement.jpg';
import { sendMail } from '../../utils/sendMail.js';

// TODO: envs or event details api
const LandingPage = () => {
	const { eventName } = useParams();
	const navigate = useNavigate();

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center'>
			<main className='flex-grow w-full max-w-4xl p-6 md:p-12 flex flex-col items-center'>
				<div className='w-full flex justify-center mb-6'>
					<img src={ENGAGEMENT_PHOTO} alt='John & Jane' className='rounded-lg shadow-md w-full max-w-md' />
				</div>

				<button
					type='button'
					className='primaryBtn text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-6'
					onClick={() => navigate(`/event/${eventName}/rsvp`)}>
					RSVP Now
				</button>

				<button
					type='button'
					className='primaryBtn text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-6'
					onClick={() => sendMail()}>
					send mail
				</button>

				<div className='text-center text-gray-700'>
					<p className='text-lg mb-2'>We want you to join us for the following events:</p>
					<div className='relative flex flex-col rounded-xl bg-white outline outline-1 outline-gray-300 pr-4 pl-4  py-4'>
						<h1 className='text-2xl md:text-4xl font-bold text-center'>Ladies Sangeet</h1>
						<div className='mt-2 text-md'>
							<h3 className='my-2 text-xl md:text-2xl font-bold text-center'>Date:</h3> Thursday, July 31,
							2025
							<br />
							<h3 className='my-2 text-xl md:text-2xl font-bold text-center'>Time:</h3> 6:30 divM
						</div>
					</div>
					<div className='mt-5 relative flex flex-col rounded-xl bg-white outline outline-1 outline-gray-300 pr-4 pl-4 py-4'>
						<h1 className='text-2xl md:text-4xl font-bold text-center'>Wedding Ceremony</h1>
						<div className='mt-2 text-md'>
							<h3 className='my-2 text-xl md:text-2xl font-bold text-center'>Date:</h3> Saturday, August
							02, 2025
							<br />
							<h3 className='my-2 text-xl md:text-2xl font-bold text-center'>Agenda:</h3>
							<p>Reception of Barat: 9:00 AM</p>
							<p>Anand Karaj: 11:00 AM</p>
							<p>Lunch: 12:30 PM</p>
						</div>
					</div>
				</div>
			</main>

			<footer className='w-full h-16 bg-white shadow-t-md' />
		</div>
	);
};

export default LandingPage;
