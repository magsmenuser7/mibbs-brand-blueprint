import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, QuizAnswers, Plan } from '../../types/pricing';
import { plans } from '../../data/pricingData';

interface EnhancedQuizProps {
  questions: QuizQuestion[];
  onComplete: (recommendedPlan: Plan, answers: QuizAnswers) => void;
}

export default function EnhancedQuiz({ questions, onComplete }: EnhancedQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    budget: '',
    channels: [],
    agency: ''
  });
  const [showResult, setShowResult] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<Plan | null>(null);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    let newAnswers = { ...answers };

    if (step === 0) {
      newAnswers.budget = value;
    } else if (step === 1) {
      if (value === 'none') {
        newAnswers.channels = ['none'];
      } else {
        const newChannels = answers.channels.includes(value)
          ? answers.channels.filter(c => c !== value && c !== 'none')
          : [...answers.channels.filter(c => c !== 'none'), value];
        newAnswers.channels = newChannels;
      }
    } else if (step === 2) {
      newAnswers.agency = value;
    }

    setAnswers(newAnswers);

    if (step < questions.length - 1 && (step !== 1 || value === 'none')) {
      setTimeout(() => setStep(step + 1), 300);
    } else if (step === questions.length - 1) {
      setTimeout(() => {
        const plan = determinePlan(newAnswers);
        setRecommendedPlan(plan);
        setShowResult(true);
        onComplete(plan, newAnswers);
      }, 300);
    }
  };

  const determinePlan = (ans: QuizAnswers): Plan => {
    const budgetMap: { [key: string]: string } = {
      starter: 'starter',
      growth: 'growth',
      professional: 'professional',
      scale: 'scale'
    };

    let planId = budgetMap[ans.budget] || 'growth';

    if (ans.channels.length >= 4 && planId === 'growth') {
      planId = 'professional';
    }

    if (ans.agency === 'many' && (planId === 'growth' || planId === 'professional')) {
      planId = 'scale';
    }

    return plans.find(p => p.id === planId) || plans[1];
  };

  const canProceed = () => {
    if (step === 1) return answers.channels.length > 0;
    return true;
  };

  if (showResult && recommendedPlan) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-7xl mb-6"
        >
          🎯
        </motion.div>

        <h3 className="text-4xl font-bold mb-4" style={{ color: '#5A4A6A' }}>
          Your Perfect Plan
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border-2 border-purple-600 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-3xl font-bold text-purple-600">
              {recommendedPlan.name}
            </h4>
            <span className="text-3xl font-bold text-gray-900">
              {recommendedPlan.price}
            </span>
          </div>

          <p className="text-gray-600 mb-6 text-lg">{recommendedPlan.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            {recommendedPlan.features.slice(0, 4).map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <span className="text-green-500 text-lg">✓</span>
                <span className="font-semibold">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href={recommendedPlan.cta.link}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
          >
            Get Started →
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('plan-cards');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl"
          >
            Compare All Plans
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600">
            Question {step + 1} of {questions.length}
          </span>
          <span className="text-sm font-bold text-purple-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 bg-purple-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">
            {step === 0 ? '💰' : step === 1 ? '📱' : '👥'}
          </div>

          <h3 className="text-3xl font-bold mb-8 text-gray-900">
            {currentQuestion.question}
          </h3>

          {currentQuestion.helperText && (
            <p className="text-gray-600 mb-6">{currentQuestion.helperText}</p>
          )}

          <div className="space-y-4">
            {currentQuestion.options.map((option, i) => {
              const isSelected = step === 0
                ? answers.budget === option.value
                : step === 1
                ? answers.channels.includes(option.value)
                : answers.agency === option.value;

              return (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'bg-purple-50 border-purple-600 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4 text-left flex-1">
                    <span className="text-3xl">{option.icon}</span>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-gray-600">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.div
                    className="text-2xl text-purple-600"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {isSelected ? '✓' : '→'}
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {step === 1 && answers.channels.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
              >
                Next Question →
              </motion.button>
              <p className="text-sm text-purple-600 font-semibold mt-3">
                {answers.channels.length} channel{answers.channels.length > 1 ? 's' : ''} selected
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {step > 0 && !showResult && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ x: -4 }}
          onClick={() => setStep(step - 1)}
          className="mt-6 text-gray-600 hover:text-purple-600 font-medium"
        >
          ← Back
        </motion.button>
      )}
    </div>
  );
}
