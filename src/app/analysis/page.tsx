'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Agreement from './Agreement';
import Fetch_Loading from './Fetch_Loading';
import Questions from './Questions';
import Analysis_Loading from './Analysis_Loading';
import Done from './Done';
import Error from './Error';
import { createProcess } from '../../../helpers/analysis/createProcess';
import './analysis.css';



// Define types for props
interface CommonProps {
  currentStep: number;
  onStepChange: (newStep: number) => void;
}

interface ProcessProps extends CommonProps {
  processId: string | null;
  url?: string; // Only needed for components that use url
}

export default function Analysis() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState<number>(1); // Start from step 1 (Agreement)
  const [processId, setProcessId] = useState<string | null>(null); // Store processId
  const [error, setError] = useState<string | null>(null); // Store any errors
  const url = searchParams.get('url');
  const [questions, setQuestions] = useState<any[]>([]);


  const hasInitiated = useRef(false); // ✅ ref to prevent double run


  useEffect(() => {
    if (!url) {
      router.replace('/landing');
      return;
    }

    if (hasInitiated.current) return; // ✅ already ran once
    hasInitiated.current = true;

    // Call createProcess when the component mounts and url is not null
    const initiateProcess = async () => {
      try {
        const result = await createProcess(url);
        if (result.success) {
          setProcessId(result.data?.processId); // Store processId
        } else {
          setError(result.error); // Store error if the call fails
        }
      } catch (err) {
        setError('Failed to initiate process');
      }
    };

    initiateProcess();
  }, [url, router]);

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  if (!url) {
    return null;
  }

  // If there's an error indicating website is not reachable, show the Error component
  if (error === 'Website is not reachable or does not exist') {
    return (
      <div className="analysis-page-container">
        <Error url={url} />
      </div>
    );
  }

  return (
    <div className="analysis-page-container">
      {step === 1 && <Agreement currentStep={step} onStepChange={handleStepChange} processId={processId} onQuestionsFetched={setQuestions}/>}
      
      {step === 2 && <Fetch_Loading url={url} currentStep={step} onStepChange={handleStepChange} processId={processId} />}
      
      {step === 3 && <Questions currentStep={step} onStepChange={handleStepChange} processId={processId} questions={questions} setQuestions={setQuestions}/>}
      
      {step === 4 && <Analysis_Loading currentStep={step} onStepChange={handleStepChange} processId={processId} />}
    </div>
  );
}