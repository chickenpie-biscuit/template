import { DocumentActionComponent, DocumentActionProps } from 'sanity';
import { SyncIcon } from '@sanity/icons';
import { useState } from 'react';

/**
 * Document action to sync a merch-drop feedPost to a product in the shop
 * This creates or updates a product based on the feedPost data
 */
export const syncMerchDropToProduct: DocumentActionComponent = (props: DocumentActionProps) => {
  const { id, type, draft, published } = props;
  const [isLoading, setIsLoading] = useState(false);
  
  // Only show for feedPost documents
  if (type !== 'feedPost') {
    return null;
  }

  // Get the document data (prefer draft over published)
  const doc = draft || published;
  
  // Only show for merch-drops category
  if (!doc || doc.category !== 'merch-drops') {
    return null;
  }

  // Check if required fields are present
  const hasRequiredFields = doc.title && doc.slug?.current && doc.price;

  return {
    label: doc.syncedProduct ? 'Sync to Product' : 'Create Product',
    icon: SyncIcon,
    tone: 'positive' as const,
    disabled: !hasRequiredFields || isLoading,
    title: !hasRequiredFields 
      ? 'Please fill in title, slug, and price before syncing' 
      : undefined,
    onHandle: async () => {
      setIsLoading(true);
      
      try {
        // Get the base URL for the API call
        const baseUrl = window.location.origin;
        
        const response = await fetch(`${baseUrl}/api/sync-merch-product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            feedPostId: id,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to sync product');
        }

        // Trigger a refresh to show the updated syncedProduct reference
        window.location.reload();
      } catch (error) {
        console.error('Error syncing product:', error);
        alert(`Failed to sync product: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    },
  };
};
