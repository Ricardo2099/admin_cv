export interface Header {
  id?: string; // Opcional porque Firestore lo genera automáticamente
  email: string;
  goalLife: string;
  location: string;
  name: string;
  phoneNumber: string;
  photoUrl: string;
  socialNetwork: string;
}
