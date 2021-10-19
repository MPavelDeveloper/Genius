export class FamilyDTO {
  id: number;
  husband: number;
  wife: number;
  children: Array<number>;
}
interface PersonNameDTO {
  first?: string,
  middle?: string,
  last?: string,
}

export class PersonDTO {
  id: number;
  name: PersonNameDTO = {};
  gender: string;
  parentFamilyId: number;
}
