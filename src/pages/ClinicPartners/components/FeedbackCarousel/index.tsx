import React, { useState } from "react";
import { carouselIcons } from "../../../../assets";

interface Feedback {
    name: string;
    position: string;
    feedback: string;
    image: string;
    rating: number;
}

const clientFeedback: Feedback[] = [
    {
        name: "Dr. Reza Barimani",
        position: "Golden Mile",
        feedback:
            "I'm not used to writing reviews, but this time I decided that I need to. I want to thank the Toothbook team for creating such a platform, for their responsiveness, as well as their promptness in solving problems. I hope our cooperation with you will continue to be successful!",
        image: "/path/to/image.jpg",
        rating: 5,
    },
    {
        name: "Dr. John Doe",
        position: "Dental Clinic",
        feedback:
            "Toothbook has been a wonderful tool for growing our business. The support is excellent, and I highly recommend it to others in the dental industry!",
        image: "/path/to/image2.jpg",
        rating: 4,
    },
];


export const FeedbackCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const feedbackData = clientFeedback;

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
        
            <h2 className="lg:w-full w-72 m-auto text-center lg:text-3xl text-2xl font-semibold lg:mb-16 mb-6">
                Why Top Dentists Choose Us: Hear from Our Partners
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