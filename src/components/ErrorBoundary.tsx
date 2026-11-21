import React from 'react';
import { ShieldAlert, RotateCcw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'अप्रत्याशित त्रुटि (Unexpected error)',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Saheb World ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2C1E11] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border-2 border-amber-300 rounded-3xl p-6 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-[#8B0000] flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-[#8B0000] m-0">
              साहेब वर्ल्ड — सुरक्षित पुनर्स्थापना
            </h2>
            <p className="text-xs text-gray-600 m-0 leading-relaxed">
              डेटा लोड करते समय एक अस्थायी त्रुटि आई है। आपका स्थानीय साधना डेटा पूरी तरह सुरक्षित है।
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-[#8B0000] hover:bg-red-900 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow"
            >
              <RotateCcw className="w-4 h-4" />
              <span>पुनः लोड करें (Reload)</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
