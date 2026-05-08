const webhookUrl = process.env.TEAMS_WEBHOOK_URL;

if (!webhookUrl) {
  throw new Error("Missing TEAMS_WEBHOOK_URL");
}

const colours = [
  { name: "Red", hex: "#f00" },
  { name: "Green", hex: "#0f0" },
  { name: "Blue", hex: "#00f" },
];

const colour = colours[Math.floor(Math.random() * colours.length)];

const payload = {
  type: "message",
  attachments: [
    {
      contentType: "application/vnd.microsoft.card.adaptive",
      content: {
        type: "AdaptiveCard",
        version: "1.4",
        body: [
          {
            type: "TextBlock",
            text: "🎨 Today's team colour",
            weight: "Bolder",
            size: "Large",
          },
          {
            type: "TextBlock",
            text: `${colour.name} — ${colour.hex}`,
            size: "Medium",
          },
        ],
      },
    },
  ],
};

const response = await fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  throw new Error(`Teams webhook failed: ${response.status} ${await response.text()}`);
}

console.log(`Colour: ${colour.name} ${colour.hex}`);