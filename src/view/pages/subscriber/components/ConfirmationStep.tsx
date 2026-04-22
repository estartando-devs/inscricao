import { CheckCircle2, ThumbsDown, ThumbsUp, XCircle } from "lucide-react";
import { KNOWN_FROM_OPTIONS, type KnownFrom } from "../store/sourceStore";
import {
  amplaConcorrenciaVagasPhrase,
  formatLimiteRendaPerCapita,
} from "@/constants/enrollmentCriteria";

type Course = { label: string; value: string };

type Props = {
  courses: Course[];
  acceptedPolicy: boolean;
  selectedCourse: string | null;
  availability: boolean | null;
  enquadramentoRendaPrioritaria: boolean | null;
  setAcceptedPolicy: (v: boolean) => void;
  setAvailability: (v: boolean) => void;
  setEnquadramentoRendaPrioritaria: (v: boolean) => void;
  knownFrom: KnownFrom | "";
  setKnownFrom: (v: KnownFrom | "") => void;
};

const KNOWN_FROM_LABELS: Record<KnownFrom, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  discord: "Discord",
  google: "Google",
  indicacao: "Indicação de amigo",
  evento: "Evento/comunidade",
  outro: "Outro",
};

export const ConfirmationStep = ({
  selectedCourse,
  availability,
  enquadramentoRendaPrioritaria,
  setAvailability,
  setEnquadramentoRendaPrioritaria,
  acceptedPolicy,
  setAcceptedPolicy,
  courses,
  knownFrom,
  setKnownFrom,
}: Props) => (
  <div className="flex flex-col items-center justify-center min-h-[120px] gap-6">
    {selectedCourse && (
      <span className="text-base sm:text-lg font-semibold text-primary-light mb-1 sm:mb-2">Curso escolhido: <span className="font-bold">{courses.find(c => c.value === selectedCourse)?.label}</span></span>
    )}
    <div className="flex flex-col items-center gap-4 w-full mt-4">
      <div className="w-full rounded-xl border border-gray-600 bg-gray-800/80 px-3 py-4 sm:px-5 sm:py-5 text-left text-sm sm:text-base text-gray-200 space-y-3">
        <p className="font-semibold text-primary-light">
          Sobre renda e vagas
        </p>
        <p>
          O EstartandoDevs foi criado para ampliar oportunidades em tecnologia para pessoas em situação de baixa renda.
          Reservamos também <span className="font-semibold text-gray-100">{amplaConcorrenciaVagasPhrase()}</span> em ampla concorrência.
        </p>
        <p className="text-gray-100 font-medium bg-gray-900/60 rounded-lg px-3 py-2 border border-gray-700">
          Critério de renda per capita da família: a soma de todos os rendimentos da família, dividida pelo número de moradores da residência,
          não pode ultrapassar <span className="text-primary-light">{formatLimiteRendaPerCapita()}</span>.
        </p>
        <p className="text-xs sm:text-sm text-gray-400">
          Essa informação é usada no processo seletivo. A declaração falsa pode implicar desclassificação, conforme o regulamento do programa.
        </p>
        <p className="font-semibold text-gray-100 pt-1">
          Considerando esse critério, você se enquadra no público prioritário?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center w-full">
          <button
            type="button"
            className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 w-full sm:w-28 h-24 sm:h-28 transition-all duration-200 text-center text-base font-semibold
              ${enquadramentoRendaPrioritaria === true ? "border-primary-light bg-primary-light/20" : "border-gray-400 bg-gray-800 hover:border-primary-light"}`}
            onClick={() => setEnquadramentoRendaPrioritaria(true)}
          >
            <CheckCircle2 size={36} className="mx-auto mb-1 text-primary-light" />
            Sim
          </button>
          <button
            type="button"
            className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 w-full sm:w-28 h-24 sm:h-28 transition-all duration-200 text-center text-base font-semibold
              ${enquadramentoRendaPrioritaria === false ? "border-red-400 bg-red-400/20" : "border-gray-400 bg-gray-800 hover:border-red-400"}`}
            onClick={() => setEnquadramentoRendaPrioritaria(false)}
          >
            <XCircle size={36} className="mx-auto mb-1 text-red-400" />
            Não
          </button>
        </div>
      </div>
      <div className="text-center bg-primary-light rounded px-2 py-3 sm:px-4">
        <span className="text-base sm:text-lg font-bold font-family-mono text-gray-800 block">
          Para terminar, uma informação importante: as aulas serão às terças e quintas, de 19h30 às 21h30. Você tem disponibilidade nesses dias e horário?
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mt-2 w-full">
        <button
          type="button"
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 w-full sm:w-28 h-24 sm:h-28 transition-all duration-200 text-center text-base sm:text-lg font-semibold
            ${availability === true ? "border-primary-light bg-primary-light/20" : "border-gray-400 bg-gray-800 hover:border-primary-light"}`}
          onClick={() => setAvailability(true)}
        >
          <ThumbsUp size={40} className="mx-auto mb-1 sm:mb-2 text-primary-light" />
          Sim
        </button>
        <button
          type="button"
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 w-full sm:w-28 h-24 sm:h-28 transition-all duration-200 text-center text-base sm:text-lg font-semibold
            ${availability === false ? "border-red-400 bg-red-400/20" : "border-gray-400 bg-gray-800 hover:border-red-400"}`}
          onClick={() => setAvailability(false)}
        >
          <ThumbsDown size={40} className="mx-auto mb-1 sm:mb-2 text-red-400" />
          Não
        </button>
      </div>
      <div className="w-full">
        <label htmlFor="knownFrom" className="text-base font-semibold text-primary-light block mb-2">
          Como você conheceu a EstartandoDevs?
        </label>
        <select
          id="knownFrom"
          className="w-full appearance-none rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 leading-6 text-base font-medium text-gray-100 transition focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light"
          value={knownFrom}
          onChange={(e) => setKnownFrom(e.target.value as KnownFrom | "")}
          required
        >
          <option value="" className="bg-gray-800 text-gray-300">
            Selecione uma opção
          </option>
          {KNOWN_FROM_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-gray-800 text-gray-100">
              {KNOWN_FROM_LABELS[option]}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center mt-4 w-full">
        <input
          id="privacy"
          type="checkbox"
          checked={acceptedPolicy}
          onChange={e => setAcceptedPolicy(e.target.checked)}
          className="mr-2 accent-primary-light w-4 h-4"
        />
        <label htmlFor="privacy" className="text-sm">
          Eu li e concordo com as <a href="https://docs.google.com/document/d/1xspDTj_BXuU599g0MP0jrSIknat15wEARxGGYWWZsPo/edit" target="_blank" className="underline text-primary-light hover:text-primary-main">Políticas de Privacidade</a>.
        </label>
      </div>
    </div>
  </div>
);
