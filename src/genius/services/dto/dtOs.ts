export interface FamilyDTO {
  id?: number;
  husband: number;
  wife?: number;
  children?: Array<number>;
  note?: string;
}

interface PersonNameDTO {
  first: string;
  middle?: string;
  last?: string;
  maiden?: string;
}

export interface PersonDTO {
  id?: number;
  name: PersonNameDTO;
  gender: string;
  place?: string;
  occupation?: string;
  note?: string;
  familyId?: number;
  parentFamilyId?: number;
}
