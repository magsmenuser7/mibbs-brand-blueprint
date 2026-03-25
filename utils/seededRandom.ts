// Deterministic pseudo-random number generator based on a string seed
export function createSeededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  let state = Math.abs(hash) || 1;
  
  return () => {
    state = (state * 1664525 + 1013904223) & 0xffffffff;
    return (state >>> 0) / 0xffffffff;
  };
}

// Generate a stable seed string from questionnaire data
export function getDataSeed(data: { name?: string; businessName?: string; industry?: string; pincode?: string; monthlyRevenue?: string; startingBudget?: string }): string {
  return `${data.name || ''}-${data.businessName || ''}-${data.industry || ''}-${data.pincode || ''}-${data.monthlyRevenue || ''}-${data.startingBudget || ''}`;
}
