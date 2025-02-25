import styles from './loader.module.css';

const Loader = () => {
	return (
		<div className='flex items-center justify-center'>
			<div className='flex flex-col items-center'>
				<div
					className={`${styles.spinner} w-5 h-5 border-4 border-t-transparent rounded-full animate-spin`}
				/>
				<p className='mt-4 text-black text-lg'>Loading...</p>
			</div>
		</div>
	);
};

export default Loader;
