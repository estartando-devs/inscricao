import { useMemo, useState } from "react";
import { Stepper } from "./components/Stepper";
import { CourseSelector } from "./components/CourseSelector";
import { PersonalDataForm } from "./components/PersonalDataForm";
import { AddressForm } from "./components/AddressForm";
import { ConfirmationStep } from "./components/ConfirmationStep";
import { AnimatePresence, motion } from "motion/react";
import { GraduationCap, User, MapPin, CheckCircle2, Briefcase, MessageCircle, XCircle } from "lucide-react";
import { usePersonalDataStore } from "./store/personalDataStore";
import { useAddressStore } from "./store/addressStore";
import { useExperienceStore } from "./store/experienceStore";
import { useReasonStore } from "./store/reasonStore";
import { personalDataSchema } from "./schemas/personalDataSchema";
import { addressSchema } from "./schemas/addressSchema";
import { experienceSchema } from "./schemas/experienceSchema";
import { reasonSchema } from "./schemas/reasonSchema";
import { createSubscription } from "@/app/services/createSubscriptions";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { ConfirmationModal } from "@/view/components/ConfirmationModal";
import { notifyDiscord } from "@/app/services/notifyDiscord";
import { ExperienceForm } from "./components/ExperienceForm";
import { ReasonForm } from "./components/ReasonForm";
import { RequirementsModal } from "./components/RequirementsModal";

const year = new Date().getFullYear();

const steps = [
  <GraduationCap key="curso" />, // 0
  <User key="dados" />,          // 1
  <MapPin key="endereco" />,     // 2
  <Briefcase key="experiencia" />, // 3
  <MessageCircle key="motivo" />,  // 4
  <CheckCircle2 key="confirmacao" /> // 5
];

const courses = [
  { label: "Desenvolvimento Web", value: "Desenvolvimento Web" },
  { label: "Desenvolvimento Backend", value: "Desenvolvimento Backend" },
  { label: "Design UI/UX", value: "Design UI/UX" },
];

// ErrorModal: modal para exibir erros ao finalizar inscrição
function ErrorModal({ open, onClose, title, message }: { open: boolean; onClose: () => void; title: string; message: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-900 text-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative border-2 border-red-400 animate-fade-in">
        <div className="flex flex-col items-center">
          <XCircle className="w-16 h-16 text-red-400 mb-2 drop-shadow-lg" />
          <h2 className="text-2xl font-extrabold mb-2 text-red-400 text-center drop-shadow">{title}</h2>
          <p className="mb-2 text-center text-gray-200 font-semibold">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-red-400 text-gray-900 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition border-2 border-red-400 shadow mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export const Subscriber = () => {
  const [step, setStep] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState("");

  const addressData = useAddressStore();
  const personalData = usePersonalDataStore();
  const experienceData = useExperienceStore();
  const reasonData = useReasonStore();

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
    experienceSchema.safeParse({ experience: experienceData.experience }).success,
    reasonSchema.safeParse({ reason: reasonData.reason }).success,
    true,
  ], [selectedCourse, personalData, addressData, experienceData, reasonData]);

  const errorMap: { [key: string]: { title: string; message: string } } = {
    'inscrições ainda não estão abertas': {
      title: 'Inscrições em Breve',
      message: 'As inscrições ainda não começaram. Fique de olho nas nossas redes para não perder a abertura!'
    },
    'inscrições foram encerradas': {
      title: 'Inscrições Encerradas',
      message: 'O período de inscrições já foi encerrado. Agradecemos muito seu interesse!'
    },
    'já realizou sua inscrição': {
      title: 'E-mail Já Cadastrado',
      message: 'Você já se inscreveu para este curso! Se precisar atualizar algum dado, fale com nosso suporte no discord.'
    },
    'Preencha todos os campos obrigatórios': {
      title: 'Campos Obrigatórios',
      message: 'Por favor, preencha todos os campos obrigatórios antes de finalizar.'
    },
  };

  async function handleSubmit() {
    if (step !== 5) return;

    setLoading(true);
    try {
      if (!selectedCourse || availability !== true || !acceptedPolicy) {
        toast.error("Preencha todos os campos obrigatórios.");
        setLoading(false);
        return;
      }
      const payload = {
        city: addressData.city,
        phone: personalData.phone,
        email: personalData.email,
        course: selectedCourse,
        address: addressData.address,
        fullName: personalData.name,
        zipCode: addressData.cep,
        district: addressData.district,
        birthDate: personalData.birth,
        experience: experienceData.experience,
        reason: reasonData.reason,
        acceptedTerms: acceptedPolicy,
        availableForClasses: availability,
      };
      await createSubscription(payload);
      setShowConfirmation(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

      await notifyDiscord({
        city: addressData.city,
        course: selectedCourse,
        fullName: personalData.name,
        neighborhood: addressData.district,
      });
    } catch (err) {
      let title = "Ops! Algo não saiu como esperado 😥";
      let msg = "Houve um erro ao enviar sua inscrição. Por favor, tente novamente.";
      if (err instanceof Error && err.message) {
        // Busca por uma chave do mapeamento que esteja contida na mensagem de erro
        const found = Object.keys(errorMap).find((key) => err.message.includes(key));
        if (found) {
          title = errorMap[found].title;
          msg = errorMap[found].message;
        } else {
          // Se vier uma mensagem do backend mais amigável, exibe ela
          msg = err.message;
        }
      }
      setErrorTitle(title);
      setErrorMessage(msg);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white px-2 sm:px-4">
      <RequirementsModal open={showRequirementsModal} onClose={() => setShowRequirementsModal(false)} />
      <ConfirmationModal open={showConfirmation} onClose={() => setShowConfirmation(false)} />
      <ErrorModal open={showError} onClose={() => setShowError(false)} title={errorTitle} message={errorMessage} />

      <header className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-b-3xl mb-8 transition-all duration-500 max-w-3xl mx-auto px-2 sm:px-4 py-3 sm:py-4 bg-gray-900">
        <div className="flex items-center gap-2 sm:gap-4">
          <svg width="950" height="285" viewBox="0 0 950 285" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-14 w-auto" >
<path d="M97.9688 93.6175L35.625 127.281V163.534H53.6354V137.639L97.9688 113.763L122.461 127.281L80.0078 151.234L97.375 160.945L160.312 127.281L97.9688 93.6175Z" fill="#606062"/>
<path d="M53.6354 176.57H35.625V210.881L97.9688 245.301L160.312 210.935L142.5 199.875L97.9688 223.971L53.6354 199.875V176.57Z" fill="#606062"/>
<path d="M17.8125 163.534H0V106.06L98.5625 52.1414L178.125 95.395V9.48025L195.938 0V163.534H177.531V115.541L98.5625 72.2869L17.8125 116.726V163.534Z" fill="#81CAA8"/>
<path d="M17.8125 176.57H0V231.673L98.5625 285L195.938 231.673V176.57H178.125V221.601L97.375 264.854L17.8125 221.008V176.57Z" fill="#81CAA8"/>
<path d="M511.415 232.204C513.766 232.204 515.69 232.026 517.186 231.669C518.754 231.242 520 230.707 520.927 230.066C521.853 229.354 522.494 228.534 522.85 227.608C523.207 226.682 523.385 225.649 523.385 224.509C523.385 222.086 522.245 220.091 519.965 218.524C517.685 216.885 513.766 215.139 508.209 213.287C505.786 212.432 503.364 211.47 500.941 210.401C498.519 209.261 496.345 207.872 494.422 206.233C492.498 204.523 490.93 202.492 489.719 200.141C488.508 197.719 487.902 194.797 487.902 191.377C487.902 187.957 488.544 184.894 489.826 182.186C491.109 179.407 492.925 177.056 495.277 175.132C497.628 173.209 500.478 171.748 503.827 170.751C507.175 169.682 510.952 169.147 515.155 169.147C520.143 169.147 524.454 169.682 528.087 170.751C531.721 171.819 534.714 172.995 537.065 174.277L532.255 187.423C530.189 186.354 527.874 185.428 525.309 184.644C522.815 183.789 519.787 183.362 516.224 183.362C512.234 183.362 509.349 183.932 507.567 185.072C505.857 186.141 505.002 187.815 505.002 190.095C505.002 191.449 505.323 192.589 505.964 193.515C506.605 194.441 507.496 195.296 508.636 196.08C509.847 196.792 511.201 197.469 512.697 198.111C514.265 198.681 515.975 199.286 517.827 199.927C521.675 201.352 525.024 202.777 527.874 204.202C530.724 205.556 533.075 207.159 534.927 209.012C536.851 210.864 538.276 213.037 539.202 215.531C540.129 218.025 540.592 221.053 540.592 224.616C540.592 231.527 538.169 236.906 533.324 240.754C528.479 244.53 521.176 246.418 511.415 246.418C508.137 246.418 505.18 246.204 502.544 245.777C499.908 245.421 497.557 244.957 495.49 244.387C493.495 243.817 491.75 243.212 490.254 242.571C488.829 241.929 487.617 241.324 486.62 240.754L491.322 227.501C493.531 228.712 496.239 229.817 499.445 230.814C502.722 231.741 506.712 232.204 511.415 232.204Z" fill="#81CAA8"/>
<path d="M438.24 244.922C435.318 238.723 432.433 232.275 429.583 225.577C426.733 218.88 424.025 212.254 421.46 205.699C418.895 199.144 416.508 192.874 414.3 186.889C412.162 180.904 410.31 175.56 408.742 170.857H427.125C428.55 175.132 430.082 179.764 431.72 184.751C433.43 189.667 435.14 194.584 436.85 199.5C438.632 204.416 440.342 209.119 441.98 213.607C443.619 218.096 445.151 221.979 446.576 225.257C447.93 221.979 449.426 218.096 451.065 213.607C452.775 209.119 454.485 204.416 456.195 199.5C457.976 194.584 459.686 189.667 461.325 184.751C463.035 179.764 464.602 175.132 466.027 170.857H483.768C482.13 175.56 480.242 180.904 478.104 186.889C475.967 192.874 473.615 199.144 471.05 205.699C468.485 212.254 465.778 218.88 462.928 225.577C460.078 232.275 457.192 238.723 454.271 244.922H438.24Z" fill="#81CAA8"/>
<path d="M352.399 244.922V170.857H402.417V184.858H369.072V199.393H398.676V213.073H369.072V230.921H404.875V244.922H352.399Z" fill="#81CAA8"/>
<path d="M292.41 231.349C293.193 231.42 294.084 231.491 295.081 231.562C296.15 231.562 297.397 231.562 298.822 231.562C307.158 231.562 313.321 229.461 317.311 225.257C321.373 221.053 323.403 215.246 323.403 207.836C323.403 200.07 321.48 194.192 317.632 190.202C313.785 186.212 307.693 184.217 299.356 184.217C298.216 184.217 297.041 184.252 295.83 184.324C294.618 184.324 293.478 184.395 292.41 184.537V231.349ZM340.61 207.836C340.61 214.249 339.613 219.842 337.618 224.616C335.623 229.389 332.773 233.344 329.068 236.479C325.434 239.614 320.981 241.965 315.708 243.532C310.436 245.1 304.522 245.884 297.967 245.884C294.975 245.884 291.483 245.741 287.493 245.456C283.503 245.242 279.585 244.744 275.737 243.96V171.819C279.585 171.107 283.575 170.644 287.707 170.43C291.911 170.145 295.509 170.002 298.501 170.002C304.843 170.002 310.578 170.715 315.708 172.14C320.91 173.565 325.363 175.809 329.068 178.873C332.773 181.937 335.623 185.856 337.618 190.629C339.613 195.403 340.61 201.139 340.61 207.836Z" fill="#81CAA8"/>
<path d="M893.068 83.1487C893.068 86.7825 893.495 90.06 894.35 92.9812C895.277 95.9025 896.559 98.4318 898.198 100.569C899.908 102.636 901.974 104.239 904.397 105.379C906.819 106.519 909.598 107.089 912.733 107.089C915.797 107.089 918.54 106.519 920.962 105.379C923.456 104.239 925.522 102.636 927.161 100.569C928.871 98.4318 930.154 95.9025 931.009 92.9812C931.935 90.06 932.398 86.7825 932.398 83.1487C932.398 79.515 931.935 76.2375 931.009 73.3162C930.154 70.3237 928.871 67.7943 927.161 65.7281C925.522 63.5906 923.456 61.9518 920.962 60.8118C918.54 59.6718 915.797 59.1018 912.733 59.1018C909.598 59.1018 906.819 59.7075 904.397 60.9187C901.974 62.0587 899.908 63.6975 898.198 65.835C896.559 67.9012 895.277 70.4306 894.35 73.4231C893.495 76.3443 893.068 79.5862 893.068 83.1487ZM949.605 83.1487C949.605 89.49 948.643 95.0831 946.719 99.9281C944.867 104.702 942.302 108.727 939.024 112.005C935.747 115.211 931.828 117.634 927.268 119.272C922.779 120.911 917.934 121.731 912.733 121.731C907.674 121.731 902.9 120.911 898.412 119.272C893.923 117.634 890.004 115.211 886.655 112.005C883.307 108.727 880.67 104.702 878.747 99.9281C876.823 95.0831 875.861 89.49 875.861 83.1487C875.861 76.8075 876.859 71.25 878.854 66.4762C880.849 61.6312 883.52 57.57 886.869 54.2925C890.289 51.015 894.208 48.5568 898.625 46.9181C903.114 45.2793 907.817 44.46 912.733 44.46C917.792 44.46 922.565 45.2793 927.054 46.9181C931.543 48.5568 935.462 51.015 938.81 54.2925C942.159 57.57 944.795 61.6312 946.719 66.4762C948.643 71.25 949.605 76.8075 949.605 83.1487Z" fill="#81CAA8"/>
<path d="M819.078 106.661C819.862 106.732 820.752 106.804 821.75 106.875C822.819 106.875 824.065 106.875 825.49 106.875C833.827 106.875 839.99 104.773 843.98 100.569C848.041 96.3656 850.072 90.5587 850.072 83.1487C850.072 75.3825 848.148 69.5043 844.3 65.5143C840.453 61.5243 834.361 59.5293 826.025 59.5293C824.885 59.5293 823.709 59.565 822.498 59.6362C821.287 59.6362 820.147 59.7075 819.078 59.85V106.661ZM867.279 83.1487C867.279 89.5612 866.281 95.1543 864.286 99.9281C862.291 104.702 859.441 108.656 855.736 111.791C852.102 114.926 847.649 117.277 842.377 118.845C837.104 120.412 831.19 121.196 824.635 121.196C821.643 121.196 818.152 121.054 814.162 120.769C810.172 120.555 806.253 120.056 802.405 119.272V47.1318C806.253 46.4193 810.243 45.9562 814.375 45.7425C818.579 45.4575 822.177 45.315 825.17 45.315C831.511 45.315 837.247 46.0275 842.377 47.4525C847.578 48.8775 852.031 51.1218 855.736 54.1856C859.441 57.2493 862.291 61.1681 864.286 65.9418C866.281 70.7156 867.279 76.4512 867.279 83.1487Z" fill="#81CAA8"/>
<path d="M773.457 120.234C768.684 111.756 763.518 103.384 757.96 95.1187C752.403 86.8537 746.489 79.0518 740.219 71.7131V120.234H723.76V46.17H737.334C739.685 48.5212 742.285 51.4068 745.135 54.8268C747.985 58.2468 750.871 61.9162 753.792 65.835C756.785 69.6825 759.742 73.7081 762.663 77.9118C765.584 82.0443 768.327 86.0343 770.892 89.8818V46.17H787.458V120.234H773.457Z" fill="#81CAA8"/>
<path d="M698.463 120.234C697.679 117.669 696.788 115.033 695.791 112.326C694.865 109.618 693.938 106.911 693.012 104.203H664.156C663.23 106.911 662.268 109.618 661.27 112.326C660.344 115.033 659.489 117.669 658.705 120.234H641.392C644.17 112.254 646.807 104.88 649.3 98.1112C651.794 91.3425 654.217 84.9656 656.568 78.9806C658.99 72.9956 661.342 67.3312 663.622 61.9875C665.973 56.5725 668.395 51.3 670.889 46.17H686.813C689.236 51.3 691.623 56.5725 693.974 61.9875C696.325 67.3312 698.677 72.9956 701.028 78.9806C703.45 84.9656 705.908 91.3425 708.402 98.1112C710.896 104.88 713.532 112.254 716.311 120.234H698.463ZM678.477 62.9493C678.121 64.0181 677.587 65.4787 676.874 67.3312C676.162 69.1837 675.342 71.3212 674.416 73.7437C673.49 76.1662 672.457 78.8381 671.317 81.7593C670.248 84.6806 669.143 87.7443 668.003 90.9506H689.058C687.918 87.7443 686.813 84.6806 685.745 81.7593C684.676 78.8381 683.643 76.1662 682.645 73.7437C681.719 71.3212 680.9 69.1837 680.187 67.3312C679.475 65.4787 678.905 64.0181 678.477 62.9493Z" fill="#81CAA8"/>
<path d="M649.062 46.17V60.3843H626.725V120.234H610.053V60.3843H587.716V46.17H649.062Z" fill="#81CAA8"/>
<path d="M547.721 45.315C558.836 45.315 567.35 47.31 573.264 51.3C579.177 55.2187 582.134 61.3462 582.134 69.6825C582.134 74.8837 580.923 79.1231 578.501 82.4006C576.149 85.6068 572.729 88.1362 568.241 89.9887C569.737 91.8412 571.304 93.9787 572.943 96.4012C574.582 98.7525 576.185 101.246 577.752 103.882C579.391 106.447 580.959 109.155 582.455 112.005C583.951 114.784 585.341 117.527 586.623 120.234H567.92C566.566 117.812 565.177 115.354 563.752 112.86C562.398 110.366 560.973 107.944 559.477 105.592C558.052 103.241 556.627 101.032 555.202 98.9662C553.777 96.8287 552.352 94.905 550.927 93.195H542.697V120.234H526.025V47.2387C529.659 46.5262 533.399 46.0275 537.247 45.7425C541.166 45.4575 544.657 45.315 547.721 45.315ZM548.682 59.5293C547.471 59.5293 546.367 59.565 545.369 59.6362C544.443 59.7075 543.552 59.7787 542.697 59.85V79.9425H547.4C553.67 79.9425 558.159 79.1587 560.866 77.5912C563.574 76.0237 564.927 73.3518 564.927 69.5756C564.927 65.9418 563.538 63.3768 560.759 61.8806C558.052 60.3131 554.026 59.5293 548.682 59.5293Z" fill="#81CAA8"/>
<path d="M500.727 120.234C499.944 117.669 499.053 115.033 498.055 112.326C497.129 109.618 496.203 106.911 495.277 104.203H466.42C465.494 106.911 464.532 109.618 463.535 112.326C462.609 115.033 461.754 117.669 460.97 120.234H443.656C446.435 112.254 449.071 104.88 451.565 98.1112C454.059 91.3425 456.481 84.9656 458.832 78.9806C461.255 72.9956 463.606 67.3312 465.886 61.9875C468.237 56.5725 470.66 51.3 473.154 46.17H489.078C491.5 51.3 493.887 56.5725 496.239 61.9875C498.59 67.3312 500.941 72.9956 503.292 78.9806C505.715 84.9656 508.173 91.3425 510.667 98.1112C513.16 104.88 515.797 112.254 518.575 120.234H500.727ZM480.742 62.9493C480.385 64.0181 479.851 65.4787 479.139 67.3312C478.426 69.1837 477.607 71.3212 476.68 73.7437C475.754 76.1662 474.721 78.8381 473.581 81.7593C472.512 84.6806 471.408 87.7443 470.268 90.9506H491.322C490.182 87.7443 489.078 84.6806 488.009 81.7593C486.94 78.8381 485.907 76.1662 484.91 73.7437C483.984 71.3212 483.164 69.1837 482.452 67.3312C481.739 65.4787 481.169 64.0181 480.742 62.9493Z" fill="#81CAA8"/>
<path d="M451.327 46.17V60.3843H428.99V120.234H412.318V60.3843H389.981V46.17H451.327Z" fill="#81CAA8"/>
<path d="M358.613 107.516C360.964 107.516 362.888 107.338 364.384 106.982C365.952 106.554 367.198 106.02 368.125 105.379C369.051 104.666 369.692 103.847 370.048 102.921C370.405 101.994 370.583 100.961 370.583 99.8212C370.583 97.3987 369.443 95.4037 367.163 93.8362C364.883 92.1975 360.964 90.4518 355.407 88.5993C352.984 87.7443 350.562 86.7825 348.139 85.7137C345.717 84.5737 343.543 83.1843 341.62 81.5456C339.696 79.8356 338.128 77.805 336.917 75.4537C335.706 73.0312 335.1 70.11 335.1 66.69C335.1 63.27 335.742 60.2062 337.024 57.4987C338.307 54.72 340.123 52.3687 342.475 50.445C344.826 48.5212 347.676 47.0606 351.025 46.0631C354.373 44.9943 358.15 44.46 362.353 44.46C367.341 44.46 371.652 44.9943 375.285 46.0631C378.919 47.1318 381.912 48.3075 384.263 49.59L379.453 62.7356C377.387 61.6668 375.072 60.7406 372.507 59.9568C370.013 59.1018 366.985 58.6743 363.422 58.6743C359.432 58.6743 356.547 59.2443 354.765 60.3843C353.055 61.4531 352.2 63.1275 352.2 65.4075C352.2 66.7612 352.521 67.9012 353.162 68.8275C353.803 69.7537 354.694 70.6087 355.834 71.3925C357.045 72.105 358.399 72.7818 359.895 73.4231C361.463 73.9931 363.173 74.5987 365.025 75.24C368.873 76.665 372.222 78.09 375.072 79.515C377.922 80.8687 380.273 82.4718 382.125 84.3243C384.049 86.1768 385.474 88.35 386.4 90.8437C387.327 93.3375 387.79 96.3656 387.79 99.9281C387.79 106.839 385.367 112.219 380.522 116.066C375.677 119.842 368.374 121.731 358.613 121.731C355.335 121.731 352.378 121.517 349.742 121.089C347.106 120.733 344.755 120.27 342.688 119.7C340.693 119.13 338.948 118.524 337.452 117.883C336.027 117.242 334.815 116.636 333.818 116.066L338.52 102.814C340.729 104.025 343.437 105.129 346.643 106.127C349.92 107.053 353.91 107.516 358.613 107.516Z" fill="#81CAA8"/>
<path d="M275.737 120.234V46.17H325.755V60.1706H292.41V74.7056H322.014V88.3856H292.41V106.234H328.213V120.234H275.737Z" fill="#81CAA8"/>
</svg>
        </div>
        <div className="relative mt-2 sm:mt-0 flex items-center self-end sm:self-auto">
          <span className="absolute inset-0 bg-primary-light rounded-br-2xl sm:rounded-br-3xl -skew-x-6 sm:-skew-x-12 w-full h-full" aria-hidden="true"></span>
          <h1 className="relative text-lg sm:text-3xl font-extrabold text-gray-700 font-mono tracking-tight drop-shadow-md px-3 sm:px-6 py-1 sm:py-2 whitespace-nowrap">
            Inscrições {year}
          </h1>
        </div>
      </header>

      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl p-4 sm:p-8 space-y-8 bg-gray-900 rounded-3xl border border-gray-700 mx-auto">
        <Stepper
          step={step}
          steps={steps}
          onStepClick={setStep}
          isStepEnabled={(idx) => idx < step || isStepValid.slice(0, idx).every(Boolean)}
        />
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
                <ExperienceForm />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                key="step-4"
                exit={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
              >
                <ReasonForm />
              </motion.div>
            )}
            {step === 5 && (
              <motion.div
                key="step-5"
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
              disabled={step === 0 || loading}
            >
              Voltar
            </button>
            {step < 5 ? (
              <button
                type="button"
                className="btn font-bold bg-primary-light text-gray-900 hover:bg-primary-main rounded-xl px-8 py-3 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto disabled:text-gray-400/30"
                onClick={() => setStep((s) => Math.min(5, s + 1))}
                disabled={!isStepValid[step] || loading}
              >
                Continuar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn font-bold bg-primary-light text-gray-900 hover:bg-primary-main rounded-xl px-8 py-3 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto  disabled:text-gray-400/30"
                disabled={availability === null || !acceptedPolicy || loading}
              >
                {loading ? "Enviando..." : "Finalizar inscrição"}
              </button>
            )}
          </div>

      </div>
    </div>
  );
}
