export interface Recommendation {
    title: string;
    description: string;
    impactLevel: string;
    businessFunction: string;
    outcomes: string;
    ROI: string;
    implementationConditions: string;
    businessValue: string;
    maturityFit: string;
  }
  
  export interface StrategicImpactArea {
    impactArea: string;
    summary: string;
    recommendations: Recommendation[];
  }
  
  export interface AnalysisOutput {
    strategicImpactAreas: StrategicImpactArea[];
  }
  
  export interface AnalysisData {
    analysisId: string;
    input?: any;
    output?: AnalysisOutput;
    analysis_done?: boolean;
    information_fetched?: boolean;
    input_completed?: boolean;
    website?: string;
    user_agreement?: boolean;
    userId?: string;
    unlocked?: boolean,
  }
  
  export interface GetAnalysisResponse {
    success: boolean;
    message: string;
    data?: AnalysisData;
    error?: string;
  }