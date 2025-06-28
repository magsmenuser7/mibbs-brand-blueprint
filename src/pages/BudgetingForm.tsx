import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import {
    ArrowLeft,
    Plus,
    BarChart3,
    TrendingUp,
    Loader2,
    Brain,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BudgetResults from '@/components/BudgetResults';

interface Step1FormData {
    companyName: string;
    websiteUrl: string;
    companyOverview: string;
    companyLocation: string;
    industry: string;
    brandProvides: string;
    businessDuration: string;
}

interface Step2FormData {
    businessStage: string;
}

interface Step3FormData {
    companyAnalysis: string;
    targetAudience: string;
    businessType: string;
}

interface WorkflowResponse {
    is_json: boolean;
    output: string;
    previous_step_index: number;
    required_inputs: Field[];
    status: string;
    step: string;
    workflow_id: string;
    workflow_step_name: string;
}

interface Field {
    description: string;
    display?: string;
    label: string;
    name: string;
    required: boolean;
    type: string;
    options?: string[];
}

interface FormDetails {
    required_inputs: Field[];
    status: string;
    workflow_id: string;
    workflow_step_name: string;
}

interface Step4FormData {
    customerLifetimeValue: string;
    marketingChannels: string[];
    repeatCustomerRevenue: number[];
    brandingChallenges: string[];
    currentBudget: string;
}

interface Step5FormData {
    brandGoals: string[];
    plannedBudgetValue: string;
    plannedBudgetDenominator: string;
    timeFrame: string;
}

interface CompanyDetails {
    profile: {
        company_name: string;
        company_description: string;
        industry_and_subsector: string;
        target_customer_segment: string;
        geographic_presence: string;
        product_maturity_and_lifecycle: string;
        key_product_or_service: string;
        Model: string;
    };
    matching_user_input: string;
}

interface MarketResearch {
    market_research_response: string;
    printable_output: string;
    citation: string[];
    input_token_count: number;
    output_token_count: number;
    model_name: string;
}

interface BudgetPrediction {
    budget_prediction: string;
    printable_output: string;
    input_token_count: number;
    output_token_count: number;
    model_name: string;
}

interface InteractiveReport {
    interactive_output: {
        brandName: string;
        currentStage: string;
        totalBudget: string;
        budgetAllocation: {
            name: string;
            description: string;
            value: number;
        }[];
        targetAudience: string[];
        competitors: string[];
        targets: {
            metric: string;
            icon: string;
        }[];
        keyInitiatives: {
            title: string;
            description: string;
        }[];
        timelineData: {
            phase: string;
            months: string;
            description: string;
        }[];
    };
    printable_output: {
        brandName: string;
        currentStage: string;
        totalBudget: string;
        budgetAllocation: {
            name: string;
            description: string;
            value: number;
        }[];
        targetAudience: string[];
        competitors: string[];
        targets: {
            metric: string;
            icon: string;
        }[];
        keyInitiatives: {
            title: string;
            description: string;
        }[];
        timelineData: {
            phase: string;
            months: string;
            description: string;
        }[];
    };
    input_token_count: number;
    output_token_count: number;
    model_name: string;
}

// Helper function to get minimum budget for a given time frame
function getMinBudgetForTimeFrame(timeFrame: string): number {
    switch (timeFrame) {
        case '6 months':
            return 180000;
        case '12 months':
            return 400000;
        case '18 months':
            return 600000;
        case '24 months':
            return 1000000;
        default:
            return 0;
    }
}

const BudgetingFormPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [step1Data, setStep1Data] = useState<Step1FormData | null>(null);
    const [step2Data, setStep2Data] = useState<Step2FormData | null>(null);
    const [step3Data, setStep3Data] = useState<Step3FormData | null>(null);
    const [step4Data, setStep4Data] = useState<Step4FormData | null>(null);
    const [step5Data, setStep5Data] = useState<Step5FormData | null>(null);

    const [companyDetailFetcherOutput, setCompanyDetailFetcherOutput] =
        useState<CompanyDetails | null>(null);
    const [marketingBenchmarkOutput, setMarketingBenchmarkOutput] =
        useState<MarketResearch | null>(null);
    const [budgetPredictorOutput, setBudgetPredictorOutput] =
        useState<BudgetPrediction | null>(null);
    const [interactiveReportOutput, setInteractiveReportOutput] =
        useState<InteractiveReport | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [isGeneratingBudget, setIsGeneratingBudget] =
        useState<boolean>(false);
    const [analyzedSnapshot, setAnalyzedSnapshot] = useState<any>();
    const [formDetails, setFormDetails] = useState<FormDetails | null>(null);
    const [errorStep, setErrorStep] = useState(false);
    const [formReady, setFormReady] = useState(false);
    const form = useForm<Step1FormData>();
    const step2Form = useForm<Step2FormData>();
    const step3Form = useForm<Step3FormData>();
    const step4Form = useForm<Step4FormData>();
    const step5Form = useForm<Step5FormData>();
    const navigate = useNavigate();

    const totalSteps = 5;
    const progressPercentage = (currentStep / totalSteps) * 100;

    const industries = [
        'Technology',
        'Healthcare',
        'Finance',
        'Retail',
        'Manufacturing',
        'Education',
        'Real Estate',
        'Food & Beverage',
        'Transportation',
        'Entertainment',
        'Consulting',
        'Beauty',
        'Fashion',
        'Travel',
        'E-commerce',
        'Other',
    ];

    const businessDurations = [
        '<1 year',
        '2-5 years',
        '5-10 years',
        '>10 years',
    ];

    const businessStages = [
        {
            id: 'entry',
            title: 'Entry Level',
            description:
                'Starting a new business and not sure where to put money in branding',
            icon: Plus,
        },
        {
            id: 'mid',
            title: 'Mid Level',
            description:
                'Existing business, spending vaguely on branding and marketing, need navigation',
            icon: BarChart3,
        },
        {
            id: 'advanced',
            title: 'Advanced',
            description:
                'Extensive market visibility, looking to streamline and scale with higher budgets',
            icon: TrendingUp,
        },
    ];

    const businessTypes = ['B2B', 'D2C', 'B2G', 'Platform', 'SAAS'];

    const marketingChannels = [
        'Social Media',
        'Search Engine Marketing',
        'Email Marketing',
        'Influencer Marketing',
        'Content Marketing',
        'Trade Shows',
        'Print Media',
    ];

    const brandingChallenges = [
        'Inconsistent brand messaging',
        'Low brand recognition',
        'Difficulty differentiating from competitors',
        'Unclear brand positioning',
        'Limited marketing resources',
        'Measuring branding ROI',
    ];

    const brandGoals = [
        'Brand Awareness',
        'Lead Generation',
        'Customer Retention',
        'Product Launch',
        'Market Expansion',
        'Rebranding',
        'Legal / IPR',
    ];

    const budgetRanges = [
        'Less than 30 Lakhs',
        '30 Lakhs - 50 Lakhs',
        '50 Lakhs - 1 Cr',
        '1Cr - 5 Cr',
        '5 Cr - 10 Cr',
        'More than 10 Cr',
    ];

    const timeFrames = ['6 months', '12 months', '18 months', '24 months'];

    useEffect(() => {
        (async () => {
            await initializeForm();
            setFormReady(true);
        })();
    }, []);

    // useEffect(() => {
    //     const currentSnapshot = { ...step1Data, ...step2Data };

    //     // console.log('current snapshot', currentSnapshot);
    //     // console.log('analyzed snapshot', analyzedSnapshot);
    //     // Compare current snapshot with analyzed snapshot
    //     if (
    //         JSON.stringify(currentSnapshot) !== JSON.stringify(analyzedSnapshot)
    //     ) {
    //         if (currentStep === 3 && !isAnalyzing) {
    //             // setIsAnalyzing(true);
    //             // setAnalyzedSnapshot({ ...currentSnapshot });

    //             setTimeout(() => {
    //                 // Pre-populate form with AI-generated content
    //                 step3Form.setValue(
    //                     'companyAnalysis',
    //                     'Based on your entertainment industry focus and 3-5 years of experience, your company operates in a highly competitive market where brand differentiation is crucial. Your mid-level business stage indicates established operations with room for strategic growth through enhanced branding initiatives.'
    //                 );
    //                 step3Form.setValue(
    //                     'targetAudience',
    //                     'Small to medium-sized businesses looking for cost-effective digital solutions. Primary demographics include business owners aged 25-45, tech-savvy professionals, and companies with 10-200 employees seeking to improve their operational efficiency.'
    //                 );
    //                 step3Form.setValue('businessType', 'B2B');
    //                 setIsAnalyzing(false);
    //             }, 3000);
    //         }
    //     }
    // }, [currentStep, step3Form]);

    // useEffect(() => {
    //     if (currentStep === 6 && !isGeneratingBudget) {
    //         setIsGeneratingBudget(true);
    //         setTimeout(() => {
    //             setIsGeneratingBudget(false);
    //             setCurrentStep(7);
    //         }, 4000);
    //     }
    // }, [currentStep, isGeneratingBudget]);

    // Initialize form details from the server
    const initializeForm = async () => {
        console.log('initializing form');
        try {
        
            const response = await fetch(
                import.meta.env.VITE_API_URL + '/process',
                {
                    method: 'POST',
                    // method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-client-id': import.meta.env.VITE_CLIENT_ID,
                        'x-token': import.meta.env.VITE_X_TOKEN,
                    },
                    body: JSON.stringify({
                        prompt: 'Generate marketing budget plan and give result as interactive report',
                    }),
                }
            );
            if (!response.ok) throw new Error('Server error');
            const json: FormDetails = await response.json();
            setFormDetails(json);
        } catch (error) {
            setErrorStep(true);
        }
    };

    // Fetch company details based on user inputs
    const companyDetailFetcher = async (
        inputs: any
    ): Promise<WorkflowResponse> => {
        try {
            const payload = {
                workflow_id: formDetails?.workflow_id,
                url: inputs?.websiteUrl ?? '',
                company_name: inputs?.companyName ?? '',
                industry: inputs?.industry ?? '',
                product_offering: inputs?.brandProvides ?? '',
                other_details: inputs?.companyOverview ?? '',
                businessStage: inputs?.businessStage ?? '',
            };

            const response = await fetch(
                import.meta.env.VITE_API_URL +
                    import.meta.env.VITE_API_ENDPOINT_COMPANY_DETAIL_FETCHER,
                {
                    method: 'POST',
                    // method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) throw new Error('Server error');

            const json = await response.json();
            return json;
        } catch (error) {
            setErrorStep(true);
        }
    };

    // Fetch marketing benchmark data based on user inputs
    const marketingBenchmarkFetcher = async (
        inputs: any
    ): Promise<WorkflowResponse> => {
        console.log('inputs', inputs);
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL +
                    import.meta.env.VITE_API_ENDPOINT_MARKETING_BENCHMARK,
                {
                    method: 'POST',
                    // method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        workflow_id: formDetails?.workflow_id,
                        updated_target_segment:
                            inputs.profile?.[0]?.target_customer_segment ||
                            inputs.profile?.target_customer_segment ||
                            'b2b or fintech companies',
                        updated_offering: step1Data?.brandProvides || '',
                        objective: 'branding',
                    }),
                }
            );

            if (!response.ok) throw new Error('Server error');

            const json = await response.json();
            console.log('response data', json);
            return json;
        } catch (error) {
            setErrorStep(true);
            console.log('error', error);
        }
    };

    // Fetch market budget predictor data based on user inputs
    const marketBudgetPredictorFetcher = async (
        inputs
    ): Promise<WorkflowResponse> => {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL +
                    import.meta.env
                        .VITE_API_ENDPOINT_MARKETING_BUDGET_PREDICTOR,
                {
                    method: 'POST',
                    // method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        workflow_id: formDetails?.workflow_id,
                        competitor_analysis_response: '',
                        specific_instruction: inputs.marketingChannels,
                        marketing_goal: inputs.brandGoals,
                        budget: inputs.plannedBudgetValue,
                        timeline: inputs.timeFrame,
                    }),
                }
            );

            if (!response.ok) throw new Error('Server error');

            const json = await response.json();

            console.log('budget predictor response data:', json);

            return json;
        } catch (error) {
            setErrorStep(true);
        }
    };

    // Fetch interactive report data based on user inputs
    const interactiveReportFetcher = async (): Promise<WorkflowResponse> => {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL +
                    import.meta.env.VITE_API_ENDPOINT_INTERACTIVE_REPORT,
                {
                    method: 'POST',
                    // method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        workflow_id: formDetails?.workflow_id,
                        updated_target_segment: '',
                        updated_offering: '',
                        company_location: '',
                        objective: 'branding',
                    }),
                }
            );
            if (!response.ok) throw new Error('Server error');
            const json = await response.json();

            console.log('response data', json);

            return json;
        } catch (error) {
            setErrorStep(true);
        }
    };

    const onStep1Submit = async (data: Step1FormData) => {
        setLoading(true);
        try {
            console.log('Step 1 data:', data);
            setStep1Data(data);
            setCurrentStep(2);
        } finally {
            setLoading(false);
        }
    };

    const onStep2Submit = async (data: Step2FormData) => {
        const currentSnapshot = { ...step1Data, ...data };

        try {
            console.log('Current snapshot:', currentSnapshot);
            console.log('Analyzed snapshot:', analyzedSnapshot);

            if (
                JSON.stringify(currentSnapshot) !==
                JSON.stringify(analyzedSnapshot)
            ) {
                console.log('reached here');
                setAnalyzedSnapshot({ ...currentSnapshot });
                setCurrentStep(3);
                setIsAnalyzing(true);
            }

            if (
                JSON.stringify(currentSnapshot) !==
                JSON.stringify(analyzedSnapshot)
            ) {
                setCurrentStep(3);
                setIsAnalyzing(true);
                console.log('does not match');
                setAnalyzedSnapshot({ ...currentSnapshot });
                setStep2Data(data);
                console.log('Step 2 data:', data);
                console.log('Combined data:', { ...step1Data, ...data });

                const resCompanyDetail: WorkflowResponse =
                    await companyDetailFetcher({
                        ...step1Data,
                        ...data,
                    });

                console.log(
                    'resCompanyDetail',
                    JSON.parse(JSON.stringify(resCompanyDetail))
                );

                const resCompanyDetailOutput = JSON.parse(
                    resCompanyDetail.output
                );

                console.log('resCompanyDetailOutput', resCompanyDetailOutput);

                const about_company = JSON.parse(
                    resCompanyDetailOutput['about_company'] || '{}'
                );

                console.log('about_company', about_company);

                setCompanyDetailFetcherOutput(about_company);

                const company_description =
                    about_company.profile?.[0]?.company_description ||
                    about_company.profile?.company_description ||
                    '';
                const target_customer_segment =
                    about_company.profile?.[0]?.target_customer_segment ||
                    about_company.profile?.target_customer_segment ||
                    '';
                const model =
                    about_company.profile?.[0]?.Model ||
                    about_company.profile?.Model ||
                    '';

                console.log('company description', company_description);
                console.log('about company', about_company);

                if (typeof about_company.profile === 'object')
                    step3Form.setValue(
                        'companyAnalysis',
                        company_description === 'Not Provided'
                            ? ''
                            : company_description
                    );
                step3Form.setValue(
                    'targetAudience',
                    target_customer_segment === 'Not Provided'
                        ? ''
                        : target_customer_segment
                );

                let matchedBusinessType = 'B2B';
                if (model && typeof model === 'string') {
                    for (const type of businessTypes) {
                        if (model.toLowerCase().includes(type.toLowerCase())) {
                            matchedBusinessType = type;
                            break;
                        }
                    }
                }

                const resMarketBenchmark =
                    await marketingBenchmarkFetcher(about_company);

                console.log('resMarketBenchmark', resMarketBenchmark);

                setMarketingBenchmarkOutput(
                    JSON.parse(resMarketBenchmark.output)
                );

                step3Form.setValue('businessType', matchedBusinessType);
                setIsAnalyzing(false);
            } else {
                setCurrentStep(3);
            }
        } catch (error) {
            console.log('error:', error);
        }
    };

    const onStep3Submit = (data: Step3FormData) => {
        setLoading(true);
        try {
            console.log('Step 3 data:', data);
            setStep3Data(data);
            console.log('All data:', { ...step1Data, ...step2Data, ...data });
            setCurrentStep(4);
        } finally {
            setLoading(false);
        }
    };

    const onStep4Submit = (data: Step4FormData) => {
        setLoading(true);
        try {
            console.log('Step 4 data:', data);
            setStep4Data(data);
            console.log('All data:', {
                ...step1Data,
                ...step2Data,
                ...step3Data,
                ...data,
            });

            setCurrentStep(5);
        } finally {
            setLoading(false);
        }
    };

    const onStep5Submit = async (data: Step5FormData) => {
        setLoading(true);
        debugger;
        try {
            setCurrentStep(6);
            console.log('Step 5 data:', data);
            setStep5Data(data);
            const allFormData = {
                ...step1Data,
                ...step2Data,
                ...step3Data,
                ...step4Data,
                ...data,
            };

            console.log('All data:', allFormData);
            const resBudgetPredictor = await marketBudgetPredictorFetcher({
                ...allFormData,
            });
            console.log(
                'res budget predictor',
                JSON.parse(resBudgetPredictor?.output)
            );
            setBudgetPredictorOutput(JSON.parse(resBudgetPredictor.output));
            const resInteractiveReport = await interactiveReportFetcher();
            const resInteractiveReportOutput = JSON.parse(
                resInteractiveReport.output
            );

            console.log(
                'res interactive report',
                JSON.parse(resInteractiveReport.output)
            );
            setInteractiveReportOutput(
                JSON.parse(resInteractiveReportOutput.interactive_output)
            );
            setCurrentStep(7);
        } finally {
            setLoading(false);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStartOver = async () => {
        setStep1Data(null);
        setStep2Data(null);
        setStep3Data(null);
        setStep4Data(null);
        setStep5Data(null);
        setCompanyDetailFetcherOutput(null);
        setMarketingBenchmarkOutput(null);
        setBudgetPredictorOutput(null);
        setInteractiveReportOutput(null);
        setLoading(false);
        setIsAnalyzing(false);
        setIsGeneratingBudget(false);
        setAnalyzedSnapshot(undefined);
        setFormDetails(null);
        setErrorStep(false);
        setFormReady(false);
        form.reset();
        step2Form.reset();
        step3Form.reset();
        step4Form.reset();
        step5Form.reset();
        await initializeForm();
        setFormReady(true);
        setCurrentStep(1);
    };

    const getAllFormData = () => {
        return {
            ...step1Data,
            ...step2Data,
            ...step3Data,
            ...step4Data,
            ...step5Data,
        };
    };

    const getAllResponseData = () => {
        console.log('companyDetailFetcherOutput', companyDetailFetcherOutput);
        return {
            companyDetail: { ...companyDetailFetcherOutput },
            marketBenchmark: { ...marketingBenchmarkOutput },
            budgetPredictor: { ...budgetPredictorOutput },
            interactiveReport: { ...interactiveReportOutput },
        };
    };

    // Scroll to the form layout section
    const scrollToFormLayout = () => {
        const el = document.getElementById('formLayout');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Wrap step change logic to also scroll to form layout
    const handleNextStep = (cb: (...args: any[]) => void) => {
        return (...args: any[]) => {
            cb(...args);
            setTimeout(scrollToFormLayout, 0);
        };
    };

    const handlePrevStep = () => {
        handlePrevious();
        setTimeout(scrollToFormLayout, 0);
    };

    const renderStep1 = () => (
        <div
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8"
            id="formLayout"
        >
            {/* Header */}
            <FormHeader />

            {/* Progress Section */}
            <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                        Step 1 of 5
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                        20%
                    </span>
                </div>
                <Progress value={20} className="h-2 sm:h-3 bg-gray-200" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Basic Company Information
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 sm:mb-8">
                <p className="text-blue-800 text-sm sm:text-base">
                    <span className="font-semibold">Welcome!</span> Let's start
                    by getting to know your business better. This information
                    helps us understand your brand's foundation and create a
                    tailored budget plan that aligns with your industry and
                    business model.
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleNextStep(onStep1Submit))}
                    className="space-y-4 sm:space-y-6"
                >
                    <div className="space-y-4 sm:space-y-6">
                        <FormField
                            control={form.control}
                            name="companyName"
                            rules={{ required: 'Company name is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                        Name of the Company{' '}
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            maxLength={255}
                                            placeholder="Enter your company name"
                                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="companyLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                        Location of the Company{' '}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            maxLength={255}
                                            placeholder="Enter your company location"
                                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="websiteUrl"
                            rules={{
                                required: false,
                                pattern: {
                                    value: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/,
                                    message:
                                        'Please enter a valid URL (e.g. https://example.com)',
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                        Website URL
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="https://www.yourcompany.com"
                                            maxLength={255}
                                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="companyOverview"
                            rules={{ required: 'Company overview is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                        Overview of the Company{' '}
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Provide a brief overview of your company"
                                            maxLength={1000}
                                            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="industry"
                            rules={{
                                required: 'Industry selection is required',
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                        Industry{' '}
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base">
                                                <SelectValue placeholder="Select your industry" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white border-gray-200">
                                            {industries.map((industry) => (
                                                <SelectItem
                                                    key={industry}
                                                    value={industry}
                                                >
                                                    {industry}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="brandProvides"
                            rules={{
                                required:
                                    'Please select what your brand provides',
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                        What does your brand provide?{' '}
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 mt-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="product"
                                                    id="product"
                                                    className="border-blue-500 text-blue-500"
                                                />
                                                <label
                                                    htmlFor="product"
                                                    className="text-gray-700 cursor-pointer text-sm sm:text-base"
                                                >
                                                    Product
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="service"
                                                    id="service"
                                                    className="border-blue-500 text-blue-500"
                                                />
                                                <label
                                                    htmlFor="service"
                                                    className="text-gray-700 cursor-pointer text-sm sm:text-base"
                                                >
                                                    Service
                                                </label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="businessDuration"
                            rules={{
                                required: 'Business duration is required',
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                        Duration of business in the current
                                        industry{' '}
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base">
                                                <SelectValue placeholder="Select business duration" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white border-gray-200">
                                            {businessDurations.map(
                                                (duration) => (
                                                    <SelectItem
                                                        key={duration}
                                                        value={duration}
                                                    >
                                                        {duration}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Next Button */}
                    <div className="flex justify-end pt-4 sm:pt-6">
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 rounded-md text-sm sm:text-base font-medium"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            ) : null}
                            Next
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );

    const renderStep2 = () => (
        <div
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8"
            id="formLayout"
        >
            {/* Header */}
            <FormHeader />

            {/* Progress Section */}
            <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                        Step 2 of 5
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                        40%
                    </span>
                </div>
                <Progress value={40} className="h-2 sm:h-3 bg-gray-200" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Select Your Business Stage
            </h2>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 sm:mb-8">
                <p className="text-green-800 text-sm sm:text-base">
                    <span className="font-semibold">Great progress!</span> Now,
                    let's identify where your business currently stands. Each
                    stage has unique branding needs and budget considerations.
                    Don't worry if you're between stages - choose the one that
                    best describes your current situation.
                </p>
            </div>

            <Form {...step2Form}>
                <form
                    onSubmit={step2Form.handleSubmit(
                        handleNextStep(onStep2Submit)
                    )}
                    className="space-y-6"
                >
                    <FormField
                        control={step2Form.control}
                        name="businessStage"
                        rules={{
                            required: 'Please select your business stage',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                    Select your business stage{' '}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        {businessStages.map((stage) => {
                                            const IconComponent = stage.icon;
                                            const isSelected =
                                                field.value === stage.id;
                                            return (
                                                <div
                                                    key={stage.id}
                                                    className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                                                        isSelected
                                                            ? 'border-transparent bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 text-gray-800 shadow-md ring-2 ring-blue-200'
                                                            : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                                                    }`}
                                                    onClick={() =>
                                                        field.onChange(stage.id)
                                                    }
                                                >
                                                    <div className="text-center">
                                                        <div
                                                            className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 ${
                                                                isSelected
                                                                    ? 'bg-blue-100 text-blue-600'
                                                                    : 'bg-blue-100 text-blue-600'
                                                            }`}
                                                        >
                                                            <IconComponent className="h-6 w-6" />
                                                        </div>
                                                        <h3
                                                            className={`mb-3 text-lg font-semibold transition-all duration-300 ${
                                                                isSelected
                                                                    ? 'text-gray-800'
                                                                    : 'text-blue-600'
                                                            }`}
                                                        >
                                                            {stage.title}
                                                        </h3>
                                                        <p
                                                            className={`text-sm transition-all duration-300 ${
                                                                isSelected
                                                                    ? 'text-gray-700'
                                                                    : 'text-gray-600'
                                                            }`}
                                                        >
                                                            {stage.description}
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="businessStage"
                                                        value={stage.id}
                                                        checked={isSelected}
                                                        onChange={() =>
                                                            field.onChange(
                                                                stage.id
                                                            )
                                                        }
                                                        className="sr-only"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4 sm:pt-6">
                        <Button
                            type="button"
                            onClick={handlePrevStep}
                            variant="outline"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 sm:px-8 py-2 rounded-md text-sm sm:text-base font-medium"
                            disabled={loading}
                        >
                            Previous
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 rounded-md text-sm sm:text-base font-medium"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            ) : null}
                            Next
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );

    const renderStep3 = () => (
        <div
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8"
            id="formLayout"
        >
            {/* Header */}
            <FormHeader />

            {/* Progress Section */}
            <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                        Step 3 of 5
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                        60%
                    </span>
                </div>
                <Progress value={60} className="h-2 sm:h-3 bg-gray-200" />
            </div>

            {isAnalyzing ? (
                /* Analyzing Content */
               <div className="flex flex-col items-center justify-center py-16 sm:py-24">
    {/* Loader Section */}
    <div className="relative mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-spin" />
        </div>
        {/* Animated ring */}
        <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-200 animate-pulse"></div>
    </div>

    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
        Analyzing company profile and target audience..
    </h2>

    {/* <p className="text-gray-600 text-center max-w-md text-sm sm:text-base">
        Our AI is processing your business information to generate comprehensive company analysis and identify your target audience.
    </p> */}

    {/* Progress dots */}
    <div className="flex space-x-2 mt-8">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>

    {/* FAQs Section */}
    <div className="mt-16 w-full max-w-2xl">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
        </h3>
        <div className="space-y-4 text-left">
            <div className="border p-4 rounded-lg shadow-sm bg-white">
                <h4 className="font-medium text-gray-900">What kind of data is analyzed?</h4>
                <p className="text-gray-600 text-sm mt-1">
                    We analyze your company's website, brand information, services, and customer behavior to build a detailed profile.
                </p>
            </div>
            <div className="border p-4 rounded-lg shadow-sm bg-white">
                <h4 className="font-medium text-gray-900">How long does the analysis take?</h4>
                <p className="text-gray-600 text-sm mt-1">
                    It usually takes a few moments, depending on the complexity and size of your business data.
                </p>
            </div>
            <div className="border p-4 rounded-lg shadow-sm bg-white">
                <h4 className="font-medium text-gray-900">Is my data safe?</h4>
                <p className="text-gray-600 text-sm mt-1">
                    Absolutely. We follow industry-standard security practices to keep your information safe and confidential.
                </p>
            </div>
        </div>
    </div>
</div>

            ) : (
                /* Form Content */
                <div>
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            You're over halfway there!
                        </h2>
                        {(companyDetailFetcherOutput.profile?.[0] ||
                            companyDetailFetcherOutput.profile
                                ?.company_description) &&
                            companyDetailFetcherOutput.profile
                                ?.company_description !== 'Not Provided' && (
                                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mt-4">
                                    <p className="text-purple-800 text-sm sm:text-base">
                                        <span className="font-semibold">
                                            Excellent!
                                        </span>{' '}
                                        We've analyzed your business and
                                        generated comprehensive insights. Please
                                        review and refine the information below.
                                        Your input ensures we create the most
                                        accurate budget recommendations for your
                                        specific market and audience.
                                    </p>
                                </div>
                            )}
                    </div>

                    <Form {...step3Form}>
                        <form
                            onSubmit={step3Form.handleSubmit(
                                handleNextStep(onStep3Submit)
                            )}
                            className="space-y-6"
                        >
                            <FormField
                                control={step3Form.control}
                                name="companyAnalysis"
                                rules={{
                                    required: 'About Company is required',
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2">
                                            <Brain className="h-4 w-4 text-blue-500" />
                                            About Company{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                maxLength={1000}
                                                placeholder="Describe more about your company's product and services"
                                                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] text-sm sm:text-base"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={step3Form.control}
                                name="targetAudience"
                                rules={{
                                    required: 'Target audience is required',
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2">
                                            <Brain className="h-4 w-4 text-blue-500" />
                                            Target Audience{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                maxLength={1000}
                                                placeholder="Describe your target audience"
                                                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] text-sm sm:text-base"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={step3Form.control}
                                name="businessType"
                                rules={{
                                    required: 'Business type is required',
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2">
                                            <Brain className="h-4 w-4 text-blue-500" />
                                            Business Type{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base">
                                                    <SelectValue placeholder="Select your business type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white border-gray-200">
                                                {businessTypes.map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-4 sm:pt-6">
                                <Button
                                    type="button"
                                    onClick={handlePrevStep}
                                    variant="outline"
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 sm:px-8 py-2 rounded-md text-sm sm:text-base font-medium"
                                    disabled={loading}
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 rounded-md text-sm sm:text-base font-medium"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                    ) : null}
                                    Next
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );

    const renderStep4 = () => (
        <div
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8"
            id="formLayout"
        >
            {/* Header */}
            <FormHeader />

            {/* Progress Section */}
            <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                        Step 4 of 5
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                        80%
                    </span>
                </div>
                <Progress value={80} className="h-2 sm:h-3 bg-gray-200" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Stage-Specific Assessment
            </h2>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 sm:mb-8">
                <p className="text-orange-800 text-sm sm:text-base">
                    <span className="font-semibold">Almost there!</span> Now
                    let's dive into the specifics of your marketing performance
                    and challenges. This data helps us understand what's working
                    for your business and where there might be opportunities to
                    optimize your branding investment for better returns.
                </p>
            </div>

            <Form {...step4Form}>
                <form
                    onSubmit={step4Form.handleSubmit(
                        handleNextStep(onStep4Submit)
                    )}
                    className="space-y-6"
                >
                    <FormField
                        control={step4Form.control}
                        name="customerLifetimeValue"
                        rules={{
                            required: 'Customer lifetime value is required',
                        }}
                        render={({ field }) => (
                            <FormItem className="mb-8">
                                <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                    What is your average customer lifetime value
                                    (LTV)?{' '}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="15,000"
                                        className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                                        currencyFormat="indian"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={step4Form.control}
                        name="marketingChannels"
                        rules={{
                            required:
                                'Please select at least one marketing channel',
                        }}
                        render={({ field }) => (
                            <FormItem className="pt-2">
                                <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base mb-5">
                                    Which marketing channels have given you the
                                    best ROI so far?{' '}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="space-y-4 mt-5">
                                        {marketingChannels.map((channel) => (
                                            <div
                                                key={channel}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={channel}
                                                    checked={
                                                        field.value?.includes(
                                                            channel
                                                        ) || false
                                                    }
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        const currentValues =
                                                            field.value || [];
                                                        if (checked) {
                                                            field.onChange([
                                                                ...currentValues,
                                                                channel,
                                                            ]);
                                                        } else {
                                                            field.onChange(
                                                                currentValues.filter(
                                                                    (value) =>
                                                                        value !==
                                                                        channel
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    className="border-blue-500 data-[state=checked]:bg-blue-500"
                                                />
                                                <label
                                                    htmlFor={channel}
                                                    className="text-gray-700 cursor-pointer text-sm sm:text-base"
                                                >
                                                    {channel}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={step4Form.control}
                        name="repeatCustomerRevenue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base mb-5">
                                    What percentage of your revenue comes from
                                    repeat customers?{' '}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="mt-4">
                                        <div className="text-center mb-4">
                                            <span className="text-2xl font-bold text-blue-600">
                                                {field.value?.[0] ?? 0}%
                                            </span>
                                        </div>
                                        <Slider
                                            value={field.value || [0]}
                                            onValueChange={field.onChange}
                                            max={100}
                                            min={0}
                                            step={1}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                                            <span>0%</span>
                                            <span>100%</span>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={step4Form.control}
                        name="brandingChallenges"
                        rules={{
                            required:
                                'Please select at least one branding challenge',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base mb-5">
                                    What are your primary branding challenges
                                    currently?{' '}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="space-y-4 mt-5">
                                        {brandingChallenges.map((challenge) => (
                                            <div
                                                key={challenge}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={challenge}
                                                    checked={
                                                        field.value?.includes(
                                                            challenge
                                                        ) || false
                                                    }
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        const currentValues =
                                                            field.value || [];
                                                        if (checked) {
                                                            field.onChange([
                                                                ...currentValues,
                                                                challenge,
                                                            ]);
                                                        } else {
                                                            field.onChange(
                                                                currentValues.filter(
                                                                    (value) =>
                                                                        value !==
                                                                        challenge
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    className="border-blue-500 data-[state=checked]:bg-blue-500"
                                                />
                                                <label
                                                    htmlFor={challenge}
                                                    className="text-gray-700 cursor-pointer text-sm sm:text-base"
                                                >
                                                    {challenge}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={step4Form.control}
                        name="currentBudget"
                        rules={{
                            required: 'Current branding spend is required',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base mb-5">
                                    What is your current branding spend?{' '}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="space-y-3 mt-3"
                                    >
                                        {budgetRanges.map((range) => (
                                            <div
                                                key={range}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={range}
                                                    id={range}
                                                    className="border-blue-500 text-blue-500"
                                                />
                                                <label
                                                    htmlFor={range}
                                                    className="text-gray-700 cursor-pointer text-sm sm:text-base"
                                                >
                                                    {range}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4 sm:pt-6">
                        <Button
                            type="button"
                            onClick={handlePrevStep}
                            variant="outline"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 sm:px-8 py-2 rounded-md text-sm sm:text-base font-medium"
                            disabled={loading}
                        >
                            Previous
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 rounded-md text-sm sm:text-base font-medium"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            ) : null}
                            Next
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );

    const renderStep5 = () => (
        <div
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8"
            id="formLayout"
        >
            {/* Header */}
            <FormHeader />

            {/* Progress Section */}
            <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                        Step 5 of 5
                    </span>
                    <span className="text-blue-600 font-semibold text-lg">
                        100%
                    </span>
                </div>
                <Progress value={100} className="h-2 sm:h-3 bg-gray-200" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Brand Goals & Budget Planning
            </h2>

            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-6 sm:mb-8">
                <p className="text-indigo-800 text-sm sm:text-base">
                    <span className="font-semibold">Final step!</span> You're
                    doing great! Now let's define your brand objectives,
                    timeline, and budget parameters. This final information will
                    allow us to create a comprehensive, actionable budget plan
                    that aligns perfectly with your goals and financial
                    capacity.
                </p>
            </div>

            <Form {...step5Form}>
                <form
                    onSubmit={step5Form.handleSubmit(
                        handleNextStep(onStep5Submit)
                    )}
                    className="space-y-6"
                >
                    <FormField
                        control={step5Form.control}
                        name="brandGoals"
                        rules={{
                            required: 'Please select at least one brand goal',
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base mb-5">
                                    What are your goals for your brand?{' '}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="space-y-4 mt-3">
                                        {brandGoals.map((goal) => (
                                            <div
                                                key={goal}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={goal}
                                                    checked={
                                                        field.value?.includes(
                                                            goal
                                                        ) || false
                                                    }
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        const currentValues =
                                                            field.value || [];
                                                        if (checked) {
                                                            field.onChange([
                                                                ...currentValues,
                                                                goal,
                                                            ]);
                                                        } else {
                                                            field.onChange(
                                                                currentValues.filter(
                                                                    (value) =>
                                                                        value !==
                                                                        goal
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    className="border-blue-500 data-[state=checked]:bg-blue-500"
                                                />
                                                <label
                                                    htmlFor={goal}
                                                    className="text-gray-700 cursor-pointer text-sm sm:text-base"
                                                >
                                                    {goal}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="">
                        <FormItem>
                            <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base">
                                What is your planned budget?{' '}
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={step5Form.control}
                                name="plannedBudgetValue"
                                rules={{
                                    required:
                                        'Planned budget value is required',
                                    validate: (value) => {
                                        const minBudget =
                                            getMinBudgetForTimeFrame(
                                                step5Form.getValues('timeFrame')
                                            );
                                        // Remove commas and parse as number
                                        const numericValue =
                                            typeof value === 'string'
                                                ? Number(
                                                      value.replace(/,/g, '')
                                                  )
                                                : Number(value);
                                        if (isNaN(numericValue)) {
                                            return 'Please enter a valid number';
                                        }
                                        if (
                                            minBudget !== undefined &&
                                            numericValue < minBudget
                                        ) {
                                            return `Minimum budget for selected time frame is ${minBudget.toLocaleString('en-IN')}`;
                                        }
                                        return true;
                                    },
                                }}
                                render={({ field }) => (
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="10,00,000"
                                            className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                                            currencyFormat="indian"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                step5Form.trigger(
                                                    'plannedBudgetValue'
                                                );
                                            }}
                                        />
                                    </FormControl>
                                )}
                            />
                            <div className="flex space-x-3 mt-1">
                                <FormField
                                    control={step5Form.control}
                                    name="plannedBudgetValue"
                                    render={() => <FormMessage />}
                                />
                                <FormField
                                    control={step5Form.control}
                                    name="plannedBudgetDenominator"
                                    render={() => <FormMessage />}
                                />
                            </div>
                        </FormItem>
                    </div>

                    <FormField
                        control={step5Form.control}
                        name="timeFrame"
                        rules={{ required: 'Time frame is required' }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-gray-700 font-medium text-sm sm:text-base mb-5">
                                    What is the time frame?{' '}
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            // Re-validate plannedBudgetValue when timeFrame changes
                                            step5Form.trigger(
                                                'plannedBudgetValue'
                                            );
                                        }}
                                        defaultValue={field.value}
                                        className="space-y-4 mt-3"
                                    >
                                        {timeFrames.map((timeFrame) => (
                                            <div
                                                key={timeFrame}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={timeFrame}
                                                    id={timeFrame}
                                                    className="border-blue-500 text-blue-500"
                                                />
                                                <label
                                                    htmlFor={timeFrame}
                                                    className="text-gray-700 cursor-pointer text-sm sm:text-base"
                                                >
                                                    {timeFrame}
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4 sm:pt-6">
                        <Button
                            type="button"
                            onClick={handlePrevStep}
                            variant="outline"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 sm:px-8 py-2 rounded-md text-sm sm:text-base font-medium"
                            disabled={loading}
                        >
                            Previous
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 rounded-md text-sm sm:text-base font-medium"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            ) : null}
                            Complete
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );

    const renderAnalyzingScreen = () => (
        <div
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8"
            id="formLayout"
        >
            <div className="flex flex-col items-center justify-center py-16 sm:py-24">
                <div className="relative mb-8">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                        <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 text-white animate-spin" />
                    </div>
                    {/* Animated rings */}
                    <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-blue-200 animate-pulse"></div>
                    <div className="absolute -inset-2 w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-purple-200 animate-ping"></div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
                    Analyzing and loading personalized budget
                </h2>

                <p className="text-gray-600 text-center max-w-lg text-base sm:text-lg mb-8">
                    Our AI is processing all your inputs to create a
                    comprehensive, data-driven budget recommendation tailored
                    specifically for your business needs.
                </p>

                {/* Progress dots */}
                <div className="flex space-x-3 mb-8">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                        className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                        className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                    ></div>
                </div>

                {/* Status text */}
                <div className="text-sm text-gray-500 text-center">
                    <p>This may take a few moments...</p>
                </div>
            </div>
        </div>
    );

    // Add error step renderer
    const renderErrorStep = () => (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 flex flex-col items-center justify-center mt-16">
            <h2 className="text-2xl font-bold text-[#191947] mb-4 text-center">
                Server is busy.
            </h2>
            <p className="text-gray-700 mb-8 text-center">
                We couldn’t process your request due to a temporary issue.{' '}
                <br />
                Please try again in a little while.
            </p>
            <Button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
                Okay
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-tl from-[#CBB3D7] via-[#D3DDE7] to-[#EFEEEA]">
            {/* Header - matching homepage navigation style */}
            <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-row items-start sm:items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#191947]">
                  MIBBS Brand Budgeting
                </h1>
                <p className="text-[#2C3585] font-medium text-sm sm:text-base">Smart Budget Planning for Your Brand</p> */}
                            <img
                                src="/lovable-uploads/mibbs.png"
                                alt="Logo - MIBBS"
                                className="w-[140px]"
                            />
                        </div>
                        <Button
                            onClick={() => navigate('/')}
                            variant="ghost"
                            className="text-[#191947] hover:bg-white/20 flex items-center gap-2 mt-3 sm:mt-0 text-sm sm:text-base"
                        >
                            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                            Back to Home
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Form Content */}
            <div className="p-4 sm:p-6 md:p-8">
                <div className="max-w-6xl mx-auto">
                    {!formReady ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
                            <p className="text-gray-700 text-lg">
                                Loading form...
                            </p>
                        </div>
                    ) : errorStep ? (
                        renderErrorStep()
                    ) : (
                        <>
                            {currentStep === 1 && renderStep1()}
                            {currentStep === 2 && renderStep2()}
                            {currentStep === 3 && renderStep3()}
                            {currentStep === 4 && renderStep4()}
                            {currentStep === 5 && renderStep5()}
                            {currentStep === 6 && renderAnalyzingScreen()}
                            {currentStep === 7 && (
                                <BudgetResults
                                    responseData={getAllResponseData()}
                                    formData={getAllFormData()}
                                    onStartOver={handleStartOver}
                                    onPrevious={handlePrevious}
                                    onScrollToFormLayout={scrollToFormLayout}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Footer - matching homepage footer style */}
            <footer className="bg-[#191947] text-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Main Footer Content */}
                    <div className="grid gap-8 sm:gap-12 mb-8 sm:mb-12">
                        {/* Logo and Description */}
                        <div>
                            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                                <img
                                    src="/logo-mibbs-lighter.png"
                                    alt="Logo - MIBBS"
                                    className="w-[120px] footer-logo"
                                />
                                {/* <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D7E044] rounded-md flex items-center justify-center">
                                    <span className="text-[#191947] font-bold text-base sm:text-lg">
                                        M
                                    </span>
                                </div>
                                <span className="text-white font-bold text-xl sm:text-2xl">
                                    MIBBS
                                </span> */}
                            </div>
                            <p className="text-white/80 text-base sm:text-lg mb-4 sm:mb-6 max-w-md">
                                India's First Intelligent Brand Budgeting
                                System. Smarter Budgets. Stronger Brands.
                            </p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-white/20 pt-6 sm:pt-8 text-center">
                        <p className="text-white/60 text-sm sm:text-base">
                            © 2025 MIBBS. All rights reserved.
                        </p>
                        <p className="text-white/60 mt-2 text-sm sm:text-base">
                            A Product of Magsmen
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

function FormHeader() {
    return (
        <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-8 items-center">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Brand Budget Planner
                </h1>
            </div>
            <div className="mt-2 sm:mt-0 sm:text-right">
                <p className="text-gray-500 text-sm">
                    Optimize your branding investment
                </p>
            </div>
        </div>
    );
}

export default BudgetingFormPage;
