const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(1022),
  tablet: customMediaQuery(768),
  phone: customMediaQuery(576),
};

export default media;
