import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { DataProvider, useData } from './context/DataContext.js';
import { Header } from './components/common/Header.js';
import { Footer } from './components/common/Footer.js';

// Public Pages
import { HomePage } from './pages/HomePage.js';
import { NewsPage } from './pages/NewsPage.js';
import { NumbersPage } from './pages/NumbersPage.js';
import { ServiceDetailPage } from './pages/ServiceDetailPage.js';
import { RestaurantMenuPage } from './pages/RestaurantMenuPage.js';
import { RestaurantsPage } from './pages/RestaurantsPage.js';
import { HandymanPage } from './pages/HandymanPage.js';
import { JobsPage } from './pages/JobsPage.js';
import { UpozilaInfoPage } from './pages/UpozilaInfoPage.js';
import { EducationPage } from './pages/EducationPage.js';
import { BloodDonorsPage } from './pages/BloodDonorsPage.js';
import { EmergencyNumbersPage } from './pages/EmergencyNumbersPage.js';
import { ThanaPage } from './pages/ThanaPage.js';
import { HospitalPage } from './pages/HospitalPage.js';
import { PostOfficePage } from './pages/PostOfficePage.js';
import { MazarPage } from './pages/MazarPage.js';
import { UnionsPage } from './pages/UnionsPage.js';
import { MunicipalityPage } from './pages/MunicipalityPage.js';
import { FamousPersonsPage } from './pages/FamousPersonsPage.js';
import { TouristSpotsPage } from './pages/TouristSpotsPage.js';
import { AtAGlancePage } from './pages/AtAGlancePage.js';
import { ShopPage } from './pages/ShopPage.js';
import { CommunityPage } from './pages/CommunityPage.js';
import { FloatingCartButton } from './components/common/FloatingCartButton.js';
import { AccountPage } from './pages/AccountPage.js';
import { CategoryPage } from './pages/CategoryPage.js';
import { SubcategoryPage } from './pages/SubcategoryPage.js';
import { ListingDetailPage } from './pages/ListingDetailPage.js';
import { SearchPage } from './pages/SearchPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { ChatPage } from './pages/ChatPage.js';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage.js';
import { AdminLayout } from './pages/admin/AdminLayout.js';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.js';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage.js';
import { AdminSubcategoriesPage } from './pages/admin/AdminSubcategoriesPage.js';
import { AdminListingsPage } from './pages/admin/AdminListingsPage.js';
import { AdminListingFormPage } from './pages/admin/AdminListingFormPage.js';
import { AdminUsersPage } from './pages/admin/AdminUsersPage.js';
import { AdminPostsPage } from './pages/admin/AdminPostsPage.js';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage.js';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toasts, removeToast } = useData();
  const [currentPath, setCurrentPath] = useState<string>(
    (window.location.pathname + window.location.search) || '/'
  );

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath((window.location.pathname + window.location.search) || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Extract query params if any
  const urlParams = new URLSearchParams(window.location.search);
  const searchQ = urlParams.get('q') || '';
  const convId = urlParams.get('conv') || '';

  // Render Routes
  const renderRoute = () => {
    const path = currentPath;

    // Admin Routes
    if (path.startsWith('/adm')) {
      if (path === '/adm/login') {
        return <AdminLoginPage navigate={navigate} />;
      }

      // Check admin auth
      if (!authLoading && !isAdmin) {
        return <AdminLoginPage navigate={navigate} />;
      }

      return (
        <AdminLayout currentPath={path} navigate={navigate}>
          {path === '/adm' && <AdminDashboardPage navigate={navigate} />}
          {path === '/adm/categories' && <AdminCategoriesPage />}
          {path === '/adm/subcategories' && <AdminSubcategoriesPage />}
          {path === '/adm/listings' && <AdminListingsPage navigate={navigate} />}
          {path === '/adm/listings/add' && <AdminListingFormPage navigate={navigate} />}
          {path.startsWith('/adm/listings/edit/') && (
            <AdminListingFormPage id={path.split('/adm/listings/edit/')[1]} navigate={navigate} />
          )}
          {path === '/adm/users' && <AdminUsersPage />}
          {path === '/adm/posts' && <AdminPostsPage />}
          {path === '/adm/settings' && <AdminSettingsPage />}
        </AdminLayout>
      );
    }

    // Public Routes
    let pageComponent = null;
    const basePath = path.split('?')[0];

    if (basePath === '/') {
      pageComponent = <HomePage navigate={navigate} />;
    } else if (basePath === '/news' || basePath.startsWith('/news/')) {
      const newsId = basePath.startsWith('/news/') 
        ? basePath.replace('/news/', '').trim() 
        : (urlParams.get('id') || undefined);
      pageComponent = <NewsPage newsId={newsId} navigate={navigate} />;
    } else if (basePath === '/blood-donors' || basePath === '/blood-donor' || basePath === '/blood' || basePath === '/numbers/blood-donor' || basePath === '/numbers/blood-donors' || (basePath === '/numbers' && (urlParams.get('service') === 'blood-donor' || urlParams.get('service') === 'blood-donors'))) {
      pageComponent = <BloodDonorsPage navigate={navigate} />;
    } else if (basePath.startsWith('/numbers/')) {
      const serviceId = basePath.replace('/numbers/', '');
      pageComponent = <ServiceDetailPage serviceId={serviceId} navigate={navigate} />;
    } else if (basePath === '/numbers' || basePath === '/emergency-numbers' || basePath === '/emergency') {
      const sParam = urlParams.get('service');
      if (sParam) {
        pageComponent = <ServiceDetailPage serviceId={sParam} navigate={navigate} />;
      } else {
        pageComponent = <NumbersPage navigate={navigate} />;
      }
    } else if (basePath === '/restaurants' || (basePath === '/restaurant' && !urlParams.get('id'))) {
      pageComponent = <RestaurantsPage navigate={navigate} />;
    } else if (basePath.startsWith('/restaurant/') || basePath.startsWith('/restaurants/') || basePath === '/restaurant-menu' || (basePath === '/restaurant' && urlParams.get('id'))) {
      const resId = basePath.startsWith('/restaurant/') 
        ? basePath.replace('/restaurant/', '') 
        : basePath.startsWith('/restaurants/') 
        ? basePath.replace('/restaurants/', '') 
        : (urlParams.get('id') || undefined);
      pageComponent = <RestaurantMenuPage restaurantId={resId} navigate={navigate} />;
    } else if (basePath === '/handyman') {
      pageComponent = <HandymanPage navigate={navigate} />;
    } else if (basePath === '/jobs' || basePath.startsWith('/jobs/')) {
      const jId = basePath.startsWith('/jobs/') ? basePath.replace('/jobs/', '') : (urlParams.get('id') || undefined);
      pageComponent = <JobsPage jobId={jId} navigate={navigate} />;
    } else if (basePath === '/upozila-info') {
      pageComponent = <UpozilaInfoPage navigate={navigate} currentPath={path} />;
    } else if (basePath === '/at-a-glance' || basePath === '/upozila-info/at-a-glance') {
      pageComponent = <AtAGlancePage navigate={navigate} />;
    } else if (basePath === '/unions' || basePath === '/union') {
      pageComponent = <UnionsPage navigate={navigate} />;
    } else if (basePath === '/municipality' || basePath === '/pourashava') {
      pageComponent = <MunicipalityPage navigate={navigate} />;
    } else if (basePath === '/famous-persons' || basePath === '/famous' || basePath === '/personalities') {
      pageComponent = <FamousPersonsPage navigate={navigate} />;
    } else if (basePath === '/tourist-spots' || basePath === '/tourist' || basePath === '/tourist-places') {
      pageComponent = <TouristSpotsPage navigate={navigate} />;
    } else if (basePath === '/thana' || basePath === '/police' || basePath === '/police-station') {
      pageComponent = <ThanaPage navigate={navigate} />;
    } else if (basePath === '/hospital' || basePath === '/upazila-hospital' || basePath === '/upozila-hospital') {
      pageComponent = <HospitalPage navigate={navigate} />;
    } else if (basePath === '/post-office' || basePath === '/upazila-post-office' || basePath === '/postoffice') {
      pageComponent = <PostOfficePage navigate={navigate} />;
    } else if (basePath === '/primary-schools' || basePath === '/primary-school') {
      pageComponent = <EducationPage navigate={navigate} currentPath={path} initialType="primary" />;
    } else if (basePath === '/secondary-schools' || basePath === '/secondary-school' || basePath === '/high-schools') {
      pageComponent = <EducationPage navigate={navigate} currentPath={path} initialType="secondary" />;
    } else if (basePath === '/colleges' || basePath === '/college') {
      pageComponent = <EducationPage navigate={navigate} currentPath={path} initialType="college" />;
    } else if (basePath === '/madrasas' || basePath === '/madrasa') {
      pageComponent = <EducationPage navigate={navigate} currentPath={path} initialType="madrasa" />;
    } else if (basePath === '/mazar' || basePath === '/mazars' || basePath === '/shrine') {
      pageComponent = <MazarPage navigate={navigate} />;
    } else if (basePath === '/education' || basePath.startsWith('/education')) {
      pageComponent = <EducationPage navigate={navigate} currentPath={path} />;
    } else if (basePath === '/shop' || basePath === '/products' || basePath.startsWith('/products/')) {
      let catParam = urlParams.get('category') || '';
      if (basePath.startsWith('/products/')) {
        catParam = basePath.replace('/products/', '').trim();
      }
      pageComponent = <ShopPage initialCategory={catParam || undefined} navigate={navigate} />;
    } else if (basePath === '/community' || basePath === '/feed' || basePath === '/forum') {
      pageComponent = <CommunityPage navigate={navigate} />;
    } else if (basePath === '/account') {
      pageComponent = <AccountPage navigate={navigate} />;
    } else if (basePath === '/add-listing') {
      if (isAdmin) {
        navigate('/adm/listings/add');
        return null;
      }
      pageComponent = <AccountPage navigate={navigate} />;
    } else if (basePath === '/search') {
      pageComponent = <SearchPage initialQuery={searchQ} navigate={navigate} />;
    } else if (basePath === '/login') {
      pageComponent = <LoginPage navigate={navigate} />;
    } else if (basePath === '/register') {
      pageComponent = <RegisterPage navigate={navigate} />;
    } else if (basePath === '/profile') {
      pageComponent = <ProfilePage navigate={navigate} />;
    } else if (basePath === '/chat') {
      pageComponent = <ChatPage initialConversationId={convId} navigate={navigate} />;
    } else if (basePath.startsWith('/listing/')) {
      const slug = basePath.replace('/listing/', '');
      pageComponent = <ListingDetailPage slug={slug} navigate={navigate} />;
    } else if (basePath.startsWith('/category/')) {
      const parts = basePath.replace('/category/', '').split('/');
      const shopCategoryIds = ['home-decor', 'shirt', 'panjabi', 'toys', 'digital-products', 'groceries', 'fruits', 'electronics', 'sweets', 'hardware', 'medicine'];
      if (parts.length === 1 && shopCategoryIds.includes(parts[0])) {
        pageComponent = <ShopPage initialCategory={parts[0]} navigate={navigate} />;
      } else if (parts.length === 1) {
        pageComponent = <CategoryPage categorySlug={parts[0]} navigate={navigate} />;
      } else {
        pageComponent = (
          <SubcategoryPage
            categorySlug={parts[0]}
            subcategorySlug={parts[1]}
            navigate={navigate}
          />
        );
      }
    } else {
      pageComponent = <HomePage navigate={navigate} />;
    }

    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#F0F2F5] pb-4">
        <Header currentPath={path} navigate={navigate} />
        <main className="flex-1 min-w-0 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={basePath}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="w-full"
            >
              {pageComponent}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer navigate={navigate} />
        <FloatingCartButton />
      </div>
    );
  };

  return (
    <>
      {renderRoute()}

      {/* Global Toast Notification System */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex flex-col gap-2 pointer-events-none w-[calc(100%-1.5rem)] sm:w-auto max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto py-2 px-3 sm:px-3.5 rounded-xl shadow-md border flex items-center justify-between gap-2.5 text-xs sm:text-sm font-medium text-white transition-all opacity-90 hover:opacity-100 backdrop-blur-xs animate-in fade-in slide-in-from-top-2 duration-150 ${
              toast.type === 'success'
                ? 'bg-emerald-700/90 border-emerald-500/40'
                : toast.type === 'error'
                ? 'bg-red-700/90 border-red-500/40'
                : 'bg-[#1877F2]/90 border-blue-400/40'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-200 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-blue-200 shrink-0" />}
              <span className="truncate">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/70 hover:text-white p-0.5 cursor-pointer shrink-0"
              aria-label="বন্ধ করুন"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
