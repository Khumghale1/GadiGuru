"use client";

import React, { useEffect, useState } from "react";

function EmiCalculator({ price = 10000 }) {
  const [loanAmount, setLoanAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateEMI = () => {
    const totalAmount = parseFloat(loanAmount);
    const downPaymentAmount = parseFloat(downPayment) || 0;
    const principal = totalAmount - downPaymentAmount;
    const rate = parseFloat(interestRate) / 12 / 100;
    const time = parseFloat(loanTenure) * 12;

    if (principal > 0 && rate && time) {
      const emiAmount =
        (principal * rate * Math.pow(1 + rate, time)) /
        (Math.pow(1 + rate, time) - 1);
      const totalAmount = emiAmount * time;
      const interestAmount = totalAmount - principal;

      setEmi(emiAmount);
      setTotalInterest(interestAmount);
      setTotalPayment(totalAmount);
    }
  };

  const currencySymbol = currency === "USD" ? "$" : "रू";
  const formatNumber = (number) => {
    return new Intl.NumberFormat(currency === "USD" ? "en-US" : "ne-NP").format(
      number.toFixed(2)
    );
  };

  // Handle slider and input sync
  const handleLoanAmountChange = (e) => {
    const value =
      e.target.type === "range"
        ? e.target.value
        : e.target.value.replace(/,/g, "");
    setLoanAmount(value);
    // Adjust down payment if it exceeds the new loan amount
    if (parseFloat(downPayment) > parseFloat(value)) {
      setDownPayment(value);
    }
  };

  const handleDownPaymentChange = (e) => {
    const value =
      e.target.type === "range"
        ? e.target.value
        : e.target.value.replace(/,/g, "");
    if (parseFloat(value) <= parseFloat(loanAmount)) {
      setDownPayment(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1a237e] font-roboto">
              Gadiguru EMI Calculator
            </h1>
            <p className="text-gray-600 mt-2 font-roboto">
              Calculate your car loan EMI easily
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  name="currency"
                >
                  <option value="USD">USD ($)</option>
                  <option value="NPR">NPR (रू)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Car Price ({currencySymbol})
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={handleLoanAmountChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter car price"
                    name="loanAmount"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    value={loanAmount}
                    onChange={handleLoanAmountChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{currencySymbol}0</span>
                    <span>{currencySymbol}1,000,000</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment ({currencySymbol})
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter down payment"
                    name="downPayment"
                  />
                  <input
                    type="range"
                    min="0"
                    max={loanAmount || 1000000}
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{currencySymbol}0</span>
                    <span>
                      {currencySymbol}
                      {formatNumber(parseFloat(loanAmount) || 1000000)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter interest rate"
                    name="interestRate"
                  />
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter loan tenure"
                    name="loanTenure"
                  />
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 year</span>
                    <span>8 years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={calculateEMI}
                className="bg-[#1a237e] text-white px-8 py-3 rounded-lg hover:bg-[#283593] transition-colors"
              >
                Calculate EMI
              </button>
            </div>

            {emi > 0 && (
              <div className="mt-8 space-y-4 bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Monthly EMI
                    </h3>
                    <p className="text-2xl font-bold text-[#1a237e] mt-2">
                      {currencySymbol} {formatNumber(emi)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Total Interest
                    </h3>
                    <p className="text-2xl font-bold text-[#1a237e] mt-2">
                      {currencySymbol} {formatNumber(totalInterest)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Total Payment
                    </h3>
                    <p className="text-2xl font-bold text-[#1a237e] mt-2">
                      {currencySymbol} {formatNumber(totalPayment)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;