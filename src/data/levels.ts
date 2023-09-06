export function* generateLevels() {
  let requiredIngredients = 1;
  let enableMisses = true;
  while (requiredIngredients < 7) {
    yield [requiredIngredients, enableMisses];
    enableMisses = !enableMisses;
    if (enableMisses) {
      requiredIngredients++;
    }
  }
}
