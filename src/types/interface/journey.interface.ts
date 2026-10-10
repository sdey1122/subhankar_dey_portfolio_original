/*
 * Type definition for one Journey timeline entry.
 *
 * Keeping this interface inside the centralized types/interface folder
 * means the Journey data and Journey component can share the same
 * structure without duplicating types.
 */

export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  description: string;
}
