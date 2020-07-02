interface IImage<TValue> {
  [id: string]: TValue;
}

const images: IImage<string> = {
  cursoDesenvolvimento: require("./option-desenvolvimento.svg"),
  cursoDesign: require("./option-design.svg"),
  finalNao: require("./final-nao.svg"),
  finalSim: require("./final-sim.svg"),
  iconFacebook: require("./icon-facebook.svg"),
  iconInstagram: require("./icon-instagram.svg"),
  inscricaoCancelada: require("./inscricao-cancelada.svg"),
  inscricaoConfirmada: require("./inscricao-confirmada.svg"),
  perfilFormado: require("./perfil-formado.svg"),
  step1: require("./step-1-white.svg"),
  step1Disabled: require("./step-1-grey.svg"),
  step2: require("./step-2-white.svg"),
  step2Disabled: require("./step-2-grey.svg"),
  step3: require("./step-3-white.svg"),
  step3Disabled: require("./step-3-grey.svg"),
  step4: require("./step-4-white.svg"),
  step4Disabled: require("./step-4-grey.svg"),
  students: require("./students.svg"),
  textAreaGreen: require("./text-area-green.svg"),
  textAreaBlack: require("./text-area-black.svg"),
};

export const getImage = (id: any) => images[id];

export default images;
