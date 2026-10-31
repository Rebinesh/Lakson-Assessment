import React from 'react';
import { Layers, CheckCircle2, Clock } from 'lucide-react';

export default function SummaryCards({ products }) {
  // Dynamically calculate metrics from the provided products dataset
  const totalCount = products.length;
  const activeCount = products.filter(
    (p) => p.status.toLowerCase() === 'active'
  ).length;
  const pendingCount = products.filter(
    (p) =>
      p.status.toLowerCase().includes('review') ||
      p.status.toLowerCase().includes('pending')
  ).length;

  const cards = [
    {
      id: 'total',
      label: 'Total Products',
      value: totalCount,
      subtext: 'Across all 4 categories',
      icon: Layers,
      themeClass: 'total',
    },
    {
      id: 'active',
      label: 'Active Products',
      value: activeCount,
      subtext: 'Fully operational & verified',
      icon: CheckCircle2,
      themeClass: 'active',
    },
    {
      id: 'pending',
      label: 'Pending Applications',
      value: pendingCount,
      subtext: 'Underwriting & review stage',
      icon: Clock,
      themeClass: 'pending',
    },
  ];

  return (
    <section className="summary-cards-grid" aria-label="Banking Summary Overview">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} className="summary-card">
            <div className="summary-content">
              <span className="summary-label">{card.label}</span>
              <span className="summary-value">{card.value}</span>
              <span className="summary-subtext">{card.subtext}</span>
            </div>
            <div className={`summary-icon-box ${card.themeClass}`} aria-hidden="true">
              <Icon size={22} strokeWidth={2.2} />
            </div>
          </div>
        );
      })}
    </section>
  );
}

