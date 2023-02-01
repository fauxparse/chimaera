export type NoneOf<T> = {
  [K in keyof T]?: never;
};

export type ExactlyOneOf<T> = {
  [K in keyof T]: Omit<NoneOf<T>, K> & { [P in K]: T[P] };
}[keyof T];
