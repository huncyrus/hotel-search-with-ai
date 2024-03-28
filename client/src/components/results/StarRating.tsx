import { FaStar } from 'react-icons/fa';
import { StarRatingProps } from '../../interfaces/StarRatingInterface';

const StarRating = ({ result }: StarRatingProps) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < result.stars ? 'text-yellow-400' : 'text-gray-400'} />
            ))}
        </div>
    );
};

export default StarRating;
