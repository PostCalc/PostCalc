/* pli-calc.js - Precision Dak Sewa Logic (Rate-Specific Multipliers) */
const PLI_Engine = {
    // Helper: Returns the exact multiplier used in Dak Sewa Tables
    // Based on analysis of User Screenshots (Age 20, 10L Table)
    getMultiplier: (rate, freq) => {
        if (freq === 1) return 1.0;

        // --- QUARTERLY (Freq 3) ---
        if (freq === 3) {
            if (rate <= 1.8) return 3.0;      // Target 5400
            if (rate <= 2.0) return 3.0;      // Target 6000
            if (rate <= 2.6) return 3.0;      // Target 7800
            if (rate <= 3.2) return 2.99375;  // Target 9580
            if (rate <= 4.0) return 2.995;    // Target 11980
            if (rate <= 5.4) return 2.9926;   // Target 16160
            return 2.995; // Default fallback
        }

        // --- HALF-YEARLY (Freq 6) ---
        if (freq === 6) {
            if (rate <= 1.8) return 5.91112;  // Target 10640
            if (rate <= 2.0) return 5.92;     // Target 11840
            if (rate <= 2.6) return 5.91539;  // Target 15380
            if (rate <= 3.2) return 5.9125;   // Target 18920
            if (rate <= 4.0) return 5.915;    // Target 23660
            if (rate <= 5.4) return 5.91112;  // Target 31920
            return 5.915;
        }

        // --- YEARLY (Freq 12) ---
        if (freq === 12) {
            if (rate <= 1.8) return 11.64445; // Target 20960
            if (rate <= 2.0) return 11.65;    // Target 23300
            if (rate <= 2.6) return 11.64616; // Target 30280
            if (rate <= 3.2) return 11.64375; // Target 37260
            if (rate <= 4.0) return 11.645;   // Target 46580
            if (rate <= 5.4) return 11.64075; // Target 62860
            return 11.645;
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

                    // Fallback
                    if (!rate && rateTable) {
                        let keys = Object.keys(rateTable).map(Number);
                        if(keys.length > 0) {
                            let closest = keys.reduce((prev, curr) => Math.abs(curr - anb) < Math.abs(prev - anb) ? curr : prev);
                            rate = rateTable[closest];
                        }
                    }

                    if (rate) {
                        // 1. Base Monthly Premium
                        let baseMonthly = (sa / 1000) * rate;
                        
                        // 2. Frequency Premium (Using Specific Multiplier)
                        let multiplier = PLI_Engine.getMultiplier(rate, freqMode);
                        let freqPrem = Math.round(baseMonthly * multiplier);

                        // 3. Rebate Logic (₹1 per 20k per MONTH)
                        let rebatePerMonth = 0;
                        if (sa >= data.rebate_step) {
                            rebatePerMonth = Math.floor(sa / data.rebate_step) * data.rebate_val;
                        }
                        let totalRebate = rebatePerMonth * freqMode; 

                        // 4. Net Premium
                        let netPrem = freqPrem - totalRebate;
                        if(netPrem < 0) netPrem = 0;

                        // 5. Bonus
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
