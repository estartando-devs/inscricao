import { http } from "./base.service";

export interface ISubscription {
  fullName: string;
  email: string;
  dateBirth: string;
  phone: string;
  zipcode: string;
  address: string;
  number: string;
  city: string;
  neighborhood: string;
  isStudent: boolean | undefined;
  course: string;
  availableTime: boolean | undefined;
  testimony: string;
}

export const sendSubscription = async (subscription: ISubscription) => {
  await http(
    "https://us-central1-estartando-devs-platform.cloudfunctions.net/platform/subscribe",
    { method: "post", body: JSON.stringify(subscription) }
  );
  await http(
    "https://discordapp.com/api/webhooks/729118719737069669/CAwTGLyMSLPjftBVNw1BZlU-68Da018TD5WuGipzQ8CIGc7jj1EK1fXpY_GilG1z9vHR" ,
    { method: "post" , body: JSON.stringify({"content":`Mais um inscrito no Estartando Devs 2020 😃 \nNOME:  ${subscription.fullName} \nCIDADE:  ${subscription.city} \nBAIRRO:  ${subscription.neighborhood}`} ) , headers: {'Content-Type': 'application/json'}}
  );
};
