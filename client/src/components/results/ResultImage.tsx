const ResultImage = ({ result }: { result: any }) => {
    return (
        <div className="w-full md:w-64 h-64 flex-shrink-0">
            <img src={result.image} alt={result.title} className="max-w-full max-h-full object-cover" />
        </div>
    );
};

export default ResultImage;
