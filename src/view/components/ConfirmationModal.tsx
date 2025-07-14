import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-900 text-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative border-2 border-primary-main animate-fade-in">
        <div className="flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-primary-light mb-2 drop-shadow-lg" />
          <h2 className="text-2xl font-extrabold mb-2 text-primary-light text-center drop-shadow">Sua inscrição foi confirmada!</h2>
          <p className="mb-4 text-center text-gray-200">Recebemos sua inscrição com sucesso.</p>
        </div>
        <ul className="mb-6 text-base text-gray-300 list-disc list-inside space-y-1">
          <li>Enviamos um <span className="text-primary-light font-semibold">e-mail de confirmação</span> para você. É possível que demore um pouco mais para chegar, mas não se preocupe, sua inscrição está confirmada.</li>
          <li>Fique atento à sua caixa de entrada e spam.</li>
          <li>Entre no nosso canal do <span className="text-primary-light font-semibold">Discord</span> para novidades e dúvidas:</li>
        </ul>
        <div className="flex justify-center mb-6">
          <a
            href="https://discord.gg/dPwaMwWxRJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary-light text-gray-900 font-bold px-5 py-2 rounded-xl shadow hover:bg-primary-main hover:text-white transition text-lg border-2 border-primary-main"
          >
            Acessar Discord
          </a>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-primary-main text-white py-2 rounded-xl font-bold hover:bg-primary-light hover:text-gray-900 transition border-2 border-primary-light shadow"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
