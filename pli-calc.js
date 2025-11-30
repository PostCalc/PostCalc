/* pli-calc.js - Precise Dak Sewa Logic (Rate-Specific) */
const PLI_Engine = {
    // Helper: Get the exact multiplier based on Rate
    getMultiplier: (rate, freq) => {
        if (freq === 1) return 1.0;

        // --- QUARTERLY (Freq 3) ---
        if (freq === 3) {
            if (rate <= 1.8) return 3.0;
            if (rate <= 4.0) return 2.995;
            return 2.9926;
        }

        // --- HALF-YEARLY (Freq 6) ---
        if (freq === 6) {
            if (rate <= 1.8) return 5.9111;
            if (rate <= 2.0) return 5.92;
            if (rate <= 2.6) return 5.915;
            if (rate <= 3.2) return 5.9125;
            if (rate <= 4.0) return 5.915;
            return 5.9111;
        }

        // --- YEARLY (Freq 12) ---
        if (freq === 12) {
            // Exact Factors derived from Age 19 & 20 Screenshots
            // Rate 1.8 (1800) -> 20960 (11.6444)
            if (rate <= 1.9) return 11.64445; 
            
            // Rate 2.0 (2000) -> 23300 (11.65)
            if (rate <= 2.2) return 11.65;
            
            // Rate 2.4 (2400) -> 27940 (11.64166) - Age 19 Fix
            if (rate <= 2.5) return 11.64167;

            // Rate 2.6 (2600) -> 30280 (11.646)
            if (rate <= 2.8) return 11.64616;

            // Rate 3.0 (3000) -> 34940 (11.6466) - Age 19 Fix
            if (rate <= 3.1) return 11.64667;

            // Rate 3.2 (3200) -> 37260 (11.64375)
            if (rate <= 3.5) return 11.64375;
            
            // Rate 3.8 (3800) -> 44240 (11.6421) - Age 19 Fix
            if (rate <= 3.9) return 11.64211;

            // Rate 4.0 (4000) -> 46580 (11.645)
            if (rate <= 4.5) return 11.645;

            // Rate 5.2 (5200) -> 60540 (11.6423) - Age 19 Fix
            if (rate <= 5.3) return 11.64231;
            
            // Rate 5.4 (5400) -> 62880 (11.6444)
            return 11.64445;
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
                        // 1. Base Monthly
                        let baseMonthly = (sa / 1000) * rate;
                        
                        // 2. Precise Multiplier
                        let multiplier = PLI_Engine.getMultiplier(rate, freqMode);
                        let freqPrem = Math.round(baseMonthly * multiplier);

                        // 3. Rebate (Monthly * Freq)
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
