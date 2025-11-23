import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import BoundaryMarkingScreen from './components/BoundaryMarkingScreen';
import AreaResultScreen from './components/AreaResultScreen';
import SavedPlotsScreen from './components/SavedPlotsScreen';
import UnitConverterScreen from './components/UnitConverterScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import HelpScreen from './components/HelpScreen';
import EmptyStatesScreen from './components/EmptyStatesScreen';

export type Screen = 
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'boundary'
  | 'result'
  | 'saved'
  | 'converter'
  | 'profile'
  | 'settings'
  | 'help'
  | 'empty-states';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Auto-transition from splash to onboarding
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScreen === 'splash') {
        setCurrentScreen('onboarding');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    setDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Frame */}
      <div className="mx-auto max-w-md h-screen bg-white relative overflow-hidden">
        {/* Drawer Menu Overlay */}
        {drawerOpen && (
          <div 
            className="absolute inset-0 bg-black/50 z-40"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Drawer Menu */}
        <div 
          className={`absolute top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6">
            {/* User Profile Section */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b">
              <div className="w-16 h-16 rounded-full bg-[#66BB6A] flex items-center justify-center">
                <span className="text-white text-xl">RK</span>
              </div>
              <div>
                <div>Rahul Kumar</div>
                <div className="text-sm text-gray-500">rahul@example.com</div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1">
              {[
                { icon: '🏠', label: 'Home', screen: 'home' as Screen },
                { icon: '📍', label: 'Saved Plots', screen: 'saved' as Screen },
                { icon: '🔄', label: 'Unit Converter', screen: 'converter' as Screen },
                { icon: '📍', label: 'Select Region/State', screen: 'settings' as Screen },
                { icon: '❓', label: 'Help', screen: 'help' as Screen },
                { icon: '💬', label: 'Feedback', screen: 'home' as Screen },
                { icon: 'ℹ️', label: 'About', screen: 'home' as Screen },
                { icon: '👤', label: 'Profile', screen: 'profile' as Screen },
                { icon: '⚙️', label: 'Settings', screen: 'settings' as Screen },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.screen)}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Developer Section */}
            <div className="mt-8 pt-6 border-t">
              <div className="text-xs text-gray-400 mb-2 px-4">Developer Demo</div>
              <button
                onClick={() => navigateTo('empty-states')}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                <span className="text-xl">🎨</span>
                <span>Empty States Demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'onboarding' && (
          <OnboardingScreen onComplete={() => navigateTo('home')} />
        )}
        {currentScreen === 'home' && (
          <HomeScreen 
            onMenuClick={() => setDrawerOpen(true)}
            onProfileClick={() => navigateTo('profile')}
            onStartMarking={() => navigateTo('boundary')}
          />
        )}
        {currentScreen === 'boundary' && (
          <BoundaryMarkingScreen 
            onBack={() => navigateTo('home')}
            onComplete={() => navigateTo('result')}
          />
        )}
        {currentScreen === 'result' && (
          <AreaResultScreen onBack={() => navigateTo('home')} />
        )}
        {currentScreen === 'saved' && (
          <SavedPlotsScreen onBack={() => navigateTo('home')} />
        )}
        {currentScreen === 'converter' && (
          <UnitConverterScreen onBack={() => navigateTo('home')} />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen onBack={() => navigateTo('home')} />
        )}
        {currentScreen === 'settings' && (
          <SettingsScreen onBack={() => navigateTo('home')} />
        )}
        {currentScreen === 'help' && (
          <HelpScreen onBack={() => navigateTo('home')} />
        )}
        {currentScreen === 'empty-states' && (
          <EmptyStatesScreen 
            onBack={() => navigateTo('home')} 
            onNavigateToHome={() => navigateTo('home')}
          />
        )}
      </div>
    </div>
  );
}