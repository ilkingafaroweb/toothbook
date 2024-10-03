import { useEffect, useState } from "react";
import { Button } from "../../../../../../UI";
import { useApi } from "../../../../../../../hooks";
import Swal from "sweetalert2";
import apiEndpoints from "../../../../../../../apiEndpoints";

interface OTPStepProps {
    onContinue: () => void;
    onBack: () => void;
}

export const OTPStep: React.FC<OTPStepProps> = ({ onContinue, onBack }) => {

    const { callApi, response, error, loading } = useApi()
    const email = localStorage.getItem('email')

    useEffect(() => {
        response && Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `${response}`,
        }).then(() => {
            onContinue();
        });
    }, [response])

    useEffect(() => {
        error && Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error}`,
        })
    }, [error])

    const [otp, setOtp] = useState<string[]>(['', '', '', '', '']);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (value.length === 1 && /^[0-9]$/.test(value)) {
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                return newOtp;
            });
            
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        } else if (value.length === 0) {
            
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
            }

            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = ''; 
                return newOtp;
            });
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.every((digit) => digit !== '')) {
            const token = otp.join('')
            await callApi({ 
                method: 'POST',
                endpoint: apiEndpoints.forgotPassword.postOTP,
                params: {
                  loginPass: email,
                  token: token
                }
            })
        } else {

        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <h2 className="text-lg font-semibold text-accordionTitle">Enter the code sent to your email</h2>
            <div className="flex space-x-2 mb-8 justify-between">
                {otp.map((_, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        className="w-12 h-12 outline-none text-center text-xl border border-gray-300 focus:border-brandPrimary rounded"
                    />
                ))}
            </div>
            <Button text="Continue" color="bg-brandPrimary" size="w-full" isLoading={loading}/>
            <Button text='Back' color="bg-brandSecondary" size="w-full" hover={true} button={true} onClick={onBack} />
        </form>
    );
};