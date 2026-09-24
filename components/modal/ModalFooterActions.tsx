interface ModalFooterActionsProps {
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ModalFooterActions({
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: ModalFooterActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onCancel}
        className="flex-1 px-4 py-2.5 text-gray-700 font-semibold border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors whitespace-nowrap"
      >
        {cancelText}
      </button>
      <button
        onClick={onConfirm}
        className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold hover:bg-blue-700 rounded-xl transition-colors whitespace-nowrap"
      >
        {confirmText}
      </button>
    </div>
  );
}