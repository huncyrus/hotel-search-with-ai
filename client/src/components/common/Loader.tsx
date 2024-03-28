import { BeatLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <BeatLoader color="#fff" size={15} />
        </div>
    );
}

export default Loader;
