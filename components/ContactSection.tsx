import React, { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactSection = forwardRef<HTMLDivElement>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        const currentRef = ref && 'current' in ref ? ref.current : null;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (currentRef) observer.unobserve(currentRef); // Stop observing once it's visible
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the section is visible
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        try {
            const response = await axios.post('/api/send-email', formData);
            if (response.data.message === 'Email sent successfully') {
                toast.success('Email sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(`Failed to send email: ${error.response?.data || error.message}`);
            } else if (error instanceof Error) {
                toast.error(`Error: ${error.message}`);
            } else {
                toast.error('Unexpected error occurred.');
            }
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div
            id="contact"
            ref={ref}
            className={`min-h-screen flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <h2 className="text-4xl text-center mb-8">My Contact</h2>
            <p className="text-center mb-12">Send me a mail. Once the form is submitted, you will be redirected to the home page.</p>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col space-y-4"
            >
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Your message here..."
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={isLoading} // Disable the button while loading
                    >
                        {isLoading ? 'Sending...' : 'Submit'} {/* Show loading text */}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
