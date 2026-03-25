// Comprehensive India pincode data organized by state
export interface PincodeInfo {
  pincode: string;
  locality: string;
  district: string;
  state: string;
  country: string;
}

const pincodeDatabase: Record<string, PincodeInfo> = {
  // Delhi
  "110001": { pincode: "110001", locality: "Connaught Place", district: "New Delhi", state: "Delhi", country: "India" },
  "110002": { pincode: "110002", locality: "Darya Ganj", district: "Central Delhi", state: "Delhi", country: "India" },
  "110003": { pincode: "110003", locality: "Civil Lines", district: "North Delhi", state: "Delhi", country: "India" },
  "110005": { pincode: "110005", locality: "Karol Bagh", district: "Central Delhi", state: "Delhi", country: "India" },
  "110006": { pincode: "110006", locality: "Sadar Bazaar", district: "Central Delhi", state: "Delhi", country: "India" },
  "110008": { pincode: "110008", locality: "Patel Nagar", district: "West Delhi", state: "Delhi", country: "India" },
  "110010": { pincode: "110010", locality: "Defence Colony", district: "South Delhi", state: "Delhi", country: "India" },
  "110011": { pincode: "110011", locality: "Nirman Bhawan", district: "New Delhi", state: "Delhi", country: "India" },
  "110016": { pincode: "110016", locality: "Hauz Khas", district: "South Delhi", state: "Delhi", country: "India" },
  "110017": { pincode: "110017", locality: "Malviya Nagar", district: "South Delhi", state: "Delhi", country: "India" },
  "110019": { pincode: "110019", locality: "Kalkaji", district: "South Delhi", state: "Delhi", country: "India" },
  "110020": { pincode: "110020", locality: "Okhla", district: "South Delhi", state: "Delhi", country: "India" },
  "110025": { pincode: "110025", locality: "Badarpur", district: "South East Delhi", state: "Delhi", country: "India" },
  "110030": { pincode: "110030", locality: "Mehrauli", district: "South Delhi", state: "Delhi", country: "India" },
  "110044": { pincode: "110044", locality: "Lajpat Nagar", district: "South Delhi", state: "Delhi", country: "India" },
  "110048": { pincode: "110048", locality: "Chanakyapuri", district: "New Delhi", state: "Delhi", country: "India" },
  "110049": { pincode: "110049", locality: "Sadiq Nagar", district: "South Delhi", state: "Delhi", country: "India" },
  "110051": { pincode: "110051", locality: "Krishna Nagar", district: "East Delhi", state: "Delhi", country: "India" },
  "110052": { pincode: "110052", locality: "Paschim Vihar", district: "West Delhi", state: "Delhi", country: "India" },
  "110053": { pincode: "110053", locality: "Timarpur", district: "North Delhi", state: "Delhi", country: "India" },
  "110060": { pincode: "110060", locality: "Hari Nagar", district: "West Delhi", state: "Delhi", country: "India" },
  "110062": { pincode: "110062", locality: "Janakpuri", district: "West Delhi", state: "Delhi", country: "India" },
  "110065": { pincode: "110065", locality: "Saket", district: "South Delhi", state: "Delhi", country: "India" },
  "110070": { pincode: "110070", locality: "Pushp Vihar", district: "South Delhi", state: "Delhi", country: "India" },
  "110075": { pincode: "110075", locality: "Dwarka", district: "South West Delhi", state: "Delhi", country: "India" },
  "110085": { pincode: "110085", locality: "Rohini", district: "North West Delhi", state: "Delhi", country: "India" },
  "110091": { pincode: "110091", locality: "Mayur Vihar", district: "East Delhi", state: "Delhi", country: "India" },
  "110092": { pincode: "110092", locality: "Shahdara", district: "North East Delhi", state: "Delhi", country: "India" },
  "110096": { pincode: "110096", locality: "Dilshad Garden", district: "North East Delhi", state: "Delhi", country: "India" },

  // Maharashtra
  "400001": { pincode: "400001", locality: "Fort", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400002": { pincode: "400002", locality: "Kalbadevi", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400003": { pincode: "400003", locality: "Mandvi", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400004": { pincode: "400004", locality: "Girgaon", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400005": { pincode: "400005", locality: "Colaba", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400007": { pincode: "400007", locality: "Grant Road", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400008": { pincode: "400008", locality: "Mumbai Central", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400010": { pincode: "400010", locality: "Mazgaon", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400012": { pincode: "400012", locality: "Parel", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400014": { pincode: "400014", locality: "Dadar", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400016": { pincode: "400016", locality: "Mahim", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400018": { pincode: "400018", locality: "Worli", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400020": { pincode: "400020", locality: "Churchgate", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400021": { pincode: "400021", locality: "Nariman Point", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400025": { pincode: "400025", locality: "Prabhadevi", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400028": { pincode: "400028", locality: "Matunga", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400030": { pincode: "400030", locality: "Wadala", district: "Mumbai", state: "Maharashtra", country: "India" },
  "400049": { pincode: "400049", locality: "Bandra West", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400050": { pincode: "400050", locality: "Bandra East", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400051": { pincode: "400051", locality: "Bandra", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400053": { pincode: "400053", locality: "Andheri West", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400058": { pincode: "400058", locality: "Andheri East", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400059": { pincode: "400059", locality: "Goregaon", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400060": { pincode: "400060", locality: "Jogeshwari", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400064": { pincode: "400064", locality: "Malad", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400067": { pincode: "400067", locality: "Kandivali", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400068": { pincode: "400068", locality: "Dahisar", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400069": { pincode: "400069", locality: "Andheri", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400070": { pincode: "400070", locality: "Kurla", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400071": { pincode: "400071", locality: "Chembur", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400076": { pincode: "400076", locality: "Powai", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400078": { pincode: "400078", locality: "Ghatkopar", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400080": { pincode: "400080", locality: "Mulund", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400086": { pincode: "400086", locality: "Ghatkopar East", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400089": { pincode: "400089", locality: "Borivali", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400092": { pincode: "400092", locality: "Borivali East", district: "Mumbai Suburban", state: "Maharashtra", country: "India" },
  "400093": { pincode: "400093", locality: "Dombivli", district: "Thane", state: "Maharashtra", country: "India" },
  "400601": { pincode: "400601", locality: "Thane West", district: "Thane", state: "Maharashtra", country: "India" },
  "400602": { pincode: "400602", locality: "Thane East", district: "Thane", state: "Maharashtra", country: "India" },
  "400603": { pincode: "400603", locality: "Thane", district: "Thane", state: "Maharashtra", country: "India" },
  "400610": { pincode: "400610", locality: "Navi Mumbai", district: "Thane", state: "Maharashtra", country: "India" },
  "400614": { pincode: "400614", locality: "Panvel", district: "Raigad", state: "Maharashtra", country: "India" },
  "400701": { pincode: "400701", locality: "Vashi", district: "Thane", state: "Maharashtra", country: "India" },
  "400703": { pincode: "400703", locality: "Nerul", district: "Thane", state: "Maharashtra", country: "India" },
  "400706": { pincode: "400706", locality: "Belapur", district: "Thane", state: "Maharashtra", country: "India" },
  "411001": { pincode: "411001", locality: "Shivajinagar", district: "Pune", state: "Maharashtra", country: "India" },
  "411002": { pincode: "411002", locality: "Budhwar Peth", district: "Pune", state: "Maharashtra", country: "India" },
  "411004": { pincode: "411004", locality: "Camp", district: "Pune", state: "Maharashtra", country: "India" },
  "411005": { pincode: "411005", locality: "Shaniwar Peth", district: "Pune", state: "Maharashtra", country: "India" },
  "411006": { pincode: "411006", locality: "Deccan Gymkhana", district: "Pune", state: "Maharashtra", country: "India" },
  "411007": { pincode: "411007", locality: "Aundh", district: "Pune", state: "Maharashtra", country: "India" },
  "411009": { pincode: "411009", locality: "Yerawada", district: "Pune", state: "Maharashtra", country: "India" },
  "411011": { pincode: "411011", locality: "Bibvewadi", district: "Pune", state: "Maharashtra", country: "India" },
  "411014": { pincode: "411014", locality: "Hadapsar", district: "Pune", state: "Maharashtra", country: "India" },
  "411016": { pincode: "411016", locality: "Kothrud", district: "Pune", state: "Maharashtra", country: "India" },
  "411018": { pincode: "411018", locality: "Erandwane", district: "Pune", state: "Maharashtra", country: "India" },
  "411021": { pincode: "411021", locality: "Senapati Bapat Road", district: "Pune", state: "Maharashtra", country: "India" },
  "411027": { pincode: "411027", locality: "Pashan", district: "Pune", state: "Maharashtra", country: "India" },
  "411028": { pincode: "411028", locality: "Karve Nagar", district: "Pune", state: "Maharashtra", country: "India" },
  "411030": { pincode: "411030", locality: "Warje", district: "Pune", state: "Maharashtra", country: "India" },
  "411033": { pincode: "411033", locality: "Wakad", district: "Pune", state: "Maharashtra", country: "India" },
  "411038": { pincode: "411038", locality: "Hinjawadi", district: "Pune", state: "Maharashtra", country: "India" },
  "411041": { pincode: "411041", locality: "Kharadi", district: "Pune", state: "Maharashtra", country: "India" },
  "411045": { pincode: "411045", locality: "Baner", district: "Pune", state: "Maharashtra", country: "India" },
  "411048": { pincode: "411048", locality: "Magarpatta", district: "Pune", state: "Maharashtra", country: "India" },
  "411057": { pincode: "411057", locality: "Pimpri", district: "Pune", state: "Maharashtra", country: "India" },
  "440001": { pincode: "440001", locality: "Sitabuldi", district: "Nagpur", state: "Maharashtra", country: "India" },
  "440002": { pincode: "440002", locality: "Sadar", district: "Nagpur", state: "Maharashtra", country: "India" },
  "440010": { pincode: "440010", locality: "Civil Lines", district: "Nagpur", state: "Maharashtra", country: "India" },
  "440012": { pincode: "440012", locality: "Dharampeth", district: "Nagpur", state: "Maharashtra", country: "India" },
  "440015": { pincode: "440015", locality: "Hingna", district: "Nagpur", state: "Maharashtra", country: "India" },
  "440022": { pincode: "440022", locality: "Manish Nagar", district: "Nagpur", state: "Maharashtra", country: "India" },
  "440025": { pincode: "440025", locality: "Wadi", district: "Nagpur", state: "Maharashtra", country: "India" },
  "431001": { pincode: "431001", locality: "Aurangabad", district: "Aurangabad", state: "Maharashtra", country: "India" },
  "422001": { pincode: "422001", locality: "Nashik", district: "Nashik", state: "Maharashtra", country: "India" },
  "416001": { pincode: "416001", locality: "Kolhapur", district: "Kolhapur", state: "Maharashtra", country: "India" },

  // Karnataka
  "560001": { pincode: "560001", locality: "MG Road", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560002": { pincode: "560002", locality: "Shivajinagar", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560003": { pincode: "560003", locality: "Richmond Town", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560004": { pincode: "560004", locality: "Basavanagudi", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560008": { pincode: "560008", locality: "Shanthinagar", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560009": { pincode: "560009", locality: "Langford Town", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560010": { pincode: "560010", locality: "Jayanagar", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560011": { pincode: "560011", locality: "Malleswaram", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560017": { pincode: "560017", locality: "Rajajinagar", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560024": { pincode: "560024", locality: "Vijayanagar", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560034": { pincode: "560034", locality: "Koramangala", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560037": { pincode: "560037", locality: "Marathahalli", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560038": { pincode: "560038", locality: "Indiranagar", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560040": { pincode: "560040", locality: "Sadashivanagar", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560043": { pincode: "560043", locality: "Yelahanka", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560048": { pincode: "560048", locality: "Sarjapur Road", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560050": { pincode: "560050", locality: "Bannerghatta Road", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560066": { pincode: "560066", locality: "Whitefield", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560068": { pincode: "560068", locality: "Hebbal", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560076": { pincode: "560076", locality: "Banashankari", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560078": { pincode: "560078", locality: "Electronic City", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560085": { pincode: "560085", locality: "Nagarbhavi", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560095": { pincode: "560095", locality: "HSR Layout", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560097": { pincode: "560097", locality: "BTM Layout", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560100": { pincode: "560100", locality: "JP Nagar", district: "Bangalore Urban", state: "Karnataka", country: "India" },
  "560103": { pincode: "560103", locality: "Devanahalli", district: "Bangalore Rural", state: "Karnataka", country: "India" },
  "570001": { pincode: "570001", locality: "Mysore", district: "Mysore", state: "Karnataka", country: "India" },
  "580001": { pincode: "580001", locality: "Hubli", district: "Dharwad", state: "Karnataka", country: "India" },
  "590001": { pincode: "590001", locality: "Belgaum", district: "Belgaum", state: "Karnataka", country: "India" },
  "575001": { pincode: "575001", locality: "Mangalore", district: "Dakshina Kannada", state: "Karnataka", country: "India" },

  // Tamil Nadu
  "600001": { pincode: "600001", locality: "George Town", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600002": { pincode: "600002", locality: "Triplicane", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600003": { pincode: "600003", locality: "Park Town", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600004": { pincode: "600004", locality: "Royapettah", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600005": { pincode: "600005", locality: "Teynampet", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600006": { pincode: "600006", locality: "Mylapore", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600008": { pincode: "600008", locality: "Egmore", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600010": { pincode: "600010", locality: "Kilpauk", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600017": { pincode: "600017", locality: "T Nagar", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600018": { pincode: "600018", locality: "Adyar", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600020": { pincode: "600020", locality: "Besant Nagar", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600024": { pincode: "600024", locality: "Ashok Nagar", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600028": { pincode: "600028", locality: "Nungambakkam", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600034": { pincode: "600034", locality: "Nandanam", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600040": { pincode: "600040", locality: "Velachery", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600042": { pincode: "600042", locality: "Guindy", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600045": { pincode: "600045", locality: "Saidapet", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600078": { pincode: "600078", locality: "Porur", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600085": { pincode: "600085", locality: "Perungudi", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600086": { pincode: "600086", locality: "Perungalathur", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600096": { pincode: "600096", locality: "OMR", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600097": { pincode: "600097", locality: "Sholinganallur", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600100": { pincode: "600100", locality: "Ambattur", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "600119": { pincode: "600119", locality: "Tambaram", district: "Chennai", state: "Tamil Nadu", country: "India" },
  "625001": { pincode: "625001", locality: "Madurai", district: "Madurai", state: "Tamil Nadu", country: "India" },
  "641001": { pincode: "641001", locality: "Coimbatore", district: "Coimbatore", state: "Tamil Nadu", country: "India" },
  "620001": { pincode: "620001", locality: "Tiruchirappalli", district: "Tiruchirappalli", state: "Tamil Nadu", country: "India" },
  "636001": { pincode: "636001", locality: "Salem", district: "Salem", state: "Tamil Nadu", country: "India" },

  // Telangana
  "500001": { pincode: "500001", locality: "Abids", district: "Hyderabad", state: "Telangana", country: "India" },
  "500003": { pincode: "500003", locality: "Koti", district: "Hyderabad", state: "Telangana", country: "India" },
  "500004": { pincode: "500004", locality: "Sultan Bazaar", district: "Hyderabad", state: "Telangana", country: "India" },
  "500008": { pincode: "500008", locality: "Banjara Hills", district: "Hyderabad", state: "Telangana", country: "India" },
  "500016": { pincode: "500016", locality: "Ameerpet", district: "Hyderabad", state: "Telangana", country: "India" },
  "500018": { pincode: "500018", locality: "Mehdipatnam", district: "Hyderabad", state: "Telangana", country: "India" },
  "500028": { pincode: "500028", locality: "Secunderabad", district: "Hyderabad", state: "Telangana", country: "India" },
  "500032": { pincode: "500032", locality: "Jubilee Hills", district: "Hyderabad", state: "Telangana", country: "India" },
  "500033": { pincode: "500033", locality: "Kukatpally", district: "Hyderabad", state: "Telangana", country: "India" },
  "500034": { pincode: "500034", locality: "Begumpet", district: "Hyderabad", state: "Telangana", country: "India" },
  "500038": { pincode: "500038", locality: "Kondapur", district: "Hyderabad", state: "Telangana", country: "India" },
  "500072": { pincode: "500072", locality: "Madhapur", district: "Hyderabad", state: "Telangana", country: "India" },
  "500081": { pincode: "500081", locality: "Gachibowli", district: "Hyderabad", state: "Telangana", country: "India" },
  "500084": { pincode: "500084", locality: "Hi-Tech City", district: "Hyderabad", state: "Telangana", country: "India" },
  "500090": { pincode: "500090", locality: "Nanakramguda", district: "Hyderabad", state: "Telangana", country: "India" },

  // West Bengal
  "700001": { pincode: "700001", locality: "BBD Bagh", district: "Kolkata", state: "West Bengal", country: "India" },
  "700007": { pincode: "700007", locality: "Bowbazar", district: "Kolkata", state: "West Bengal", country: "India" },
  "700012": { pincode: "700012", locality: "Entally", district: "Kolkata", state: "West Bengal", country: "India" },
  "700016": { pincode: "700016", locality: "Ballygunge", district: "Kolkata", state: "West Bengal", country: "India" },
  "700017": { pincode: "700017", locality: "Park Street", district: "Kolkata", state: "West Bengal", country: "India" },
  "700019": { pincode: "700019", locality: "Alipore", district: "Kolkata", state: "West Bengal", country: "India" },
  "700020": { pincode: "700020", locality: "Kalighat", district: "Kolkata", state: "West Bengal", country: "India" },
  "700025": { pincode: "700025", locality: "Bhowanipore", district: "Kolkata", state: "West Bengal", country: "India" },
  "700029": { pincode: "700029", locality: "Dhakuria", district: "Kolkata", state: "West Bengal", country: "India" },
  "700032": { pincode: "700032", locality: "Gariahat", district: "Kolkata", state: "West Bengal", country: "India" },
  "700039": { pincode: "700039", locality: "Jadavpur", district: "Kolkata", state: "West Bengal", country: "India" },
  "700064": { pincode: "700064", locality: "Salt Lake City", district: "Kolkata", state: "West Bengal", country: "India" },
  "700091": { pincode: "700091", locality: "New Town", district: "Kolkata", state: "West Bengal", country: "India" },
  "700106": { pincode: "700106", locality: "Rajarhat", district: "North 24 Parganas", state: "West Bengal", country: "India" },
  "700135": { pincode: "700135", locality: "Newtown Action Area", district: "Kolkata", state: "West Bengal", country: "India" },
  "711101": { pincode: "711101", locality: "Howrah", district: "Howrah", state: "West Bengal", country: "India" },

  // Gujarat
  "380001": { pincode: "380001", locality: "Lal Darwaja", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380004": { pincode: "380004", locality: "Ellis Bridge", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380006": { pincode: "380006", locality: "Navrangpura", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380007": { pincode: "380007", locality: "Paldi", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380009": { pincode: "380009", locality: "Ashram Road", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380013": { pincode: "380013", locality: "Satellite", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380015": { pincode: "380015", locality: "Bodakdev", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380051": { pincode: "380051", locality: "Gota", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380054": { pincode: "380054", locality: "Prahlad Nagar", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380058": { pincode: "380058", locality: "South Bopal", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "380059": { pincode: "380059", locality: "SG Highway", district: "Ahmedabad", state: "Gujarat", country: "India" },
  "382007": { pincode: "382007", locality: "Gandhinagar", district: "Gandhinagar", state: "Gujarat", country: "India" },
  "382010": { pincode: "382010", locality: "Gandhinagar Sector", district: "Gandhinagar", state: "Gujarat", country: "India" },
  "395001": { pincode: "395001", locality: "Surat", district: "Surat", state: "Gujarat", country: "India" },
  "395003": { pincode: "395003", locality: "Athwa", district: "Surat", state: "Gujarat", country: "India" },
  "395007": { pincode: "395007", locality: "Adajan", district: "Surat", state: "Gujarat", country: "India" },
  "390001": { pincode: "390001", locality: "Vadodara", district: "Vadodara", state: "Gujarat", country: "India" },
  "360001": { pincode: "360001", locality: "Rajkot", district: "Rajkot", state: "Gujarat", country: "India" },
  "370001": { pincode: "370001", locality: "Bhuj", district: "Kutch", state: "Gujarat", country: "India" },

  // Rajasthan
  "302001": { pincode: "302001", locality: "Johari Bazaar", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302002": { pincode: "302002", locality: "Tripolia Bazaar", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302004": { pincode: "302004", locality: "C Scheme", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302005": { pincode: "302005", locality: "MI Road", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302012": { pincode: "302012", locality: "Bani Park", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302015": { pincode: "302015", locality: "Vaishali Nagar", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302017": { pincode: "302017", locality: "Malviya Nagar", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302018": { pincode: "302018", locality: "Tonk Road", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302019": { pincode: "302019", locality: "Mansarovar", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302020": { pincode: "302020", locality: "Jhotwara", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302021": { pincode: "302021", locality: "Sitapura", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302022": { pincode: "302022", locality: "Jagatpura", district: "Jaipur", state: "Rajasthan", country: "India" },
  "302033": { pincode: "302033", locality: "Ajmer Road", district: "Jaipur", state: "Rajasthan", country: "India" },
  "313001": { pincode: "313001", locality: "Udaipur", district: "Udaipur", state: "Rajasthan", country: "India" },
  "305001": { pincode: "305001", locality: "Ajmer", district: "Ajmer", state: "Rajasthan", country: "India" },
  "342001": { pincode: "342001", locality: "Jodhpur", district: "Jodhpur", state: "Rajasthan", country: "India" },
  "334001": { pincode: "334001", locality: "Bikaner", district: "Bikaner", state: "Rajasthan", country: "India" },
  "324001": { pincode: "324001", locality: "Kota", district: "Kota", state: "Rajasthan", country: "India" },

  // Uttar Pradesh
  "201301": { pincode: "201301", locality: "Noida Sector 1", district: "Gautam Buddh Nagar", state: "Uttar Pradesh", country: "India" },
  "201303": { pincode: "201303", locality: "Noida Sector 15", district: "Gautam Buddh Nagar", state: "Uttar Pradesh", country: "India" },
  "201304": { pincode: "201304", locality: "Greater Noida", district: "Gautam Buddh Nagar", state: "Uttar Pradesh", country: "India" },
  "201305": { pincode: "201305", locality: "Noida Sector 62", district: "Gautam Buddh Nagar", state: "Uttar Pradesh", country: "India" },
  "201306": { pincode: "201306", locality: "Noida Sector 63", district: "Gautam Buddh Nagar", state: "Uttar Pradesh", country: "India" },
  "201307": { pincode: "201307", locality: "Noida Extension", district: "Gautam Buddh Nagar", state: "Uttar Pradesh", country: "India" },
  "201310": { pincode: "201310", locality: "Noida Sector 128", district: "Gautam Buddh Nagar", state: "Uttar Pradesh", country: "India" },
  "201012": { pincode: "201012", locality: "Ghaziabad", district: "Ghaziabad", state: "Uttar Pradesh", country: "India" },
  "226001": { pincode: "226001", locality: "Hazratganj", district: "Lucknow", state: "Uttar Pradesh", country: "India" },
  "226010": { pincode: "226010", locality: "Gomti Nagar", district: "Lucknow", state: "Uttar Pradesh", country: "India" },
  "226012": { pincode: "226012", locality: "Indira Nagar", district: "Lucknow", state: "Uttar Pradesh", country: "India" },
  "226016": { pincode: "226016", locality: "Aliganj", district: "Lucknow", state: "Uttar Pradesh", country: "India" },
  "226020": { pincode: "226020", locality: "Mahanagar", district: "Lucknow", state: "Uttar Pradesh", country: "India" },
  "226022": { pincode: "226022", locality: "Chinhat", district: "Lucknow", state: "Uttar Pradesh", country: "India" },
  "226024": { pincode: "226024", locality: "Jankipuram", district: "Lucknow", state: "Uttar Pradesh", country: "India" },
  "208001": { pincode: "208001", locality: "Kanpur Cantt", district: "Kanpur Nagar", state: "Uttar Pradesh", country: "India" },
  "211001": { pincode: "211001", locality: "Civil Lines", district: "Allahabad", state: "Uttar Pradesh", country: "India" },
  "221001": { pincode: "221001", locality: "Varanasi Cantt", district: "Varanasi", state: "Uttar Pradesh", country: "India" },
  "250001": { pincode: "250001", locality: "Meerut Cantt", district: "Meerut", state: "Uttar Pradesh", country: "India" },
  "282001": { pincode: "282001", locality: "Agra Cantt", district: "Agra", state: "Uttar Pradesh", country: "India" },

  // Madhya Pradesh
  "462001": { pincode: "462001", locality: "New Market", district: "Bhopal", state: "Madhya Pradesh", country: "India" },
  "462003": { pincode: "462003", locality: "TT Nagar", district: "Bhopal", state: "Madhya Pradesh", country: "India" },
  "462010": { pincode: "462010", locality: "Arera Colony", district: "Bhopal", state: "Madhya Pradesh", country: "India" },
  "462016": { pincode: "462016", locality: "Kolar Road", district: "Bhopal", state: "Madhya Pradesh", country: "India" },
  "462023": { pincode: "462023", locality: "Hoshangabad Road", district: "Bhopal", state: "Madhya Pradesh", country: "India" },
  "452001": { pincode: "452001", locality: "Indore", district: "Indore", state: "Madhya Pradesh", country: "India" },
  "452010": { pincode: "452010", locality: "Vijay Nagar", district: "Indore", state: "Madhya Pradesh", country: "India" },
  "474001": { pincode: "474001", locality: "Gwalior", district: "Gwalior", state: "Madhya Pradesh", country: "India" },
  "482001": { pincode: "482001", locality: "Jabalpur", district: "Jabalpur", state: "Madhya Pradesh", country: "India" },

  // Kerala
  "682001": { pincode: "682001", locality: "Fort Kochi", district: "Ernakulam", state: "Kerala", country: "India" },
  "682011": { pincode: "682011", locality: "Ernakulam South", district: "Ernakulam", state: "Kerala", country: "India" },
  "682016": { pincode: "682016", locality: "Kadavanthra", district: "Ernakulam", state: "Kerala", country: "India" },
  "682017": { pincode: "682017", locality: "Elamakkara", district: "Ernakulam", state: "Kerala", country: "India" },
  "682020": { pincode: "682020", locality: "Palarivattom", district: "Ernakulam", state: "Kerala", country: "India" },
  "682024": { pincode: "682024", locality: "Edappally", district: "Ernakulam", state: "Kerala", country: "India" },
  "682030": { pincode: "682030", locality: "Kakkanad", district: "Ernakulam", state: "Kerala", country: "India" },
  "695001": { pincode: "695001", locality: "Thiruvananthapuram", district: "Thiruvananthapuram", state: "Kerala", country: "India" },
  "695004": { pincode: "695004", locality: "Kowdiar", district: "Thiruvananthapuram", state: "Kerala", country: "India" },
  "695010": { pincode: "695010", locality: "Kazhakootam", district: "Thiruvananthapuram", state: "Kerala", country: "India" },
  "695014": { pincode: "695014", locality: "Technopark", district: "Thiruvananthapuram", state: "Kerala", country: "India" },
  "673001": { pincode: "673001", locality: "Kozhikode", district: "Kozhikode", state: "Kerala", country: "India" },
  "680001": { pincode: "680001", locality: "Thrissur", district: "Thrissur", state: "Kerala", country: "India" },
  "670001": { pincode: "670001", locality: "Kannur", district: "Kannur", state: "Kerala", country: "India" },

  // Punjab
  "160001": { pincode: "160001", locality: "Sector 1", district: "Chandigarh", state: "Chandigarh", country: "India" },
  "160017": { pincode: "160017", locality: "Sector 17", district: "Chandigarh", state: "Chandigarh", country: "India" },
  "160022": { pincode: "160022", locality: "Sector 22", district: "Chandigarh", state: "Chandigarh", country: "India" },
  "160036": { pincode: "160036", locality: "Sector 36", district: "Chandigarh", state: "Chandigarh", country: "India" },
  "141001": { pincode: "141001", locality: "Ludhiana", district: "Ludhiana", state: "Punjab", country: "India" },
  "143001": { pincode: "143001", locality: "Amritsar", district: "Amritsar", state: "Punjab", country: "India" },
  "144001": { pincode: "144001", locality: "Jalandhar", district: "Jalandhar", state: "Punjab", country: "India" },
  "147001": { pincode: "147001", locality: "Patiala", district: "Patiala", state: "Punjab", country: "India" },
  "148001": { pincode: "148001", locality: "Sangrur", district: "Sangrur", state: "Punjab", country: "India" },
  "140001": { pincode: "140001", locality: "Ropar", district: "Rupnagar", state: "Punjab", country: "India" },
  "160055": { pincode: "160055", locality: "Mohali", district: "SAS Nagar", state: "Punjab", country: "India" },
  "160059": { pincode: "160059", locality: "Mohali Phase 5", district: "SAS Nagar", state: "Punjab", country: "India" },
  "140301": { pincode: "140301", locality: "Mohali IT Park", district: "SAS Nagar", state: "Punjab", country: "India" },

  // Haryana
  "122001": { pincode: "122001", locality: "Gurgaon", district: "Gurgaon", state: "Haryana", country: "India" },
  "122002": { pincode: "122002", locality: "DLF Phase 1", district: "Gurgaon", state: "Haryana", country: "India" },
  "122003": { pincode: "122003", locality: "Sushant Lok", district: "Gurgaon", state: "Haryana", country: "India" },
  "122009": { pincode: "122009", locality: "DLF Cyber City", district: "Gurgaon", state: "Haryana", country: "India" },
  "122011": { pincode: "122011", locality: "Sector 49", district: "Gurgaon", state: "Haryana", country: "India" },
  "122015": { pincode: "122015", locality: "Sector 56", district: "Gurgaon", state: "Haryana", country: "India" },
  "122018": { pincode: "122018", locality: "Sector 82", district: "Gurgaon", state: "Haryana", country: "India" },
  "121001": { pincode: "121001", locality: "Faridabad", district: "Faridabad", state: "Haryana", country: "India" },
  "121002": { pincode: "121002", locality: "NIT Faridabad", district: "Faridabad", state: "Haryana", country: "India" },
  "132001": { pincode: "132001", locality: "Panipat", district: "Panipat", state: "Haryana", country: "India" },
  "125001": { pincode: "125001", locality: "Hisar", district: "Hisar", state: "Haryana", country: "India" },
  "136001": { pincode: "136001", locality: "Kurukshetra", district: "Kurukshetra", state: "Haryana", country: "India" },
  "134001": { pincode: "134001", locality: "Ambala Cantt", district: "Ambala", state: "Haryana", country: "India" },
  "131001": { pincode: "131001", locality: "Sonipat", district: "Sonipat", state: "Haryana", country: "India" },

  // Bihar
  "800001": { pincode: "800001", locality: "Patna City", district: "Patna", state: "Bihar", country: "India" },
  "800004": { pincode: "800004", locality: "Boring Road", district: "Patna", state: "Bihar", country: "India" },
  "800006": { pincode: "800006", locality: "Kankarbagh", district: "Patna", state: "Bihar", country: "India" },
  "800014": { pincode: "800014", locality: "Patliputra", district: "Patna", state: "Bihar", country: "India" },
  "800020": { pincode: "800020", locality: "Bailey Road", district: "Patna", state: "Bihar", country: "India" },
  "842001": { pincode: "842001", locality: "Muzaffarpur", district: "Muzaffarpur", state: "Bihar", country: "India" },
  "812001": { pincode: "812001", locality: "Bhagalpur", district: "Bhagalpur", state: "Bihar", country: "India" },
  "846001": { pincode: "846001", locality: "Darbhanga", district: "Darbhanga", state: "Bihar", country: "India" },

  // Odisha
  "751001": { pincode: "751001", locality: "Bhubaneswar GPO", district: "Khurda", state: "Odisha", country: "India" },
  "751009": { pincode: "751009", locality: "Saheed Nagar", district: "Khurda", state: "Odisha", country: "India" },
  "751012": { pincode: "751012", locality: "Nayapalli", district: "Khurda", state: "Odisha", country: "India" },
  "751024": { pincode: "751024", locality: "Patia", district: "Khurda", state: "Odisha", country: "India" },
  "753001": { pincode: "753001", locality: "Cuttack", district: "Cuttack", state: "Odisha", country: "India" },
  "769001": { pincode: "769001", locality: "Rourkela", district: "Sundargarh", state: "Odisha", country: "India" },
  "760001": { pincode: "760001", locality: "Berhampur", district: "Ganjam", state: "Odisha", country: "India" },

  // Andhra Pradesh
  "520001": { pincode: "520001", locality: "Vijayawada", district: "Krishna", state: "Andhra Pradesh", country: "India" },
  "520010": { pincode: "520010", locality: "Benz Circle", district: "Krishna", state: "Andhra Pradesh", country: "India" },
  "530001": { pincode: "530001", locality: "Visakhapatnam", district: "Visakhapatnam", state: "Andhra Pradesh", country: "India" },
  "530003": { pincode: "530003", locality: "Dwaraka Nagar", district: "Visakhapatnam", state: "Andhra Pradesh", country: "India" },
  "530016": { pincode: "530016", locality: "MVP Colony", district: "Visakhapatnam", state: "Andhra Pradesh", country: "India" },
  "530045": { pincode: "530045", locality: "Madhurawada", district: "Visakhapatnam", state: "Andhra Pradesh", country: "India" },
  "522001": { pincode: "522001", locality: "Guntur", district: "Guntur", state: "Andhra Pradesh", country: "India" },
  "515001": { pincode: "515001", locality: "Anantapur", district: "Anantapur", state: "Andhra Pradesh", country: "India" },
  "517501": { pincode: "517501", locality: "Tirupati", district: "Chittoor", state: "Andhra Pradesh", country: "India" },
  "518001": { pincode: "518001", locality: "Kurnool", district: "Kurnool", state: "Andhra Pradesh", country: "India" },
  "522501": { pincode: "522501", locality: "Amaravati", district: "Guntur", state: "Andhra Pradesh", country: "India" },

  // Assam
  "781001": { pincode: "781001", locality: "Guwahati GPO", district: "Kamrup Metropolitan", state: "Assam", country: "India" },
  "781003": { pincode: "781003", locality: "Fancy Bazar", district: "Kamrup Metropolitan", state: "Assam", country: "India" },
  "781005": { pincode: "781005", locality: "Uzanbazar", district: "Kamrup Metropolitan", state: "Assam", country: "India" },
  "781006": { pincode: "781006", locality: "Panbazar", district: "Kamrup Metropolitan", state: "Assam", country: "India" },
  "781007": { pincode: "781007", locality: "Maligaon", district: "Kamrup Metropolitan", state: "Assam", country: "India" },
  "781014": { pincode: "781014", locality: "Dispur", district: "Kamrup Metropolitan", state: "Assam", country: "India" },
  "781036": { pincode: "781036", locality: "Beltola", district: "Kamrup Metropolitan", state: "Assam", country: "India" },
  "786001": { pincode: "786001", locality: "Dibrugarh", district: "Dibrugarh", state: "Assam", country: "India" },
  "785001": { pincode: "785001", locality: "Jorhat", district: "Jorhat", state: "Assam", country: "India" },

  // Jharkhand
  "834001": { pincode: "834001", locality: "Ranchi", district: "Ranchi", state: "Jharkhand", country: "India" },
  "834002": { pincode: "834002", locality: "Doranda", district: "Ranchi", state: "Jharkhand", country: "India" },
  "834005": { pincode: "834005", locality: "Lalpur", district: "Ranchi", state: "Jharkhand", country: "India" },
  "831001": { pincode: "831001", locality: "Jamshedpur", district: "East Singhbhum", state: "Jharkhand", country: "India" },
  "826001": { pincode: "826001", locality: "Dhanbad", district: "Dhanbad", state: "Jharkhand", country: "India" },
  "814001": { pincode: "814001", locality: "Deoghar", district: "Deoghar", state: "Jharkhand", country: "India" },

  // Chhattisgarh
  "492001": { pincode: "492001", locality: "Raipur GPO", district: "Raipur", state: "Chhattisgarh", country: "India" },
  "492007": { pincode: "492007", locality: "Shankar Nagar", district: "Raipur", state: "Chhattisgarh", country: "India" },
  "490001": { pincode: "490001", locality: "Bhilai", district: "Durg", state: "Chhattisgarh", country: "India" },
  "495001": { pincode: "495001", locality: "Bilaspur", district: "Bilaspur", state: "Chhattisgarh", country: "India" },

  // Uttarakhand
  "248001": { pincode: "248001", locality: "Dehradun", district: "Dehradun", state: "Uttarakhand", country: "India" },
  "248002": { pincode: "248002", locality: "Rajpur Road", district: "Dehradun", state: "Uttarakhand", country: "India" },
  "248006": { pincode: "248006", locality: "Race Course", district: "Dehradun", state: "Uttarakhand", country: "India" },
  "249401": { pincode: "249401", locality: "Haridwar", district: "Haridwar", state: "Uttarakhand", country: "India" },
  "263001": { pincode: "263001", locality: "Nainital", district: "Nainital", state: "Uttarakhand", country: "India" },
  "263139": { pincode: "263139", locality: "Haldwani", district: "Nainital", state: "Uttarakhand", country: "India" },
  "246001": { pincode: "246001", locality: "Pauri", district: "Pauri Garhwal", state: "Uttarakhand", country: "India" },
  "244001": { pincode: "244001", locality: "Moradabad", district: "Moradabad", state: "Uttar Pradesh", country: "India" },

  // Himachal Pradesh
  "171001": { pincode: "171001", locality: "Shimla", district: "Shimla", state: "Himachal Pradesh", country: "India" },
  "171002": { pincode: "171002", locality: "Shimla GPO", district: "Shimla", state: "Himachal Pradesh", country: "India" },
  "176001": { pincode: "176001", locality: "Kangra", district: "Kangra", state: "Himachal Pradesh", country: "India" },
  "175001": { pincode: "175001", locality: "Mandi", district: "Mandi", state: "Himachal Pradesh", country: "India" },
  "176061": { pincode: "176061", locality: "Dharamshala", district: "Kangra", state: "Himachal Pradesh", country: "India" },
  "175101": { pincode: "175101", locality: "Kullu", district: "Kullu", state: "Himachal Pradesh", country: "India" },
  "175131": { pincode: "175131", locality: "Manali", district: "Kullu", state: "Himachal Pradesh", country: "India" },

  // Jammu & Kashmir
  "180001": { pincode: "180001", locality: "Jammu", district: "Jammu", state: "Jammu & Kashmir", country: "India" },
  "180004": { pincode: "180004", locality: "Gandhi Nagar", district: "Jammu", state: "Jammu & Kashmir", country: "India" },
  "190001": { pincode: "190001", locality: "Srinagar GPO", district: "Srinagar", state: "Jammu & Kashmir", country: "India" },
  "190008": { pincode: "190008", locality: "Lal Chowk", district: "Srinagar", state: "Jammu & Kashmir", country: "India" },
  "190010": { pincode: "190010", locality: "Rajbagh", district: "Srinagar", state: "Jammu & Kashmir", country: "India" },

  // Goa
  "403001": { pincode: "403001", locality: "Panaji", district: "North Goa", state: "Goa", country: "India" },
  "403501": { pincode: "403501", locality: "Margao", district: "South Goa", state: "Goa", country: "India" },
  "403601": { pincode: "403601", locality: "Vasco da Gama", district: "South Goa", state: "Goa", country: "India" },
  "403114": { pincode: "403114", locality: "Mapusa", district: "North Goa", state: "Goa", country: "India" },
  "403516": { pincode: "403516", locality: "Ponda", district: "South Goa", state: "Goa", country: "India" },
  "403731": { pincode: "403731", locality: "Calangute", district: "North Goa", state: "Goa", country: "India" },

  // Tripura
  "799001": { pincode: "799001", locality: "Agartala", district: "West Tripura", state: "Tripura", country: "India" },

  // Manipur
  "795001": { pincode: "795001", locality: "Imphal", district: "Imphal West", state: "Manipur", country: "India" },

  // Meghalaya
  "793001": { pincode: "793001", locality: "Shillong", district: "East Khasi Hills", state: "Meghalaya", country: "India" },

  // Nagaland
  "797001": { pincode: "797001", locality: "Kohima", district: "Kohima", state: "Nagaland", country: "India" },
  "786002": { pincode: "786002", locality: "Dimapur", district: "Dimapur", state: "Nagaland", country: "India" },

  // Mizoram
  "796001": { pincode: "796001", locality: "Aizawl", district: "Aizawl", state: "Mizoram", country: "India" },

  // Arunachal Pradesh
  "791111": { pincode: "791111", locality: "Itanagar", district: "Papum Pare", state: "Arunachal Pradesh", country: "India" },

  // Sikkim
  "737101": { pincode: "737101", locality: "Gangtok", district: "East Sikkim", state: "Sikkim", country: "India" },

  // Ladakh
  "194101": { pincode: "194101", locality: "Leh", district: "Leh", state: "Ladakh", country: "India" },

  // Puducherry
  "605001": { pincode: "605001", locality: "Pondicherry", district: "Puducherry", state: "Puducherry", country: "India" },

  // Andaman & Nicobar
  "744101": { pincode: "744101", locality: "Port Blair", district: "South Andaman", state: "Andaman & Nicobar", country: "India" },

  // Dadra and Nagar Haveli
  "396230": { pincode: "396230", locality: "Silvassa", district: "Dadra & Nagar Haveli", state: "Dadra and Nagar Haveli", country: "India" },

  // Daman and Diu
  "396210": { pincode: "396210", locality: "Daman", district: "Daman", state: "Daman and Diu", country: "India" },
  "362520": { pincode: "362520", locality: "Diu", district: "Diu", state: "Daman and Diu", country: "India" },

  // Lakshadweep
  "682555": { pincode: "682555", locality: "Kavaratti", district: "Lakshadweep", state: "Lakshadweep", country: "India" },
};

export function lookupPincode(pincode: string): PincodeInfo | null {
  return pincodeDatabase[pincode] || null;
}

export async function lookupPincodeOnline(pincode: string): Promise<PincodeInfo | null> {
  // First check local database
  const local = pincodeDatabase[pincode];
  if (local) return local;

  // Fallback to India Post API
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
      const po = data[0].PostOffice[0];
      const info: PincodeInfo = {
        pincode,
        locality: po.Name || po.Block || "Unknown",
        district: po.District || "Unknown",
        state: po.State || "Unknown",
        country: "India",
      };
      // Cache it locally for this session
      pincodeDatabase[pincode] = info;
      return info;
    }
    return null;
  } catch {
    return null;
  }
}

export function searchPincodes(query: string): PincodeInfo[] {
  if (!query || query.length < 3) return [];
  const results: PincodeInfo[] = [];
  const q = query.toLowerCase();
  for (const [code, info] of Object.entries(pincodeDatabase)) {
    if (code.startsWith(query) || info.locality.toLowerCase().includes(q) || info.district.toLowerCase().includes(q)) {
      results.push(info);
      if (results.length >= 10) break;
    }
  }
  return results;
}

export default pincodeDatabase;
