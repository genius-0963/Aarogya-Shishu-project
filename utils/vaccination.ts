import { VaccinationRecord } from '@/types/health';
import { format, addMonths, isBefore, isAfter } from 'date-fns';

export function calculateVaccinationStatus(
  records: VaccinationRecord[]
): {
  completed: number;
  upcoming: number;
  overdue: number;
  complianceRate: number;
} {
  const today = new Date();
  let completed = 0;
  let upcoming = 0;
  let overdue = 0;

  records.forEach(record => {
    if (!record.nextDueDate) {
      completed++;
      return;
    }

    const dueDate = new Date(record.nextDueDate);
    if (isBefore(dueDate, today)) {
      overdue++;
    } else if (isBefore(addMonths(today, 3), dueDate)) {
      upcoming++;
    }
  });

  const total = records.length;
  const complianceRate = (completed / total) * 100;

  return {
    completed,
    upcoming,
    overdue,
    complianceRate: Number(complianceRate.toFixed(1))
  };
}

export function generateVaccinationReport(records: VaccinationRecord[]): string {
  const status = calculateVaccinationStatus(records);
  const today = new Date();

  const upcomingVaccinations = records
    .filter(record => record.nextDueDate && 
      isAfter(new Date(record.nextDueDate), today) &&
      isBefore(new Date(record.nextDueDate), addMonths(today, 3)))
    .sort((a, b) => new Date(a.nextDueDate!).getTime() - new Date(b.nextDueDate!).getTime());

  return `
Vaccination Status Report
Generated: ${format(today, 'MMMM d, yyyy')}

Summary:
- Completed Vaccinations: ${status.completed}
- Upcoming Vaccinations: ${status.upcoming}
- Overdue Vaccinations: ${status.overdue}
- Overall Compliance Rate: ${status.complianceRate}%

Upcoming Vaccinations (Next 3 Months):
${upcomingVaccinations.map(v => `- ${v.vaccineName}: Due ${format(new Date(v.nextDueDate!), 'MMMM d, yyyy')}`).join('\n')}

Recommendations:
${generateVaccinationRecommendations(status)}
  `.trim();
}

function generateVaccinationRecommendations(
  status: { completed: number; upcoming: number; overdue: number; complianceRate: number }
): string {
  const recommendations: string[] = [];

  if (status.overdue > 0) {
    recommendations.push('- Schedule overdue vaccinations immediately');
    recommendations.push('- Review vaccination schedule with healthcare provider');
  }

  if (status.upcoming > 0) {
    recommendations.push('- Plan upcoming vaccination appointments');
    recommendations.push('- Set reminders for due dates');
  }

  if (status.complianceRate < 90) {
    recommendations.push('- Discuss catch-up schedule with healthcare provider');
    recommendations.push('- Review vaccination history for gaps');
  }

  return recommendations.length > 0
    ? recommendations.join('\n')
    : '- Maintain current vaccination schedule\n- Continue regular check-ups';
}