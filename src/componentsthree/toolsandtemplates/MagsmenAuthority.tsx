import { Award, Building2, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';

const MagsmenAuthority = () => {
  const stats = [
    {
      icon: Award,
      value: '15+',
      label: 'Years',
      sublabel: 'Brand Expertise'
    },
    {
      icon: Building2,
      value: '5,000+',
      label: 'Brands',
      sublabel: 'Businesses Served'
    },
    {
      icon: IndianRupee,
      value: '₹500Cr+',
      label: 'Brand Value',
      sublabel: 'Created'
    }
  ];

  return (
    <section className="w-full px-4 py-8 sm:py-12 lg:py-16 bg-[#F3F0F5] relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-24 h-14 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ opacity: 0.3 }}
            />
            <span className="relative z-10">MAGSMEN</span>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold text-[#5A4A6A] mb-3"
        >
          Backed by India's Leading Brand Experts
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          These tools and templates are created by Magsmen, with 15+ years of experience helping over 5,000 Indian businesses build powerful brands.
        </motion.p>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-md group-hover:shadow-xl flex items-center justify-center mb-2 sm:mb-3 relative overflow-hidden transition-shadow duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                className="text-2xl sm:text-3xl font-bold text-[#5A4A6A] mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-xs sm:text-sm font-semibold text-gray-700">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MagsmenAuthority;
