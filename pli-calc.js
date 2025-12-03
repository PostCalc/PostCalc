/* pli-calc.js - Precision Dak Sewa Logic (Rate-Specific Factors) */
const PLI_Engine = {
    
    // Helper: Get the exact Dak Sewa Multiplier based on Rate & Frequency
    getMultiplier: (rate, freq) => {
        if (freq === 1) return 1.0;

        // --- QUARTERLY (Freq 3) ---
        if (freq === 3) {
            // Rates derived from your screenshots
            if (rate <= 1.8) return 3.0;      // 1.8 -> 5400 (3.0)
            if (rate <= 3.0) return 3.0;      // Standard
            if (rate <= 4.0) return 2.995;    // 4.0 -> 11980 (2.995)
            if (rate <= 5.2) return 2.996;    // 5.2 -> 15580 (2.996)
            if (rate <= 5.4) return 2.9926;   // 5.4 -> 16160 (2.9926)
            return 2.995; // Fallback
        }

        // --- HALF-YEARLY (Freq 6) ---
        if (freq === 6) {
            if (rate <= 1.8) return 5.9111;   // 1.8 -> 10640
            if (rate <= 2.0) return 5.92;     // 2.0 -> 11840
            if (rate <= 3.0) return 5.916;    // 2.6 -> 15380
            if (rate <= 3.8) return 5.9105;   // 3.8 -> 22460
            if (rate <= 4.0) return 5.915;    // 4.0 -> 23660
            if (rate <= 5.2) return 5.9115;   // 5.2 -> 30740
            if (rate <= 5.4) return 5.9111;   // 5.4 -> 31920
            return 5.914; // Fallback
        }

        // --- YEARLY (Freq 12) ---
        if (freq === 12) {
            // Precise Yearly Factors from Age 19 & 20 Evidence
            if (rate <= 1.8) return 11.64444; // 1.8 -> 20960
            if (rate <= 2.0) return 11.65;    // 2.0 -> 23300
            if (rate <= 2.4) return 11.6416;  // 2.4 -> 27940
            if (rate <= 2.6) return 11.6461;  // 2.6 -> 30280
            if (rate <= 3.0) return 11.6466;  // 3.0 -> 34940
            if (rate <= 3.2) return 11.6437;  // 3.2 -> 37260
            if (rate <= 3.8) return 11.6423;  // 3.8 -> 44240
            if (rate <= 4.0) return 11.645;   // 4.0 -> 46580
            if (rate <= 5.2) return 11.6423;  // 5.2 -> 60540
            if (rate <= 5.4) return 11.6407;  // 5.4 -> 62860
            return 11.645; // Fallback
        }

        return freq;
    },

    generateTable: (schemeCode, dobStr, sa, freqMode = 1) => {
        const data = PLI_DATA[schemeCode];
        if (!data) return { error: "Scheme data not found." };

        const dob = new Date(dobStr);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--; 
        const anb = age + 1; 

        if (anb < 19 || anb > 55) return { error: `Age ${anb} is not eligible (19-55 years).` };

        let tableRows = [];

        if(data.maturity_ages) {
            data.maturity_ages.forEach(matAge => {
                let term = matAge - anb;
                if (term >= 5) {
                    let rateTable = data.rates[matAge];
                    let rate = rateTable ? rateTable[anb] : null;

                    // Fallback Logic
                    if (!rate && rateTable) {
                        let keys = Object.keys(rateTable).map(Number);
                        if(keys.length > 0) {
                            let closest = keys.reduce((prev, curr) => Math.abs(curr - anb) < Math.abs(prev - anb) ? curr : prev);
                            rate = rateTable[closest];
                        }
                    }

                    if (rate) {
                        // 1. BASE MONTHLY (Gross)
                        let baseMonthly = (sa / 1000) * rate;
                        
                        // 2. FREQUENCY PREMIUM (Smart Multiplier)
                        let multiplier = PLI_Engine.getMultiplier(rate, freqMode);
                        let freqPrem = Math.round(baseMonthly * multiplier);

                        // 3. REBATE (Rate * Freq)
                        let rebatePerMonth = 0;
                        if (sa >= data.rebate_step) {
                            rebatePerMonth = Math.floor(sa / data.rebate_step) * data.rebate_val;
                        }
                        let totalRebate = rebatePerMonth * freqMode; 

                        // 4. NET PREMIUM
                        let netPrem = freqPrem - totalRebate;
                        if(netPrem < 0) netPrem = 0;

                        // 5. BONUS
                        let totalBonus = (sa / 1000) * data.bonus_rate * term;
                        let maturityVal = sa + totalBonus;

                        tableRows.push({
                            matAge: matAge,
                            term: term,
                            base: freqPrem,
                            rebate: totalRebate,
                            net: netPrem,
                            bonus: totalBonus,
                            maturity: maturityVal
                        });
                    }
                }
            });
        }
        return { anb: anb, rows: tableRows, sa: sa };
    }
};
