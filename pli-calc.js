/* pli-calc.js - Derived from User Screenshots (1L Table) */
const PLI_Engine = {
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
                        // 1. BASE MONTHLY PREMIUM (Rate is per 1000)
                        let baseMonthly = (sa / 1000) * rate;
                        
                        /* --- EXACT MULTIPLIERS FROM YOUR SCREENSHOTS --- */
                        // Yearly: 2096 / 180 = 11.64444
                        // Half: 1064 / 180 = 5.91111
                        // Quart: 540 / 180 = 3.0
                        
                        let multiplier = 1;
                        if (freqMode === 12) multiplier = 11.64444444; 
                        else if (freqMode === 6) multiplier = 5.91111111;
                        else if (freqMode === 3) multiplier = 3.0;

                        // Calculate Frequency Premium & Round it
                        let freqPrem = Math.round(baseMonthly * multiplier);

                        /* --- REBATE LOGIC --- */
                        // Rebate is ₹1 per ₹20k per MONTH.
                        // Multiply monthly rebate by freqMode (e.g. 12 for yearly).
                        let rebatePerMonth = 0;
                        if (sa >= data.rebate_step) {
                            rebatePerMonth = Math.floor(sa / data.rebate_step) * data.rebate_val;
                        }
                        let totalRebate = rebatePerMonth * freqMode;

                        /* --- NET PREMIUM --- */
                        let netPrem = freqPrem - totalRebate;
                        if(netPrem < 0) netPrem = 0;

                        /* --- BONUS --- */
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
