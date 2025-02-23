import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Loader = () => {
	const location = useLocation();
	const [loading, setLoading] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Required
	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => setLoading(false), 500);
		return () => clearTimeout(timer);
	}, [location]);

	return loading ? (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='flex flex-col items-center'>
				<div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
				<p className='mt-4 text-black text-lg'>Loading...</p>
			</div>
		</div>
	) : null;
};

export default Loader;
