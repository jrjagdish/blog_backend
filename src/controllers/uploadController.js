export const uploadMedia = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  } 
  res.status(200).json({
    message: "File uploaded successfully",
    fileUrl: req.file.path,
    public_id: req.file.filename,
  });
}