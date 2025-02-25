import { useState } from 'react';

const EventCheckBox = ({ eventName, headCount, isSelected, onChange }) => {
	const [selected, setSelected] = useState(isSelected);

	const handleCheckBoxChange = () => {
		const updatedSelection = !selected;
		setSelected(updatedSelection);
		onChange({ isSelected: updatedSelection });
	};

	const handleHeadCountChange = (e) => {
		const updatedHeadCount = Number.parseInt(e.target.value, 10) || 0; // Ensure it's a number or default to 0
		onChange({ headCount: updatedHeadCount });
	};

	const handleIncrement = () => {
		if (headCount < 10) {
			onChange({ headCount: headCount + 1 });
		}
	};

	const handleDecrement = () => {
		if (headCount > 0) {
			onChange({ headCount: headCount - 1 });
		}
	};

	return (
		<div className='relative flex flex-col rounded-xl bg-white outline outline-1 -outline-offset-1 outline-gray-300 pr-4 py-4'>
			<button
				type='button'
				onClick={handleCheckBoxChange}
				className='flex w-full items-center rounded-lg p-4 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 ml-2'>
				<div className='inline-flex items-center'>
					<input
						type='checkbox'
						className='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800'
						id={`${eventName}-checkbox`}
						checked={selected}
						readOnly
					/>
					<label
						className='cursor-pointer ml-2 text-sm/6 font-medium text-gray-900'
						htmlFor={`${eventName}-checkbox`}>
						{eventName}
					</label>
				</div>
			</button>

			{selected && (
				<div className='mx-auto'>
					<label htmlFor='inputHeadCount' className='block text-sm/6 font-medium text-gray-900'>
						How many people are you bringing?
					</label>
					<div className='relative'>
						<button
							id='decreaseButton'
							className='absolute right-9 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
							type='button'
							onClick={handleDecrement}>
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 16 16'
								fill='currentColor'
								className='w-4 h-4'>
								<path d='M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z' />
							</svg>
						</button>

						{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='absolute w-5 h-5 top-2.5 left-2.5 text-slate-600'>
							<path d='M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z' />
						</svg>

						<input
							id='inputHeadCount'
							type='number'
							min={0}
							max={10}
							value={headCount}
							className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm outline outline-1 -outline-offset-1 outline-gray-300 rounded-md pl-10 pr-20 py-2 transition duration-300 ease focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
							onChange={handleHeadCountChange}
						/>
						<button
							id='increaseButton'
							className='absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
							type='button'
							onClick={handleIncrement}>
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
			)}
		</div>
	);
};

export default EventCheckBox;
