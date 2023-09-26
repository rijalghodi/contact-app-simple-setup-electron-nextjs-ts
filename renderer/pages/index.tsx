import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Contact } from "../types/contact";
import { readContacts as readAllContacts, saveContact } from "../utils/fetch-contact";

type Props = {
  initialContacts?: Contact[];
};

export default function HomePage(props: Props) {
  const [contacts, setContacts] = React.useState(props.initialContacts);

  const [newName, setNewName] = React.useState<string | undefined>();
  const [newEmail, setNewEmail] = React.useState<string | undefined>();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Save contact to the database
    const saveResponse = await saveContact({ email: newEmail, name: newName });

    // If the contact successfully saved, then refetch all contacts
    // and renew the contacts state
    if (saveResponse.id) {
      const readResponse = await readAllContacts();
      setContacts(readResponse);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Contact</title>
      </Head>
      <div>
        <p>
          ⚡ Contact App ⚡ -
          <Link href="/home">
            <a>Go to Home</a>
          </Link>
        </p>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nama"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {contacts.map((v) => (
          <p key={v.id}>
            {v.name} : {v.email}
          </p>
        ))}
      </div>
    </React.Fragment>
  );
}

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const contacts = await prisma.contact.findMany();
  // const contacts = await readAllContacts();

  return {
    props: {
      initialContacts: contacts,
    },
  };
}
