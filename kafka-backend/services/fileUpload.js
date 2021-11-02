function handle_request(msg, callback) {
  upload(req, res, (err) => {
    if (!err) {
      res.end(req.file.path);
    } else {
      console.log("Error!");
    }
  });
}

exports.handle_request = handle_request;
