export default function handler(req, res) {
  const workers = [
    { id: 'flowi-ceo', name: 'FLOWI CEO', status: 'active', performance: 95 },
    { id: 'hook-creator', name: 'Hook Creator', status: 'active', performance: 88 },
    { id: 'thumbnail-wizard', name: 'Thumbnail Wizard', status: 'active', performance: 92 },
    { id: 'editor-pro', name: 'Editor Pro', status: 'active', performance: 90 },
    { id: 'trend-researcher', name: 'Trend Researcher', status: 'active', performance: 87 },
    { id: 'optimizer', name: 'Optimizer', status: 'active', performance: 94 },
    { id: 'data-master', name: 'Data Master', status: 'active', performance: 89 },
    { id: 'growth-expert', name: 'Growth Expert', status: 'active', performance: 91 }
  ];

  res.status(200).json({
    workers,
    totalWorkers: workers.length,
    activeWorkers: workers.filter(w => w.status === 'active').length,
    averagePerformance: workers.reduce((sum, w) => sum + w.performance, 0) / workers.length,
    timestamp: new Date().toISOString()
  });
}
