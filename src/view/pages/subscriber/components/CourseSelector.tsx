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

export const CourseSelector = ({ courses, selectedCourse, setSelectedCourse }: Props) => (
  <div className="flex flex-col items-center gap-4 sm:gap-6">
    <span className="text-base sm:text-lg font-semibold text-primary-light mb-1 sm:mb-2">Qual curso você quer fazer?</span>
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-md justify-center">
      {courses.map((course) => (
        <button
          type="button"
          key={course.value}
          className={`flex items-center gap-2 sm:gap-3 px-3 py-3 sm:px-6 sm:py-5 rounded-2xl border-2 font-semibold text-base sm:text-lg transition-all duration-200 w-full
            ${selectedCourse === course.value
              ? "bg-primary-light border-primary-light text-gray-900 shadow-lg scale-105"
              : "bg-gray-800 border-gray-700 text-white hover:bg-primary-main/30 hover:border-primary-main"}
          `}
          onClick={() => setSelectedCourse(course.value)}
        >
          {courseIcons[course.value]}
          <span>{course.label}</span>
        </button>
      ))}
    </div>
  </div>
);
