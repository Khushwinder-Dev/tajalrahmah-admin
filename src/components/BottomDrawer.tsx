// components/ui/BottomDrawer.tsx
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import type { ReactNode } from "react";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxHeight?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  overlayClassName?: string;
}

const BottomDrawer = ({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = "max-h-96",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
  overlayClassName = "",
}: BottomDrawerProps) => {
  return (
    <>
      {/* Mobile Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden ${overlayClassName}`}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
        )}
      </AnimatePresence>

      {/* Mobile Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden pointer-events-none">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4,
              }}
              className={`w-full max-w-sm bg-white dark:bg-gray-800 rounded-t-xl shadow-xl pointer-events-auto ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  {title && (
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {title}
                    </h3>
                  )}
                  {!title && <div />}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      aria-label="Close drawer"
                    >
                      <ChevronUp size={24} />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className={`overflow-y-auto ${maxHeight}`}>{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomDrawer;
