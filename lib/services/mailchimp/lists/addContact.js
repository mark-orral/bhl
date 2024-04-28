import mailchimp from "@/services/mailchimp/mailchimp";

const listId = process.env.MAILCHIMP_LIST_ID;

const addContact = async (contact) => {
  try {
    return await mailchimp.post(`/lists/${listId}/members`, {
      email_address: contact?.email ?? "",
      status: "pending",
      merge_fields: {
        FNAME: contact?.firstname,
        LNAME: contact?.lastname,
      },
      tags: ["Blackhorse Lane"],
    });
  } catch (error) {
    console.error(
      `Failed to add a contact to the audience list (${listId}) in MailChimp: `,
      error.message
    );
    return error;
  }
};

export { addContact };
