'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import './analysis.css';
import { updateProcessInput as sendAnswers } from '../../../helpers/analysis/sendAnswers';
import { useRouter } from 'next/navigation';

interface Question {
  question: string;
  field: string;
  answer: string | string[];
  type: 'open' | 'mcq';
  possibilities: string[];
}



interface QuestionsProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  processId: string | null;
  questions: Question[];
  setQuestions?: (questions: Question[]) => void;
}

export default function Questions({
  currentStep,
  onStepChange,
  processId,
  questions,
  setQuestions,
}: QuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [field: string]: string | string[] }>({});
  const [otherText, setOtherText] = useState<string>('');
  const otherInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  // Retrieve userId from Redux store
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;

  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleOpenAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.field]: value }));
  };

  const handleMCQChange = (value: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const isMulti = Array.isArray(question.answer);

    if (value === 'Other (please specify)') {
      if (isMulti) {
        const prevAnswers = (answers[question.field] as string[]) || [];
        if (!prevAnswers.includes('Other (please specify)') && !otherText) {
          setAnswers((prev) => ({
            ...prev,
            [question.field]: [...prevAnswers, 'Other (please specify)'],
          }));
        }
      } else {
        if (answers[question.field] !== 'Other (please specify)' && !otherText) {
          setAnswers((prev) => ({ ...prev, [question.field]: 'Other (please specify)' }));
        }
      }
      if (otherInputRef.current) {
        otherInputRef.current.focus();
      }
      return;
    }

    if (isMulti) {
      const prevAnswers = (answers[question.field] as string[]) || [];
      const updatedAnswers = prevAnswers.includes(value)
        ? prevAnswers.filter((v) => v !== value)
        : [...prevAnswers, value];
      setAnswers((prev) => ({ ...prev, [question.field]: updatedAnswers }));
      setOtherText('');
    } else {
      setAnswers((prev) => ({ ...prev, [question.field]: value }));
      setOtherText('');
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    setOtherText(value);

    const isMulti = Array.isArray(question.answer);
    if (isMulti) {
      const prevAnswers = (answers[question.field] as string[]) || [];
      const filteredAnswers = prevAnswers.filter((v) => v !== 'Other (please specify)' && v !== otherText);
      setAnswers((prev) => ({
        ...prev,
        [question.field]: value ? [...filteredAnswers, value] : filteredAnswers,
      }));
    } else {
      setAnswers((prev) => ({ ...prev, [question.field]: value }));
    }
  };

  const handleNext = async () => {
    if (setQuestions) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = {
        ...updatedQuestions[currentQuestionIndex],
        answer: currentAnswer || (Array.isArray(question.answer) ? [] : ''),
      };
      setQuestions(updatedQuestions);
    }

    setOtherText('');

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      onStepChange(currentStep + 1);

      const questionsWithAnswers = questions.map((q, index) => ({
        ...q,
        answer: index === currentQuestionIndex 
          ? (currentAnswer || (Array.isArray(q.answer) ? [] : ''))
          : (answers[q.field] || (Array.isArray(q.answer) ? [] : '')),
      }));

      if (processId && userId) {
        const result = await sendAnswers(processId, questionsWithAnswers, userId);
        if (result.success) {
          console.log(result.message);
          router.push(`/result?analysisId=${result.analysisId}`);
          onStepChange(1); // Set step to 1

        } else {
          console.error(result.error);
          // Optionally show error message
        }
      } else {
        console.error('Missing processId or userId');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
      setOtherText('');
    }
  };

  const isMCQ = question.type === 'mcq';
  const isOpen = question.type === 'open';
  const currentAnswer = answers[question.field];

  useEffect(() => {
    console.log('Current answers:', answers);
  }, [answers]);

  return (
    <div className="analysis-step-container">
      <h2 className="analysis-title">Help Us Understand Your Needs</h2>
      <p className="analysis-subtitle">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>

      <div className="analysis-progress-bar">
        <div className="analysis-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="analysis-question">
        <h3 className="analysis-question-title">{question.question}</h3>

        {isOpen && (
          <input
            type="text"
            className="analysis-input"
            value={(currentAnswer as string) || ''}
            onChange={(e) => handleOpenAnswerChange(e.target.value)}
          />
        )}

        {isMCQ && (
          <div className="analysis-options">
            {question.possibilities.map((option, idx) => {
              const isSelected = Array.isArray(currentAnswer)
                ? currentAnswer.includes(option) || currentAnswer.includes(otherText)
                : currentAnswer === option || (option === 'Other (please specify)' && otherText);

              return (
                <div
                  key={idx}
                  className={`analysis-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={(e) => handleMCQChange(option, e)}
                >
                  {option}

                  {option === 'Other (please specify)' && isSelected && (
                    <input
                      ref={otherInputRef}
                      type="text"
                      className="analysis-input"
                      placeholder="Please specify..."
                      value={otherText}
                      onClick={(e) => e.stopPropagation()}
                      onFocus={(e) => e.stopPropagation()}
                      onChange={handleOtherInputChange}
                      onKeyDown={(e) => e.stopPropagation()}
                      autoFocus
                      style={{ marginTop: '0.5rem' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="analysis-navigation">
        <button
          className="analysis-button"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        <button
          className="analysis-button analysis-button-primary"
          onClick={handleNext}
          disabled={
            isOpen && !currentAnswer ||
            (isMCQ && (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)))
          }
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}