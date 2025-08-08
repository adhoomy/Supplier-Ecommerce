import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  actionHref?: string;
  actionOnClick?: () => void;
  className?: string;
}

export default function EmptyState({ 
  title, 
  description, 
  icon, 
  actionText, 
  actionHref, 
  actionOnClick, 
  className = '' 
}: EmptyStateProps) {
  return (
    <div className={`text-center py-8 sm:py-12 ${className}`}>
      {icon && (
        <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">{description}</p>
      {(actionText && actionHref) && (
        <Link
          href={actionHref}
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          {actionText}
        </Link>
      )}
      {(actionText && actionOnClick) && (
        <button
          onClick={actionOnClick}
          className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
