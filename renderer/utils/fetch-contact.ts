import { Contact } from "../types/contact";

export type CreateContactDto = {
  name: string;
  email: string;
};

// Create Contact Method
export async function saveContact(contact: CreateContactDto): Promise<Contact> {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contact),
  });

  console.log("response create", response);
  return await response.json();
}

// Read All Contact Method
export async function readContacts(): Promise<Contact[]> {
  const response = await fetch("/api/contacts", {
    method: "GET",
  });
  console.log("response read", response);
  return response.json();
}
