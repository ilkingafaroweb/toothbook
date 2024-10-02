import { useState, useEffect } from "react";
import { useOffer } from "../../../contexts";
import { Modal } from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faCheck, faGift, faLocationDot, faTimes, faUserDoctor } from "@fortawesome/free-solid-svg-icons";

export const OfferBanner = () => {

  const { isOfferVisible } = useOffer();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!isOfferVisible) return null

  return (
    <>
      <div
        className={`bg-accentColor text-white py-3 px-5 flex justify-between items-center transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2">
          <span className="font-bold">Get $50 Gift Card</span>
          <span>for your smile</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white border-b" onClick={openModal}>See how</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Experience Seamless Dental Care and Earn Rewards</h1>
          <button
            onClick={closeModal}
            className="py-2 px-4 text-black opacity-65 rounded"
          >
            <FontAwesomeIcon icon={faTimes} size="2xl" />
          </button>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="flex lg:flex-col flex-row items-center lg:space-y-3 lg:space-x-0 space-x-3 space-y-0">
            <div className="w-12 h-12 rounded-full centered bg-orange-gradient">
              <FontAwesomeIcon icon={faLocationDot} size="2xl" color="white" />
            </div>
            <div className="w-6 h-6 bg-orange-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-medium">1</span>
            </div>
            <div className="w-52">
              <p className="mt-2 text-black font-medium text-center font-sans">Find top-rated dentists near you.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex lg:flex-col flex-row items-center lg:space-y-3 lg:space-x-0 space-x-3 space-y-0">
            <div className="w-12 h-12 rounded-full centered bg-green-gradient">
              <FontAwesomeIcon icon={faUserDoctor} size="2xl" color="white" />
            </div>
            <div className="w-6 h-6 bg-green-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-medium">2</span>
            </div>
            <div className="w-52">
              <p className="mt-2 text-black font-medium text-center font-sans">Browse profiles and read real patient reviews.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex lg:flex-col flex-row items-center lg:space-y-3 lg:space-x-0 space-x-3 space-y-0">
            <div className="w-12 h-12 rounded-full centered bg-blue-gradient">
              <FontAwesomeIcon icon={faCalendarCheck} size="2xl" color="white" />
            </div>
            <div className="w-6 h-6 bg-blue-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-medium">3</span>
            </div>
            <div className="w-52">
              <p className="mt-2 text-black font-medium text-center font-sans">Book your visit with a few clicks.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex lg:flex-col flex-row items-center lg:space-y-3 lg:space-x-0 space-x-3 space-y-0">
            <div className="w-12 h-12 rounded-full centered bg-red-gradient">
              <FontAwesomeIcon icon={faGift} size="2xl" color="white" />
            </div>
            <div className="w-6 h-6 bg-red-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-medium">4</span>
            </div>
            <div className="w-52">
              <p className="mt-2 text-black font-medium text-center font-sans">Attend your appointment and enjoy a $50 gift card.</p>
            </div>
          </div>

          {/* Divider line */}
          <div className="absolute lg:w-[74%] lg:ml-[13%] lg:-top-[23%] lg:h-1 w-[3px] ml-[70px] h-[80%] mt-[10%] -z-10 bg-gray-300 rounded"></div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Am I eligible?</h3>
          <ul className="list-disc list-inside space-y-1">
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheck} size="xl" className="text-green-400" />
              First visit to the selected clinic
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheck} size="xl" className="text-green-400" />
              Must complete at least one service during your visit
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheck} size="xl" className="text-green-400" />
              Valid email and phone number required for reward
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
};