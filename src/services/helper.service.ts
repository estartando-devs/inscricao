import { http } from "./base.service";

interface IViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
}

export const getAddressByCep = async (cep: string): Promise<IViaCep | any> => new Promise(
  (resolve) => {
    http<IViaCep>(`https://viacep.com.br/ws/${cep}/json/`).then((response) => resolve(response.parsedBody));
  },
);
