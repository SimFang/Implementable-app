'use client';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setData, setError,setState } from '../store/slices/analysisSlice';
import './analysis-example.css';

export default function AnalysisExample() {
  const dispatch = useAppDispatch();
  const { data, state, error } = useAppSelector((state) => state.analysis);

  const handleAnalysis = async () => {
    try {
      dispatch(setState("loading1"));
      // Example API call
      const response = await fetch('/api/analysis');
      const result = await response.json();
      dispatch(setData(result));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'An error occurred'));
    }
  };

  return (
    <div className="analysis-container">
      <h2 className="analysis-title">Analysis Dashboard</h2>
      <button
        onClick={handleAnalysis}
        className="analysis-button"
        disabled={state === "loading1"}
      >
        {state === "loading1" ? 'Loading...' : 'Run Analysis'}
      </button>

      {error && (
        <p className="analysis-error">{error}</p>
      )}

      {data.length > 0 && (
        <div className="analysis-results">
          <h3 className="analysis-results-title">Results:</h3>
          <pre className="analysis-results-data">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}