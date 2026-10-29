import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSkinScore,
  evaluateProductCompatibility,
  filterFoodsByCategoryAndPreferences,
  analyzeIngredientsDeterministic,
  validateAuthInput,
  SKINCARE_PRODUCTS,
  HEALTHY_FOODS,
  DEFAULT_PREFERENCES,
} from './skinLogic';

test('calculateSkinScore produces balanced score and label for default Rangga metrics', () => {
  const res = calculateSkinScore({
    kelembapan: 48,
    minyak: 72,
    tekstur: 62,
    pori: 68,
    jerawat: 45,
    kemerahan: 28,
  });
  assert.ok(res.score >= 65 && res.score <= 72, `Expected score near 68, got ${res.score}`);
  assert.equal(res.label, 'Cukup baik');
});

test('evaluateProductCompatibility flags products with Fragrance or Alkohol when user is sensitive', () => {
  const cerave = SKINCARE_PRODUCTS.find((p) => p.id === 'fw-cerave')!;
  const senka = SKINCARE_PRODUCTS.find((p) => p.id === 'fw-senka')!;

  const ceraveEval = evaluateProductCompatibility(cerave, DEFAULT_PREFERENCES);
  assert.equal(ceraveEval.isSafeForSensitivity, true);
  assert.equal(ceraveEval.warnings.length, 0);

  const senkaEval = evaluateProductCompatibility(senka, DEFAULT_PREFERENCES);
  assert.equal(senkaEval.isSafeForSensitivity, false);
  assert.ok(senkaEval.warnings.length >= 1);
  assert.ok(senkaEval.adjustedMatchScore < senka.matchScore);
});

test('filterFoodsByCategoryAndPreferences filters by category and detects allergen triggers', () => {
  const acneFoods = filterFoodsByCategoryAndPreferences(
    HEALTHY_FOODS,
    'Untuk Jerawat',
    DEFAULT_PREFERENCES
  );
  assert.ok(acneFoods.length >= 3);
  const salmon = acneFoods.find((f) => f.id === 'food-salmon')!;
  assert.equal(salmon.hasAllergyWarning, true);
  assert.deepEqual(salmon.matchedAllergens, ['Seafood']);
});

test('analyzeIngredientsDeterministic scores beneficial vs sensitizing ingredients accurately', () => {
  const safeRes = analyzeIngredientsDeterministic(
    'Niacinamide, Ceramide NP, Hyaluronic Acid, Centella Asiatica',
    DEFAULT_PREFERENCES
  );
  assert.ok(safeRes.overallScore >= 85);
  assert.equal(safeRes.verdict, 'Sangat Cocok');

  const riskyRes = analyzeIngredientsDeterministic(
    'Aqua, Alcohol Denat, Fragrance, Sodium Lauryl Sulfate (SLS)',
    DEFAULT_PREFERENCES
  );
  assert.ok(riskyRes.overallScore < 60);
  assert.equal(riskyRes.verdict, 'Tidak Disarankan');
});

test('validateAuthInput enforces required fields for login and register', () => {
  assert.equal(validateAuthInput('login', '', '12345').valid, false);
  assert.equal(validateAuthInput('register', 'rangga@mail.com', '12345', '').valid, false);
  assert.equal(validateAuthInput('register', 'rangga@mail.com', '12345', 'Rangga').valid, true);
});
