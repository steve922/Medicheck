const { db } = require('./db');

function getCompetitorRegistrationRatio(country) {
  // Placeholder logic
  const totalCompetitors = db.prepare('SELECT COUNT(*) as count FROM competitors WHERE country = ?').get(country).count;
  const registeredCompetitors = db.prepare('SELECT COUNT(*) as count FROM competitors WHERE country = ? AND reg_no IS NOT NULL').get(country).count;
  return totalCompetitors > 0 ? registeredCompetitors / totalCompetitors : 0;
}

function getHS9018Ratio(country) {
  // Placeholder logic for the last 12 months
  const ratio = db.prepare(
    "SELECT AVG(ratio) as avg_ratio FROM hs_stats WHERE country = ? AND hs_code = '9018' AND date(month || '-01') >= date('now', '-12 months')"
  ).get(country).avg_ratio;
  return ratio || 0;
}

function hasSensitiveKeywords(description) {
  const keywords = ['diagnosis', 'treatment'];
  const lowerCaseDescription = description.toLowerCase();
  return keywords.some(keyword => lowerCaseDescription.includes(keyword));
}

function getViolationRate(country) {
  // Placeholder logic for the last 3 years
  const rate = db.prepare(
    "SELECT COUNT(*) as count FROM events WHERE country = ? AND type = 'violation' AND date(date) >= date('now', '-3 years')"
  ).get(country).count;
  // This is a simplified placeholder. A real implementation would need more data.
  return rate > 10 ? 0.1 : 0.05; // Dummy violation rate
}

async function calcRisk(country, description) {
  const weights = {
    competitor: 0.3,
    hsCode: 0.25,
    keywords: 0.25,
    violations: 0.2,
  };

  const competitorRatio = getCompetitorRegistrationRatio(country);
  const hs9018Ratio = getHS9018Ratio(country);
  const containsKeywords = hasSensitiveKeywords(description);
  const violationRate = getViolationRate(country);

  const competitorScore = competitorRatio * 100;
  const hsCodeScore = hs9018Ratio * 100;
  const keywordsScore = containsKeywords ? 100 : 0;
  const violationsScore = violationRate * 100;

  const totalScore =
    competitorScore * weights.competitor +
    hsCodeScore * weights.hsCode +
    keywordsScore * weights.keywords +
    violationsScore * weights.violations;

  return {
    score: Math.round(totalScore),
    breakdown: {
      competitor: {
        value: `${(competitorRatio * 100).toFixed(1)}%`,
        score: competitorScore.toFixed(1),
        weight: weights.competitor,
      },
      hsCode: {
        value: `${(hs9018Ratio * 100).toFixed(1)}%`,
        score: hsCodeScore.toFixed(1),
        weight: weights.hsCode,
      },
      keywords: {
        value: containsKeywords ? 'Yes' : 'No',
        score: keywordsScore.toFixed(1),
        weight: weights.keywords,
      },
      violations: {
        value: `${(violationRate * 100).toFixed(1)}%`,
        score: violationsScore.toFixed(1),
        weight: weights.violations,
      },
    },
  };
}

module.exports = { calcRisk };
