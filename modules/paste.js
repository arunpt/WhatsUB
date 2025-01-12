const execute = async (client, msg, args) => {
  await msg.delete(true);
  if (!msg.hasQuotedMsg)
    return await msg.reply("Please use this command as reply to a message!");
  const rep = msg._data.quotedMsg.body;
  const paste_url = "https://paste.xditya.me/" + (await getPasteKey(rep));
  await msg.reply(`*Pasted!*\n${paste_url}`);
};

async function getPasteKey(text) {
  const url = "https://paste.xditya.me/api/v2/pastes";
  const data = {
    content: text,
  };
  let result = null;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => (result = json));
  return result.id;
}

module.exports = { execute };
