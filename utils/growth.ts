import { GrowthRecord } from '@/types/health';

export function calculateBMI(weight: number, heightInCm: number): number {
  const heightInM = heightInCm / 100;
  return Number((weight / (heightInM * heightInM)).toFixed(1));
}

export function calculatePercentile(value: number, dataset: number[]): number {
  const sortedData = [...dataset].sort((a, b) => a - b);
  const index = sortedData.findIndex(item => item >= value);
  return Math.round((index / sortedData.length) * 100);
}

export function analyzeGrowthTrend(records: GrowthRecord[]): {
  trend: 'increasing' | 'decreasing' | 'stable';
  percentageChange: number;
} {
  if (records.length < 2) {
    return { trend: 'stable', percentageChange: 0 };
  }

  const sortedRecords = [...records].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const firstRecord = sortedRecords[0];
  const lastRecord = sortedRecords[sortedRecords.length - 1];
  
  const percentageChange = ((lastRecord.weight - firstRecord.weight) / firstRecord.weight) * 100;

  let trend: 'increasing' | 'decreasing' | 'stable';
  if (percentageChange > 2) {
    trend = 'increasing';
  } else if (percentageChange < -2) {
    trend = 'decreasing';
  } else {
    trend = 'stable';
  }

  return { trend, percentageChange: Number(percentageChange.toFixed(1)) };
}

export function generateGrowthReport(records: GrowthRecord[]): string {
  const trend = analyzeGrowthTrend(records);
  const latestRecord = records[records.length - 1];

  return `
Growth Analysis Report
Date: ${new Date().toLocaleDateString()}

Latest Measurements:
- Weight: ${latestRecord.weight} kg (${latestRecord.weightPercentile}th percentile)
- Height: ${latestRecord.height} cm (${latestRecord.heightPercentile}th percentile)
- BMI: ${latestRecord.bmi}

Growth Trend: ${trend.trend} (${trend.percentageChange}% change)

Recommendations:
${generateRecommendations(latestRecord, trend)}
  `.trim();
}

function generateRecommendations(
  latest: GrowthRecord,
  trend: { trend: string; percentageChange: number }
): string {
  const recommendations: string[] = [];

  if (latest.bmi < 18.5) {
    recommendations.push('- Consider nutritional assessment');
    recommendations.push('- Monitor caloric intake');
  } else if (latest.bmi > 25) {
    recommendations.push('- Review dietary habits');
    recommendations.push('- Encourage physical activity');
  }

  if (latest.heightPercentile < 5) {
    recommendations.push('- Evaluate for growth delays');
    recommendations.push('- Consider endocrinology consultation');
  }

  if (Math.abs(trend.percentageChange) > 10) {
    recommendations.push('- Investigate rapid weight changes');
    recommendations.push('- Schedule follow-up appointment');
  }

  return recommendations.length > 0 
    ? recommendations.join('\n')
    : '- Continue regular monitoring\n- Maintain current health practices';
}