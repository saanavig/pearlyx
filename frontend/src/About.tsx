import { Link } from "react-router-dom";
import logo from './assets/logo.png';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
            <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
                <div className="text-xl font-semibold flex items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                        <img src={logo} alt="Pearlyx Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="ml-2 text-gray-900">Pearlyx</span>
                </div>
                <div className="space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                    <Link to="/chat" className="text-gray-600 hover:text-gray-900">Chat</Link>
                    <Link to="/about" className="text-blue-600 font-medium">About</Link>
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center text-center mt-10 px-6 w-screen flex-grow">
                <h1 className="text-5xl font-bold text-black mb-8">About Pearlyx</h1>
                <p className="text-gray-600 mt-4 max-w-2xl mb-12">
                    Pearlyx is an innovative platform designed to assist in the early detection of Parkinson's disease through voice analysis. Our mission is to make preliminary screening more accessible and provide a supportive tool for healthcare professionals in their diagnostic process.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                    {/* Understanding Parkinson's */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Understanding Parkinson's</h3>
                        <p className="text-gray-600">
                            Parkinson's disease affects nearly 1 million people in the US alone. Early detection is crucial for better management and treatment outcomes. Voice changes can be one of the earliest indicators, often appearing before motor symptoms become apparent.
                        </p>
                    </div>

                    {/* Voice Analysis */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Voice Analysis</h3>
                        <p className="text-gray-600">
                            90% of people with Parkinson's experience voice changes. Our advanced AI analyzes subtle variations in voice patterns, tremors, and breathing patterns that might indicate early signs of Parkinson's disease, providing a non-invasive screening method.
                        </p>
                    </div>

                    {/* Why Pearlyx */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Why Pearlyx</h3>
                        <p className="text-gray-600">
                            Pearlyx offers easy-to-use voice recording, instant analysis, and detailed reports. Our AI-powered system provides quick preliminary assessments, helping individuals seek medical attention earlier and supporting healthcare providers with additional diagnostic insights.
                        </p>
                    </div>
                </div>

                <div className="mt-12 max-w-2xl text-left bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Important Note</h2>
                    <p className="text-gray-600 mb-4">
                        Pearlyx is designed as a screening tool and should not be used as a definitive diagnostic solution. Our technology aims to support, not replace, professional medical diagnosis. Always consult with healthcare professionals for proper medical evaluation and diagnosis.
                    </p>
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
