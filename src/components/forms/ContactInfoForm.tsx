import React from 'react';
import { Button } from '../Button';

interface ContactInfoFormProps {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  onUpdate: (updates: Partial<typeof ContactInfoFormProps['contactInfo']>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function ContactInfoForm({
  contactInfo,
  onUpdate,
  onSubmit,
  onBack,
  isSubmitting
}: ContactInfoFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  const isFormValid = () => {
    return (
      contactInfo.name.trim() !== '' &&
      contactInfo.email.trim() !== '' &&
      // Basic email validation
      /\S+@\S+\.\S+/.test(contactInfo.email) &&
      contactInfo.phone.trim() !== ''
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
      <p className="text-gray-600 mb-6">
        Please provide your contact details so we can keep you updated on your contest status.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={contactInfo.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={contactInfo.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="johndoe@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={contactInfo.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(123) 456-7890"
              required
            />
          </div>
          
          <div className="mt-2">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the terms and conditions
                </label>
                <p className="text-gray-500">
                  By submitting this form, you certify that all information provided is true and accurate.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!isFormValid() || isSubmitting}
            isLoading={isSubmitting}
          >
            Submit Contest
          </Button>
        </div>
      </form>
    </div>
  );
}