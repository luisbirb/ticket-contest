import React, { useRef } from 'react';
import { Camera, Upload, Trash2, FileText, Image } from 'lucide-react';
import { Button } from '../Button';
import { Evidence } from '../../types';

interface EvidenceFormProps {
  evidence: Evidence[];
  onAddEvidence: (evidence: Evidence) => void;
  onRemoveEvidence: (id: string) => void;
  onUpdateEvidence: (id: string, updates: Partial<Evidence>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function EvidenceForm({
  evidence,
  onAddEvidence,
  onRemoveEvidence,
  onUpdateEvidence,
  onNext,
  onBack
}: EvidenceFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const evidenceType = file.type.startsWith('image/') ? 'photo' : 'document';
    
    const newEvidence: Evidence = {
      id: `evidence-${Date.now()}`,
      file,
      description: '',
      type: evidenceType
    };
    
    onAddEvidence(newEvidence);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const getFileTypeIcon = (type: Evidence['type']) => {
    switch (type) {
      case 'photo':
        return <Image size={24} className="text-blue-500" />;
      case 'document':
        return <FileText size={24} className="text-green-500" />;
      default:
        return <FileText size={24} className="text-gray-500" />;
    }
  };
  
  const getFilePreview = (evidence: Evidence) => {
    if (!evidence.file) return null;
    
    if (evidence.type === 'photo') {
      return (
        <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
          <img
            src={URL.createObjectURL(evidence.file)}
            alt={evidence.description || 'Evidence photo'}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    
    return getFileTypeIcon(evidence.type);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Supporting Evidence</h2>
      <p className="text-gray-600 mb-6">
        Upload photos or documents that support your contest. This might include photos of the location, 
        signs, receipts, or other relevant evidence.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="rounded-full bg-blue-100 p-3 mb-3">
                <Upload size={24} className="text-blue-600" />
              </div>
              <h3 className="text-md font-medium text-gray-700 mb-1">Upload a file</h3>
              <p className="text-sm text-gray-500">
                Drag & drop or click to upload
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </div>
            
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="rounded-full bg-green-100 p-3 mb-3">
                <Camera size={24} className="text-green-600" />
              </div>
              <h3 className="text-md font-medium text-gray-700 mb-1">Take a photo</h3>
              <p className="text-sm text-gray-500">
                Use your camera to take a photo directly
              </p>
            </div>
          </div>
          
          {evidence.length > 0 && (
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Uploaded Evidence</h3>
              <div className="space-y-3">
                {evidence.map((item) => (
                  <div key={item.id} className="flex border border-gray-200 rounded-lg p-4">
                    {getFilePreview(item)}
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.file?.name || 'File'}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {item.file?.type || 'Unknown'} • {item.file?.size ? Math.round(item.file.size / 1024) + ' KB' : ''}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveEvidence(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="mt-2">
                        <textarea
                          value={item.description}
                          onChange={(e) => onUpdateEvidence(item.id, { description: e.target.value })}
                          placeholder="Describe this evidence..."
                          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Evidence Tips</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Clear photos of signs or meters are very helpful</li>
              <li>Include timestamps when possible</li>
              <li>Receipts or payment confirmations can be decisive</li>
              <li>Provide context in the description fields</li>
            </ul>
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
          <Button type="submit">
            Continue to Review
          </Button>
        </div>
      </form>
    </div>
  );
}