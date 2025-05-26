import { users, messages, type User, type InsertUser, type Message, type InsertMessage } from "@shared/schema";
import { nanoid } from "nanoid";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  createUser(user: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export interface ContactForm {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export class MemStorage implements IStorage {
  private users: User[];
  private messages: Message[];
  private currentId: number;
  private currentMessageId: number;
  private contacts: ContactForm[] = [];
  private nextId = 1;

  constructor() {
    this.users = [];
    this.messages = [];
    this.currentId = 1;
    this.currentMessageId = 1;
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.currentId++,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const newMessage: Message = {
      id: this.currentMessageId++,
      ...message,
      createdAt: new Date().toISOString(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  addContact(contact: Omit<ContactForm, "id" | "createdAt">) {
    const newContact: ContactForm = {
      ...contact,
      id: this.nextId++,
      createdAt: new Date().toISOString(),
    };
    this.contacts.push(newContact);
    return newContact;
  }

  getContacts() {
    return this.contacts;
  }

  getContact(id: number) {
    return this.contacts.find((contact) => contact.id === id);
  }

  deleteContact(id: number) {
    const index = this.contacts.findIndex((contact) => contact.id === id);
    if (index === -1) return false;
    this.contacts.splice(index, 1);
    return true;
  }
}

export const storage = new MemStorage();
