import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { formatDate } from '../utils/formatters';
import { AppState, Evidence } from '../types';
import { Button } from './Button';
import { FileText, Image } from 'lucide-react';

interface ReviewSummaryProps {
  state: AppState;
  onBack: () => void;
  onContinue: () => void;
}

export function ReviewSummary({ state, onBack, onContinue }: ReviewSummaryProps) {
  const getEvidenceIcon = (evidence: Evidence) => {
    if (evidence.type === 'photo') {
      return <Image size={16} className="text-blue-500" />;
    }
    return <FileText size={16} className="text-green-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your Contest</h2>
      <p className="text-gray-600 mb-6">
        Please review the information below before submitting your contest. You can go back to make changes if needed.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b">Ticket Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Ticket Number</p>
              <p className="text-md">{state.ticket.ticketNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Issue Date</p>
              <p className="text-md">{formatDate(state.ticket.issueDate)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">License Plate</p>
              <p className="text-md">{state.ticket.licensePlate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Fine Amount</p>
              <p className="text-md">{formatCurrency(state.ticket.amount)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Violation</p>
              <p className="text-md">{state.ticket.violation}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-md">{state.ticket.location}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b">Contest Reason</h3>
          <div>
            <p className="text-sm font-medium text-gray-500">Selected Reason</p>
            <p className="text-md">{state.selectedReason?.title || 'None selected'}</p>
            
            {state.selectedReason?.id === 'custom' ? (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-500">Your Explanation</p>
                <p className="text-md whitespace-pre-line bg-gray-50 p-3 rounded-md mt-1 border border-gray-200">
                  {state.customReason}
                </p>
              </div>
            ) : (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-md">{state.selectedReason?.description}</p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b">Evidence</h3>
          {state.evidence.length === 0 ? (
            <p className="text-gray-500 italic">No evidence uploaded</p>
          ) : (
            <ul className="space-y-2">
              {state.evidence.map((item) => (
                <li key={item.id} className="flex items-start border border-gray-200 rounded-md p-2">
                  <div className="mr-2 mt-1">{getEvidenceIcon(item)}</div>
                  <div>
                    <p className="text-sm font-medium">{item.file?.name || 'File'}</p>
                    {item.description && (
                      <p className="text-sm text-gray-600">{item.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
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
          type="button"
          onClick={onContinue}
        >
          Continue to Submit
        </Button>
      </div>
    </div>
  );
}