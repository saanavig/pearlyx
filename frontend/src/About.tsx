import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
            <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
                <div className="text-xl font-semibold flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        P
                    </div>
                    <span className="ml-2 text-gray-900">Pearlyx</span>
                </div>
                <div className="space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">
                        Home
                    </Link>
                    <Link to="/about" className="text-blue-600 font-medium">
                        About
                    </Link>
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center text-center mt-10 px-6 w-screen flex-grow">
                <h1 className="text-5xl font-bold text-black mb-8">About Pearlyx</h1>
                <p className="text-gray-600 mt-4 max-w-2xl mb-12">
                    Pearlyx leverages advanced voice analysis to detect early signs of diseases. Our mission is to revolutionize healthcare through accessible, voice-based diagnostics, making it easier to detect neurological and respiratory conditions early on.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                    {/* Parkinson's Box */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Parkinson's Disease</h3>
                        <p className="text-gray-600">
                            Parkinson's disease affects movement control and speech. Early detection through voice analysis can help doctors monitor progression and manage symptoms more effectively, ultimately improving the quality of life for patients.
                        </p>
                    </div>

                    {/* Alzheimer's Box */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Alzheimer's Disease</h3>
                        <p className="text-gray-600">
                            Alzheimer's disease leads to cognitive decline and affects speech patterns. Detecting subtle changes in speech early on allows for better diagnosis and the ability to start treatment sooner, helping manage the progression of the disease.
                        </p>
                    </div>

                    {/* Respiratory Conditions Box */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Respiratory Conditions</h3>
                        <p className="text-gray-600">
                            Respiratory diseases like asthma or COPD can affect speech clarity and tone. Early voice analysis allows for better monitoring of symptoms and helps healthcare professionals intervene before conditions worsen.
                        </p>
                    </div>
                </div>
            </div>

            <footer className="bg-white py-4 mt-10 shadow-inner">
                <div className="container mx-auto text-center text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Pearlyx. All rights reserved.</p>
                    
                </div>
            </footer>
        </div>
    );
}
