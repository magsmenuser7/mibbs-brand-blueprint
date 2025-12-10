export function ProblemSection() {
  const problems = [
    {
      number: 1,
      emoji: '💸',
      title: '"How much should I spend?"',
      description: "You don't know the right budget amount for your business size and goals.",
      color: 'red'
    },
    {
      number: 2,
      emoji: '🎯',
      title: '"Where should I spend?"',
      description: "You don't know which channels (digital, offline, content) actually work for your industry.",
      color: 'yellow'
    },
    {
      number: 3,
      emoji: '🤝',
      title: '"Who can I trust?"',
      description: "You don't know which agency will do good work and not waste your money.",
      color: 'red'
    }
  ];

  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      badge: 'bg-red-500',
      title: 'text-red-900',
      text: 'text-red-800'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      badge: 'bg-yellow-500',
      title: 'text-yellow-900',
      text: 'text-yellow-800'
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4">
            The Real Problem
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Every Indian Business Faces the Same 3 Problems
          </h2>
          <p className="text-lg text-gray-600">
            And because of this, many businesses waste money and grow slower than they should.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem) => {
            const colors = colorClasses[problem.color as keyof typeof colorClasses];
            return (
              <div
                key={problem.number}
                className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-8 relative transform hover:-translate-y-2 transition-all duration-300`}
              >
                {/* Number Badge */}
                <div className={`absolute top-4 right-4 w-10 h-10 ${colors.badge} rounded-full text-white flex items-center justify-center font-bold text-lg`}>
                  {problem.number}
                </div>

                {/* Emoji */}
                <div className="text-5xl mb-4">{problem.emoji}</div>

                {/* Title */}
                <h3 className={`text-xl md:text-2xl font-bold ${colors.title} mb-3`}>
                  {problem.title}
                </h3>

                {/* Description */}
                <p className={`text-base ${colors.text} leading-relaxed`}>
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="text-center p-10 bg-gradient-to-br from-purple-50 to-white rounded-2xl border-2 border-purple-200">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            MIBBS Fixes All Three In Minutes
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get a clear budget plan, know where to spend, and connect with trusted agencies.
          </p>
        </div>
      </div>
    </section>
  );
}
