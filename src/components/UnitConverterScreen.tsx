import { useState } from 'react';
import { ArrowLeft, ArrowDownUp, ChevronDown } from 'lucide-react';

interface UnitConverterScreenProps {
  onBack: () => void;
}

const conversionUnits = [
  { value: 'sqft', label: 'Square Feet' },
  { value: 'sqm', label: 'Square Meters' },
  { value: 'sqyd', label: 'Square Yards' },
  { value: 'acre', label: 'Acre' },
  { value: 'hectare', label: 'Hectare' },
  { value: 'bigha', label: 'Bigha' },
  { value: 'katha', label: 'Katha' },
  { value: 'guntha', label: 'Guntha' },
  { value: 'cent', label: 'Cent' },
];

// Conversion rates (all to square feet)
const conversionRates: Record<string, number> = {
  sqft: 1,
  sqm: 10.764,
  sqyd: 9,
  acre: 43560,
  hectare: 107639,
  bigha: 27225, // UP Bigha
  katha: 720, // Bengal Katha
  guntha: 1089,
  cent: 435.6,
};

export default function UnitConverterScreen({ onBack }: UnitConverterScreenProps) {
  const [inputValue, setInputValue] = useState('100');
  const [fromUnit, setFromUnit] = useState('sqft');
  const [toUnit, setToUnit] = useState('sqm');
  const [hasConverted, setHasConverted] = useState(false);

  const handleConvert = () => {
    setHasConverted(true);
  };

  const calculateConversion = (value: string, from: string, to: string): number => {
    const numValue = parseFloat(value) || 0;
    const inSqFt = numValue * conversionRates[from];
    return inSqFt / conversionRates[to];
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setHasConverted(false);
  };

  const resultValue = calculateConversion(inputValue, fromUnit, toUnit);

  // Calculate all conversions
  const allConversions = conversionUnits.map((unit) => ({
    label: unit.label,
    value: calculateConversion(inputValue, fromUnit, unit.value),
  }));

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <span>Unit Converter</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <label className="text-gray-700 text-sm mb-2 block">From</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setHasConverted(false);
            }}
            placeholder="Enter value"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-4 text-2xl"
          />
          
          <div className="relative">
            <select
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                setHasConverted(false);
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer"
            >
              {conversionUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowDownUp size={20} className="text-[#2E7D32]" />
          </button>
        </div>

        {/* Output Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <label className="text-gray-700 text-sm mb-2 block">To</label>
          {hasConverted && (
            <div className="w-full px-4 py-3 bg-[#66BB6A]/10 border border-[#66BB6A] rounded-xl mb-4 text-2xl text-[#2E7D32]">
              {resultValue.toFixed(resultValue < 1 ? 6 : 2)}
            </div>
          )}
          {!hasConverted && (
            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-4 text-2xl text-gray-400">
              --
            </div>
          )}
          
          <div className="relative">
            <select
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value);
                setHasConverted(false);
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer"
            >
              {conversionUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl hover:bg-[#1B5E20] transition-colors shadow-lg"
        >
          Convert
        </button>

        {/* All Conversions */}
        {hasConverted && (
          <div className="space-y-4">
            <h3 className="text-gray-700 px-2">All Conversions</h3>
            <div className="grid grid-cols-2 gap-4">
              {allConversions.map((conversion, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="text-xl text-[#2E7D32] mb-1">
                    {conversion.value.toFixed(conversion.value < 1 ? 4 : 2)}
                  </div>
                  <div className="text-sm text-gray-600">{conversion.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Regional units like Bigha and Katha may vary by state. 
            Current conversions are based on standard measurements.
          </p>
        </div>
      </div>
    </div>
  );
}
