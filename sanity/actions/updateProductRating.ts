import { DocumentActionComponent } from 'sanity';

export const updateProductRatingAction: DocumentActionComponent = (props) => {
  const { type, draft, publish } = props;

  // Only run for product documents
  if (type !== 'product') {
    return null;
  }

  return {
    label: 'Publish & Update Rating',
    onHandle: async () => {
      // Get the reviews from draft
      const reviews = (draft as any)?.reviews || [];
      
      // Calculate average rating
      const averageRating = reviews.length > 0
        ? reviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0) / reviews.length
        : 0;

      // Update the draft with calculated values
      const updatedDraft = {
        ...draft,
        averageRating: Number(averageRating.toFixed(1)),
        reviewCount: reviews.length,
      };

      // Patch the document
      await props.patch.execute([
        { set: { averageRating: Number(averageRating.toFixed(1)) } },
        { set: { reviewCount: reviews.length } },
      ]);

      // Publish the document
      if (publish) {
        publish.onHandle?.();
      }
    },
  };
};
