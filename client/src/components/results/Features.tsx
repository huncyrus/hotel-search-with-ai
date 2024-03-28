const Features = ({ result }: { result: any }) => {
    return (
        <div className="">
            Freatures <br />
            {result && result.freeWifi}
        </div>
    );
};

export default Features;
