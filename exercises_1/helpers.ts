export const valid = (argument: unknown): boolean => {
  return (
    (argument !== undefined || argument !== null)
    && !isNaN(Number(argument))
  );
};
