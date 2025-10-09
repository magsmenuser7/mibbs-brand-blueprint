// Indian States and Union Territories
export const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

// Major Indian Cities by State
export const indianCities: Record<string, string[]> = {
  'Andhra Pradesh': [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Kadapa', 'Kakinada', 'Anantapur',
    'Vizianagaram', 'Eluru', 'Ongole', 'Nandyal', 'Machilipatnam', 'Adoni', 'Tenali', 'Chittoor', 'Hindupur', 'Proddatur'
  ],
  'Arunachal Pradesh': [
    'Itanagar', 'Naharlagun', 'Pasighat', 'Tezpur', 'Bomdila', 'Ziro', 'Along', 'Tezu', 'Changlang', 'Khonsa'
  ],
  'Assam': [
    'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon', 'Karimganj', 'Sivasagar',
    'Goalpara', 'Barpeta', 'North Lakhimpur', 'Mangaldoi', 'Diphu', 'Haflong', 'Kokrajhar', 'Hailakandi', 'Morigaon', 'Hojai'
  ],
  'Bihar': [
    'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar',
    'Munger', 'Chhapra', 'Danapur', 'Saharsa', 'Sasaram', 'Hajipur', 'Dehri', 'Siwan', 'Motihari', 'Nawada'
  ],
  'Chhattisgarh': [
    'Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Mahasamund',
    'Dhamtari', 'Chirmiri', 'Janjgir', 'Sakti', 'Tilda Newra', 'Mungeli', 'Manendragarh', 'Naila Janjgir'
  ],
  'Goa': [
    'Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Sanquelim', 'Cuncolim', 'Quepem'
  ],
  'Gujarat': [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Navsari',
    'Morbi', 'Nadiad', 'Surendranagar', 'Bharuch', 'Mehsana', 'Bhuj', 'Porbandar', 'Palanpur', 'Valsad', 'Vapi',
    'Gondal', 'Veraval', 'Godhra', 'Patan', 'Kalol', 'Dahod', 'Botad', 'Amreli', 'Deesa', 'Jetpur'
  ],
  'Haryana': [
    'Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula',
    'Bhiwani', 'Sirsa', 'Bahadurgarh', 'Jind', 'Thanesar', 'Kaithal', 'Palwal', 'Rewari', 'Hansi', 'Narnaul'
  ],
  'Himachal Pradesh': [
    'Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Palampur', 'Baddi', 'Nahan', 'Paonta Sahib', 'Sundarnagar', 'Chamba',
    'Una', 'Kullu', 'Hamirpur', 'Bilaspur', 'Yol', 'Jubbal', 'Chail', 'Kasauli', 'Dalhousie', 'Manali'
  ],
  'Jharkhand': [
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar',
    'Chirkunda', 'Chaibasa', 'Gumla', 'Dumka', 'Godda', 'Sahebganj', 'Pakur', 'Chatra', 'Lohardaga', 'Simdega'
  ],
  'Karnataka': [
    'Bangalore', 'Mysore', 'Hubli-Dharwad', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary', 'Bijapur', 'Shimoga',
    'Tumkur', 'Raichur', 'Bidar', 'Hospet', 'Hassan', 'Gadag-Betigeri', 'Udupi', 'Bhadravati', 'Chitradurga', 'Kolar',
    'Mandya', 'Chikmagalur', 'Gangavati', 'Bagalkot', 'Robertsonpet', 'Ranebennuru', 'Dandeli', 'Karwar', 'Sirsi', 'Puttur'
  ],
  'Kerala': [
    'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur', 'Alappuzha', 'Palakkad', 'Kannur', 'Kottayam', 'Malappuram',
    'Thalassery', 'Ponnani', 'Vatakara', 'Kanhangad', 'Payyanur', 'Koyilandy', 'Parappanangadi', 'Kalamassery', 'Neyyattinkara', 'Kayamkulam'
  ],
  'Madhya Pradesh': [
    'Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa',
    'Murwara', 'Singrauli', 'Burhanpur', 'Khandwa', 'Bhind', 'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha', 'Chhatarpur',
    'Damoh', 'Mandsaur', 'Khargone', 'Neemuch', 'Pithampur', 'Narmadapuram', 'Itarsi', 'Sehore', 'Morena', 'Betul'
  ],
  'Maharashtra': [
    'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli',
    'Malegaon', 'Akola', 'Latur', 'Dhule', 'Ahmednagar', 'Chandrapur', 'Parbhani', 'Jalgaon', 'Bhiwandi', 'Nanded',
    'Ulhasnagar', 'Jalna', 'Lonavla', 'Beed', 'Yavatmal', 'Kamptee', 'Gondia', 'Barshi', 'Achalpur', 'Osmanabad'
  ],
  'Manipur': [
    'Imphal', 'Thoubal', 'Lilong', 'Mayang Imphal', 'Kakching', 'Bishnupur', 'Churachandpur', 'Senapati', 'Ukhrul', 'Tamenglong'
  ],
  'Meghalaya': [
    'Shillong', 'Tura', 'Nongstoin', 'Jowai', 'Baghmara', 'Williamnagar', 'Resubelpara', 'Mawkyrwat', 'Ampati', 'Mairang'
  ],
  'Mizoram': [
    'Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Kolasib', 'Serchhip', 'Mamit', 'Lawngtlai', 'Saitual', 'Khawzawl'
  ],
  'Nagaland': [
    'Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Kiphire', 'Longleng', 'Peren', 'Mon'
  ],
  'Odisha': [
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda',
    'Jeypore', 'Barbil', 'Khordha', 'Sunabeda', 'Rayagada', 'Kendujhar', 'Jagatsinghpur', 'Koraput', 'Paradip', 'Dhenkanal'
  ],
  'Punjab': [
    'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Firozpur', 'Batala', 'Pathankot', 'Moga',
    'Abohar', 'Malerkotla', 'Khanna', 'Phagwara', 'Muktsar', 'Barnala', 'Rajpura', 'Hoshiarpur', 'Kapurthala', 'Faridkot'
  ],
  'Rajasthan': [
    'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Bharatpur', 'Sikar',
    'Pali', 'Sri Ganganagar', 'Kishangarh', 'Baran', 'Dhaulpur', 'Tonk', 'Beawar', 'Hanumangarh', 'Gangapur City', 'Banswara',
    'Makrana', 'Sujangarh', 'Sardarshahar', 'Ladnu', 'Ratangarh', 'Nokha', 'Nimbahera', 'Suratgarh', 'Rajsamand', 'Lachhmangarh'
  ],
  'Sikkim': [
    'Gangtok', 'Namchi', 'Geyzing', 'Mangan', 'Jorethang', 'Naya Bazar', 'Rangpo', 'Singtam', 'Ravangla', 'Yuksom'
  ],
  'Tamil Nadu': [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukkudi',
    'Dindigul', 'Thanjavur', 'Ranipet', 'Sivakasi', 'Karur', 'Udhagamandalam', 'Hosur', 'Nagercoil', 'Kanchipuram', 'Kumarakonam',
    'Karaikkudi', 'Neyveli', 'Cuddalore', 'Kumbakonam', 'Tiruvannamalai', 'Pollachi', 'Rajapalayam', 'Gudiyatham', 'Pudukkottai', 'Vaniyambadi'
  ],
  'Telangana': [
    'Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahabubnagar', 'Nalgonda', 'Adilabad', 'Suryapet',
    'Miryalaguda', 'Jagtial', 'Mancherial', 'Nirmal', 'Kothagudem', 'Bodhan', 'Sangareddy', 'Metpally', 'Zaheerabad', 'Medak'
  ],
  'Tripura': [
    'Agartala', 'Dharmanagar', 'Udaipur', 'Kailasahar', 'Belonia', 'Khowai', 'Pratapgarh', 'Ranirbazar', 'Kumarghat', 'Sonamura'
  ],
  'Uttar Pradesh': [
    'Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad',
    'Saharanpur', 'Gorakhpur', 'Noida', 'Firozabad', 'Jhansi', 'Muzaffarnagar', 'Mathura', 'Rampur', 'Shahjahanpur', 'Farrukhabad',
    'Mau', 'Hapur', 'Etawah', 'Mirzapur', 'Bulandshahr', 'Sambhal', 'Amroha', 'Hardoi', 'Fatehpur', 'Raebareli',
    'Orai', 'Sitapur', 'Bahraich', 'Modinagar', 'Unnao', 'Jaunpur', 'Lakhimpur', 'Hathras', 'Banda', 'Pilibhit'
  ],
  'Uttarakhand': [
    'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani-cum-Kathgodam', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Pithoragarh', 'Ramnagar', 'Manglaur',
    'Nainital', 'Mussoorie', 'Tehri', 'Pauri', 'Bageshwar', 'Almora', 'Champawat', 'Rudraprayag', 'Uttarkashi', 'Gopeshwar'
  ],
  'West Bengal': [
    'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Malda', 'Bardhaman', 'Baharampur', 'Habra', 'Kharagpur',
    'Shantipur', 'Dankuni', 'Dhulian', 'Ranaghat', 'Haldia', 'Raiganj', 'Krishnanagar', 'Nabadwip', 'Medinipur', 'Jalpaiguri',
    'Balurghat', 'Basirhat', 'Bankura', 'Chakdaha', 'Darjeeling', 'Alipurduar', 'Purulia', 'Jangipur', 'Bolpur', 'Bangaon'
  ],
  'Delhi': [
    'New Delhi', 'Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'North East Delhi',
    'North West Delhi', 'South East Delhi', 'South West Delhi', 'Shahdara', 'Dwarka', 'Rohini', 'Najafgarh'
  ],
  'Chandigarh': ['Chandigarh'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
  'Andaman and Nicobar Islands': ['Port Blair', 'Bamboo Flat', 'Garacharma', 'Diglipur', 'Rangat'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
  'Jammu and Kashmir': [
    'Srinagar', 'Jammu', 'Baramulla', 'Anantnag', 'Sopore', 'KathuaUdhampur', 'Punch', 'Rajauri', 'Kupwara',
    'Badgam', 'Bandipore', 'Ganderbal', 'Kulgam', 'Pulwama', 'Shopian', 'Budgam', 'Doda', 'Kishtwar', 'Ramban', 'Reasi'
  ],
  'Ladakh': ['Leh', 'Kargil', 'Nubra', 'Zanskar', 'Drass'],
  'Lakshadweep': ['Kavaratti', 'Agatti', 'Minicoy', 'Amini', 'Andrott']
};

// Sample pincode data structure - In production, this would be loaded from a comprehensive database
export const samplePincodes = [
  // Mumbai
  { pincode: '400001', city: 'Mumbai', state: 'Maharashtra', area: 'Fort' },
  { pincode: '400002', city: 'Mumbai', state: 'Maharashtra', area: 'Kalbadevi' },
  { pincode: '400003', city: 'Mumbai', state: 'Maharashtra', area: 'Masjid Bunder' },
  { pincode: '400004', city: 'Mumbai', state: 'Maharashtra', area: 'Girgaon' },
  { pincode: '400005', city: 'Mumbai', state: 'Maharashtra', area: 'Colaba' },
  { pincode: '400006', city: 'Mumbai', state: 'Maharashtra', area: 'Malabar Hill' },
  { pincode: '400007', city: 'Mumbai', state: 'Maharashtra', area: 'Grant Road' },
  { pincode: '400008', city: 'Mumbai', state: 'Maharashtra', area: 'Tardeo' },
  { pincode: '400009', city: 'Mumbai', state: 'Maharashtra', area: 'Mazgaon' },
  { pincode: '400010', city: 'Mumbai', state: 'Maharashtra', area: 'Mazgaon' },
  
  // Delhi
  { pincode: '110001', city: 'New Delhi', state: 'Delhi', area: 'Connaught Place' },
  { pincode: '110002', city: 'New Delhi', state: 'Delhi', area: 'Darya Ganj' },
  { pincode: '110003', city: 'New Delhi', state: 'Delhi', area: 'Kashmere Gate' },
  { pincode: '110004', city: 'New Delhi', state: 'Delhi', area: 'Raghubir Nagar' },
  { pincode: '110005', city: 'New Delhi', state: 'Delhi', area: 'Karol Bagh' },
  
  // Bangalore
  { pincode: '560001', city: 'Bangalore', state: 'Karnataka', area: 'Chickpet' },
  { pincode: '560002', city: 'Bangalore', state: 'Karnataka', area: 'Bangalore City' },
  { pincode: '560003', city: 'Bangalore', state: 'Karnataka', area: 'Dravidanagar' },
  { pincode: '560004', city: 'Bangalore', state: 'Karnataka', area: 'Bangalore City' },
  { pincode: '560005', city: 'Bangalore', state: 'Karnataka', area: 'Bangalore City' },
  
  // Chennai
  { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu', area: 'Parrys' },
  { pincode: '600002', city: 'Chennai', state: 'Tamil Nadu', area: 'Sowcarpet' },
  { pincode: '600003', city: 'Chennai', state: 'Tamil Nadu', area: 'Chintadripet' },
  { pincode: '600004', city: 'Chennai', state: 'Tamil Nadu', area: 'Mylapore' },
  { pincode: '600005', city: 'Chennai', state: 'Tamil Nadu', area: 'Triplicane' },
  
  // Hyderabad
  { pincode: '500001', city: 'Hyderabad', state: 'Telangana', area: 'Afzal Gunj' },
  { pincode: '500002', city: 'Hyderabad', state: 'Telangana', area: 'Nampally' },
  { pincode: '500003', city: 'Hyderabad', state: 'Telangana', area: 'Himayatnagar' },
  { pincode: '500004', city: 'Hyderabad', state: 'Telangana', area: 'Sultan Bazar' },
  { pincode: '500005', city: 'Hyderabad', state: 'Telangana', area: 'Secunderabad' },
  
  // Kolkata
  { pincode: '700001', city: 'Kolkata', state: 'West Bengal', area: 'Dalhousie' },
  { pincode: '700002', city: 'Kolkata', state: 'West Bengal', area: 'Kalighat' },
  { pincode: '700003', city: 'Kolkata', state: 'West Bengal', area: 'Bowbazar' },
  { pincode: '700004', city: 'Kolkata', state: 'West Bengal', area: 'Bara Bazar' },
  { pincode: '700005', city: 'Kolkata', state: 'West Bengal', area: 'Alipore' },
  
  // Pune
  { pincode: '411001', city: 'Pune', state: 'Maharashtra', area: 'Pune City' },
  { pincode: '411002', city: 'Pune', state: 'Maharashtra', area: 'Pune City' },
  { pincode: '411003', city: 'Pune', state: 'Maharashtra', area: 'Pune City' },
  { pincode: '411004', city: 'Pune', state: 'Maharashtra', area: 'Pune City' },
  { pincode: '411005', city: 'Pune', state: 'Maharashtra', area: 'Pune City' },
  
  // Ahmedabad
  { pincode: '380001', city: 'Ahmedabad', state: 'Gujarat', area: 'Kalupur' },
  { pincode: '380002', city: 'Ahmedabad', state: 'Gujarat', area: 'Dariapur' },
  { pincode: '380003', city: 'Ahmedabad', state: 'Gujarat', area: 'Maninagar' },
  { pincode: '380004', city: 'Ahmedabad', state: 'Gujarat', area: 'Navrangpura' },
  { pincode: '380005', city: 'Ahmedabad', state: 'Gujarat', area: 'Raipur' },
  
  // Jaipur
  { pincode: '302001', city: 'Jaipur', state: 'Rajasthan', area: 'Jaipur City' },
  { pincode: '302002', city: 'Jaipur', state: 'Rajasthan', area: 'Johari Bazar' },
  { pincode: '302003', city: 'Jaipur', state: 'Rajasthan', area: 'Sanganer' },
  { pincode: '302004', city: 'Jaipur', state: 'Rajasthan', area: 'Civil Lines' },
  { pincode: '302005', city: 'Jaipur', state: 'Rajasthan', area: 'Vidyadhar Nagar' },
  
  // Lucknow
  { pincode: '226001', city: 'Lucknow', state: 'Uttar Pradesh', area: 'Hazratganj' },
  { pincode: '226002', city: 'Lucknow', state: 'Uttar Pradesh', area: 'Aminabad' },
  { pincode: '226003', city: 'Lucknow', state: 'Uttar Pradesh', area: 'Chowk' },
  { pincode: '226004', city: 'Lucknow', state: 'Uttar Pradesh', area: 'Alambagh' },
  { pincode: '226005', city: 'Lucknow', state: 'Uttar Pradesh', area: 'Gomti Nagar' }
];

// Function to search pincodes
export const searchPincode = (query: string) => {
  return samplePincodes.filter(
    item => 
      item.pincode.includes(query) ||
      item.city.toLowerCase().includes(query.toLowerCase()) ||
      item.area.toLowerCase().includes(query.toLowerCase())
  );
};

// Function to get cities by state
export const getCitiesByState = (state: string): string[] => {
  return indianCities[state] || [];
};

// Function to validate Indian pincode format
export const isValidIndianPincode = (pincode: string): boolean => {
  return /^[1-9][0-9]{5}$/.test(pincode);
};

// Indian business categories
export const indianBusinessCategories = [
  'Agriculture & Food Processing',
  'Textiles & Garments',
  'Handicrafts & Handloom',
  'Leather & Leather Products',
  'Gems & Jewellery',
  'Chemicals & Pharmaceuticals',
  'Engineering & Auto Components',
  'Electronics & IT Hardware',
  'Plastics & Rubber',
  'Wood & Furniture',
  'Paper & Paper Products',
  'Sports Goods',
  'Medical Devices',
  'Renewable Energy',
  'Food & Beverages',
  'Retail & E-commerce',
  'Healthcare Services',
  'Education & Training',
  'Tourism & Hospitality',
  'Financial Services',
  'Real Estate',
  'Transportation & Logistics',
  'Professional Services',
  'Beauty & Personal Care',
  'Home & Garden',
  'Entertainment & Media'
];

// Indian festivals for marketing calendar
export const indianFestivals = [
  { name: 'Makar Sankranti', date: 'January 14', region: 'Pan India' },
  { name: 'Republic Day', date: 'January 26', region: 'Pan India' },
  { name: 'Maha Shivratri', date: 'February/March', region: 'Pan India' },
  { name: 'Holi', date: 'March', region: 'North India' },
  { name: 'Ram Navami', date: 'March/April', region: 'Pan India' },
  { name: 'Good Friday', date: 'March/April', region: 'Pan India' },
  { name: 'Baisakhi', date: 'April 13', region: 'Punjab, Haryana' },
  { name: 'Eid ul-Fitr', date: 'Variable', region: 'Pan India' },
  { name: 'Buddha Purnima', date: 'April/May', region: 'Pan India' },
  { name: 'Independence Day', date: 'August 15', region: 'Pan India' },
  { name: 'Raksha Bandhan', date: 'August', region: 'North India' },
  { name: 'Janmashtami', date: 'August/September', region: 'Pan India' },
  { name: 'Ganesh Chaturthi', date: 'August/September', region: 'Maharashtra, South India' },
  { name: 'Onam', date: 'August/September', region: 'Kerala' },
  { name: 'Dussehra', date: 'September/October', region: 'Pan India' },
  { name: 'Karva Chauth', date: 'October/November', region: 'North India' },
  { name: 'Diwali', date: 'October/November', region: 'Pan India' },
  { name: 'Bhai Dooj', date: 'October/November', region: 'North India' },
  { name: 'Guru Nanak Jayanti', date: 'November', region: 'Punjab, Pan India' },
  { name: 'Christmas', date: 'December 25', region: 'Pan India' },
  { name: 'Pongal', date: 'January 14', region: 'Tamil Nadu' },
  { name: 'Ugadi', date: 'March/April', region: 'Andhra Pradesh, Telangana' },
  { name: 'Vishu', date: 'April 14', region: 'Kerala' },
  { name: 'Poila Boishakh', date: 'April 14', region: 'West Bengal' },
  { name: 'Rath Yatra', date: 'June/July', region: 'Odisha' },
  { name: 'Teej', date: 'July/August', region: 'Rajasthan, North India' },
  { name: 'Navratri', date: 'September/October', region: 'Gujarat, Pan India' },
  { name: 'Durga Puja', date: 'September/October', region: 'West Bengal, East India' },
  { name: 'Kali Puja', date: 'October/November', region: 'West Bengal' }
];