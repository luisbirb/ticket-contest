import React from 'react';
import { AppState } from '../types';
import { Button } from './Button';
import { ClipboardCheck, Clock, Share } from 'lucide-react';

interface ConfirmationPageProps {
  state: AppState;
  onReset: () => void;
}

export function ConfirmationPage({ state, onReset }: ConfirmationPageProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeIn">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <ClipboardCheck className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Contest Submitted Successfully!</h2>
        <p className="text-gray-600 mt-2">
          Your parking ticket contest has been received and is being processed.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">What happens next?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Your contest will be reviewed by authorities, typically within 30-45 days. You'll receive updates via email.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="text-md font-medium text-gray-800 mb-3">Contest Details</h3>
        
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600">Submission ID:</span>
            <span className="font-medium">{state.submissionId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600">Ticket Number:</span>
            <span className="font-medium">{state.ticket.ticketNumber}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600">License Plate:</span>
            <span className="font-medium">{state.ticket.licensePlate}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Submission Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4">
        <Button 
          variant="outline"
          fullWidth 
          className="justify-center"
          icon={<Share size={18} />}
        >
          Share Contest Details
        </Button>
        
        <Button 
          variant="secondary"
          fullWidth 
          className="justify-center"
          onClick={onReset}
        >
          Submit Another Contest
        </Button>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Need help or have questions?</p>
        <a href="#help" className="text-blue-600 hover:underline">Contact our support team</a>
      </div>
    </div>
  );
}