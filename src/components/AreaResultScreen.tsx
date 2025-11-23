import { useState } from 'react';
import { ArrowLeft, ChevronDown, Share2, Save, RotateCcw, CheckCircle } from 'lucide-react';

interface AreaResultScreenProps {
  onBack: () => void;
}

const areaData = {
  sqft: 230,
  sqm: 21.37,
  acre: 0.0053,
  hectare: 0.0021,
  sqyd: 25.56,
  bigha: 0.0013,
  katha: 0.026,
  guntha: 0.021,
  cent: 0.052,
};

const units = [
  { key: 'sqft', label: 'Square Feet', value: 230 },
  { key: 'sqm', label: 'Square Meters', value: 21.37 },
  { key: 'sqyd', label: 'Square Yards', value: 25.56 },
  { key: 'acre', label: 'Acre', value: 0.0053 },
  { key: 'hectare', label: 'Hectare', value: 0.0021 },
  { key: 'bigha', label: 'Bigha (UP)', value: 0.0013 },
  { key: 'katha', label: 'Katha (Bengal)', value: 0.026 },
  { key: 'guntha', label: 'Guntha', value: 0.021 },
  { key: 'cent', label: 'Cent', value: 0.052 },
];

export default function AreaResultScreen({ onBack }: AreaResultScreenProps) {
  const [selectedUnit, setSelectedUnit] = useState('sqft');
  const [selectedRegion, setSelectedRegion] = useState('uttar-pradesh');

  const mainValue = units.find(u => u.key === selectedUnit)?.value || 230;
  const mainLabel = units.find(u => u.key === selectedUnit)?.label || 'Square Feet';

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <span>Area Calculation Result</span>
        </div>
      </div>

      {/* Success Badge */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-center gap-2 text-[#2E7D32]">
        <CheckCircle size={24} />
        <span>Area Calculated Successfully</span>
      </div>

      {/* Main Result Card */}
      <div className="p-6">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-5xl text-[#2E7D32] mb-2">
              {mainValue.toFixed(mainValue < 1 ? 4 : 2)}
            </div>
            <div className="text-gray-600">{mainLabel}</div>
          </div>

          {/* Unit Selector */}
          <div className="relative">
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer"
            >
              {units.map((unit) => (
                <option key={unit.key} value={unit.key}>
                  {unit.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Conversions Grid */}
        <div className="mb-6">
          <h3 className="text-gray-700 mb-4 px-2">All Conversions</h3>
          <div className="grid grid-cols-2 gap-4">
            {units.map((unit) => (
              <div
                key={unit.key}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="text-2xl text-[#2E7D32] mb-1">
                  {unit.value.toFixed(unit.value < 1 ? 4 : 2)}
                </div>
                <div className="text-sm text-gray-600">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Region Selector */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <label className="text-gray-700 mb-3 block">Select Your State/Region</label>
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer"
            >
              <option value="uttar-pradesh">Uttar Pradesh</option>
              <option value="west-bengal">West Bengal</option>
              <option value="bihar">Bihar</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
              <option value="tamil-nadu">Tamil Nadu</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Regional units like Bigha, Katha vary by state
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1B5E20] transition-colors shadow-lg">
            <Save size={20} />
            <span>Save Plot</span>
          </button>

          <button className="w-full bg-white text-[#2E7D32] py-4 rounded-2xl flex items-center justify-center gap-3 border-2 border-[#2E7D32] hover:bg-gray-50 transition-colors">
            <Share2 size={20} />
            <span>Share PDF</span>
          </button>

          <button 
            onClick={onBack}
            className="w-full text-gray-600 py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
          >
            <RotateCcw size={18} />
            <span>Recalculate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
