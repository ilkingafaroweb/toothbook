import React from 'react';

interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
}

const teamMembers: TeamMember[] = [
    { name: 'Ulvi Mehdiyev', role: 'Founder & CEO', imageUrl: 'https://images.toothbook.ca/src/assets/team/ulvi.jpg' },
    { name: 'Arifali Baghirli', role: 'Backend Developer', imageUrl: 'https://images.toothbook.ca/src/assets/team/arif.png' },
    { name: 'Ilkin Gafarov', role: 'Frontend Developer', imageUrl: 'https://images.toothbook.ca/src/assets/team/ilkin.png' },
    { name: 'Aykhan Mastaliev', role: 'SEO Manager', imageUrl: 'https://images.toothbook.ca/src/assets/team/aykhan.png' },
    { name: 'Harvey Gunner', role: 'Business Development Manager', imageUrl: 'https://images.toothbook.ca/src/assets/team/harvey.png' },
];

export const OurTeam: React.FC = () => {
    return (
        <section className="border-t lg:mx-16 py-16">
            <div className="container mx-auto px-4">
                <p className='text-brandPrimary text-center mb-3 font-inter'>We’re hiring!</p>
                <h2 className="text-center text-3xl font-semibold opacity-80 mb-5">Meet our team</h2>
                <p className="lg:w-1/2 mx-auto text-center text-black opacity-65 mb-12">
                    Our success is powered by a passionate team of dental experts, tech innovators,
                    and customer service professionals who are committed to delivering the best experience
                    for both patients and dental clinics.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-8 justify-items-center">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="text-center font-inter">
                            <img
                                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                                src={member.imageUrl}
                                alt={member.name}
                            />
                            <h3 className="text-lg font-semibold leading-129">{member.name}</h3>
                            <p className="text-sm text-brandPrimary leading-129">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};