import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brandSecondary text-white py-8">
      <div className="container mx-auto px-20">
        <h3 className="text-xl font-medium mb-6">Popular Searches</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <p>Dentist</p>
            <p>Dental Office Near Me</p>
            <p>Dental Clinic Near Me</p>
            <p>Canadian Dental Care Plan</p>
          </div>
          <div className="space-y-3">
            <p>Dental Clinic</p>
            <p>Orthodontist</p>
            <p>Dental Dentist Near Me</p>
            <p>Dental Clinic Close to Me</p>
          </div>
          <div className="space-y-3">
            <p>Dentist near me</p>
            <p>Dental Implants</p>
            <p>Orthodontist close to me</p>
            <p>Emergency Dentist near me</p>
          </div>
          <div className="space-y-3">
            <p>Orthodontist Near Me</p>
            <p>Tooth Bleaching</p>
            <p>Dental Clinic in Near Me</p>
            <p>Emergency Dental Office</p>
          </div>
        </div>

        <div className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
              <p>&copy; {new Date().getFullYear()} Toohbook.ca</p>
            </div>
            <div>
              <p>Email Us: <a href="mailto:Info@Stu-Dent.Ca" className="hover:underline">Info@Stu-Dent.Ca</a></p>
            </div>
            <div>
              <p>Adress: Canada, Ontario</p>
            </div>
            <div className="flex justify-center md:justify-end items-center space-x-4">
              <a href="https://facebook.com" className="text-2xl hover:text-gray-400" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
              <a href="https://linkedin.com" className="text-2xl hover:text-gray-400" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://instagram.com" className="text-2xl hover:text-gray-400" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
