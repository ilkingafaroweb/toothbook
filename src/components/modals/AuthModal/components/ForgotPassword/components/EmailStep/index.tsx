import React from "react";
import { Button, Input } from "../../../../../../UI";
import { useApi } from "../../../../../../../hooks";
import apiEndpoints from "../../../../../../../apiEndpoints";

interface EmailStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({ onContinue, onBack }) => {

  const { callApi, loading, error, response } = useApi();

  const [formData, setFormData] = React.useState({
    loginPass: '',
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

    callApi({ endpoint: apiEndpoints })

    onContinue();
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
        <Button text="Continue" color="bg-brandPrimary" size="w-full" />
        <Button text='Back' color="bg-brandSecondary" size="w-full" hover={true} button={true} onClick={onBack} />
      </form>
  );
};