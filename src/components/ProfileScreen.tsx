import { ArrowLeft, User, Mail, Phone, MapPin, Edit2, LogOut } from 'lucide-react';

interface ProfileScreenProps {
  onBack: () => void;
}

export default function ProfileScreen({ onBack }: ProfileScreenProps) {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <span>Profile</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Avatar Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#66BB6A] to-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={40} className="text-white" />
          </div>
          <h2 className="text-2xl text-gray-900 mb-1">Rahul Kumar</h2>
          <p className="text-gray-500">rahul.kumar@example.com</p>
          
          <button className="mt-6 bg-[#2E7D32] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 mx-auto hover:bg-[#1B5E20] transition-colors">
            <Edit2 size={18} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-700">Personal Information</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {/* Email */}
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">Email</div>
                <div className="text-gray-900">rahul.kumar@example.com</div>
              </div>
            </div>

            {/* Phone */}
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">Phone</div>
                <div className="text-gray-900">+91 98765 43210</div>
              </div>
            </div>

            {/* Location */}
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">Location</div>
                <div className="text-gray-900">Lucknow, Uttar Pradesh</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-700 mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#66BB6A] to-[#2E7D32] rounded-xl p-4 text-white">
              <div className="text-3xl mb-1">4</div>
              <div className="text-sm text-white/80">Plots Saved</div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white">
              <div className="text-3xl mb-1">12</div>
              <div className="text-sm text-white/80">Measurements</div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Edit2 size={20} className="text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900">Update Profile</div>
              <div className="text-sm text-gray-500">Change your account details</div>
            </div>
          </button>

          <button className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50 transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <LogOut size={20} className="text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-red-600">Logout</div>
              <div className="text-sm text-red-400">Sign out of your account</div>
            </div>
          </button>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-gray-400 pb-6">
          BhuMitra v1.0.0
        </div>
      </div>
    </div>
  );
}
