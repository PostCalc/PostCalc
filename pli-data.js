/* pli-data.js */
// SOURCE: Official PLI/RPLI Version 8 Tables (Dated 22.09.2025)
// Rates are stored as: Premium per ₹1,000 Sum Assured

const PLI_DATA = {
    // === 1. PLI - SANTOSH (Endowment Assurance) ===
    'pli-ea': {
        name: "PLI - Santosh (Endowment)",
        [cite_start]bonus_rate: 52, // ₹52 per ₹1000 [cite: 3]
        rebate_step: 20000,
        rebate_val: 1,
        // Format: 'MaturityAge': { 'AgeNextBirthday': Rate }
        rates: {
            [cite_start]// MATURITY AGE 60 (From your 10 Lakh Chart) [cite: 5]
            60: {
                19: 1.75, 20: 1.75, 21: 1.80, 22: 1.85, 23: 1.90, 24: 1.95,
                25: 2.05, 26: 2.15, 27: 2.25, 28: 2.35, 29: 2.45, 30: 2.55,
                31: 2.65, 32: 2.75, 33: 2.85, 34: 3.00, 35: 3.15, 36: 3.35,
                37: 3.55, 38: 3.75, 39: 3.95, 40: 4.15, 41: 4.35, 42: 4.65,
                43: 4.95, 44: 5.35, 45: 5.75, 46: 6.15, 47: 6.75, 48: 7.35,
                49: 7.95, 50: 8.75, 51: 10.35, 52: 11.28, 53: 13.15, 54: 15.15, 55: 17.95
            },
            [cite_start]// MATURITY AGE 58 [cite: 5]
            58: {
                19: 1.75, 20: 1.85, 25: 2.15, 30: 2.75, 35: 3.45, 40: 4.55, 
                45: 6.55, 50: 10.95, 55: 29.00
            },
            [cite_start]// MATURITY AGE 55 [cite: 5]
            55: {
                19: 1.95, 20: 1.95, 25: 2.45, 30: 3.10, 35: 3.80, 40: 4.95, 
                45: 6.55, 50: 10.95
            },
            [cite_start]// MATURITY AGE 50 [cite: 5]
            50: {
                19: 2.35, 20: 2.55, 25: 3.15, 30: 3.95, 35: 5.45, 40: 8.55, 45: 17.35
            }
        }
    },

    // === 2. PLI - SURAKSHA (Whole Life) ===
    'pli-wla': {
        name: "PLI - Suraksha (Whole Life)",
        bonus_rate: 76, 
        rebate_step: 20000,
        rebate_val: 1,
        rates: {
            // Standard WLA Rates (Mat 80)
            80: { 19: 1.35, 20: 1.40, 25: 1.65, 30: 2.15, 35: 2.65, 40: 3.55, 45: 4.95, 50: 7.25 }
        }
    },

    // === 3. RPLI - GRAM SANTOSH (Endowment Assurance) ===
    'rpli-ea': {
        name: "RPLI - Gram Santosh",
        [cite_start]bonus_rate: 48, // ₹48 per ₹1000 [cite: 4]
        rebate_step: 20000,
        rebate_val: 1,
        rates: {
            [cite_start]// MATURITY AGE 60 (From your 1 Lakh Chart) [cite: 4]
            60: {
                19: 1.70, 20: 1.75, 21: 1.80, 22: 1.85, 23: 1.90, 24: 1.95,
                25: 2.05, 26: 2.15, 27: 2.25, 28: 2.35, 29: 2.45, 30: 2.55,
                31: 2.65, 32: 2.75, 33: 2.85, 34: 3.00, 35: 3.15, 36: 3.30,
                37: 3.50, 38: 3.70, 39: 3.90, 40: 4.15, 45: 5.70, 50: 8.80
            }
        }
    },
    
    // === 4. RPLI - GRAM SURAKSHA (Whole Life) ===
    'rpli-wla': {
        name: "RPLI - Gram Suraksha",
        bonus_rate: 60,
        rebate_step: 20000,
        rebate_val: 1,
        rates: {
            80: { 19: 1.45, 20: 1.50, 25: 1.80, 30: 2.25, 35: 2.80, 40: 3.65, 45: 5.00 }
        }
    }
};
