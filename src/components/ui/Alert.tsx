import { Check, AlertCircle, X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function Alert({ type, message, onClose, className }: AlertProps) {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200',
          icon: 'text-green-600',
          text: 'text-green-800',
          iconComponent: Check,
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200',
          icon: 'text-red-600',
          text: 'text-red-800',
          iconComponent: AlertCircle,
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200',
          icon: 'text-yellow-600',
          text: 'text-yellow-800',
          iconComponent: AlertCircle,
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200',
          icon: 'text-blue-600',
          text: 'text-blue-800',
          iconComponent: AlertCircle,
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200',
          icon: 'text-gray-600',
          text: 'text-gray-800',
          iconComponent: AlertCircle,
        };
    }
  };

  const styles = getAlertStyles();
  const IconComponent = styles.iconComponent;

  return (
    <div className={`border rounded-md p-4 flex items-center gap-2 ${styles.container} ${className || ''}`}>
      <IconComponent className={styles.icon} size={20} />
      <span className={`flex-1 ${styles.text}`}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className={`${styles.icon} hover:opacity-70 transition-opacity`}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
} 