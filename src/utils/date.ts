export function getOperationDate(date: Date): string {
  const today = new Date().toLocaleDateString();
  const operationDate = date.toLocaleDateString();

  if (today === operationDate) {
    return date.toLocaleTimeString();
  }

  return `${operationDate} at ${date.toLocaleTimeString()}`;
}