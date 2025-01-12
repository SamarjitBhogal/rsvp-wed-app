import { useNavigate, useParams } from 'react-router-dom';

import styles from './landing-page.module.css';
import SAMPLE_PHOTO from '../../assets/sample1.jpeg';

// check auth, only auth users can come here.

const LandingPage = () => {
	const { eventName } = useParams();
	const navigate = useNavigate();

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center'>
			{/* Header */}
			<header className='w-full bg-white shadow-md p-4'>
				<h1 className='text-2xl md:text-4xl font-bold text-center text-gray-800'>{eventName}</h1>
			</header>

			{/* Body */}
			<main className='flex-grow w-full max-w-4xl p-6 md:p-12 flex flex-col items-center'>
				{/* Photo */}
				<div className='w-full flex justify-center mb-6'>
					<img
						src={SAMPLE_PHOTO} // Replace with actual wedding photo
						alt='John & Jane'
						className='rounded-lg shadow-md w-full max-w-md'
					/>
				</div>

				{/* Button */}
				<button
					className='bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-6'
					onClick={() => navigate(`/event/${eventName}/rsvp`)}>
					RSVP Now
				</button>

				{/* Description */}
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

			{/* Footer */}
			<footer className='w-full h-16 bg-white shadow-t-md'></footer>
		</div>
	);
};

export default LandingPage;
