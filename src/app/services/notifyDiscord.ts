  export type NotifyDiscordService = {
  fullName: string;
  city: string;
  neighborhood: string;
  course: string;
};

export async function notifyDiscord({
  city,
  course,
  fullName,
  neighborhood,
}: NotifyDiscordService) {
  const currentYear = new Date().getFullYear();

  try {
    await fetch(
      `https://discordapp.com/api/webhooks/${import.meta.env.VITE_WEBHOOK_ID}/${import.meta.env.VITE_WEBHOOK_TOKEN}`,
      {
        method: "post",
        body: JSON.stringify({
          content: `Mais um inscrito no Estartando Devs ${currentYear} 🎉
                \n👨‍💻 Nome:  ${fullName}
                \n📍 Local:  ${city} , ${neighborhood}
                \n💻 Turma:  ${course}
               `,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error);
  }


};
