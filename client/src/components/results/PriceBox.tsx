const PriceBox = ({ result }: { result: any }) => {
    return (
        <div className="font-bold text-lg flex-grow">
            {result.pricePerNight}:-
            <p className="font-light text-xs">
                {result.rooms} room X night {result.price}:-
            </p>
        </div>
    );
};

export default PriceBox;
