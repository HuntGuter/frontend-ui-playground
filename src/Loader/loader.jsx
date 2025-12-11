import './loader.css';

const Loader = () => {
    return (
        <div className="wrap">
            <h1>Loader</h1>
            <div className="loader">
                {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bar"></div>
                ))}
            </div>
        </div>
    );
}

export default Loader;