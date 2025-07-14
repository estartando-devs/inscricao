import { FC } from "react";
import { X } from "lucide-react";

interface RequirementsModalProps {
  open: boolean;
  onClose: () => void;
}

export const RequirementsModal: FC<RequirementsModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10 max-w-2xl w-full mx-4">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-primary-light transition-colors"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X size={28} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">Para se inscrever você precisa:</h2>
        <ul className="space-y-3 text-base text-gray-100 mb-8 list-disc list-inside">
          <li>Estar cursando ou ter concluído o 3º ano do <span className="text-primary-light font-semibold">Ensino médio</span>;</li>
          <li>
            Desejar ingressar na  <span className="text-primary-light font-semibold"> área de tecnologia</span> ou realizar  <span className="text-primary-light font-semibold">transição de carreira</span>;
          </li>
          <li>
            Estar incluído em situação de <span className="text-primary-light font-semibold">vulnerabilidade social e econômica</span>.
          </li>
          <li>
            Atender aos <span className="text-primary-light font-semibold">pré-requisitos</span> de cada curso.
          </li>
        </ul>
        <button
          className="bg-primary-light text-gray-900 font-bold rounded-xl px-8 py-3 shadow-md hover:bg-primary-main transition-all w-full sm:w-auto"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
