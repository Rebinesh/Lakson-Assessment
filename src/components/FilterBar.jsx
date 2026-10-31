import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, SORT_OPTIONS } from '../data/products';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  selectedCategory,
  onCategorySelect,
  sortBy,
  onSortChange,
  categoryCounts,
  totalResults,
  isFiltered,
  onResetFilters,
}) {
  return (
    <div className="toolbar-container" role="search" aria-label="Filter and search banking products">
      {/* Top Row: Search Input & Sort Selector */}
      <div className="toolbar-top-row">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by product name, category, or account..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search banking products"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={onClearSearch}
              aria-label="Clear search input"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="sort-wrapper">
          <SlidersHorizontal size={15} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
          <label htmlFor="product-sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="product-sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort products by criteria"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="category-filters-row" role="group" aria-label="Filter by product category">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              type="button"
              className={`filter-pill ${isActive ? 'active' : ''}`}
              onClick={() => onCategorySelect(cat.id)}
              aria-pressed={isActive}
            >
              <span>{cat.label}</span>
              <span className="filter-count-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Filter Feedback / Results indicator */}
      {isFiltered && (
        <div className="filter-feedback" aria-live="polite">
          <span>
            Showing <strong>{totalResults}</strong> matching {totalResults === 1 ? 'product' : 'products'}
            {searchQuery && ` for "${searchQuery}"`}
          </span>
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onResetFilters}
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}

