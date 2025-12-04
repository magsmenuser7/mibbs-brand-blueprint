import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ComparisonCategory } from '../../types/pricing';

interface ComparisonTableProps {
  data: ComparisonCategory[];
}

export default function ComparisonTable({ data }: ComparisonTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const planNames = ['STARTER', 'GROWTH', 'PROFESSIONAL', 'SCALE', 'ENTERPRISE'];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 bg-white text-purple-700 border-2 border-purple-600 rounded-xl px-8 py-3 font-semibold"
        >
          {isOpen ? 'Hide' : 'Compare'} All Features
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} />
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-xl">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-5 text-left font-semibold text-gray-900 text-base">
                      Features
                    </th>
                    {planNames.map((plan, i) => (
                      <th
                        key={i}
                        className={`p-5 text-center font-semibold text-sm ${
                          plan === 'GROWTH' ? 'text-purple-600' : 'text-gray-900'
                        }`}
                      >
                        {plan}
                        {plan === 'GROWTH' && (
                          <div className="text-xs text-pink-600 font-bold mt-1">POPULAR</div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((category, catIdx) => (
                    <>
                      <tr key={`cat-${catIdx}`} className="bg-gray-100">
                        <td
                          colSpan={6}
                          className="p-4 font-bold text-sm uppercase tracking-wide"
                          style={{ color: '#5A4A6A' }}
                        >
                          {category.name}
                        </td>
                      </tr>
                      {category.features.map((feature, featIdx) => (
                        <motion.tr
                          key={`feat-${catIdx}-${featIdx}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: catIdx * 0.1 + featIdx * 0.05 }}
                          className="border-b border-gray-100"
                        >
                          <td className="p-4">
                            <div className="font-medium text-gray-900">{feature.name}</div>
                            {feature.description && (
                              <div className="text-xs text-gray-500 mt-1">
                                {feature.description}
                              </div>
                            )}
                          </td>
                          {feature.values.map((value, valIdx) => (
                            <td key={valIdx} className="p-4 text-center text-sm">
                              {value === true ? (
                                <span className="text-green-500 text-lg">✓</span>
                              ) : value === false || value === '—' ? (
                                <span className="text-gray-300">—</span>
                              ) : (
                                <span className="text-gray-900">{value}</span>
                              )}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {data.map((category, catIdx) => (
                <MobileAccordion key={catIdx} category={category} planNames={planNames} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileAccordion({ category, planNames }: { category: ComparisonCategory; planNames: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between font-semibold text-left"
        style={{ color: '#5A4A6A' }}
      >
        <span>{category.name}</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {category.features.map((feature, featIdx) => (
                <div key={featIdx} className="border-t pt-4">
                  <div className="font-medium text-gray-900 mb-3">{feature.name}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {planNames.map((plan, planIdx) => (
                      <div key={planIdx} className="text-sm">
                        <div className="font-medium text-gray-600">{plan}</div>
                        <div className="text-gray-900">
                          {feature.values[planIdx] === true ? (
                            <span className="text-green-500">✓</span>
                          ) : feature.values[planIdx] === false || feature.values[planIdx] === '—' ? (
                            <span className="text-gray-300">—</span>
                          ) : (
                            feature.values[planIdx]
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
