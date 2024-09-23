export const OfferBanner = () => {

  return (
    <div
      className={`bg-accentColor text-white py-3 px-5 flex justify-between items-center transform transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2">
        <span className="font-bold">Get $50 Gift Card</span>
        <span>for your smile</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-white border-b">See how</button>
        {/* <button className="text-white">
          <img src={x_icon} alt="x_icon"/>
        </button>  */}
      </div>
    </div>
  );
};
