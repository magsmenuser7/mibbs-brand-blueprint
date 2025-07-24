import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
 import emailjs from '@emailjs/browser';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { Download, RotateCcw, Unlock } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface BudgetResultsProps {
    responseData: any;
    formData: any;
    onStartOver: () => void;
    onPrevious: () => void;
    onScrollToFormLayout?: () => void; // Add this optional prop
}

interface UnlockFormData {
    name: string;
    email: string;
    phone: string;
}

const BudgetResults = ({
    responseData,
    formData,
    onStartOver,
    onPrevious,
    onScrollToFormLayout, // Destructure the new prop
}: BudgetResultsProps) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const unlockForm = useForm<UnlockFormData>({
        mode: 'onTouched',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
        },
    });

    // Sample budget allocation data based on form inputs
    // const budgetData = [
    //     { name: 'Digital Marketing', value: 20, color: '#8B5CF6' },
    //     { name: 'Content Creation', value: 15, color: '#A855F7' },
    //     { name: 'Customer Retention', value: 15, color: '#3B82F6' },
    //     { name: 'Product Improvement', value: 15, color: '#2563EB' },
    //     { name: 'Brand Awareness', value: 15, color: '#06B6D4' },
    //     { name: 'Market Expansion', value: 10, color: '#0891B2' },
    //     { name: 'Brand Identity', value: 5, color: '#10B981' },
    //     { name: 'Contingency', value: 5, color: '#059669' },
    // ];

    // const chartConfig = {
    //     'Digital Marketing': { label: 'Digital Marketing', color: '#8B5CF6' },
    //     'Content Creation': { label: 'Content Creation', color: '#A855F7' },
    //     'Customer Retention': { label: 'Customer Retention', color: '#3B82F6' },
    //     'Product Improvement': {
    //         label: 'Product Improvement',
    //         color: '#2563EB',
    //     },
    //     'Brand Awareness': { label: 'Brand Awareness', color: '#06B6D4' },
    //     'Market Expansion': { label: 'Market Expansion', color: '#0891B2' },
    //     'Brand Identity': { label: 'Brand Identity', color: '#10B981' },
    //     Contingency: { label: 'Contingency', color: '#059669' },
    // };

    // Dynamically generate budgetData and chartConfig from responseData.interactiveReport.budgetAllocation
    const budgetAllocation =
        responseData?.interactiveReport?.budgetAllocation || [];

    // Define a color palette for the chart slices
    const colorPalette = [
        '#8B5CF6', // violet
        '#A855F7', // purple
        '#3B82F6', // blue
        '#2563EB', // dark blue
        '#06B6D4', // cyan
        '#0891B2', // teal
        '#10B981', // green
        '#059669', // dark green
        '#F59E42', // orange
        '#F43F5E', // red
        '#FBBF24', // yellow
        '#6366F1', // indigo
    ];

    // Generate budgetData for recharts PieChart
    const budgetData =
        budgetAllocation.length > 0
            ? budgetAllocation.map((item, idx) => ({
                  name: item.name,
                  value: item.value,
                  percentageValue: Number(
                      (
                          (item.value / formData?.plannedBudgetValue) *
                          100
                      ).toFixed(2)
                  ),
                  color: colorPalette[idx % colorPalette.length],
                  description: item.description,
              }))
            : [];

    // Generate chartConfig for ChartContainer
    const chartConfig = budgetData.reduce(
        (acc, item) => {
            acc[item.name] = {
                label: item.name,
                color: item.color,
            };
            return acc;
        },
        {} as Record<string, { label: string; color: string }>
    );

    // Dynamically generate timelineData from responseData.interactiveReport.timelineData if available
    const timelineData =
        responseData?.interactiveReport?.timelineData &&
        Array.isArray(responseData.interactiveReport.timelineData)
            ? responseData.interactiveReport.timelineData.map((item: any) => ({
                  phase: item.phase,
                  months: item.months,
                  description: item.description,
              }))
            : [];

    // Dynamically generate keyInitiatives from responseData.interactiveReport.keyInitiatives if available
    const keyInitiatives =
        responseData?.interactiveReport?.keyInitiatives &&
        Array.isArray(responseData.interactiveReport.keyInitiatives)
            ? responseData.interactiveReport.keyInitiatives.map(
                  (item: any) => ({
                      title: item.title,
                      description: item.description,
                  })
              )
            : [];
    // const timelineData = [
    //     {
    //         phase: 'Brand Audit & Strategy',
    //         months: 'Months 1-2',
    //         description:
    //             'Evaluate current brand performance and develop comprehensive strategy.',
    //     },
    //     {
    //         phase: 'Channel Optimization',
    //         months: 'Months 3-5',
    //         description:
    //             'Refine marketing mix based on performance data and customer insights.',
    //     },
    //     {
    //         phase: 'Experience Enhancement',
    //         months: 'Months 6-9',
    //         description:
    //             'Improve customer/client experience touchpoints and loyalty initiatives.',
    //     },
    //     {
    //         phase: 'Expansion & Innovation',
    //         months: 'Months 10-12',
    //         description:
    //             'Explore new markets, products/services, or positioning opportunities.',
    //     },
    // ];

    const generatePDF = async () => {
        // Create a new window with the report content for PDF generation
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Brand Budget Report - ${
              formData?.companyName || 'Your Company'
          }</title>
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.4;
              color: #333;
              max-width: 210mm;
              margin: 0 auto;
              padding: 10mm;
              background: #fff;
              font-size: 12px;
            }
            .header {
              display: flex;
              justify-content: center;
              gap: 16px;
              align-items: center;
              text-align: center;
              margin-bottom: 24px;
              border-bottom: 3px solid #191947;
              padding-bottom: 12px;
            }
            .company-info {
              background: #f8fafc !important;
              padding: 12px;
              border-radius: 6px;
              margin-bottom: 15px;
              border-left: 4px solid #191947 !important;
            }
            .section {
              margin-bottom: 15px;
              padding: 12px;
              background: #fdfdfd !important;
              border-radius: 6px;
              border: 1px solid #e5e7eb;
            }
            .budget-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 6px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .budget-item:last-child { border-bottom: none; }
            .timeline-item {
              margin-bottom: 10px;
              padding: 10px;
              border-left: 3px solid #3B82F6 !important;
              background: #eff6ff !important;
              border-radius: 0 6px 6px 0;
            }
            .recommendation {
              margin-bottom: 6px;
              padding: 4px 0;
              display: flex;
              align-items: flex-start;
            }
            .intro-section {
              background: linear-gradient(135deg, #191947 0%, #2d3a8c 100%) !important;
              color: white !important;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 15px;
              text-align: center;
            }
            .footer-section {
              margin-top: 15px;
              padding: 15px;
              background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
              color: white !important;
              border-radius: 8px;
              text-align: center;
            }
            h1 {
              color: #191947 !important;
              font-size: 24px;
              font-weight: 700;
              margin-bottom: 6px;
            }
            h2 {
              color: #191947 !important;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 10px;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 6px;
            }
            h3 {
              color: #191947 !important;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 6px;
            }
            .intro-section h2, .footer-section h2 {
              color: white !important;
              border-bottom: 2px solid rgba(255,255,255,0.3);
            }
            .budget-percentage {
              font-weight: 700;
              color: #191947 !important;
              font-size: 13px;
            }
            .company-name {
              font-size: 18px;
              font-weight: 700;
              color: #191947 !important;
              margin-bottom: 10px;
            }
            .total-budget {
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
              color: white !important;
              padding: 12px;
              border-radius: 8px;
              text-align: center;
              margin: 12px 0;
              font-size: 15px;
              font-weight: 600;
            }
            .generated-date {
              text-align: center;
              color: #6b7280;
              font-size: 10px;
              margin-top: 15px;
              padding-top: 10px;
              border-top: 1px solid #e5e7eb;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }
            .info-item {
              margin-bottom: 4px;
            }
            .info-label {
              font-weight: 600;
              color: #4b5563 !important;
              display: inline-block;
              min-width: 80px;
            }
            .recommendation-bullet {
              color: #3b82f6 !important;
              font-weight: bold;
              margin-right: 8px;
              font-size: 14px;
            }
            @media print {
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              body {
                margin: 0;
                padding: 8mm;
                font-size: 11px;
              }
              .section {
                page-break-inside: avoid;
                margin-bottom: 12px;
              }
              .timeline-item {
                margin-bottom: 8px;
                padding: 8px;
              }
              .intro-section, .footer-section {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              h1 { font-size: 20px; }
              h2 { font-size: 14px; margin-bottom: 8px; }
              h3 { font-size: 12px; margin-bottom: 4px; }
              .company-name { font-size: 16px; margin-bottom: 8px; }
              .total-budget { font-size: 13px; margin: 8px 0; padding: 10px; }
              .company-info, .section { padding: 10px; margin-bottom: 10px; }
              .intro-section, .footer-section { padding: 12px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
                <img src="./lovable-uploads/mibbs.png" alt="MIBBS Logo" style="width: 120px;">
            </div>
            <div>   
                <h1>Brand Budget Recommendation Report</h1>
                <p style="font-size: 12px; color: #6b7280; margin-top: 4px;">Generated by MIBBS - India's First Intelligent Brand Budgeting System</p>
            </div>
          </div>

          <div class="intro-section">
            <h2>About MIBBS</h2>
            <p style="font-size: 12px; line-height: 1.5; margin-bottom: 12px;">
                At Magsmen, we have seen brands struggle — not because they lacked ideas, but because they lacked intelligent budget planning.
                In a market driven by intuition, we realized businesses needed more than just advice.
                They needed a system.
            </p>
            <p style="font-size: 12px; line-height: 1.5;">
                A structured, intelligent model to align their brand ambitions with financial discipline. That's why we built MIBBS — India’s first intelligent brand budgeting system, crafted to help businesses invest smarter, grow faster, and build stronger market positions.
            </p>
          </div>

          <div class="company-info">
            <div class="company-name">${
                formData?.companyName || 'Your Company'
            }</div>
            <div class="info-grid">
              <div>
                <div class="info-item">
                  <span class="info-label">Industry:</span> ${
                      formData?.industry || 'Technology'
                  }
                </div>
                <div class="info-item">
                  <span class="info-label">Stage:</span> ${
                      formData?.businessStage
                          ? formData.businessStage.charAt(0).toUpperCase() +
                            formData.businessStage.slice(1) +
                            ' Level'
                          : 'Mid Level'
                  }
                </div>
              </div>
              <div>
                <div class="info-item">
                  <span class="info-label">Type:</span> ${
                      formData?.businessType || 'B2B'
                  }
                </div>
                <div class="info-item">
                  <span class="info-label">Budget:</span> ${
                      formData?.currencyFormat === 'us' ? '$' : '₹'
                  }${formatCurrency(
                      formData?.plannedBudgetValue || '10',
                      formData?.currencyFormat === 'us' ? 'us' : 'indian'
                  )}
                </div>
              </div>
            </div>
          </div>

          <div class="total-budget">
            Total Recommended Budget: ${
                formData?.currencyFormat === 'us' ? '$' : '₹'
            }${formatCurrency(
                formData?.plannedBudgetValue || '10',
                formData?.currencyFormat === 'us' ? 'us' : 'indian'
            )}
          </div>

          <div class="section">
            <h2>Budget Summary</h2>
            <p>${responseData.interactiveReport.summary}</p>
          </div>

          <div class="section">
            <h2>Recommended Budget Allocation</h2>
            ${budgetData
                .map(
                    (item) => `
              <div class="budget-item">
                <span style="font-weight: 500; font-size: 12px;">${
                    item.name
                }</span>
                <div>
                  <span class="budget-percentage">${item.percentageValue}% </span>
                  <span style="color: #6b7280; font-size: 11px;">(${formData?.currencyFormat === 'us' ? '$' : '₹'}${formatCurrency(
                      item.value,
                      formData?.currencyFormat === 'us' ? 'us' : 'indian'
                  )})</span>
                </div>
              </div>
            `
                )
                .join('')}
          </div>

          <div class="section">
            <h2>Strategic Recommendations</h2>
            ${
                keyInitiatives && keyInitiatives.length > 0
                    ? keyInitiatives
                          .filter((_, idx) => isUnlocked || idx === 0)
                          .map(
                              (item) => `
            <div class="recommendation">
              <span class="recommendation-bullet">•</span>
              <span>${item.description}</span>
            </div>
            `
                          )
                          .join('')
                    : ''
            }
          </div>

          ${
              isUnlocked
                  ? `
          <div class="section">
            <h2>Implementation Timeline</h2>
            ${timelineData
                .map(
                    (phase, index) => `
              <div class="timeline-item">
                <h3>${index + 1}. ${phase.phase}</h3>
                <p class="font-light" style="font-weight: 600; color: #3b82f6; margin: 4px 0; font-size: 11px;">${
                    phase.months
                }</p>
                <p style="color: #4b5563; font-size: 11px;">${
                    phase.description
                }</p>
              </div>
            `
                )
                .join('')}
          </div>
          `
                  : ''
          }
          <div class="footer-section">
            <h2>About Magsmen</h2>
            <p style="font-size: 12px; line-height: 1.5; margin-bottom: 12px;">
                Magsmen is a renowned brand consulting firm that helps businesses grow by making them easy to understand and trust. We work with companies to improve how they present themselves, so more people remember and choose them. Magsmen believes that every business has a unique story—and we help you tell it in a simple and powerful way. You don’t need big budgets or complex ideas. Just a clear plan that connects with people. Whether you're just starting or looking to grow, Magsmen is here to guide you and turn your business into a strong, well-known brand.
            </p>
          </div>

          <div style="font-size: 12px; line-height: 1.5; color: rgb(156 163 175); margin-top: 12px; margin-bottom: 12px; text-align: center;">
            Secure. Private. In Your Control. <br>
            Your data stays yours — always encrypted, never shared.
          </div>

          <div class="generated-date">
            Report Generated on: ${new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Kolkata',
            })}
          </div>
        </body>
      </html>
    `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();

        // Wait for content to load then print
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 1000);
    };

    const handleDownloadReport = () => {
        generatePDF();
    };
   

const sendEmail = (formData: any, unlockData: any) => {
    debugger;
  const templateParams = {

    // Unlock Form Data
    userName: unlockData.name,
    userEmail: unlockData.email,
    userPhone: unlockData.phone,

    // Main Form Data
    companyName: formData.companyName,
    companyLocation: formData.companyLocation,
    websiteUrl: formData.websiteUrl,
    companyOverview: formData.companyOverview,
    industry: formData.industry,
    businessDuration: formData.businessDuration,
    businessStage: formData.businessStage,
    businessType: formData.businessType,
    currentBudget: formData.currentBudget,
    customerLifetimeValue: formData.customerLifetimeValue,
    marketingChannels: formData.marketingChannels?.join(', '),
    brandGoals: formData.brandGoals?.join(', '),
    brandProvides: formData.brandProvides,
    brandingChallenges: formData.brandingChallenges?.join(', '),
    repeatCustomerRevenue: formData.repeatCustomerRevenue?.join(', '),
    targetAudience: formData.targetAudience,
    timeFrame: formData.timeFrame,
  };

  return emailjs.send(
    'service_bjq4py6',
    'template_zts7fue',
    templateParams,
    'PvPHll934cp4sHNAM'
  );
};




const onUnlockSubmit = async (unlockData: UnlockFormData) => {
  console.log('Unlock form data:', unlockData);
  console.log('Full form data:', formData);

  try {
    await sendEmail(formData, unlockData);
    alert('Successfully sent an email!');
    setIsUnlocked(true);
  } catch (error) {
    console.error('Failed to send email:', error);
    alert('Failed to send email. Please try again.');
  }
};


    // Helper to handle Start Over and scroll
    const handleStartOverAndScroll = () => {
        onStartOver();
        if (onScrollToFormLayout) {
            setTimeout(() => {
                onScrollToFormLayout();
            }, 0);
        }
    };

    useEffect(() => {
        console.log('rendered');
        console.log('response data:', responseData);
    }, [responseData]);

    // Helper to format number as Indian or US currency
    function formatCurrency(
        value: string | number,
        currency: 'indian' | 'us' = 'indian'
    ) {
        const num =
            typeof value === 'number'
                ? value
                : parseFloat(value?.toString().replace(/,/g, '') || '0');
        if (isNaN(num)) return '';
        if (currency === 'us') {
            return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
        }
        // Indian format
        return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    }

    // Determine currency format (default to indian)
    const currencyFormat: 'indian' | 'us' =
        formData?.currencyFormat === 'us' ? 'us' : 'indian';

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Your Brand Budget Recommendation
                </h1>
                <p className="text-gray-600 text-lg">
                    Based on your inputs, here is our recommended budget
                    allocation
                </p>
            </div>

            {/* Company Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {formData?.companyName || 'Your Company'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-700">
                            <span className="font-semibold">Industry:</span>{' '}
                            {formData?.industry || 'Technology'}
                        </p>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">
                                Business Stage:
                            </span>{' '}
                            {formData?.businessStage
                                ? formData.businessStage
                                      .charAt(0)
                                      .toUpperCase() +
                                  formData.businessStage.slice(1) +
                                  ' Level'
                                : 'Mid Level'}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-700">
                            <span className="font-semibold">
                                Business Type:
                            </span>{' '}
                            {formData?.businessType || 'B2B'}
                        </p>
                        <p className="text-gray-700 mt-2">
                            <span className="font-semibold">
                                Planned Budget:
                            </span>{' '}
                            {currencyFormat === 'us' ? '$' : '₹'}
                            {formatCurrency(
                                formData?.plannedBudgetValue || '10',
                                currencyFormat
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Budget Summary - single left aligned paragraph */}
            <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Budget Summary
                </h3>
                <div
                    className="text-left"
                    // dangerouslySetInnerHTML={{
                    //     __html: responseData.budgetPredictor.budget_prediction,
                    // }}
                >
                    <p className="text-lg font-medium text-gray-700">
                        {responseData.interactiveReport.summary}
                    </p>
                </div>
            </div>

            {/* Budget Allocation */}
            <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                    Recommended Budget Allocation
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Pie Chart */}
                    <div className="flex justify-center w-full">
                        <ChartContainer
                            config={chartConfig}
                            className="h-[300px] sm:h-[350px] lg:h-[400px] w-full max-w-[400px]"
                        >
                            <PieChart>
                                <Pie
                                    data={budgetData}
                                    dataKey="percentageValue"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={120}
                                >
                                    {budgetData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                            </PieChart>
                        </ChartContainer>
                    </div>

                    {/* Budget Breakdown */}
                    <div className="space-y-4">
                        {budgetData.map((item) => (
                            <div
                                key={item.name}
                                className="flex items-center justify-between border-b border-gray-200 pb-2"
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="w-4 h-4 rounded-sm"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-gray-700 font-medium">
                                        {item.name}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-900 font-bold text-lg">
                                        {item.percentageValue}%
                                    </span>
                                    <span className="text-gray-600 text-sm ml-2">
                                        ({currencyFormat === 'us' ? '$' : '₹'}
                                        {formatCurrency(
                                            item.value,
                                            currencyFormat
                                        )}
                                        )
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {!isUnlocked && (
                <>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                        <Button
                            onClick={handleDownloadReport}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium flex items-center space-x-2"
                        >
                            <Download className="h-5 w-5" />
                            <span>Download Report</span>
                        </Button>
                        <Button
                            onClick={handleStartOverAndScroll}
                            variant="outline"
                        >
                            <RotateCcw className="h-5 w-5" />
                            <span>Start Over</span>
                        </Button>
                    </div>
                </>
            )}

            {/* Strategic Recommendations */}
            <div className="mb-12 relative">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Strategic Recommendations
                </h3>
                {keyInitiatives && keyInitiatives.length > 0 && (
                    <div className="space-y-4 mb-4">
                        {keyInitiatives.map(
                            (
                                item: { title: string; description: string },
                                idx: number
                            ) => {
                                if (!isUnlocked && idx > 0) {
                                    // Hide all but the first item if not unlocked
                                    return null;
                                }
                                return (
                                    <div
                                        key={idx}
                                        className={`flex items-start space-x-3${!isUnlocked && idx > 0 ? ' blur-sm h-80 select-none' : ''}`}
                                    >
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            }
                        )}
                        {/* If not unlocked, show the rest blurred */}
                        {!isUnlocked &&
                            keyInitiatives.length > 1 &&
                            keyInitiatives.slice(1).map(
                                (
                                    item: {
                                        title: string;
                                        description: string;
                                    },
                                    idx: number
                                ) => (
                                    <div
                                        key={`blurred-${idx + 1}`}
                                        className="flex items-start space-x-3 blur-sm select-none"
                                    >
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700">
                                            {item.description}
                                        </p>
                                    </div>
                                )
                            )}
                    </div>
                )}

                {/* Unlock form overlay - positioned outside the blurred section */}
                {!isUnlocked && (
                    <div className="absolute inset-0 top-[5rem] bg-transparent flex items-center justify-center">
                        <div className="absolute top-0 z-10 bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200">
                            <div className="text-center mb-6">
                                <Unlock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Unlock Full Report
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Get access to complete strategic
                                    recommendations and implementation timeline
                                </p>
                            </div>

                            <Form {...unlockForm}>
                                <form
                                    onSubmit={unlockForm.handleSubmit(
                                        onUnlockSubmit
                                    )}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={unlockForm.control}
                                        name="name"
                                        rules={{ required: 'Name is required' }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium text-sm">
                                                    Full Name{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        maxLength={255}
                                                        placeholder="Enter your full name"
                                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm bg-white"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={unlockForm.control}
                                        name="email"
                                        rules={{
                                            required: 'Email is required',
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium text-sm">
                                                    Email Address{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        maxLength={255}
                                                        placeholder="Enter your email address"
                                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm bg-white"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={unlockForm.control}
                                        name="phone"
                                        rules={{
                                            required:
                                                'Phone number is required',
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium text-sm">
                                                    Phone Number{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="tel"
                                                        placeholder="Enter your phone number"
                                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm bg-white"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex justify-center pt-4">
                                        <Button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 flex items-center space-x-2 text-sm"
                                        >
                                            <Unlock className="h-4 w-4" />
                                            <span>Unlock Report</span>
                                        </Button>
                                    </div>
                                </form>
                            </Form>

                            {/* Disclaimer */}
                            <div className="mt-4 pt-3 border-t border-gray-200 bg-white">
                                <p className="text-xs text-gray-600 text-center bg-white">
                                    <strong>Privacy Notice:</strong> We respect
                                    your privacy. Your information will only be
                                    used to provide you with this report.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Implementation Timeline */}
            <div className="mb-12">
                <div className="relative">
                    <h3
                        className={`text-2xl font-bold text-gray-900 mb-8 ${
                            !isUnlocked ? 'blur-sm select-none' : ''
                        }`}
                    >
                        Recommended Implementation Timeline
                    </h3>

                    <div
                        className={`${!isUnlocked ? 'blur-sm select-none' : ''} relative`}
                    >
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                        <div className="space-y-8">
                            {timelineData.map((phase, index) => (
                                <div
                                    key={index}
                                    className="relative flex items-start"
                                >
                                    <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="ml-6 flex-1">
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                                            {phase.phase}
                                        </h4>
                                        <p className="text-gray-500 mb-2 font-light text-sm">
                                            {phase.months}
                                        </p>
                                        <p className="text-gray-700">
                                            {phase.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {isUnlocked && (
                <>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                        <Button
                            onClick={handleDownloadReport}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium flex items-center space-x-2"
                        >
                            <Download className="h-5 w-5" />
                            <span>Download Report</span>
                        </Button>
                        <Button
                            onClick={handleStartOverAndScroll}
                            variant="outline"
                        >
                            <RotateCcw className="h-5 w-5" />
                            <span>Start Over</span>
                        </Button>
                    </div>
                </>
            )}

            <div className="text-gray-400 text-center text-sm">
                Secure. Private. In Your Control. <br />
                Your data stays yours — always encrypted, never shared.
            </div>
        </div>
    );
};

export default BudgetResults;
