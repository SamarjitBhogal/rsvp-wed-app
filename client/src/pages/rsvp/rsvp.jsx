import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../utils/axios.js';
import { sendMail } from '../../utils/sendMail.jsx';

import EventCheckBox from '../../components/event-checkbox/event-checkbox.jsx';
import Loader from '../../components/loader/loading-basic.jsx';

// TODO: FIX "Counld not find events error". Just put a loader on the subevents part and render everything else.
const RSVP = () => {
	const { eventName } = useParams();
	const navigate = useNavigate();

	const [subEvents, setSubEvents] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEventDetails = async () => {
			try {
				const result = await axios.get(`event/${eventName}`);
				const eventDetais = result.data.value;

				// Add `isSelected` and ensure `headCount` is 0 if not provided
				const formattedSubEvents = eventDetais.subEvents.map((subEvent) => ({
					...subEvent,
					headCount: 0,
					isSelected: false,
				}));

				setLoading(false);
				setSubEvents(formattedSubEvents);
			} catch (error) {
				toast.error("You don't have access to RSVP for this event.");
				console.error(error.response.data.message);

				if (error.response.status === 403) {
					navigate('/');
				}
			}
		};

		setLoading(true);
		fetchEventDetails();
	}, [eventName, navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const firstName = event.target[0].value;
			const lastName = event.target[1].value;
			const email = event.target[2].value;
			const formattedSubEvents = subEvents
				.filter((subEvent) => subEvent.headCount !== 0)
				.map(({ isSelected, ...rest }) => rest);

			const result = await axios.post(`event/${eventName}/rsvp`, {
				firstName: firstName,
				lastName: lastName,
				email: email,
				subEvents: formattedSubEvents,
			});

			toast.success(result.data.message);

			// Send email
			await sendMail(formattedSubEvents, eventName, email, firstName, lastName);
			toast.info('An email has been sent for your RSVP(s).');
			navigate(`/event/${eventName}`);
		} catch (error) {
			toast.error(error.data.message);
			console.error(error);
		}
	};

	const checkBoxHandler = (name, updatedData) => {
		setSubEvents((prevData) =>
			prevData.map((event) => (event.name === name ? { ...event, ...updatedData } : event)),
		);
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
						RSVP for Priya & Hameet
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label htmlFor='firstName' className='block text-sm/6 font-medium text-gray-900'>
								First Name
							</label>
							<div className='mt-2'>
								<input
									id='firstName'
									name='firstName'
									type='text'
									autoComplete='given-name'
									required
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
									value={firstName}
									onChange={(event) => setFirstName(event.target.value)}
								/>
							</div>
						</div>

						<div>
							<label htmlFor='lastName' className='block text-sm/6 font-medium text-gray-900'>
								Last Name
							</label>
							<div className='mt-2'>
								<input
									id='lastName'
									name='lastName'
									type='text'
									autoComplete='family-name'
									required
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
									value={lastName}
									onChange={(event) => {
										setLastName(event.target.value);
									}}
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label htmlFor='email' className='block text-sm/6 font-medium text-gray-900'>
									Email
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
									value={email}
									onChange={(event) => {
										setEmail(event.target.value);
									}}
								/>
							</div>
						</div>

						<div>
							<h3 className='block font-medium text-black-900'>
								You have been invited to the following functions:
							</h3>
							<p className='mt-2 text-sm/6 text-gray-600'>
								Please select which of the following you would like to attend
							</p>
						</div>
						{loading ? (
							<Loader />
						) : (
							subEvents.map((subEvent) => (
								<EventCheckBox
									key={subEvent.name}
									eventName={subEvent.name}
									headCount={subEvent.headCount}
									isSelected={subEvent.isSelected}
									onChange={(updatedData) => checkBoxHandler(subEvent.name, updatedData)}
								/>
							))
						)}

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
								RSVP
							</button>
							<button
								type='button'
								className='mt-3 flex w-full justify-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
								onClick={() => navigate(`/event/${eventName}`)}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default RSVP;
