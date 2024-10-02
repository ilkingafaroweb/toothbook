import React from 'react';

interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
}

const teamMembers: TeamMember[] = [
    { name: 'Olivia Rhye', role: 'Founder & CEO', imageUrl: '/path-to-image/olivia.jpg' },
    { name: 'Ulvı Mehdıyev', role: 'Manager', imageUrl: '/path-to-image/ulvi.jpg' },
    { name: 'Lana Steiner', role: 'Backend Developer', imageUrl: '/path-to-image/lana.jpg' },
    { name: 'Demi Wilkinson', role: 'Frontend Developer', imageUrl: '/path-to-image/demi.jpg' },
    { name: 'Candice Wu', role: 'Backend Developer', imageUrl: '/path-to-image/candice.jpg' },
    { name: 'Natali Craig', role: 'Product Designer', imageUrl: '/path-to-image/natali.jpg' },
    { name: 'Drew Cano', role: 'UX Researcher', imageUrl: '/path-to-image/drew.jpg' },
    { name: 'Orlando Diggs', role: 'Customer Success', imageUrl: '/path-to-image/orlando.jpg' },
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

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-8 justify-items-center">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="text-center font-inter">
                            <img
                                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s'
                                // src={member.imageUrl}
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