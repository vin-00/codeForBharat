/**
 * Calculates the average score from an array of category scores
 * @param {Array} scores - Array of objects containing score information
 * @returns {number} - The average score rounded to 2 decimal places
 */
function calculateAverageScore(scores) {
  // Check if scores is an array and not empty
  if (!Array.isArray(scores) || scores.length === 0) {
    return 0;
  }
  
  // Sum all the scores
  const totalScore = scores.reduce((sum, category) => {
    // Ensure the score is a number
    const score = typeof category.score === 'number' ? category.score : 0;
    return sum + score;
  }, 0);
  
  // Calculate the average
  const averageScore = totalScore / scores.length;
  
  // Round to 2 decimal places
  return Math.round(averageScore * 100) / 100;
}

export default calculateAverageScore ;