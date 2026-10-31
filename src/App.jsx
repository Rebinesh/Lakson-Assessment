import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  SearchX, 
  RotateCcw, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import { BANKING_PRODUCTS } from './data/products';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import ApplicationTrackerModal from './components/ApplicationTrackerModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [activeModal, setActiveModal] = useState(null); // { type: 'details' | 'track', product }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Helper to trigger toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  // Compute category counts across all products
  const categoryCounts = useMemo(() => {
    const counts = { all: BANKING_PRODUCTS.length };
    BANKING_PRODUCTS.forEach((prod) => {
      counts[prod.categoryKey] = (counts[prod.categoryKey] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return BANKING_PRODUCTS.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || product.categoryKey === selectedCategory;

      if (!matchesCategory) return false;

      // Search filter (name, category, description, account number)
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(query);
      const catMatch = product.category.toLowerCase().includes(query);
      const descMatch = product.description.toLowerCase().includes(query);
      const accMatch = product.accountNumber.toLowerCase().includes(query);

      return nameMatch || catMatch || descMatch || accMatch;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === 'status') {
        // Active first
        if (a.status === 'Active' && b.status !== 'Active') return -1;
        if (a.status !== 'Active' && b.status === 'Active') return 1;
        return 0;
      }
      // 'default' keeps original order
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  // Handle card CTA click
  const handleProductAction = (product) => {
    if (product.actionType === 'track') {
      setActiveModal({ type: 'track', product });
    } else {
      setActiveModal({ type: 'details', product });
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
  };

  // Nav click handler for sidebar
  const handleNavClick = (label, isPrimary) => {
    if (isPrimary) {
      // Already on My Products
      setSidebarOpen(false);
      return;
    }
    showToast(`"${label}" section is a mock navigation item for this assessment demo.`);
    setSidebarOpen(false);
  };

  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'all';

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavClick={handleNavClick}
      />

      {/* Main Content Viewport */}
      <div className="app-main">
        {/* Top Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onProfileClick={() =>
            showToast('Customer Profile: Arjun Mehta (Nexa Premier Banking Client NX-804192)')
          }
        />

        {/* Dashboard Main Area */}
        <main className="dashboard-content" id="main-content" tabIndex={-1}>
          {/* Summary Metric Cards */}
          <SummaryCards products={BANKING_PRODUCTS} />

          {/* Product Toolbar: Search, Filters & Sorting */}
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={() => setSearchQuery('')}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categoryCounts={categoryCounts}
            totalResults={filteredProducts.length}
            isFiltered={isFiltered}
            onResetFilters={handleResetFilters}
          />

          {/* Product Cards Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid" role="region" aria-label="Available Banking Products">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onActionClick={handleProductAction}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state-card" role="status">
              <div className="empty-state-icon" aria-hidden="true">
                <SearchX size={28} />
              </div>
              <h2 className="empty-state-title">No matching products found</h2>
              <p className="empty-state-description">
                We couldn't find any banking product matching "{searchQuery}" under the selected filter criteria.
                Try adjusting your search terms or clearing the category filters.
              </p>
              <button
                type="button"
                className="card-action-btn btn-primary"
                style={{ width: 'auto', padding: '10px 22px' }}
                onClick={handleResetFilters}
              >
                <RotateCcw size={16} style={{ marginRight: '6px' }} />
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Product Details Modal */}
      {activeModal && activeModal.type === 'details' && (
        <ProductDetailsModal
          product={activeModal.product}
          onClose={() => setActiveModal(null)}
          onDemonstrationAction={(msg) => {
            showToast(msg);
          }}
        />
      )}

      {/* Application Tracker Modal */}
      {activeModal && activeModal.type === 'track' && (
        <ApplicationTrackerModal
          product={activeModal.product}
          onClose={() => setActiveModal(null)}
          onDemonstrationAction={(msg) => {
            showToast(msg);
          }}
        />
      )}

      {/* Toast Notification Notification Pill */}
      {toastMessage && (
        <div className="toast-notice" role="alert">
          <Info size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

