import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EventCheckBox from '../../components/event-checkbox/event-checkbox.jsx';

const RSVP = () => {
	const { eventName } = useParams();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [selectedEvents, setSelectedEvents] = useState([]);

	// send access token to backend and get related events

	// TODO: at this point access is expected. So check again but get parent event info with subevents

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const firstName = event.target[0].value;
			const lastName = event.target[1].value;
			const email = event.target[2].value;

			const result = await axios.post(`event/${eventName}/rsvp`, {
				// need to send firstName, lastName, email, and subEvents (array) of {name, headCountAccompaning} rsvping for (need at least 1). Parent will updates automatically

			});

			toast.success(result.data.message);
			navigate(`/event/${inputEventName}`);
		} catch (error) {
			toast.error(error.data.message);
			console.error(error);
		}
	};

	const checkBoxHandler = (event) => {
		let isSelected = event.target.checked;
		let value = event.target.value;

		console.log(isSelected, value);

		if (isSelected) {
			setSelectedEvents([...selectedEvents, value]);
		} else {
			setSelectedEvents(selectedEvents.filter((event) => event !== value));
		}
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
						RSVP for {eventName}
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
									onChange={(event) => {
										setEmail(event.target.value);
									}}
								/>
							</div>
						</div>

						{/* Template for events, need to make more for each function */}
						<h3 class='block text-sm/6 font-medium text-gray-900'>Functions for this event</h3>
						<EventCheckBox
							eventName={'Ladies Party'}
							isChecked={selectedEvents.includes('Ladies Party')}
							checkBoxHandler={checkBoxHandler}></EventCheckBox>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
								RSVP
							</button>
							<button
								type='button'
								class='mt-3 flex w-full justify-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
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
