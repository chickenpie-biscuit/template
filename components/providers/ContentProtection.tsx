'use client';

import { useEffect } from 'react';

/**
 * ContentProtection Component
 * 
 * Prevents right-click context menu and image dragging to protect content.
 * This is a client-side deterrent - determined users can still access images
 * through browser dev tools, but this prevents casual copying.
 */
export default function ContentProtection({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      // Allow right-click in development for debugging
      if (process.env.NODE_ENV === 'development') return;
      
      e.preventDefault();
      return false;
    };

    // Prevent keyboard shortcuts for saving
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow in development
      if (process.env.NODE_ENV === 'development') return;
      
      // Prevent Ctrl+S, Ctrl+Shift+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
      }
      
      // Prevent Ctrl+Shift+I (DevTools) - optional, can be annoying
      // if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
      //   e.preventDefault();
      //   return false;
      // }
    };

    // Prevent drag on images
    const handleDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <div 
      className="select-none"
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
      onCopy={(e) => {
        // Prevent copying images
        if (process.env.NODE_ENV !== 'development') {
          e.preventDefault();
        }
      }}
    >
      {children}
    </div>
  );
}
