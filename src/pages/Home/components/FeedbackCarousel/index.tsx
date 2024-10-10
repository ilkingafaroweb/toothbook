import React, { useState } from "react";
import { carouselIcons } from "../../../../assets";

interface Feedback {
    name: string;
    position: string;
    feedback: string;
    image: string;
    rating: number;
}

const dentistFeedback: Feedback[] = [
    {
        name: "Dr. Reza Barimani",
        position: "Golden Mile",
        feedback:
            "I'm not used to writing reviews, but this time I decided that I need to. I want to thank the Toothbook team for creating such a platform, for their responsiveness, as well as their promptness in solving problems. I hope our cooperation with you will continue to be successful!",
        image: "https://images.toothbook.ca/src/assets/testimonials/reza.svg",
        rating: 5,
    },
    {
        name: "Dr. Mohammad Al-Hamami",
        position: "Oak Tree Dental Centre",
        feedback:
            "Very cool! An interesting project that is beneficial for both us and the patients. Simple and easy to use, there is nothing superfluous.",
        image: "https://images.toothbook.ca/src/assets/testimonials/hamami.svg",
        rating: 5,
    },
    {
        name: "Dr. M. Ghaly",
        position: "Esthe-Dent Dental Services",
        feedback:
            "This platform has helped me increase the number of my appointments per day. At the beginning. I had doubts about the effectiveness, that it might not work. However, i can say that the they have done a very good job. It’s not just about efficiency. It’s also about operativeness. When i had a problem, they responded very quickly and helped me solve the issue",
        image: "https://images.toothbook.ca/src/assets/testimonials/ghaly.svg",
        rating: 5,
    },
];

const clientFeedback: Feedback[] = [
    {
        name: "Jayant Puri",
        position: "Student at University of Toronto",
        feedback:"I recently used Toothbook to book my dental appointment, and I couldn't be happier with the experience. The platform was user-friendly and efficient, making the booking process a breeze. Plus, I received a $50 gift card after my appointment, which was a pleasant surprise! The clinic I visited was modern and clean, and the staff were incredibly professional.",
        image: "https://images.toothbook.ca/src/assets/testimonials/jayant.png",
        rating: 5,
    },
    {
        name: "Monica Clark",
        position: "Student at University of Alberta",
        feedback:
            "With Toothbook, patient communication has never been easier. I recommend this platform to any dental professional looking to streamline their operations.",
        image: "https://images.toothbook.ca/src/assets/testimonials/monica.png",
        rating: 5,
    },
    {
        name: "Jackson Hale",
        position: "Fashion Model at Canada",
        feedback:
            "With Toothbook, patient communication has never been easier. I recommend this platform to any dental professional looking to streamline their operations.",
        image: "https://images.toothbook.ca/src/assets/testimonials/jackson.png",
        rating: 5,
    },
];

export const FeedbackCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDentists, setIsDentists] = useState(false); 

    const feedbackData = isDentists ? dentistFeedback : clientFeedback;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === feedbackData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? feedbackData.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full lg:px-12 py-24 font-inter">
            <div className="relative w-full h-14 bg-backgroundColor border border-borderColor lg:rounded-3xl rounded-md flex items-center justify-between p-1.5 lg:mb-16 mb-6">
                <div
                    className={`absolute top-0 bottom-0 my-auto h-11 w-[calc(50%-6px)] bg-white shadow-carousel rounded-xl transform transition-transform duration-500 ease-in-out ${isDentists ? 'translate-x-[100%]' : 'translate-x-0'
                        }`}
                />
                <button
                    className={`relative z-10 w-full h-full focus:outline-none font-semibold ${!isDentists ? 'text-brandPrimary' : 'text-carouselTextColor'
                        }`}
                    onClick={() => setIsDentists(false)}
                >
                    Patients
                </button>
                <button
                    className={`relative z-10 w-full h-full focus:outline-none font-semibold ${isDentists ? 'text-brandPrimary' : 'text-carouselTextColor'
                        }`}
                    onClick={() => setIsDentists(true)}
                >
                    Dentists
                </button>
            </div>

            <h2 className="lg:w-full w-72 m-auto text-center lg:text-3xl text-2xl font-semibold lg:mb-16 mb-6">
                {isDentists ?
                    "Why Top Dentists Choose Us: Hear from Our Partners" 
                    :
                    "Smile Transformed: Hear What our patients said!"}
            </h2>

            <div className="flex items-center justify-between px-8 mb-10">
                <button
                    onClick={prevSlide}
                    className="w-max absolute lg:top-1/2 bottom-6 left-1/3 lg:left-12"
                >
                    <img src={carouselIcons.prev} className="w-8" alt="prev" />
                </button>

                <div className="w-full text-center bg-white rounded-lg transition-all duration-500 ease-in-out transform">
                    <p className="lg:text-2xl mb-6 font-medium text-textBlack lg:w-[1024px] m-auto">
                        "{feedbackData[currentIndex].feedback}"
                    </p>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <img
                            src={feedbackData[currentIndex].image}
                            alt={feedbackData[currentIndex].name}
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h4 className="lg:text-2xl text-lg font-semibold">
                                {feedbackData[currentIndex].name}
                            </h4>
                            <p className="text-black opacity-65">{feedbackData[currentIndex].position}</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-3">
                        {[...Array(feedbackData[currentIndex].rating)].map((_, index) => (
                            <img key={index} src={carouselIcons.star} alt="star" />
                        ))}
                    </div>
                </div>

                <button
                    onClick={nextSlide}
                    className="w-max absolute lg:top-1/2 bottom-6 right-1/3 lg:right-12"
                >
                    <img src={carouselIcons.next} className="w-8" alt="next" />
                </button>
            </div>

            <div className="flex justify-center items-center space-x-4">
                {feedbackData.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-yellow-500" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};