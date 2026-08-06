export interface Help {
  phone: string;
  email: string;
  whatsapp: string;
  faqUrl: string;
}

export interface HelpResponse {
  success: boolean;
  message: string;
  help: Help;
}