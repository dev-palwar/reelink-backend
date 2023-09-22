const sendResponse = (res, error, message, resFromDB, added) => {
  res.json({
    error: error,
    message: message,
    added: added,
    resFromDB: resFromDB,
  });
};

module.exports = sendResponse;
