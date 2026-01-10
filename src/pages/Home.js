import PixelSnow from '../components/reactbits/PixelSnow';

export default function Home() {
    return (
        <>
            {/* Snow Effect */}
            <PixelSnow
                color="#000000"
                flakeSize={0.006}
                minFlakeSize={0.8}
                pixelResolution={200}
                speed={0.7}
                density={0.15}
                brightness={1.2}
                variant="square"
                direction={180}
            />


            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Welcome to INTELLINA</h1>
                <p>AI & Data Science Department</p>
            </div>
        </>
    );
}
