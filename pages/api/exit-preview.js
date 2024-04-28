const exit = async (req, res) => {
  res.clearPreviewData();
  res.writeHead(307, { Location: "/" });
  res.end();
};

export default exit;
