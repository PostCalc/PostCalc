/* =========================================
   PART 1: CONFIGURATION, RULES & ENGINES
   ========================================= */

/* --- 1. SCHEME DATA --- */
const SCHEMES = {
    'sb': { name: "Savings Account", rate: 4.0, min: 500, tenure: 1 },
    'rd': { name: "Recurring Deposit", rate: 6.7, min: 100, tenure: 5 },
    'mis': { name: "Monthly Income Scheme", rate: 7.4, min: 1000, max: 900000, jointMax: 1500000, tenure: 5 },
    'scss': { name: "Senior Citizen Savings", rate: 8.2, min: 1000, max: 3000000, tenure: 5 },
    'ppf': { name: "Public Provident Fund", rate: 7.1, min: 500, max: 150000, tenure: 15 },
    'ssa': { name: "Sukanya Samriddhi", rate: 8.2, min: 250, max: 150000, tenure: 21 },
    'nsc': { name: "NSC (VIII Issue)", rate: 7.7, min: 1000, tenure: 5 },
    'kvp': { name: "Kisan Vikas Patra", rate: 7.5, min: 1000, tenure: 9.58 },
    'td': { name: "Time Deposit", rate: 7.5, rates: {1:6.9, 2:7.0, 3:7.1, 5:7.5}, min: 1000, tenure: 5 }
};

/* --- 2. RICH INFO CONTENT (Restored Full Details) --- */
const SCHEME_RULES = {
    'sb': `
        <div class="info-section-title">Overview</div>
        <table class="info-table">
            <tr><th>Interest Rate</th><td>4.0% per annum</td></tr>
            <tr><th>Tenure</th><td>Continuing Account</td></tr>
            <tr><th>Eligibility</th><td>Resident Individual (Single/Joint)</td></tr>
            <tr><th>Min Deposit</th><td>₹500</td></tr>
            <tr><th>Max Deposit</th><td>No Limit</td></tr>
        </table>
        <div class="info-section-title">Calculation & Rules</div>
        <table class="info-table">
            <tr><th>Compounding</th><td>Simple Interest (Paid Annually)</td></tr>
            <tr><th>Calc Date</th><td>Lowest balance between <b>10th & Last Day</b></td></tr>
            <tr><th>Critical Rule</th><td>Deposit by the <b>10th</b> to earn interest for that month.</td></tr>
            <tr><th>Penalty</th><td>₹50 deducted if balance < ₹500</td></tr>
        </table>
        <div class="info-section-title">Tax & Loan</div>
        <table class="info-table">
            <tr><th>Tax</th><td>Exempt up to ₹10,000 (u/s 80TTA)</td></tr>
            <tr><th>Loan Facility</th><td>Not Available</td></tr>
        </table>`,

    'rd': `
        <div class="info-section-title">Overview</div>
        <table class="info-table">
            <tr><th>Interest Rate</th><td>6.7% per annum</td></tr>
            <tr><th>Tenure</th><td>5 Years (Extendable)</td></tr>
            <tr><th>Eligibility</th><td>Resident Individual</td></tr>
            <tr><th>Min Deposit</th><td>₹100 per month</td></tr>
            <tr><th>Max Deposit</th><td>No Limit</td></tr>
        </table>
        <div class="info-section-title">Calculation & Rules</div>
        <table class="info-table">
            <tr><th>Compounding</th><td><b>Quarterly Compounding</b></td></tr>
            <tr><th>Calc Rule</th><td>Deposit by 15th (if opened 1st-15th) or Last Day</td></tr>
            <tr><th>Trick / Hack</th><td>Pay 6-12 months in advance to earn a <b>Rebate</b>.</td></tr>
            <tr><th>Penalty</th><td>₹1 per ₹100 for missed installment</td></tr>
        </table>
        <div class="info-section-title">Tax & Loan</div>
        <table class="info-table">
            <tr><th>Tax</th><td>Interest is Taxable. No TDS.</td></tr>
            <tr><th>Loan Facility</th><td>Available after 1 Year (50% of balance)</td></tr>
        </table>`,

    'ssa': `
        <div class="info-section-title">Overview</div>
        <table class="info-table">
            <tr><th>Interest Rate</th><td>8.2% per annum</td></tr>
            <tr><th>Tenure</th><td>21 Years (Deposit for 15 Yrs)</td></tr>
            <tr><th>Eligibility</th><td>Girl Child (Below 10 Years)</td></tr>
            <tr><th>Min Deposit</th><td>₹250 per year</td></tr>
            <tr><th>Max Deposit</th><td>₹1.5 Lakh per year</td></tr>
        </table>
        <div class="info-section-title">Calculation & Rules</div>
        <table class="info-table">
            <tr><th>Compounding</th><td>Yearly Compounding</td></tr>
            <tr><th>Calc Date</th><td>Lowest balance between <b>5th & Last Day</b></td></tr>
            <tr><th>Critical Rule</th><td>Deposit by <b>5th</b> to earn interest for that month.</td></tr>
            <tr><th>Penalty</th><td>₹50 per year for default</td></tr>
        </table>
        <div class="info-section-title">Tax & Loan</div>
        <table class="info-table">
            <tr><th>Tax</th><td><b>EEE:</b> Exempt-Exempt-Exempt (Tax Free)</td></tr>
            <tr><th>Loan Facility</th><td>No Loan. Partial withdrawal after age 18.</td></tr>
        </table>`,

    'ppf': `
        <div class="info-section-title">Overview</div>
        <table class="info-table">
            <tr><th>Interest Rate</th><td>7.1% per annum</td></tr>
            <tr><th>Tenure</th><td>15 Years</td></tr>
            <tr><th>Eligibility</th><td>Resident Individual</td></tr>
            <tr><th>Min Deposit</th><td>₹500 per year</td></tr>
            <tr><th>Max Deposit</th><td>₹1.5 Lakh per year</td></tr>
        </table>
        <div class="info-section-title">Calculation & Rules</div>
        <table class="info-table">
            <tr><th>Compounding</th><td>Yearly Compounding</td></tr>
            <tr><th>Calc Date</th><td>Lowest balance between <b>5th & Last Day</b></td></tr>
            <tr><th>Trick / Hack</th><td>Deposit lumpsum by <b>April 5th</b> for max return.</td></tr>
            <tr><th>Penalty</th><td>₹50 per year for default</td></tr>
        </table>
        <div class="info-section-title">Tax & Loan</div>
        <table class="info-table">
            <tr><th>Tax</th><td><b>EEE:</b> Completely Tax Free (80C)</td></tr>
            <tr><th>Loan Facility</th><td>Available from 3rd to 6th Financial Year</td></tr>
        </table>`,

    'mis': `
        <div class="info-section-title">Overview</div>
        <table class="info-table">
            <tr><th>Interest Rate</th><td>7.4% per annum</td></tr>
            <tr><th>Tenure</th><td>5 Years</td></tr>
            <tr><th>Eligibility</th><td>Resident Individual</td></tr>
            <tr><th>Min Deposit</th><td>₹1,000</td></tr>
            <tr><th>Max Deposit</th><td>₹9L (Single) / ₹15L (Joint)</td></tr>
        </table>
        <div class="info-section-title">Calculation & Rules</div>
        <table class="info-table">
            <tr><th>Compounding</th><td>Simple Interest (Paid Monthly)</td></tr>
            <tr><th>Pay Details</th><td>Auto-credit to Savings Account</td></tr>
            <tr><th>Trick / Hack</th><td>Link to SB to earn 4% on idle interest.</td></tr>
            <tr><th>Penalty</th><td>2% (1-3 yrs), 1% (3-5 yrs) on closure.</td></tr>
        </table>
        <div class="info-section-title">Tax & Loan</div>
        <table class="info-table">
            <tr><th>Tax</th><td>Interest is Taxable.</td></tr>
            <tr><th>Loan Facility</th><td>Not Available</td></tr>
        </table>`,

    'td': `
        <div class="info-section-title">Overview</div>
        <table class="info-table">
            <tr><th>Interest Rate</th><td>1Y:6.9%, 2Y:7.0%, 3Y:7.1%, 5Y:7.5%</td></tr>
            <tr><th>Tenure</th><td>1, 2, 3, or 5 Years</td></tr>
            <tr><th>Eligibility</th><td>Resident Individual</td></tr>
            <tr><th>Min Deposit</th><td>₹1,000</td></tr>
            <tr><th>Max Deposit</th><td>No Limit</td></tr>
        </table>
        <div class="info-section-title">Calculation & Rules</div>
        <table class="info-table">
            <tr><th>Compounding</th><td><b>Quarterly</b></td></tr>
            <tr><th>Pay Details</th><td>Calculated quarterly, <b>Paid Annually</b>.</td></tr>
            <tr><th>Trick / Hack</th><td>5-Year TD gives 80C Tax Benefit.</td></tr>
            <tr><th>Penalty</th><td>Interest reduced to SB rate if closed early.</td></tr>
        </table>
        <div class="info-section-title">Tax & Loan</div>
        <table class="info-table">
            <tr><th>Tax</th><td>Taxable. 5Y TD Principal is 80C deductible.</td></tr>
            <tr><th>Loan Facility</th><td><b>Yes</b> (Can be pledged)</td></tr>
        </table>`,

    'scss': `
        <div class="info-section-title">Overview</div>
        <table class="info-table">
            <tr><th>Interest Rate</th><td>8.2% per annum</td></tr>
            <tr><th>Tenure</th><td>5 Years</td></tr>
            <tr><th>Eligibility</th><td>Age 60+ (55+ for VRS)</td></tr>
            <tr><th>Min Deposit</th><td>₹1,000</td></tr>
            <tr><th>Max Deposit</th><td>₹30 Lakh</td></tr>
        </table>
        <div class="info-section-title">Calculation & Rules</div>
        <table class="info-table">
            <tr><th>Compounding</th><td>Simple Interest (Paid Quarterly)</td></tr>
            <tr><th>Pay Details</th><td>Paid April 1, July 1, Oct 1, Jan 1</td></tr>
            <tr><th>Trick / Hack</th><td>Reinvest quarterly payout into RD.</td></tr>
            <tr><th>Penalty</th><td>1.5% (1-2 yrs), 1% (>2 yrs) deduction.</td></tr>
        </table>
        <div class="info-section-title">Tax & Loan</div>
        <table class="info-table">
            <tr><th>Tax</th><td>Taxable (TDS if interest > ₹50k/yr).</td></tr>
            <tr><th>Loan Facility</th><td>Not Available</td></tr>
        </table>`,

    'nsc': `
        <div class="info-section-title">Overview</div>
        <table class="info-table">
            <tr><th>Interest Rate</th><td>7.7% per annum</td></tr>
            <tr><th>Tenure</th><td>5 Years</td></tr>
            <tr><th>Eligibility</th><td>Resident Individual</td></tr>
            <tr><th>Min Deposit</th><td>₹1,000</td></tr>
            <tr><th>Max Deposit</th><td>No Limit</td></tr>
        </table>
        <div class="info-section-title">Calculation & Rules</div>
        <table class="info-table">
            <tr><th>Compounding</th><td>Annually</td></tr>
            <tr><th>Pay Details</th><td>Paid at Maturity (Deemed Reinvested)</td></tr>
            <tr><th>Rule</th><td>Interest is added back to principal yearly.</td></tr>
            <tr><th>Penalty</th><td>Premature closure only in specific cases.</td></tr>
        </table>
        <div class="info-section-title">Tax & Loan</div>
        <table class="info-table">
            <tr><th>Tax</th><td>Interest deemed reinvested (80C eligible).</td></tr>
            <tr><th>Loan Facility</th><td><b>Yes</b> (Can be pledged to banks)</td></tr>
        </table>`,

    'kvp': `
        <div class="info-section-title">Overview</div>
        <table class="info-table">
            <tr><th>Interest Rate</th><td>7.5% per annum</td></tr>
            <tr><th>Tenure</th><td>115 Months (9 Years 7 Months)</td></tr>
            <tr><th>Eligibility</th><td>Resident Individual</td></tr>
            <tr><th>Min Deposit</th><td>₹1,000</td></tr>
            <tr><th>Max Deposit</th><td>No Limit</td></tr>
        </table>
        <div class="info-section-title">Calculation & Rules</div>
        <table class="info-table">
            <tr><th>Compounding</th><td>Annually</td></tr>
            <tr><th>Pay Details</th><td>Doubles your money at maturity</td></tr>
            <tr><th>Rule</th><td>Fixed tenure based on interest rate.</td></tr>
            <tr><th>Penalty</th><td>Lock-in period of 2.5 Years.</td></tr>
        </table>
        <div class="info-section-title">Tax & Loan</div>
        <table class="info-table">
            <tr><th>Tax</th><td>Fully Taxable. No 80C benefit.</td></tr>
            <tr><th>Loan Facility</th><td><b>Yes</b> (Can be pledged to banks)</td></tr>
        </table>`
};

/* --- 3. NUMBER TO WORDS UTILITY --- */
function numToWord(val, divId) {
    const div = document.getElementById(divId); if (!div) return;
    let n = parseInt(val);
    if (!n || n === 0) { div.innerText = ""; return; }
    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    function convert(num) {
        if (num < 10) return units[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + units[num % 10] : "");
        if (num < 1000) return units[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + convert(num % 100) : "");
        return "";
    }
    let str = "";
    if (n >= 10000000) { str += convert(Math.floor(n / 10000000)) + " Crore "; n %= 10000000; }
    if (n >= 100000) { str += convert(Math.floor(n / 100000)) + " Lakh "; n %= 100000; }
    if (n >= 1000) { str += convert(Math.floor(n / 1000)) + " Thousand "; n %= 1000; }
    if (n > 0) { str += convert(n); }
    div.innerText = str + " Rupees Only";
}

/* --- 4. MATH ENGINES (Standard) --- */
const Engines = {
    calcSB: (p, r, d) => {
        let yrs = parseInt(document.getElementById('sbTenure').value) || 1;
        let rows = []; let bal = p; let startMonth = (d.getDate() > 10) ? 1 : 0; 
        let matDate = new Date(d); matDate.setFullYear(d.getFullYear() + yrs);
        for (let i = 1; i <= yrs; i++) {
            let int = 0;
            if (i === 1 && startMonth === 1) int = Math.round(bal * (r/100) * (11/12)); else int = Math.round(bal * (r/100));
            let op = bal; bal += int; rows.push({ lbl: `Year ${i}`, op: op, dep: 0, int: int, cl: bal });
        }
        return { dep: p, int: bal - p, mat: bal, date: matDate, rows: rows, type: 'compound' };
    },
    calcTD: (p, r, t, d) => {
        let ratePerQ = r / 400; let amtAfter1Year = p * Math.pow(1 + ratePerQ, 4); let annualPay = Math.round(amtAfter1Year - p);
        let matDate = new Date(d); matDate.setFullYear(d.getFullYear() + t); let rows = [];
        for(let i=1; i<=t; i++) rows.push({ lbl: `Year ${i}`, op: p, dep: 0, int: annualPay, cl: p });
        return { dep: p, int: annualPay * t, mat: p, payout: annualPay, date: matDate, rows: rows, type: 'payout', freq: ' / year' };
    },
    calcPayout: (p, r, yrs, freq, d) => {
        let pay = Math.round((p * r / 100) / freq); let matDate = new Date(d); matDate.setFullYear(d.getFullYear() + yrs); let rows = [];
        for (let i = 1; i <= yrs; i++) rows.push({ lbl: `Year ${i}`, op: p, dep: 0, int: pay * freq, cl: p });
        let freqLabel = (freq === 12) ? ' / month' : ' / quarter';
        return { dep: p, int: pay * freq * yrs, mat: p, payout: pay, date: matDate, rows: rows, type: 'payout', freq: freqLabel };
    },
    calcPPF_SSA: (p, r, d, type, mode) => {
        let bal = 0, totDep = 0; let rows = []; let matDate = new Date(d); let depEndDate = new Date(d);
        if (type === 'ppf') { let fyEndMonth = d.getMonth() > 2 ? d.getFullYear() + 1 : d.getFullYear(); matDate = new Date(fyEndMonth + 15, 2, 31); depEndDate = matDate; } 
        else { matDate.setFullYear(d.getFullYear() + 21); depEndDate = new Date(d); depEndDate.setFullYear(d.getFullYear() + 15); }
        let curr = new Date(d); curr.setDate(1); let yrData = { op: 0, dep: 0, int: 0, cl: 0 }; let accInt = 0; let openDay = d.getDate();
        while (curr < matDate) {
            let m = curr.getMonth(); let y = curr.getFullYear(); let monDep = 0;
            if (curr < depEndDate) {
                if (mode === 'monthly') monDep = p;
                else if (mode === 'annual') { if (m === 3 || (y === d.getFullYear() && m === d.getMonth())) monDep = p; }
            }
            bal += monDep; totDep += monDep; yrData.dep += monDep;
            let qualifyingBal = bal; let isFirstMonth = (curr.getMonth() === d.getMonth() && curr.getFullYear() === d.getFullYear());
            if (isFirstMonth && openDay > 5 && monDep > 0) qualifyingBal = bal - monDep;
            let int = (qualifyingBal * r) / 1200; accInt += int;
            if (m === 2 || (curr.getTime() + 2600000000 > matDate.getTime())) {
                let credit = Math.round(accInt); bal += credit; yrData.int = credit; yrData.cl = bal; 
                if (yrData.dep > 0 || yrData.int > 0) rows.push({ lbl: `FY ${y}-${y+1}`, op: yrData.op, dep: yrData.dep, int: yrData.int, cl: yrData.cl });
                yrData = { op: bal, dep: 0, int: 0, cl: 0 }; accInt = 0;
            }
            curr.setMonth(curr.getMonth() + 1);
        }
        return { dep: totDep, int: bal - totDep, mat: bal, date: matDate, rows: rows, type: 'compound' };
    },
    calcRD: (p, r, d) => {
        let rows = [], bal = 0, bucket = 0, totDep = 0; let yrOp = 0, yrDep = 0; let matDate = new Date(d); matDate.setFullYear(d.getFullYear() + 5);
        for (let i = 1; i <= 60; i++) {
            bal += p; totDep += p; yrDep += p; bucket += (bal * r) / 1200;
            if (i % 3 === 0) { bal += bucket; bucket = 0; }
            if (i % 12 === 0) { rows.push({ lbl: `Year ${i/12}`, op: yrOp, dep: yrDep, int: Math.round(bal - yrOp - yrDep), cl: Math.round(bal) }); yrOp = Math.round(bal); yrDep = 0; }
        }
        return { dep: totDep, int: Math.round(bal) - totDep, mat: Math.round(bal), date: matDate, rows: rows, type: 'compound' };
    },
    calcNSC: (p, r, d) => {
        let matDate = new Date(d); matDate.setFullYear(d.getFullYear() + 5); let rows = [], bal = p;
        for(let i=1; i<=5; i++) { let int = Math.round(bal * r / 100); rows.push({ lbl: `Year ${i}`, op: Math.round(bal), dep: 0, int: int, cl: Math.round(bal+int) }); bal += int; }
        return { dep: p, int: Math.round(bal)-p, mat: Math.round(bal), date: matDate, rows: rows, type: 'compound' };
    },
    calcKVP: (p, r, d) => {
        let matDate = new Date(d); matDate.setMonth(d.getMonth() + 115);
        return { dep: p, int: p, mat: p*2, date: matDate, rows: [{lbl:'Maturity (115 Mo)', op:p, dep:0, int:p, cl:p*2}], type: 'compound' };
    }
};
/* =========================================
   PART 2: UI CONTROLLER, CALCULATOR & EXPORT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Auto-set Date
    const d = new Date();
    if(document.getElementById('dateOpen')) document.getElementById('dateOpen').valueAsDate = d;
    if(document.getElementById('printDate')) document.getElementById('printDate').innerText += d.toLocaleDateString();

    // 2. Event Listeners
    document.getElementById('schemeSelector').addEventListener('change', (e) => { 
        toggleInputs(); 
        updateInfoContent(e.target.value); 
    });
    
    document.getElementById('btnCalculate').addEventListener('click', handleCalculate);
    
    // Info Modal Listeners
    document.getElementById('btnInfo').addEventListener('click', openModal);
    document.getElementById('closeInfo').addEventListener('click', closeModal);
    document.getElementById('infoModal').addEventListener('click', (e) => { 
        if(e.target.id === 'infoModal') closeModal(); 
    });
    
    // Share Button Listener
    document.getElementById('btnShare').addEventListener('click', captureAndShare);
});

/* --- UI HELPERS --- */
function openModal() { 
    const s = document.getElementById('schemeSelector').value; 
    updateInfoContent(s); 
    document.getElementById('infoModal').classList.add('show'); 
}

function closeModal() { 
    document.getElementById('infoModal').classList.remove('show'); 
}

function updateInfoContent(scheme) {
    const container = document.getElementById('ruleContent');
    // Loads the rich HTML content from Part 1
    container.innerHTML = (scheme && SCHEME_RULES[scheme]) ? SCHEME_RULES[scheme] : "<p style='text-align:center; color:#666; padding:20px;'>Please select a scheme to view its official rules.</p>";
}

function toggleInputs() {
    const s = document.getElementById('schemeSelector').value; 
    if (!s) return;
    
    // Hide all first
    document.querySelectorAll('.input-group').forEach(el => el.classList.add('hidden'));
    document.getElementById('resultsCard').classList.add('hidden');
    
    // Show Input Card & Info Button
    document.getElementById('inputCard').classList.remove('hidden');
    document.getElementById('btnInfo').classList.remove('hidden');

    // Update Print Header Name
    if(SCHEMES[s]) document.getElementById('printSchemeName').innerText = SCHEMES[s].name;
    
    // Show Specific Inputs
    if (s === 'ssa') unhide('input-ssa'); 
    else if (s === 'ppf') unhide('input-ppf'); 
    else if (s === 'td') unhide('input-td'); 
    else if (document.getElementById('input-'+s)) unhide('input-'+s);
}

function unhide(id) { document.getElementById(id).classList.remove('hidden'); }

/* --- MODE TOGGLES (SSA, PPF, MIS) --- */
function setSSAMode(mode) {
    document.querySelectorAll('#input-ssa .toggle-btn').forEach(btn => btn.classList.remove('active')); 
    event.target.classList.add('active');
    document.getElementById('input-ssa').dataset.mode = mode;
    if (mode === 'annual') { 
        unhide('ssa-annual-inputs'); 
        document.getElementById('ssa-monthly-inputs').classList.add('hidden'); 
    } else { 
        unhide('ssa-monthly-inputs'); 
        document.getElementById('ssa-annual-inputs').classList.add('hidden'); 
    }
}

function setPPFMode(mode) {
    document.querySelectorAll('#input-ppf .toggle-btn').forEach(btn => btn.classList.remove('active')); 
    event.target.classList.add('active');
    document.getElementById('input-ppf').dataset.mode = mode;
    if (mode === 'annual') { 
        unhide('ppf-annual-inputs'); 
        document.getElementById('ppf-monthly-inputs').classList.add('hidden'); 
    } else { 
        unhide('ppf-monthly-inputs'); 
        document.getElementById('ppf-annual-inputs').classList.add('hidden'); 
    }
}

function setMISMode(type) {
    document.querySelectorAll('#input-mis .toggle-btn').forEach(btn => btn.classList.remove('active')); 
    event.target.classList.add('active');
    document.getElementById('input-mis').dataset.type = type;
}

/* --- MAIN CALCULATOR HANDLER --- */
function handleCalculate() {
    const s = document.getElementById('schemeSelector').value;
    const dStr = document.getElementById('dateOpen').value;
    const d = dStr ? new Date(dStr) : new Date();
    const conf = SCHEMES[s];
    
    hideWarn(); 
    let p = 0; 
    let mode = 'annual'; // Default for PPF/SSA

    // 1. GET PRINCIPAL AMOUNT BASED ON SCHEME
    if (s === 'ssa') {
        mode = document.getElementById('input-ssa').dataset.mode || 'annual';
        p = (mode === 'annual') ? getVal('ssaDepositAnnual') : getVal('ssaDepositMonthly');
        if (getVal('ssaAge') > 10) return showWarn("Girl's age must be 10 or less.");
    } 
    else if (s === 'ppf') {
        mode = document.getElementById('input-ppf').dataset.mode || 'annual';
        p = (mode === 'annual') ? getVal('ppfDepositAnnual') : getVal('ppfDepositMonthly');
    }
    else if (s === 'td') {
        p = getVal('tdDeposit');
    }
    else if (s === 'mis') {
        p = getVal('misDeposit');
        const type = document.getElementById('input-mis').dataset.type || 'single';
        const limit = (type === 'single') ? 900000 : 1500000;
        if (p > limit) return showWarn(`Maximum limit for ${type} account is ₹${limit}`);
    }
    else { 
        // Generic fallback (SB, RD, SCSS, NSC, KVP)
        let id = s + 'Deposit';
        p = document.getElementById(id) ? getVal(id) : getVal('rdDeposit'); 
    }

    // 2. VALIDATION
    if (p < conf.min) return showWarn(`Minimum deposit is ₹${conf.min}`);
    if (s !== 'mis' && conf.max && p > conf.max) return showWarn(`Maximum limit is ₹${conf.max}`);

    // 3. EXECUTE MATH ENGINE
    let res = null;
    
    if (s === 'sb') res = Engines.calcSB(p, conf.rate, d);
    else if (s === 'ppf') res = Engines.calcPPF_SSA(p, conf.rate, d, 'ppf', mode);
    else if (s === 'ssa') res = Engines.calcPPF_SSA(p, conf.rate, d, 'ssa', mode);
    else if (s === 'rd') res = Engines.calcRD(p, conf.rate, d);
    else if (s === 'mis') res = Engines.calcPayout(p, conf.rate, 5, 12, d);
    else if (s === 'scss') res = Engines.calcPayout(p, conf.rate, 5, 4, d);
    else if (s === 'td') {
        let t = parseInt(document.getElementById('tdTenure').value);
        res = Engines.calcTD(p, conf.rates[t], t, d);
    }
    else if (s === 'nsc') res = Engines.calcNSC(p, conf.rate, d);
    else if (s === 'kvp') res = Engines.calcKVP(p, conf.rate, d);
    
    renderSimple(res);
}

/* --- RENDER RESULTS --- */
function renderSimple(data) {
    document.getElementById('resTotalDep').innerText = fmt(data.dep);
    document.getElementById('resTotalInt').innerText = fmt(data.int);
    document.getElementById('resMaturity').innerText = fmt(data.mat);
    
    if (data.date) {
        document.getElementById('resMatDate').innerText = data.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    // Handle Payout Label (Monthly/Yearly/Quarterly)
    if (data.payout) {
        document.getElementById('rowPayout').classList.remove('hidden');
        document.getElementById('resPayout').innerText = fmt(data.payout) + (data.freq || '');
    } else {
        document.getElementById('rowPayout').classList.add('hidden');
    }

    // Generate Table Header
    const head = document.getElementById('resHead');
    if (data.type === 'payout') {
        head.innerHTML = `<tr><th>Year</th><th>Invested</th><th>Interest Payout</th><th>Balance</th></tr>`;
    } else {
        head.innerHTML = `<tr><th>Period</th><th>Opening</th><th>Deposit</th><th>Interest</th><th>Closing</th></tr>`;
    }

    // Generate Table Rows
    document.getElementById('resBody').innerHTML = data.rows.map(r => {
        if(data.type === 'payout') {
            return `<tr><td>${r.lbl}</td><td>${fmt(r.op)}</td><td>${fmt(r.int)}</td><td>${fmt(r.cl)}</td></tr>`;
        }
        return `<tr><td>${r.lbl}</td><td>${fmt(r.op)}</td><td>${fmt(r.dep)}</td><td>${fmt(r.int)}</td><td>${fmt(r.cl)}</td></tr>`;
    }).join('');

    // Show Card & Scroll
    document.getElementById('resultsCard').classList.remove('hidden');
    document.getElementById('resultsCard').scrollIntoView({behavior:'smooth'});
}

/* --- 🚀 SMART SHARE & SAVE LOGIC (Virtual A4) --- */
function captureAndShare() {
    const btn = document.getElementById('btnShare');
    const originalText = btn.innerText;
    
    // 1. UI Feedback
    btn.innerText = "⏳ Processing..."; 
    btn.disabled = true;

    // 2. Create Virtual A4 Page (To ensure perfect layout & table visibility)
    const source = document.getElementById('resultsCard');
    const clone = source.cloneNode(true);
    
    // Hide buttons in the image
    if(clone.querySelector('.download-actions')) {
        clone.querySelector('.download-actions').style.display = 'none';
    }

    // Set A4 Dimensions (Standard 794px width @ 96 DPI)
    clone.style.width = '794px'; 
    clone.style.minHeight = '1123px';
    clone.style.padding = '40px';
    clone.style.background = 'white';
    clone.style.position = 'fixed'; 
    clone.style.top = '0'; 
    clone.style.left = '0';
    clone.style.zIndex = '-100'; // Hide behind app
    
    // FORCE TABLE EXPANSION (Fixes 'Cut-off' issue)
    const tableWrap = clone.querySelector('.table-wrapper');
    if(tableWrap) { 
        tableWrap.style.overflow = 'visible'; 
        tableWrap.style.border = 'none'; 
    }
    const table = clone.querySelector('table');
    if(table) table.style.width = '100%';
    
    // 🔥 CRITICAL FIX: PREVENT WRAPPING IN COLUMNS (For SSA/PPF Dates)
    clone.querySelectorAll('th, td').forEach(cell => {
        cell.style.whiteSpace = 'nowrap';
    });

    document.body.appendChild(clone);

    // 3. Capture
    html2canvas(clone, { 
        scale: 2, 
        useCORS: true, 
        scrollY: -window.scrollY // Fixes scroll offset bugs
    }).then(async canvas => {
        document.body.removeChild(clone); // Cleanup
        
        canvas.toBlob(async (blob) => {
            const file = new File([blob], "PostCalc-Report.png", { type: "image/png" });

            // 4. Try Native Mobile Share
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'PostCalc Report',
                        text: 'Here is the India Post scheme calculation.',
                        files: [file],
                    });
                } catch (err) { console.log("Share cancelled", err); }
            } else {
                // 5. Desktop Fallback (Auto-Download)
                const link = document.createElement('a');
                link.download = 'PostCalc-Report.png';
                link.href = URL.createObjectURL(blob);
                link.click();
            }
            
            btn.innerText = originalText;
            btn.disabled = false;
        });
    }).catch(err => {
        console.error(err);
        btn.innerText = originalText;
        btn.disabled = false;
        alert("Error generating image.");
    });
}

/* --- HELPERS --- */
function getVal(id) { 
    const el = document.getElementById(id); 
    return el ? (parseFloat(el.value)||0) : 0; 
}

function fmt(n) { 
    return '₹' + Math.round(n).toLocaleString('en-IN'); 
}

function showWarn(m) { 
    const w = document.getElementById('warningBox'); 
    w.innerText = '⚠️ ' + m; 
    w.style.display = 'block'; 
}

function hideWarn() { 
    document.getElementById('warningBox').style.display = 'none'; 
           }
/* =========================================
   PART 3: PLI / RPLI CONTROLLER (DAK SEWA LOGIC)
   ========================================= */

// Global Variables
var currentPLIScheme = 'pli-ea'; 
var currentPLIData = null; 

/* --- 1. GLOBAL UI FUNCTIONS --- */

window.switchTab = function(tab) {
    // UI Toggle
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');

    // Section Toggle
    if (tab === 'savings') {
        document.getElementById('section-savings').classList.remove('hidden');
        document.getElementById('section-insurance').classList.add('hidden');
        
        // Hide PLI Result, Reset Savings
        document.getElementById('pliResultCard').classList.add('hidden'); 
        document.getElementById('inputCard').classList.add('hidden'); 
        document.getElementById('resultsCard').classList.add('hidden'); 
        if(document.getElementById('schemeSelector')) document.getElementById('schemeSelector').value = "";
    } else {
        document.getElementById('section-savings').classList.add('hidden');
        document.getElementById('section-insurance').classList.remove('hidden');
        
        // Hide Savings Result
        document.getElementById('inputCard').classList.add('hidden');
        document.getElementById('resultsCard').classList.add('hidden');
    }
};

window.setPLIType = function(type) {
    let isRPLI = type.includes('rpli');
    
    // 1. Visual Toggle (Pill)
    document.querySelectorAll('.pli-opt').forEach(el => el.classList.remove('active'));
    let activeBtn = isRPLI ? document.querySelectorAll('.pli-opt')[1] : document.querySelectorAll('.pli-opt')[0];
    if(activeBtn) activeBtn.classList.add('active');

    // 2. Dynamic Dropdown Update (Fixes Gram Santosh Issue)
    const select = document.getElementById('pliProduct');
    if(select) {
        if(isRPLI) {
            select.innerHTML = `
                <option value="rpli-ea">Gram Santosh (Endowment)</option>
                <option value="rpli-wla">Gram Suraksha (Whole Life)</option>
            `;
            currentPLIScheme = 'rpli-ea';
        } else {
            select.innerHTML = `
                <option value="pli-ea">Santosh (Endowment)</option>
                <option value="pli-wla">Suraksha (Whole Life)</option>
            `;
            currentPLIScheme = 'pli-ea';
        }
    }
};

window.closePLIResult = function() {
    document.getElementById('pliResultCard').classList.add('hidden');
    document.getElementById('section-insurance').classList.remove('hidden');
};

/* --- 2. FREQUENCY & CALCULATION LOGIC --- */

window.updateFreq = function(freq) {
    if(!currentPLIData) return;

    // Visual Toggle for Freq Tabs
    document.querySelectorAll('.f-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    // Re-Calculate Table using stored data
    if(typeof PLI_Engine !== 'undefined') {
        const result = PLI_Engine.generateTable(currentPLIScheme, currentPLIData.dob, currentPLIData.sa, freq);
        renderPLITable(result.rows);
    }
};

function renderPLITable(rows) {
    const tbody = document.getElementById('pliTableBody');
    if(!tbody) return;

    if(rows.length === 0) {
        tbody.innerHTML = "<tr><td colspan='7' style='text-align:center; padding:20px;'>No eligible plans found.</td></tr>";
        return;
    }

    const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

    tbody.innerHTML = rows.map(r => `
        <tr>
            <td style="text-align:center; font-weight:600;">${r.matAge}</td>
            <td style="text-align:center;">${r.term} Yrs</td>
            <td>${fmt(r.base)}</td>
            <td>${fmt(r.rebate)}</td>
            <td style="font-weight:700; color:#d62828; background:#fff8f8;">${fmt(r.net)}</td>
            <td>${fmt(r.bonus)}</td>
            <td>${fmt(r.maturity)}</td>
        </tr>
    `).join('');
}

/* --- 3. EVENT LISTENERS --- */
document.addEventListener('DOMContentLoaded', () => {
    
    // Dropdown Change Listener
    const pliSelect = document.getElementById('pliProduct');
    if(pliSelect) {
        pliSelect.addEventListener('change', (e) => { currentPLIScheme = e.target.value; });
    }

    // Main Calculate Button
    const btnPLI = document.getElementById('btnCalcPLI');
    if(btnPLI) {
        btnPLI.addEventListener('click', () => {
            const dob = document.getElementById('pliDOB').value;
            const sa = parseFloat(document.getElementById('pliSumAssured').value);
            
            // Validations
            if(!dob) { alert("Please select Date of Birth"); return; }
            if(!sa || sa < 20000) { alert("Minimum Sum Assured is ₹20,000"); return; }
            
            // Check Engine
            if(typeof PLI_Engine === 'undefined') { alert("Engine not loaded! Check pli-calc.js"); return; }
            
            // Generate Table (Default Monthly = 1)
            const result = PLI_Engine.generateTable(currentPLIScheme, dob, sa, 1);
            
            if(result.error) { alert(result.error); return; }
            
            // Store Data for Freq Switching
            currentPLIData = { dob: dob, sa: sa, rawResult: result };
            
            // Update UI
            document.getElementById('resAnb').innerText = result.anb + " Years";
            renderPLITable(result.rows);
            
            // Show Result Card
            document.getElementById('section-insurance').classList.add('hidden');
            document.getElementById('pliResultCard').classList.remove('hidden');
        });
    }
});

/* --- 4. SMART SHARE FUNCTION (Merged) --- */
window.captureAndShare = function() {
    // Detect active card
    const isPLI = !document.getElementById('pliResultCard').classList.contains('hidden');
    const sourceId = isPLI ? 'pliResultCard' : 'resultsCard';
    const source = document.getElementById(sourceId);
    
    // Find button
    let btn = isPLI ? document.querySelector('#pliResultCard .btn-calc') : document.getElementById('btnShare');
    if(!btn && isPLI) btn = document.querySelector('button[onclick="captureAndShare()"]');
    
    if(!btn) return;
    const originalText = btn.innerText;
    btn.innerText = "⏳ Processing..."; 
    btn.disabled = true;

    // Clone & Clean
    const clone = source.cloneNode(true);
    const actions = clone.querySelector('.download-actions') || clone.querySelector('div[style*="text-align:center"]');
    if(actions) actions.style.display = 'none';
    const closeBtn = clone.querySelector('button[onclick*="close"]');
    if(closeBtn) closeBtn.style.display = 'none';

    // A4 Styles
    clone.style.width = '794px'; 
    clone.style.padding = '40px';
    clone.style.background = 'white';
    clone.style.position = 'fixed'; 
    clone.style.top = '0'; 
    clone.style.zIndex = '-100'; 
    
    // Table Fixes
    const tableWrap = clone.querySelector('.table-wrapper');
    if(tableWrap) { tableWrap.style.overflow = 'visible'; tableWrap.style.border = 'none'; }
    const table = clone.querySelector('table');
    if(table) table.style.width = '100%';
    clone.querySelectorAll('th, td').forEach(cell => { cell.style.whiteSpace = 'normal'; });

    document.body.appendChild(clone);

    // Capture
    html2canvas(clone, { scale: 2, useCORS: true, scrollY: -window.scrollY }).then(async canvas => {
        document.body.removeChild(clone);
        canvas.toBlob(async (blob) => {
            const fileName = isPLI ? "PostCalc-Insurance-Quote.png" : "PostCalc-Savings-Report.png";
            const file = new File([blob], fileName, { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try { await navigator.share({ files: [file] }); } catch (err) {}
            } else {
                const link = document.createElement('a');
                link.download = fileName; link.href = URL.createObjectURL(blob); link.click();
            }
            btn.innerText = originalText; btn.disabled = false;
        });
    });
};
