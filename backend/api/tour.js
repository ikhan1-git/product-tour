export default function handler(req, res) {
  const { domain, path } = req.query;

  // Just sample logic for now — you will replace with real DB later
  if (domain === 'abc.com' && path === '/') {
    res.status(200).json({
      tourName: "Demo Tour",
      domain: domain,
      path: path,
      steps: [
        {
          selector: "#example1",
          content: "This is step 1"
        },
        {
          selector: "#example2",
          content: "This is step 2"
        }
      ]
    });
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
}
