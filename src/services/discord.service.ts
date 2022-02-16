export type NotifyDiscordService = {
  webhookId: string;
  webhookToken: string;
  body: string;
};

export const notifyDiscord = async (
  params: NotifyDiscordService,
): Promise<void> => {
  const { webhookId, webhookToken, body } = params;
  await fetch(
    `https://discordapp.com/api/webhooks/${webhookId}/${webhookToken}`,
    {
      method: "post",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
