import styles from './loader.module.css';

const LoaderInline = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center'>
                <div
                    className={`${styles.spinner} w-5 h-5 border-4 border-t-transparent rounded-full animate-spin`}
                />
            </div>
        </div>
    );
};

export default LoaderInline;
