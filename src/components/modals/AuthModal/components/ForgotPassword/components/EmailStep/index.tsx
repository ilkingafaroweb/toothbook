import React, { useEffect } from "react";
import { Button, Input } from "../../../../../../UI";
import { useApi } from "../../../../../../../hooks";
import apiEndpoints from "../../../../../../../apiEndpoints";
import Swal from "sweetalert2";

interface EmailStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({ onContinue, onBack }) => {

  const { callApi, response, error, loading } = useApi();

  const [formData, setFormData] = React.useState({
    loginPass: '',
  });
  
  useEffect(() => {
    response && Swal.fire({
      icon: 'success',
      title: 'Success',
      text: `${response}`,
    }).then(() => {
      localStorage.setItem('loginPass', formData.loginPass)
      onContinue();
    });
  }, [response])

  useEffect(() => {
    error && Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${error}`,
    });
  }, [error])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await callApi({ 
      endpoint: apiEndpoints.forgotPassword.checkEmail,
      params: {
        loginPass: formData.loginPass
      }
    })
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <h2 className="text-lg font-semibold text-accordionTitle">Enter your login pass</h2>
        <Input
          name='loginPass'
          placeholder='Email or phone number'
          isValid={true}
          value={formData.loginPass}
          onChange={handleChange}
        />
        <Button 
          text="Continue" 
          color="bg-brandPrimary" 
          size="w-full"
          isLoading={loading}
        />
        <Button 
          text='Back' 
          color="bg-brandSecondary" 
          size="w-full" 
          hover={true} 
          button={true} 
          onClick={onBack} 
        />
      </form>
  );
};