import { useState } from 'react';

const EventCheckBox = (props) => {
	const [headCount, setHeadCount] = useState(0);

	return (
		<div class='relative flex flex-col rounded-xl bg-white outline outline-1 -outline-offset-1 outline-gray-300 pr-4 py-4'>
			<nav class='flex min-w-[240px] flex-col gap-1 p-2'>
				<div
					role='button'
					class='flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100'>
					<label for='check-vertical-list-group' class='flex w-full cursor-pointer items-center px-3 py-2'>
						<div class='inline-flex items-center'>
							<label class='flex items-center cursor-pointer relative' for='check-vertical-list-group'>
								<input
									type='checkbox'
									class='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800'
									id={`${props.eventName}-checkbox`}
                                    value={props.eventName}
									checked={props.isChecked}
									onChange={props.checkBoxHandler}
								/>
								<span class='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										class='h-3.5 w-3.5'
										viewBox='0 0 20 20'
										fill='currentColor'
										stroke='currentColor'
										stroke-width='1'>
										<path
											fill-rule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clip-rule='evenodd'></path>
									</svg>
								</span>
							</label>
							<label
								class='cursor-pointer ml-2 text-sm/6 font-medium text-gray-900'
								for='check-vertical-list-group'>
								{props.eventName}
							</label>
						</div>
					</label>
				</div>
			</nav>

			<div className='mx-auto'>
				<label htmlFor='headCount' className='block text-sm/6 font-medium text-gray-900'>
					How many people are you bringing?
				</label>
				<div className='relative'>
					<button
						id='decreaseButton'
						className='absolute right-9 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
						type='button'
						onClick={() => {
							headCount == 0 ? setHeadCount(0) : setHeadCount(headCount - 1);
						}}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 16 16'
							fill='currentColor'
							className='w-4 h-4'>
							<path d='M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z' />
						</svg>
					</button>

					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='absolute w-5 h-5 top-2.5 left-2.5 text-slate-600'>
						<path d='M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z'></path>
					</svg>

					<input
						id='headCount'
						type='number'
						min={0}
						max={10}
						value={headCount}
						defaultValue={0}
						className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm outline outline-1 -outline-offset-1 outline-gray-300 rounded-md pl-10 pr-20 py-2 transition duration-300 ease focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
						onChange={(event) => {
							setHeadCount(event.target.value);
						}}
					/>
					<button
						id='increaseButton'
						className='absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
						type='button'
						onClick={() => {
							headCount == 10 ? setHeadCount(10) : setHeadCount(headCount + 1);
						}}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 16 16'
							fill='currentColor'
							className='w-4 h-4'>
							<path d='M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z' />
						</svg>
					</button>
				</div>
				<p className='flex items-center mt-2 text-xs text-slate-400 italic'>
					Adjust the number using the + and - controls.
				</p>
			</div>
		</div>
	);
};

export default EventCheckBox;
