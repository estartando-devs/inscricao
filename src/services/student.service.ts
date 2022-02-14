import config from "../config/constants";
import { currentYear } from "../utils/currentYear";

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
  await fetch(
    config,
    {
      method: "post", body: JSON.stringify(subscription),
    },
  );
  await fetch(
    "https://discordapp.com/api/webhooks/729118719737069669/CAwTGLyMSLPjftBVNw1BZlU-68Da018TD5WuGipzQ8CIGc7jj1EK1fXpY_GilG1z9vHR",
    {
      method: "post",
      body: JSON.stringify({
        content: `Mais um inscrito no Estartando Devs ${currentYear} 🎉
                  \n👨‍💻 Nome:  ${subscription.fullName}
                  \n📍 Local:  ${subscription.city} , ${subscription.neighborhood}
                  \n💻 Turma:  ${subscription.course}
                 `,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
