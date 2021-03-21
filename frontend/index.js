var income = parseInt(document.getElementsByClassName("income-value")[0].value);
var options = ["old", "new"];
var tax_regime = options[0];
var standard_deduction = 50000;
var old_tax_regime_upper_limit = [249999, 499999, 999999, 100000000000];
var old_tax_regime_lower_limit = [0, 250000, 500000, 1000000];
var old_tax_regime_slabs = ["0 - 2.5L", "2.5L - 5.0L", "5.0 - 10.0L", "10.0 - 15.0L"];
var old_tax_slabs = [0, 5, 20, 30]
var new_tax_regime_upper_limit = [249999, 499999, 749999, 999999, 1249999, 100000000000000];
var new_tax_regime_lower_limit = [0, 250000, 500000, 750000, 1000000, 1250000];
var new_tax_regime_slabs = ["0 - 2.5L", "2.5L - 5.0L", "5.0L - 7.5L", "7.5L - 10.0L", "10.0L - 12.5L", "Above 12.5L"];
var new_tax_slabs = [0, 5, 10, 20, 25, 30]
var i, j, k;
var t_income;
var slab_index;
var tax_calculated;
var total_deductions = parseInt(document.getElementsByClassName("deductions-value")[0].value);
console.log(total_deductions, income);
CalculateTaxFunction = (slab, income, UpperLimits, LowerLimits, SlabValues) => {
    var i = 0;
    var CalculatedTax = 0;
    while(i < slab) {
        CalculatedTax += (( UpperLimits[i]  - LowerLimits[i] ) * SlabValues[i] / 100);
        CalculatedTax = parseInt(CalculatedTax);
        i++;
    }
    if(income < UpperLimits[slab]) {
        CalculatedTax += ((income - LowerLimits[i]) * SlabValues[i] / 100);
        CalculatedTax = parseInt(CalculatedTax);
    }
    return CalculatedTax
}

CalculateTaxSlabIndex = (income, UpperLimits) => {
    var i = 0;
    var calculatedSlab = 0;
    while(i < UpperLimits.length) {
        if(income < UpperLimits[i]) {
            break;
        }
        i++;
    }
    calculatedSlab = i;
    return calculatedSlab;
}

if(tax_regime === options[0]) {

	total_deductions += standard_deduction
	console.log("Your total deduction is ", total_deductions);
	t_income = income - total_deductions;
	tax_calculated = 0;
	slab_index = 0;
	console.log("Calculating...");
	slab_index = CalculateTaxSlabIndex(t_income, old_tax_regime_upper_limit);
	console.log("You fit under ",old_tax_regime_slabs[slab_index], " tax slab.");
	tax_calculated = CalculateTaxFunction(slab_index, t_income, old_tax_regime_upper_limit, old_tax_regime_lower_limit, old_tax_slabs);
	console.log("Total calculated tax under new regime is : ", tax_calculated);
}
else if(tax_regime === options[1]) {
	i = 0;
	t_income = income;
	tax_calculated = 0;
	slab_index = 0;
	console.log("Calculating...");
	slab_index = CalculateTaxSlabIndex(t_income, new_tax_regime_upper_limit);
	console.log("You fit under ",new_tax_regime_slabs[slab_index], " tax slab.");
	tax_calculated = CalculateTaxFunction(slab_index, t_income, new_tax_regime_upper_limit, new_tax_regime_lower_limit, new_tax_slabs);
	console.log("Total calculated tax under new regime is : ", tax_calculated);
}

document.getElementsByClassName("output-text").innerHTML = "dsjfndsf";