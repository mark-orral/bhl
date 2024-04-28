import * as mailchimp from "@/services/mailchimp";

const handler = async (req, res) => {
  const contact = req.body;

  if (!contact.email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const { response } = await mailchimp.lists.addContact(contact);

    if (response?.status >= 400) {
      if (response?.data?.title === "Member Exists") {
        res.status(200).json({
          error: `${response?.data?.title}`,
          message: `It looks as though this email address is already subscribed`,
        });
      }

      res.status(400).json({
        error: `${response?.data?.title}`,
        message: `There was an error subscribing to the newsletter. Please send an email to help@blackhorsecollective.co.uk and we will add you to the list.`,
      });
    }

    res
      .status(201)
      .json({ error: null, message: `${contact.email} was added to the list` });
      
  } catch (error) {
    res.status(500).json({ error: error.message || error.toString() });
  }
};

export default handler;
