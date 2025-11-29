/* pli-calc.js */
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

        if (anb < 19 || anb > 55) return { error: `Age ${anb} is not eligible (19-55).` };

        let tableRows = [];

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
                    let basePrem = (sa / 1000) * rate;
                    
                    // Frequency Calculation (Base * Frequency)
                    let freqPrem = basePrem * freqMode;

                    // Rebate Logic: ₹1 per ₹20k per MONTH (Scaled by Frequency)
                    let rebatePerMonth = 0;
                    if (sa >= data.rebate_step) {
                        rebatePerMonth = Math.floor(sa / data.rebate_step) * data.rebate_val;
                    }
                    let totalRebate = rebatePerMonth * freqMode;

                    let netPrem = freqPrem - totalRebate;
                    if(netPrem < 0) netPrem = 0;

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

        return { anb: anb, rows: tableRows, sa: sa };
    }
};
