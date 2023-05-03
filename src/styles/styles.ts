export const lineClamp = (lines: number): string => {
  return `
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${lines};
    `;
};
