import { Code2, Server, Palette } from "lucide-react";

type Course = { label: string; value: string };

type Props = {
  courses: Course[];
  selectedCourse: string | null;
  setSelectedCourse: (v: string) => void;
};

const courseIcons: Record<string, React.ReactNode> = {
  "Desenvolvimento Web": <Code2 className="w-6 h-6 mr-2" />,
  "Desenvolvimento Backend": <Server className="w-6 h-6 mr-2" />,
  "Design UI/UX": <Palette className="w-6 h-6 mr-2" />,
};

const courseRequirements: Record<string, React.ReactNode> = {
  "Design UI/UX": (
    <div className="space-y-3 text-left text-sm sm:text-base">
      <ul className="list-disc ml-6">
        <li>Conhecer as etapas do processo de design (Imersão, Definição, Ideação, Prototipação).</li>
        <li>Familiaridade com ferramentas e métodos como Personas, Jornada do Usuário, Benchmarking, Moodboard.</li>
        <li>Entender fundamentos de UI: cores, tipografia, ícones, navegação, botões, hierarquia visual.</li>
        <li>Experiência básica com Figma, Adobe XD ou similares (criação de wireframes e protótipos).</li>
      </ul>
    </div>
  ),
  "Desenvolvimento Backend": (
    <div className="space-y-3 text-left text-sm sm:text-base">
      <ul className="list-disc ml-6">
        <li>Lógica de programação: variáveis, condicionais, laços e funções.</li>
        <li>C#: Sintaxe básica, tipos de dados e estruturas simples.</li>
        <li>Banco de dados relacional: tabelas, consultas básicas (SQL).</li>
        <li>APIs e REST: conceito de endpoints, requisições e respostas.</li>
      </ul>
    </div>
  ),
  "Desenvolvimento Web": (
    <div className="space-y-3 text-left text-sm sm:text-base">
      <ul className="list-disc ml-6">
        <li>HTML: Estrutura básica, principais tags e atributos.</li>
        <li>CSS: Seletores, propriedades básicas, margin, padding, border, e media queries.</li>
        <li>JavaScript: Tipos primitivos, var/let/const, condicionais, laços, funções e métodos de array (.map, .filter, .find, forEach).</li>
      </ul>
    </div>
  ),
};

export const CourseSelector = ({ courses, selectedCourse, setSelectedCourse }: Props) => {
  // O estado agora controla qual accordion está aberto
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      <span className="text-base sm:text-lg font-semibold text-primary-light mb-1 sm:mb-2">Qual curso você quer fazer?</span>
      <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-md justify-center">
        {courses.map((course) => {
          const isOpen = selectedCourse === course.value;
          return (
            <div key={course.value} className="w-full">
              <button
                type="button"
                className={`flex items-center justify-between gap-2 sm:gap-3 px-3 py-3 sm:px-6 sm:py-5 rounded-2xl border-2 font-semibold text-base sm:text-lg transition-all duration-200 w-full
                  ${isOpen
                    ? "bg-primary-light border-primary-light text-gray-900 shadow-lg scale-105"
                    : "bg-gray-800 border-gray-700 text-white hover:bg-primary-main/30 hover:border-primary-main"}
                `}
                onClick={() => setSelectedCourse(isOpen ? '' : course.value)}
                aria-expanded={isOpen}
                aria-controls={`requirements-${course.value}`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {courseIcons[course.value]}
                  <span>{course.label}</span>
                </div>
                <svg
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`requirements-${course.value}`}
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] py-4 opacity-100" : "max-h-0 opacity-0"}`}
                aria-hidden={!isOpen}
              >
                <div className="bg-gray-800 border border-primary-light rounded-2xl mt-2 px-4 py-4 sm:px-6 sm:py-6 text-white shadow-inner">
                  <h3 className="text-lg sm:text-xl font-semibold text-primary-light mb-2">Pré-requisitos</h3>
                  {courseRequirements[course.value]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
