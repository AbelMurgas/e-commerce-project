export const objectErrorToString = (errorsData) => {
  const messageList = errorsData.errors.map((obj) => obj.msg);
  const messagesString = messageList.join("\n");
  return messagesString;
};
