export enum ProductReviewStateType {
  NoState = 0,
  Draft = 1,
  Pending = 2,
  Passed = 3,
  Rejected = 4
}

export const ProductReviewStateTypeMap: Map<number, string> = new Map<number, string>([
  [ProductReviewStateType.NoState, 'No State'],
  [ProductReviewStateType.Draft, 'Draft'],
  [ProductReviewStateType.Pending, 'Pending'],
  [ProductReviewStateType.Passed, 'Passed'],
  [ProductReviewStateType.Rejected, 'Rejected']
]);

export enum ProductUserReviewStateType {
  NoState = 0,
  Pending = 1,
  Passed = 2,
  Rejected = 3
}
