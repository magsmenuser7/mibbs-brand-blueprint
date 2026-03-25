export interface QuestionnaireData {
  // Step 1: Basic Details
  name: string;
  businessName: string;
  hasWebsite: boolean;
  websiteUrl: string;
  businessStage: "" | "not_started" | "early" | "growing" | "advanced";

  // Step 2: Pincode
  pincode: string;
  locality: string;
  district: string;
  state: string;
  country: string;

  // Step 3: Industry
  industry: string;

  // Product or Service
  businessType: "" | "product" | "service";

  // Product popup options
  productCategory: string;

  // New Business Path
  startingBudget: string;
  businessMode: string;
  productBusinessType: string;
  helpNeeded: string[];

  // Existing Business Path
  yearsInBusiness: string;
  businessChallenges: string[];
  digitalScalingLevel: string;
  digitalPlatforms: string[];
  digitalActivities: string[];
  roiPercentage: string;
  monthlyRevenue: string;
  revenueRange: string;
  marketingBudgetRange: string;
  brandObjectives: string[];
}

export const initialData: QuestionnaireData = {
  name: "",
  businessName: "",
  hasWebsite: false,
  websiteUrl: "",
  businessStage: "",
  pincode: "",
  locality: "",
  district: "",
  state: "",
  country: "",
  industry: "",
  businessType: "",
  productCategory: "",
  startingBudget: "",
  businessMode: "",
  productBusinessType: "",
  helpNeeded: [],
  yearsInBusiness: "",
  businessChallenges: [],
  digitalScalingLevel: "",
  digitalPlatforms: [],
  digitalActivities: [],
  roiPercentage: "",
  monthlyRevenue: "",
  revenueRange: "",
  marketingBudgetRange: "",
  brandObjectives: [],
};
