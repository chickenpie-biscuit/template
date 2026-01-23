'use client';

import { Star } from 'lucide-react';

interface Review {
  author: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
  verified?: boolean;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating?: number;
}

export default function ProductReviews({ reviews = [], averageRating }: ProductReviewsProps) {
  if (reviews.length === 0) {
    return null;
  }

  const calculatedAverage = averageRating || 
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => Math.floor(r.rating) === rating).length,
    percentage: (reviews.filter(r => Math.floor(r.rating) === rating).length / reviews.length) * 100,
  }));

  return (
    <section className="py-16 bg-white border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <h2 className="font-heading font-bold uppercase text-3xl md:text-4xl text-black mb-8">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Rating Summary */}
          <div className="lg:col-span-1">
            <div className="border-4 border-black p-8 bg-cream">
              <div className="text-center mb-6">
                <div className="text-6xl font-heading font-bold text-black mb-2">
                  {calculatedAverage.toFixed(1)}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= calculatedAverage
                          ? 'fill-goldenrod text-goldenrod'
                          : 'text-black/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="font-body text-sm text-black/60">
                  Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="font-heading text-xs text-black/60 w-8">
                      {rating}★
                    </span>
                    <div className="flex-1 h-2 bg-black/10 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-goldenrod"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="font-heading text-xs text-black/60 w-8 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border-2 border-black p-6 bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-bold text-black">
                        {review.author}
                      </span>
                      {review.verified && (
                        <span className="px-2 py-0.5 bg-teal text-black text-[10px] font-heading font-bold uppercase">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-goldenrod text-goldenrod'
                              : 'text-black/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <time className="font-body text-xs text-black/40">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </div>

                {/* Review Title */}
                {review.title && (
                  <h3 className="font-heading font-bold text-lg text-black mb-2">
                    {review.title}
                  </h3>
                )}

                {/* Review Text */}
                <p className="font-body text-black/80 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
