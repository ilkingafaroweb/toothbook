import React, { useEffect, useState } from "react";
import { Button, Input } from "../../../../../../UI";
import { ErrorMessage } from "../../../Status";
import apiEndpoints from "../../../../../../../apiEndpoints";
import { useApi } from "../../../../../../../hooks";
import Swal from "sweetalert2";
import { useLogin } from "../../../../../../../contexts";

interface NewPasswordStepProps {
    onBack: () => void;
}

export const NewPasswordStep: React.FC<NewPasswordStepProps> = ({ onBack }) => {

    const { callApi, response, error, loading } = useApi()
    const { setShowAuth } = useLogin()
    const loginPass = localStorage.getItem('loginPass')

    useEffect(() => {
        response && Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `${response}`,
        }).then(() => {
            setShowAuth(false);
        });
    }, [response])

    useEffect(() => {
        error && Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error}`,
        })
    }, [error])

    const [formData, setFormData] = React.useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword === formData.confirmPassword) {
            await callApi({ 
                method: 'POST',
                endpoint: apiEndpoints.forgotPassword.resetPassword,
                params: {
                  loginPass: loginPass,
                  password: formData.newPassword
                }
            })
        } else {
            setErrorMessage('Passwords do not match')
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <ErrorMessage errorMessage={errorMessage} />
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
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <Button text="Confirm" color="bg-brandPrimary" size="w-full" isLoading={loading} />
            <Button text='Back' color="bg-brandSecondary" size="w-full" hover={true} button={true} onClick={onBack} />
        </form>
    );
};