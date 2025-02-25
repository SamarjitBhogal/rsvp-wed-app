import { useNavigate, useParams } from 'react-router-dom';

import styles from './landing-page.module.css';
import SAMPLE_PHOTO from '../../assets/sample1.jpeg';

const LandingPage = () => {
	const { eventName } = useParams();
	const navigate = useNavigate();

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center'>
			<header className='w-full bg-white shadow-md p-4'>
				<h1 className='text-2xl md:text-4xl font-bold text-center text-gray-800'>Priya & Hameet</h1>
			</header>

			<main className='flex-grow w-full max-w-4xl p-6 md:p-12 flex flex-col items-center'>
				<div className='w-full flex justify-center mb-6'>
					<img
						src={SAMPLE_PHOTO} // TODO: Replace with actual wedding photo
						alt='John & Jane'
						className='rounded-lg shadow-md w-full max-w-md'
					/>
				</div>

				<button
					type='button'
					className='primaryBtn text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-6'
					onClick={() => navigate(`/event/${eventName}/rsvp`)}>
					RSVP Now
				</button>

				<div className='text-center text-gray-700'>
					<p className='text-lg mb-2'>Join us in celebrating our special day!</p>
					<p className='text-md'>
						<strong>Date:</strong> June 15, 2024
					</p>
					<p className='text-md'>
						<strong>Location:</strong> Willow Creek Estate, Springfield
					</p>
				</div>
			</main>

			<footer className='w-full h-16 bg-white shadow-t-md' />
		</div>
	);
};

export default LandingPage;
