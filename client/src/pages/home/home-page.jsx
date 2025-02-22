import axios from '../../utils/axios.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useCallback } from 'react';

const HomePage = (props) => {
	const navigate = useNavigate();
	const { eventName, accessCode } = useParams();

	const getAccess = useCallback(
		async (eventName, accessCode) => {
			try {
				const result = await axios.get(`event/${eventName}/access/${accessCode}`);

				sessionStorage.setItem('accessToken', result.data.value);
				props.grantAccess();

				toast.success(result.data.message);
				navigate(`/event/${eventName}`);
			} catch (error) {
				toast.error('Could not find the specified event.');
				navigate('/');
				console.error(error);
			}
		},
		[props, navigate],
	);

	useEffect(() => {
		if (eventName && accessCode) {
			getAccess(eventName, accessCode);
		}
	}, [eventName, accessCode, getAccess]);

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
					<img
						alt='Your Company'
						src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600'
						className='mx-auto h-10 w-auto'
					/>
					<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
						RSVP For An Event
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<div className='mt-2'>
								<input
									id='eventName'
									name='eventName'
									type='text'
									required
									autoComplete='text'
									placeholder='Event Name'
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
