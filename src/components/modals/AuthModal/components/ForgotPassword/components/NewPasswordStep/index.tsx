import React from "react";
import { Button, Input } from "../../../../../../UI";

interface NewPasswordStepProps {
    onBack: () => void;
}

export const NewPasswordStep: React.FC<NewPasswordStepProps> = ({ onBack }) => {
    const [formData, setFormData] = React.useState({
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword === formData.confirmPassword) {
            // Şifre sıfırlama işlemi yapılır
            console.log('Password reset successfully:', formData.newPassword);
        } else {
            console.log('Passwords do not match');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <h2 className="text-lg font-semibold text-accordionTitle">Enter a new password</h2>
            <Input
                name='newPassword'
                type='password'
                placeholder='New Password'
                isValid={true}
                value={formData.newPassword}
                onChange={handleChange}
            />
            <Input
                name='confirmPassword'
                type='password'
                placeholder='Confirm Password'
                isValid={true}
                value={formData.newPassword}
                onChange={handleChange}
            />
            <Button text="Confirm" color="bg-brandPrimary" size="w-full" />
            <Button text='Back' color="bg-brandSecondary" size="w-full" hover={true} button={true} onClick={onBack} />
        </form>
    );
};