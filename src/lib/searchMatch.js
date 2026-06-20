const normalize = (value) => String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function editDistance(left, right) {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = row[0];
    row[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = row[rightIndex];
      row[rightIndex] = Math.min(
        row[rightIndex] + 1,
        row[rightIndex - 1] + 1,
        diagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
      diagonal = above;
    }
  }
  return row[right.length];
}

export function matchesSearch(query, values) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return true;
  const queryWords = normalizedQuery.split(' ');

  return values.some((value) => {
    const candidate = normalize(value);
    if (!candidate) return false;
    if (candidate.includes(normalizedQuery) || normalizedQuery.includes(candidate)) return true;
    const candidateWords = candidate.split(' ');
    return queryWords.every((queryWord) => candidateWords.some((candidateWord) => {
      if (candidateWord.includes(queryWord) || queryWord.includes(candidateWord)) return true;
      const tolerance = queryWord.length >= 7 ? 2 : queryWord.length >= 4 ? 1 : 0;
      return editDistance(queryWord, candidateWord) <= tolerance;
    }));
  });
}
