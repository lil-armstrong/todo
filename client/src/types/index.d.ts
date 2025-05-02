type PartialExcept<T, K extends keyof T> = {
  [P in K]: T[P]; // these keys stay required
} & Partial<Omit<T, K>>; // others become optional
