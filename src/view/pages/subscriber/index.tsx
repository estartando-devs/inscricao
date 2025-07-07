import { useMemo, useState } from "react";
import { Stepper } from "./components/Stepper";
import { CourseSelector } from "./components/CourseSelector";
import { PersonalDataForm } from "./components/PersonalDataForm";
import { AddressForm } from "./components/AddressForm";
import { ConfirmationStep } from "./components/ConfirmationStep";
import { AnimatePresence, motion } from "motion/react";
import { GraduationCap, User, MapPin, CheckCircle2 } from "lucide-react";
import { usePersonalDataStore } from "./store/personalDataStore";
import { useAddressStore } from "./store/addressStore";
import { personalDataSchema } from "./schemas/personalDataSchema";
import { addressSchema } from "./schemas/addressSchema";

const year = new Date().getFullYear();

const steps = [
  <GraduationCap key="curso" />,
  <User key="dados" />,
  <MapPin key="endereco" />,
  <CheckCircle2 key="confirmacao" />
];

const courses = [
  { label: "Desenvolvimento Web", value: "web" },
  { label: "Desenvolvimento Backend", value: "backend" },
  { label: "Design UI/UX", value: "design" },
];

export const Subscriber = () => {
  const [step, setStep] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const addressData = useAddressStore();
  const personalData = usePersonalDataStore();

  const isStepValid = useMemo(() => [
    !!selectedCourse,
    personalDataSchema.safeParse({
      name: personalData.name,
      email: personalData.email,
      birth: personalData.birth,
      phone: personalData.phone,
    }).success,
    addressSchema.safeParse({
      cep: addressData.cep,
      address: addressData.address,
      district: addressData.district,
      city: addressData.city,
    }).success,
    true,
  ], [selectedCourse, personalData, addressData]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white px-2 sm:px-4">

      <header className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-end justify-center rounded-b-3xl mb-8 pt-4 pb-3 sm:pt-6 sm:pb-4 bg-primary-light shadow-lg transition-all duration-500 max-w-3xl mx-auto">
        <svg width="1362" height="1362" viewBox="0 0 1362 1362" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 sm:h-14 w-auto mb-1 sm:mb-0">
        <circle cx="681" cy="681" r="681" fill="white"/>
        <path d="M666.148 550.871L505.785 637.688V731.183H552.112V664.401L666.148 602.825L729.148 637.688L619.948 699.461L664.621 724.505L826.512 637.688L666.148 550.871Z" fill="#606062"/>
        <path d="M552.112 764.797H505.785V853.284L666.148 942.053L826.512 853.425L780.694 824.901L666.148 887.043L552.112 824.901V764.797Z" fill="#606062"/>
        <path d="M459.967 731.179H414.149V582.956L667.676 443.902L872.331 555.451V333.882L918.149 309.433V731.179H870.803V607.406L667.676 495.857L459.967 610.462V731.179Z" fill="#81CAA8"/>
        <path d="M459.967 764.797H414.148V906.908L667.676 1044.43L918.148 906.908V764.797H872.33V880.93L664.621 992.479L459.967 879.402V764.797Z" fill="#81CAA8"/>
        </svg>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-700 font-family-mono tracking-tight drop-shadow-md text-center sm:text-left">Inscrições {year}</h1>
      </header>

      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl p-4 sm:p-8 space-y-8 bg-gray-900 rounded-3xl border border-gray-700 mx-auto">
        <Stepper
          step={step}
          steps={steps}
          onStepClick={setStep}
          isStepEnabled={(idx) => idx < step || isStepValid.slice(0, idx).every(Boolean)}
        />
        <form onSubmit={e => { e.preventDefault(); }}>
          <AnimatePresence mode="wait" initial={false}>
            {step === 0 && (
              <motion.div
                key="step-0"
                exit={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
              >
                <CourseSelector courses={courses} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div
                key="step-1"
                exit={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
              >
                <PersonalDataForm />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step-2"
                exit={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
              >
                <AddressForm />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step-3"
                exit={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
              >
                <ConfirmationStep
                  courses={courses}
                  availability={availability}
                  selectedCourse={selectedCourse}
                  acceptedPolicy={acceptedPolicy}
                  setAvailability={setAvailability}
                  setAcceptedPolicy={setAcceptedPolicy}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row justify-between pt-6 gap-4">
            <button
              type="button"
              className="btn bg-gray-700 text-gray-300 rounded-xl px-6 py-3 font-semibold shadow-sm w-full sm:w-auto disabled:text-gray-400/30"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Voltar
            </button>
            {step < 3 ? (
              <button
                type="button"
                className="btn font-bold bg-primary-light text-gray-900 hover:bg-primary-main rounded-xl px-8 py-3 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto disabled:text-gray-400/30"
                onClick={() => setStep((s) => Math.min(3, s + 1))}
                disabled={!isStepValid[step]}
              >
                Continuar
              </button>
            ) : (
              <button
                type="submit"
                className="btn font-bold bg-primary-light text-gray-900 hover:bg-primary-main rounded-xl px-8 py-3 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto  disabled:text-gray-400/30"
                disabled={availability !== true || !acceptedPolicy}
              >
                Finalizar inscrição
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
