import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios.js';
import { toast } from 'react-toastify';

// All links / QR codes will go to this page and make a request (with access code) for auth
// if success we redirect to disired page and

const AccessPage = (props) => {
	const { eventName, accessCode } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const inputAccessCode = event.target[0].value;
			const result = await axios.get(`http://localhost:3000/event/${eventName}/access/${inputAccessCode}`);

			toast.success(result.data.message);
			props.grantAccess();
			navigate(`/event/${eventName}`);
		} catch (error) {
			toast.error('Invalid access code / event.');
			console.error(error);
		}
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='w-100 text-center'>
					<h1 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>{eventName}</h1>
				</div>

				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='mt-10 text-center text-xl/9 font-bold tracking-tight text-gray-900'>
						Access Code Required
					</h2>
				</div>

				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<div className='mt-2'>
								<input
									id='text'
									name='text'
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

export default AccessPage;
