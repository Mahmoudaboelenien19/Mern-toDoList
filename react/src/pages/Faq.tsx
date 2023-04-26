import React, { useEffect, useState } from "react";
import OneFaq from "./OneFaq";

const faqArr = [
  {
    id: 1,
    question: "1- How do I manage my ToDos?",
    answer: `To manage your ToDos, you can create new ToDos,
 edit existing ones, mark them as completed, and delete them.
  To create a new ToDo, click on the "Add ToDo" button and fill
   out the necessary information such as the title, description,
    and due date. To edit an existing ToDo, click on the ToDo you want 
    to edit and make the necessary changes. To mark a ToDo as completed, 
    click the checkbox next to the ToDo. To delete a ToDo, click on the ToDo
     you want to delete and then click the "Delete" button. Confirm the action
      and the ToDo will be permanently removed from the list.`,
  },

  {
    id: 2,
    question: "2- How do I keep my ToDos private and secure?",
    answer: `The ToDo app uses user authentication to ensure that each user can only access their own ToDos. Users must log in with their username and password before they can view, edit, or delete their ToDos. Additionally, the app uses industry-standard encryption to keep user data secure. It is recommended that users choose a strong password and keep it confidential to ensure the security of their account.`,
  },
  {
    id: 3,
    question: "3- How do I organize my ToDos?",

    answer: `To organize your ToDos, you can sort them by different criteria such as due date, priority, or title. To sort by due date, click the "Due Date" column header. To sort by priority, click the "Priority" column header. To sort by title, click the "Title" column header. You can also filter your ToDos by status (e.g. completed, active) or by searching for a specific keyword.`,
  },
  {
    id: 4,
    question: "4- Can I assign ToDos to other users?",
    answer: `The ToDo app is designed to allow users to manage their own personal ToDos. However, if you need to assign a ToDo to another user, you can create a new account for them and give them access to the app. Once they have their own account, you can assign ToDos to them by sharing the ToDo title or description with them.`,
  },
  {
    id: 5,
    question: "5- How do I set reminders for my ToDos?",
    answer: `To set reminders for your ToDos, you can use the due date field to specify when the ToDo is due. Once the due date is set, the ToDo will appear in the "Due Today" or "Overdue" sections of the app, depending on the current date. You can also set up email or push notifications to remind you of upcoming ToDos. To do this, go to your account settings and choose the notification options you prefer.`,
  },
];

const Faq = () => {
  const [faqIndex, setFaqIndex] = useState(-1);

  useEffect(() => {
    document.title = "FAQ";
  }, []);
  return (
    <div className="faq-container">
      {faqArr.map(
        (obj, index) => {
          return (
            <>
              <OneFaq
                {...obj}
                key={obj.answer}
                index={index}
                faqIndex={faqIndex}
                setFaqIndex={setFaqIndex}
              />
            </>
          );
        }
        // }
      )}
    </div>
  );
};

export default Faq;
