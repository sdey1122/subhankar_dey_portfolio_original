/*
 * Defines the structure of one certification entry.
 *
 * The certification UI should not need to know how certification
 * information is structured internally. Keeping the interface here
 * gives the data layer and UI layer a shared contract.
 */

export interface CertificationItem {
  id: string;
  year: string;
  title: string;
  issuer: string;
  description: string;
  credentialUrl?: string;
  image?: string;
  imageAlt?: string;
}
