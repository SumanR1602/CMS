import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertCircle, CheckCircle, Users, Info } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to the Complaint Management System
        </h1>
        <p className="text-xl text-gray-600">
        Submit, track, and resolve your complaints easily and efficiently.<br/>
        Your voice matters!
        </p>
        
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
          <FileText className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2 text-center">Submit Complaints</h3>
          <p className="text-gray-600 text-center">
            Easily submit your complaints and feedback about various public services and issues you encounter.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
          <AlertCircle className="h-12 w-12 text-orange-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2 text-center">Track Status</h3>
          <p className="text-gray-600 text-center">
            Monitor the progress of your complaints in real-time. Stay informed with timely updates and notifications.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
          <CheckCircle className="h-12 w-12 text-green-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2 text-center">Quick Resolution</h3>
          <p className="text-gray-600 text-center">
            Get timely responses and resolutions to your complaints, ensuring that issues are addressed quickly.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 py-12 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Our System</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            The Complaint Management System (CMS) is designed to empower citizens by allowing them to raise, track, and provide feedback on complaints about public services, infrastructure, and other important issues. Our goal is to streamline the process of issue resolution and ensure that citizen complaints are addressed in a timely and transparent manner.
          </p>
          <Link to="/about" className="text-blue-600 font-semibold hover:underline">
            Learn More About Our Mission <span className="text-blue-500">→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Info className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Our Mission</h3>
            <p className="text-gray-600 text-center">
              Our mission is to make the public complaint process easier, faster, and more transparent. We aim to bridge the communication gap between citizens and service providers, making sure every complaint is heard and resolved.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-12 w-12 text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Engaging the Community</h3>
            <p className="text-gray-600 text-center">
              We believe that an active, engaged community leads to better public services. By enabling citizens to track complaints and provide feedback, we foster a collaborative environment where everyone can contribute to making their communities better.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">What Our Users Say</h2>
        </div>
        <div className="flex justify-center gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-xs text-center">
            <Users className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
            <p className="text-gray-600 italic mb-4">
              "A fantastic platform! I was able to submit my complaint about a broken streetlight, and the issue was fixed in no time!"
            </p>
            <span className="font-semibold text-gray-900">Ajaz Muhammad, City Resident</span>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md max-w-xs text-center">
            <Users className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
            <p className="text-gray-600 italic mb-4">
              "Tracking the progress of my complaint was so easy. I got timely updates, and the issue was resolved within days."
            </p>
            <span className="font-semibold text-gray-900">Hari, Local Citizen</span>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md max-w-xs text-center">
            <Users className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
            <p className="text-gray-600 italic mb-4">
              "This system made giving feedback about public services simple and straightforward. It's a great initiative!"
            </p>
            <span className="font-semibold text-gray-900">Raj Purush, Community Member</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
