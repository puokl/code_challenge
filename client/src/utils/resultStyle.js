export function highlightTestResults(text) {
  const failRegex = /FAIL/g;
  const failSymbolRegex = /✕/g;
  const failedRegex = /\d+ failed/g;
  const passRegex = /PASS/g;
  const passSymbolRegex = /✓/g;
  const passedRegex = /\d+ passed/g;

  return text
    .replace(failRegex, '<span class="text-red-500">FAIL</span>')
    .replace(failSymbolRegex, '<span class="text-red-500">✕</span>')
    .replace(
      failedRegex,
      (match) => `<span class="text-red-500">${match}</span>`
    )
    .replace(passRegex, '<span class="text-green-500">PASS</span>')
    .replace(passSymbolRegex, '<span class="text-green-500">✓</span>')
    .replace(
      passedRegex,
      (match) => `<span class="text-green-500">${match}</span>`
    );
}
