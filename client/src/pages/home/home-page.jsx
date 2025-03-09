import axios from '../../utils/axios.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useCallback } from 'react';

import { hasAccess } from '../../utils/authenticate';

import CAKE_ICON from '../../assets/wedding-cake.svg';

const HomePage = (props) => {
	const navigate = useNavigate();
	const { eventName, accessCode } = useParams();

	const getAccess = useCallback(
		async (eventName, accessCode) => {
			try {
				const response = await toast.promise(
					axios.get(`event/${eventName}/access/${accessCode}`),
					{
						pending: 'Checking access...',
						success: 'Access granted!',
						error: 'Could not find the specified event.',
					},
					{
						autoClose: 1000,
					},
				);

				sessionStorage.setItem('accessToken', response.data.value);
				sessionStorage.setItem('eventName', eventName);
				props.grantAccess();

				navigate(`/event/${eventName}`);
			} catch (error) {
				console.error(error);
				navigate('/');
			}
		},
		[props, navigate],
	);

	useEffect(() => {
		if (eventName && accessCode) {
			getAccess(eventName, accessCode);
		}

		const handleAccess = async () => {
			const access = await hasAccess();
			if (access) {
				navigate(`/event/${sessionStorage.getItem('eventName')}`);
			}
		};

		handleAccess();
	}, [eventName, accessCode, getAccess, navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const inputEventName = event.target[0].value;
		const inputAccessCode = event.target[1].value;

		getAccess(inputEventName, inputAccessCode);
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h1 className='text-center mt-10 text-4xl font-bold tracking-tight text-gray-900'>
						Priya weds Hameet
					</h1>
					<img alt='Your Company' src={CAKE_ICON} className='mx-auto h-60 w-auto' />
					<div className='text-center'>
						<h2 className='mt-10 text-2xl/9 font-bold tracking-tight text-gray-900'>RSVP Now</h2>
						<p className='mt-2 text-sm/6 text-gray-600'>
							To RSVP for this event please fill in the following with the event keyword and access code
							provided with your invitation.
						</p>
					</div>
				</div>

				<div className='mt-2 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<div className='mt-2'>
								<input
									id='eventName'
									name='eventName'
									type='text'
									required
									autoComplete='text'
									placeholder='Event Keyword'
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<div className='mt-2'>
								<input
									id='accessCode'
									name='accessCode'
									type='text'
									required
									autoComplete='text'
									placeholder='Access Code'
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								/>
							</div>
						</div>

						<p className='w-100 text-center italic'>An access code is required to RSVP for this event.</p>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default HomePage;
